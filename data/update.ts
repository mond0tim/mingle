import * as fs from 'fs';
import * as path from 'path';
import { Track } from '../types';
import * as mm from 'music-metadata';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const sharp = require('sharp');

const audioDir = path.join(process.cwd(), 'public', 'audio');
const coversDir = path.join(process.cwd(), 'public', 'covers');
const dataFile = path.join(process.cwd(), 'data', 'data.ts');
const backupsDir = path.join(process.cwd(), 'backups');
const logFile = path.join(process.cwd(), 'sync-log.txt'); // Add log file

// Ensure backups directory exists
if (!fs.existsSync(backupsDir)) {
  fs.mkdirSync(backupsDir, { recursive: true });
}

// Initialize log file
fs.writeFileSync(logFile, `Log started at ${new Date().toISOString()}\n`, 'utf-8');

function log(message: string) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(message);
  fs.appendFileSync(logFile, logMessage, 'utf-8');
}

function getFiles(dir: string, exts: string[]) {
  return fs.readdirSync(dir).filter(file => exts.some(ext => file.toLowerCase().endsWith(ext)));
}

function getBaseName(file: string) {
  // Убираем расширение и нормализуем пробелы/подчеркивания
  return file.replace(/\.[^/.]+$/, '').replace(/_/g, ' ').trim();
}

function getExistingTracks(): Track[] {
  try {
    const content = fs.readFileSync(dataFile, 'utf-8');
    const match = content.match(/export const initialTracks: Track\[] = (\[[\s\S]*?\]);/);
    if (!match) {
      log("ERROR: Не удалось найти объявление массива initialTracks в файле data.ts");
      return [];
    }
    // eslint-disable-next-line no-eval
    return eval(match[1].replace(/(\w+):/g, '"$1":'));
  } catch (err) {
    log(`ERROR: Ошибка при чтении существующих треков: ${err}`);
    return [];
  }
}

function getNextId(tracks: Track[]) {
  return tracks.length ? Math.max(...tracks.map(t => t.id)) + 1 : 0;
}

function removeDuplicates(str: string): string {
  if (!str) return '';
  // Разделяем по запятой, точке с запятой или нескольким пробелам
  const parts = str
    .split(/[,;]+|\s{2,}/)
    .map(s => s.trim())
    .filter(Boolean);
  // Удаляем дубликаты (регистронезависимо)
  return Array.from(new Set(parts.map(s => s.toLowerCase())))
    .map(lower => parts.find(orig => orig.toLowerCase() === lower)!)
    .join(', ');
}

// Доработанная функция для обработки кириллических метаданных
async function getMetadata(filePath: string, dedup = true) {
  let artist = 'unknown';
  let title = getBaseName(path.basename(filePath));
  let picture = null;

  try {
    // Добавляем опции для корректной обработки кириллицы
    log(`Чтение метаданных из файла: ${filePath}`);
    const metadata = await mm.parseFile(filePath, { duration: true, skipCovers: false });
    
    if (metadata.common) {
      // Обработка исполнителя
      if (typeof metadata.common.artist === 'string' && metadata.common.artist.trim()) {
        artist = dedup ? removeDuplicates(metadata.common.artist) : metadata.common.artist;
      }
      
      // Обработка названия
      if (typeof metadata.common.title === 'string' && metadata.common.title.trim()) {
        title = dedup ? removeDuplicates(metadata.common.title) : metadata.common.title;
      }
      
      // Обработка обложки
      if (Array.isArray(metadata.common.picture) && metadata.common.picture[0]) {
        picture = metadata.common.picture[0];
      }
      
      // Дополнительный лог метаданных для диагностики
      log(`Метаданные файла ${path.basename(filePath)}:`);
      log(`- Artist: ${metadata.common.artist}`);
      log(`- Title: ${metadata.common.title}`);
      log(`- Format: ${metadata.format.container || 'unknown'}`);
    }
  } catch (e) {
    log(`WARN: Не удалось прочитать метаданные для файла "${filePath}": ${e instanceof Error ? e.message : JSON.stringify(e)}`);
    if (e instanceof Error && e.stack) {
      log(`Stack: ${e.stack}`);
    }
  }

  // Гарантируем fallback и проверяем наличие корректной кодировки
  if (!artist || !artist.trim() || artist.includes('�')) {
    log(`WARN: Некорректное значение artist: "${artist}", попытка извлечь из имени файла`);
    artist = 'unknown';
    // Попробуем определить исполнителя из имени файла
    const fileName = path.basename(filePath);
    const dashMatch = fileName.match(/^(.+?)\s*-\s*(.+?)\.mp3$/i);
    if (dashMatch) {
      artist = dashMatch[1].trim();
      log(`Извлечен artist из имени файла: "${artist}"`);
    }
  }
  
  if (!title || !title.trim() || title.includes('�')) {
    log(`WARN: Некорректное значение title: "${title}", попытка извлечь из имени файла`);
    title = getBaseName(path.basename(filePath));
    // Попробуем определить название из имени файла
    const fileName = path.basename(filePath);
    const dashMatch = fileName.match(/^(.+?)\s*-\s*(.+?)\.mp3$/i);
    if (dashMatch) {
      title = dashMatch[2].trim();
      log(`Извлечен title из имени файла: "${title}"`);
    }
  }

  return { artist, title, picture };
}

// Обрезка изображения до квадрата по центру (по высоте)
async function cropCoverToSquare(coverPath: string) {
  const absPath = path.join(coversDir, coverPath.replace('/covers/', ''));
  if (!fs.existsSync(absPath)) {
    log(`WARN: Файл обложки не существует: ${absPath}`);
    return;
  }
  
  try {
    log(`Обрезка обложки: ${absPath}`);
    const image = sharp(absPath);
    const metadata = await image.metadata();
    
    if (!metadata.width || !metadata.height) {
      log(`WARN: Не удалось получить размеры обложки: ${absPath}`);
      return;
    }
    
    if (metadata.width === metadata.height) {
      log(`Обложка уже квадратная: ${absPath}`);
      return; // Уже квадрат
    }

    const size = Math.min(metadata.width, metadata.height);
    const left = Math.floor((metadata.width - size) / 2);
    const top = Math.floor((metadata.height - size) / 2);

    log(`Обрезка обложки ${absPath} до размера ${size}x${size}`);
    await image
      .extract({ left, top, width: size, height: size })
      .toFile(absPath + '-square.jpg');
    fs.renameSync(absPath + '-square.jpg', absPath);
    log(`Обложка успешно обрезана: ${absPath}`);
  } catch (err) {
    log(`ERROR: Ошибка при обрезке обложки ${coverPath}: ${err}`);
  }
}

function saveCoverFromBuffer(buffer: Buffer, base: string, format: string = 'jpg') {
  try {
    const fileName = `${base}.${format}`;
    const filePath = path.join(coversDir, fileName);
    log(`Сохранение обложки в файл: ${filePath}`);
    fs.writeFileSync(filePath, buffer);
    return `/covers/${fileName}`;
  } catch (err) {
    log(`ERROR: Ошибка при сохранении обложки: ${err}`);
    return '/covers/no-cover.jpg';
  }
}

// Function for safe data.ts update with backups to backupsDir
function updateDataFile(tracks: Track[]): boolean {
  try {
    log(`Updating data file: ${dataFile}`);
    // Create backup in backupsDir
    const baseName = path.basename(dataFile, path.extname(dataFile));
    const backupFile = path.join(backupsDir, `${baseName}.backup-${Date.now()}.ts`);
    fs.copyFileSync(dataFile, backupFile);
    log(`Created backup: ${backupFile}`);

    const content = fs.readFileSync(dataFile, 'utf-8');
    const newTracksStr = JSON.stringify(tracks, null, 2)
      .replace(/"(\w+)":/g, '$1:')
      .replace(/\\u([0-9a-fA-F]{4})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16)));

    log(`New content preview: ${newTracksStr.substring(0, 100)}...`);

    const updated = content.replace(
      /(export const initialTracks: Track\[\]\s*=\s*)\[[\s\S]*?\];/m,
      `$1${newTracksStr};`
    );

    if (content === updated) {
      log(`ERROR: Update failed. Pattern not found.`);
      return false;
    }

    fs.writeFileSync(dataFile, updated, 'utf-8');
    log(`Data file successfully updated.`);
    return true;
  } catch (err) {
    log(`CRITICAL ERROR updating data file: ${err}`);
    return false;
  }
}

async function syncTracks(flags: { artist?: string; coverOnly?: boolean; newTracksPlaylist?: boolean; noDedup?: boolean; forceAdd?: boolean; debug?: boolean; extractCovers?: boolean } = {}) {
  log("==== Начало синхронизации треков ====");
  
  try {    
    const audioFiles = getFiles(audioDir, ['.mp3', '.m4a']);
    log(`Найдено ${audioFiles.length} аудиофайлов в директории ${audioDir}`);
    
    const coverFiles = getFiles(coversDir, ['.jpg', '.jpeg', '.png']);
    log(`Найдено ${coverFiles.length} файлов обложек в директории ${coversDir}`);
    
    const tracks = getExistingTracks();
    log(`Загружено ${tracks.length} существующих треков из файла данных`);
    
    // Нормализуем базовые имена для надежного сравнения
    const getNormalizedBaseName = (src: string) => {
      const baseName = getBaseName(path.basename(src));
      return baseName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };
    
    const baseNames = tracks.map(t => getNormalizedBaseName(t.src));
    

    const newTracks: Track[] = [];
    
    // Обрабатываем каждый файл в отдельном блоке try/catch
    for (const audio of audioFiles) {
      try {
        const base = getBaseName(audio);
        const normalizedBase = getNormalizedBaseName(audio);
        
        log(`\n--- Проверяем файл: ${audio} ---`);
        
        // Проверяем, существует ли трек уже в базе
        const existingIndex = baseNames.findIndex(bn => bn === normalizedBase);
        if (existingIndex >= 0) {
          log(`Пропущен (уже есть в data.ts): ${audio}`);
          continue;
        }

        const audioPath = path.join(audioDir, audio);
        if (!fs.existsSync(audioPath)) {
          log(`WARN: Файл не найден: ${audioPath}`);
          continue;
        }

        let artist: string;
        let title: string;
        let picture: mm.IPicture | null;

        // Отдельный блок try/catch для получения метаданных
        try {
          log(`Чтение метаданных: ${audio}`);
          const meta = await getMetadata(audioPath, !flags.noDedup);
          artist = meta.artist || 'unknown';
          title = meta.title || base;
          picture = meta.picture || null;
          
          // Проверка корректности данных
          log(`Прочитаны метаданные: исполнитель="${artist}", название="${title}"`);
        } catch (metaErr) {
          log(`WARN: Ошибка получения метаданных для ${audio}: ${metaErr instanceof Error ? metaErr.message : JSON.stringify(metaErr)}`);
          artist = 'unknown';
          title = base;
          picture = null;
        }

        // Проверка на корректные значения
        if (!artist || !artist.trim() || artist.includes('�')) {
          // Попытка извлечь исполнителя из имени файла
          const dashMatch = audio.match(/^(.+?)\s*-\s*(.+?)\.mp3$/i);
          artist = dashMatch ? dashMatch[1].trim() : 'unknown';
          log(`Исполнитель из файла: ${artist}`);
        }
        
        if (!title || !title.trim() || title.includes('�')) {
          // Попытка извлечь название из имени файла
          const dashMatch = audio.match(/^(.+?)\s*-\s*(.+?)\.mp3$/i);
          title = dashMatch ? dashMatch[2].trim() : base;
          log(`Название из файла: ${title}`);
        }

        // Обработка обложки
        const cover = coverFiles.find(c => getBaseName(c) === base);
        let coverPath = cover ? `/covers/${cover}` : '/covers/no-cover.jpg';
        log(`Исходная обложка: ${coverPath}`);

        // --- Новый блок: извлечение обложки из метаданных, если coverPath указан, но файла нет ---
        if (
          flags.extractCovers &&
          coverPath !== '/covers/no-cover.jpg' &&
          !fs.existsSync(path.join(coversDir, path.basename(coverPath))) &&
          picture
        ) {
          try {
            const ext = picture.format?.split('/')[1] || 'jpg';
            log(`Извлечение и сохранение обложки из метаданных (формат: ${ext})`);
            coverPath = saveCoverFromBuffer(Buffer.from(picture.data), getBaseName(path.basename(coverPath)), ext);
            log(`Обложка извлечена и сохранена: ${coverPath}`);
          } catch (coverErr) {
            log(`WARN: Ошибка при извлечении обложки для ${audio}: ${coverErr}`);
          }
        }
        // --- Конец нового блока ---

        if (!cover && picture) {
          try {
            const ext = picture.format?.split('/')[1] || 'jpg';
            log(`Сохранение обложки из метаданных (формат: ${ext})`);
            coverPath = saveCoverFromBuffer(Buffer.from(picture.data), base, ext);
            log(`Сохранена обложка: ${coverPath}`);
          } catch (coverErr) {
            log(`WARN: Ошибка при сохранении обложки для ${audio}: ${coverErr}`);
          }
        }

        // Обрезка обложки до квадрата
        if (coverPath && coverPath !== '/covers/no-cover.jpg') {
          try {
            await cropCoverToSquare(coverPath);
          } catch (err) {
            log(`WARN: Ошибка при обрезке обложки для ${audio}: ${err}`);
          }
        }

        // Формирование объекта трека
        const track: Track = {
          id: getNextId(tracks.concat(newTracks)),
          title,
          artist,
          src: `/audio/${audio}`,
          fullSrc: `/audio/${audio}`,
          cover: coverPath,
          type: 'track',
        };

        log(`Создан объект трека: ${JSON.stringify(track)}`);

        // Проверка по фильтрам
        if (flags.artist && !track.artist?.toLowerCase().includes(flags.artist.toLowerCase())) {
          log(`Пропущен по фильтру artist: ${track.artist}`);
          continue;
        }
        if (flags.coverOnly && (!track.cover || track.cover === '/covers/no-cover.jpg')) {
          log(`Пропущен по фильтру coverOnly: ${track.cover}`);
          continue;
        }

        // Сохраняем после каждого добавления трека
        try {
          // Добавляем трек к существующим
          const updatedTracks = [...tracks, ...newTracks, track];
          
          // Создаем копию перед обновлением файла (для безопасности)
          log(`Добавление трека ${track.id} в data.ts`);
          
          // Обновляем файл
          if (updateDataFile(updatedTracks)) {
            // Только если успешно сохранили - обновляем рабочие массивы
            tracks.push(track);
            newTracks.push(track);
            baseNames.push(normalizedBase);
            log(`Трек успешно добавлен: ${title} — ${artist} (ID: ${track.id})`);
          } else {
            log(`WARN: Не удалось сохранить трек ${title} в файл данных`);
          }
        } catch (saveErr) {
          log(`ERROR: Ошибка при сохранении данных для трека "${audio}": ${saveErr}`);
        }
      } catch (err) {
        log(`CRITICAL ERROR: При обработке файла "${audio}": ${err}`);
      }
    }

    // Если указан флаг создания плейлиста из новых треков
    if (flags.newTracksPlaylist && newTracks.length > 0) {
      try {
        log(`Создание плейлиста из ${newTracks.length} новых треков`);
        const playlistsFile = path.join(process.cwd(), 'data', 'data.ts');
        const content = fs.readFileSync(playlistsFile, 'utf-8');
        
        // Найти массив initialPlaylists
        const playlistMatch = content.match(/export const initialPlaylists: Playlist\[] = (\[[\s\S]*?\]);/);
        if (playlistMatch) {
          const newPlaylist = {
            id: Date.now(),
            title: 'Новые треки',
            cover: newTracks[0].cover,
            tracks: newTracks.map(track => track.id), // Сохраняем только ID треков
            isPlaying: false,
            category: 'playlist',
            type: 'playlist',
          };
          
          log(`Создан плейлист: ${JSON.stringify(newPlaylist)}`);
          
          // Вставить новый плейлист перед закрывающей скобкой массива
          const playlistJson = JSON.stringify(newPlaylist, null, 2)
            .replace(/"(\w+)":/g, '$1:')
            .replace(/\\u([0-9a-fA-F]{4})/g, (match, p1) => {
              return String.fromCharCode(parseInt(p1, 16));
            });
            
          const updated = content.replace(
            /(\];\s*)$/,
            `${playlistJson},\n$1`
          );
          
          fs.writeFileSync(playlistsFile, updated, 'utf-8');
          log(`Плейлист "Новые треки" успешно добавлен!`);
        } else {
          log(`WARN: Не найден массив initialPlaylists в файле ${playlistsFile}`);
        }
      } catch (playlistErr) {
        log(`ERROR: Ошибка при создании плейлиста: ${playlistErr}`);
      }
    }

    log(`==== Завершение синхронизации треков ====`);
    log(`Добавлено ${newTracks.length} новых треков`);
    
    return { added: newTracks.length, tracks };
  } catch (err) {
    log(`CRITICAL ERROR: Общая ошибка в функции syncTracks: ${err}`);
    return { added: 0, tracks: [] };
  }
}

// --- Отображение пропущенных треков ---
function showMissingTracks() {
  log("Проверка пропущенных треков...");
  const audioFiles = getFiles(audioDir, ['.mp3', '.m4a']);
  const tracks = getExistingTracks();
  
  // Нормализуем базовые имена для надежного сравнения
  const getNormalizedBaseName = (src: string) => {
    const baseName = getBaseName(path.basename(src));
    return baseName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };
  
  const baseNamesInData = tracks.map(t => getNormalizedBaseName(t.src));
  
  const missing = audioFiles
    .filter(audio => !baseNamesInData.includes(getNormalizedBaseName(audio)))
    .map(audio => ({ file: audio }));
    
  if (missing.length === 0) {
    log('Все аудиофайлы присутствуют в data.ts');
  } else {
    log(`Найдено ${missing.length} файлов, которых нет в data.ts:`);
    missing.forEach(m => log(`- ${m.file}`));
  }
}

function parseFlags() {
  const args = process.argv.slice(2);
  const flags: { artist?: string; coverOnly?: boolean; newTracksPlaylist?: boolean; diffOnly?: boolean; noDedup?: boolean; forceAdd?: boolean; debug?: boolean; single?: string; extractCovers?: boolean } = {};
  args.forEach(arg => {
    if (arg.startsWith('--artist=')) flags.artist = arg.replace('--artist=', '');
    if (arg === '--coverOnly') flags.coverOnly = true;
    if (arg === '--newTracksPlaylist') flags.newTracksPlaylist = true;
    if (arg === '--diffOnly') flags.diffOnly = true;
    if (arg === '--noDedup') flags.noDedup = true;
    if (arg === '--forceAdd') flags.forceAdd = true;
    if (arg === '--debug') flags.debug = true;
    if (arg.startsWith('--single=')) flags.single = arg.replace('--single=', '');
    if (arg === '--extractCovers') flags.extractCovers = true; // <--- добавлено
  });
  return flags;
}

// Новая функция для обработки одного файла
async function processSingleFile(filename: string) {
  log(`Обработка отдельного файла: "${filename}"`);
  
  const audioFiles = getFiles(audioDir, ['.mp3', '.m4a']);
  const targetFile = audioFiles.find(file => file.includes(filename));
  
  if (!targetFile) {
    log(`ERROR: Файл "${filename}" не найден в директории ${audioDir}`);
    return;
  }
  
  log(`Найден файл: ${targetFile}`);
  
  const tracks = getExistingTracks();
  const coverFiles = getFiles(coversDir, ['.jpg', '.jpeg', '.png']);
  const newTracks: Track[] = [];
  
  // Проверяем, существует ли трек уже в базе
  const getNormalizedBaseName = (src: string) => {
    const baseName = getBaseName(path.basename(src));
    return baseName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };
  
  const baseNames = tracks.map(t => getNormalizedBaseName(t.src));
  const normalizedBase = getNormalizedBaseName(targetFile);
  
  const existingIndex = baseNames.findIndex(bn => bn === normalizedBase);
  if (existingIndex >= 0) {
    log(`Файл уже существует в базе данных: ${targetFile}`);
    return;
  }
  
  const audioPath = path.join(audioDir, targetFile);
  
  try {
    log(`Чтение метаданных для ${targetFile}`);
    const meta = await getMetadata(audioPath, true);
    const artist = meta.artist || 'unknown';
    const title = meta.title || getBaseName(targetFile);
    const picture = meta.picture || null;
    
    // Обработка обложки
    const cover = coverFiles.find(c => getBaseName(c) === getBaseName(targetFile));
    let coverPath = cover ? `/covers/${cover}` : '/covers/no-cover.jpg';
    
    if (!cover && picture) {
      const ext = picture.format?.split('/')[1] || 'jpg';
      coverPath = saveCoverFromBuffer(Buffer.from(picture.data), getBaseName(targetFile), ext);
      await cropCoverToSquare(coverPath);
    }
    
    // Создаем объект трека
    const track: Track = {
      id: getNextId(tracks.concat(newTracks)),
      title,
      artist,
      src: `/audio/${targetFile}`,
      fullSrc: `/audio/${targetFile}`,
      cover: coverPath,
      type: 'track',
    };
    
    log(`Добавление трека: ${JSON.stringify(track)}`);
    
    // Добавляем трек и сохраняем
    tracks.push(track);
    if (updateDataFile(tracks)) {
      log(`Трек успешно добавлен: ${title} — ${artist}`);
    } else {
      log(`ERROR: Не удалось сохранить трек ${title} в файл данных`);
    }
  } catch (err) {
    log(`CRITICAL ERROR: Ошибка при обработке файла "${targetFile}": ${err}`);
  }
}

if (require.main === module) {
  const flags = parseFlags();
  log(`Запуск скрипта с флагами: ${JSON.stringify(flags)}`);
  
  if (flags.single) {
    processSingleFile(flags.single).catch(err => {
      log(`CRITICAL ERROR: ${err}`);
    });
  } else if (flags.diffOnly) {
    showMissingTracks();
  } else {
    (async () => {
      try {
        log("Запуск синхронизации треков...");
        const result = await syncTracks(flags);
        log(`Синхронизация завершена. Добавлено ${result.added} треков.`);
      } catch (e) {
        log(`CRITICAL ERROR при выполнении syncTracks: ${e}`);
      }
    })();
  }
}

export { syncTracks, showMissingTracks };