/* eslint-disable @typescript-eslint/no-require-imports */
// Скрипт для проверки и обновления данных треков и обложек

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const mm = require('music-metadata');

const DATA_PATH = path.join(__dirname, 'data.ts');
const COVERS_DIR = path.join(__dirname, '..', 'public', 'covers');

// Диапазон id для проверки
const CHECK_ID_FROM = 230;
const CHECK_ID_TO = 232;

// Функция для извлечения массива initialTracks из TypeScript-файла
function extractTracks(tsFile) {
  const source = fs.readFileSync(tsFile, 'utf8');
  const matches = source.match(/export const initialTracks: Track\[\] = (\[[\s\S]*?\]);/);
  if (!matches) throw new Error('Не найден initialTracks');
  let json = matches[1]
    .replace(/(\w+):/g, '"$1":')
    .replace(/'|`/g, '"')
    .replace(/,(\s*})/g, '$1');
  json = json.replace(/\/\/.*$/gm, '');
  // Экранируем апострофы внутри строк
  json = json.replace(/"(.*?)"/g, (m) => m.replace(/\\?'/g, "\\'"));
  return { tracks: JSON.parse(json), source, match: matches[0] };
}

// Функция для проверки и обработки обложки
async function processCover(coverPath) {
  const absPath = path.join(COVERS_DIR, coverPath.replace('/covers/', ''));
  if (!fs.existsSync(absPath)) return false;
  try {
    const image = sharp(absPath);
    const meta = await image.metadata();
    if (meta.width !== meta.height) {
      const size = Math.min(meta.width, meta.height);
      await image
        .extract({ left: 0, top: 0, width: size, height: size })
        .resize(size, size)
        .toFile(absPath + '.square.png');
      fs.renameSync(absPath + '.square.png', absPath);
      return true;
    }
    return true;
  } catch (e) {
    console.error('Ошибка обработки обложки:', coverPath, e);
    return false;
  }
}

// Функция для создания квадратной обложки из изображения
async function createSquareCover(imageBuffer, outputPath) {
  try {
    const image = sharp(imageBuffer);
    const meta = await image.metadata();
    
    // Вычисляем размеры и позицию для обрезки
    const size = meta.height;
    const left = Math.floor((meta.width - size) / 2);
    
    // Обрезаем изображение квадратом по центру с размером равным высоте
    await image
      .extract({ left: Math.max(0, left), top: 0, width: size, height: size })
      .toFile(outputPath);
    
    console.log(`Создана новая обложка: ${outputPath}`);
    return true;
  } catch (e) {
    console.error('Ошибка при создании обложки:', e);
    return false;
  }
}

// Функция для извлечения обложки из метаданных аудиофайла
async function extractCoverFromAudio(audioPath, coverPath) {
  try {
    const metadata = await mm.parseFile(audioPath, { skipCovers: false });
    const picture = metadata.common.picture && metadata.common.picture[0];
    
    if (!picture) {
      console.warn(`В метаданных нет обложки: ${audioPath}`);
      return false;
    }
    
    // Создаем директорию для обложек, если не существует
    const coverDir = path.dirname(coverPath);
    if (!fs.existsSync(coverDir)) {
      fs.mkdirSync(coverDir, { recursive: true });
    }
    
    // Создаем квадратную обложку из изображения в метаданных
    return await createSquareCover(picture.data, coverPath);
  } catch (e) {
    console.error(`Ошибка при извлечении обложки из аудиофайла ${audioPath}:`, e);
    return false;
  }
}

// Функция для обновления данных трека по аудиофайлу
async function updateTrackFromAudio(track, audioPath) {
  if (!fs.existsSync(audioPath)) return false;
  try {
    const metadata = await mm.parseFile(audioPath);
    let updated = false;
    if (metadata.common.artist && track.artist !== metadata.common.artist) {
      track.artist = metadata.common.artist;
      updated = true;
    }
    if (metadata.common.title && track.title !== metadata.common.title) {
      track.title = metadata.common.title;
      updated = true;
    }
    return updated;
  } catch (e) {
    console.warn(`Не удалось прочитать метаданные: ${audioPath}`, e.message);
    return false;
  }
}

// Основная функция
(async () => {
  const { tracks, source, match } = extractTracks(DATA_PATH);
  let changed = false;

  for (const track of tracks) {
    if (typeof track.id !== 'number' || track.id < CHECK_ID_FROM || track.id > CHECK_ID_TO) continue;

    // Проверка и обработка обложки
    if (track.cover) {
      const coverPath = path.join(COVERS_DIR, track.cover.replace('/covers/', ''));
      const coverExists = await processCover(track.cover);
      
      if (!coverExists && track.fullSrc) {
        // Если обложка не найдена, пытаемся извлечь из метаданных аудиофайла
        const audioPath = path.join(__dirname, '..', 'public', track.fullSrc);
        console.log(`Пытаемся извлечь обложку из: ${audioPath}`);
        
        const coverExtracted = await extractCoverFromAudio(audioPath, coverPath);
        if (coverExtracted) {
          console.log(`Обложка успешно извлечена из метаданных для трека: ${track.id}`);
        } else {
          // Если не смогли извлечь обложку, используем заглушку
          console.warn(`Не удалось извлечь обложку из метаданных: ${track.fullSrc} (id: ${track.id})`);
          track.cover = '/covers/no-cover.jpg';
          changed = true;
        }
      } else if (!coverExists) {
        console.warn(`Обложка не найдена: ${track.cover} (id: ${track.id})`);
        track.cover = '/covers/no-cover.jpg';
        changed = true;
      }
    }
    
    // Проверка и обновление данных по аудиофайлу
    if (track.fullSrc) {
      const audioPath = path.join(__dirname, '..', 'public', track.fullSrc);
      if (!fs.existsSync(audioPath)) {
        console.warn(`Аудиофайл не найден: ${track.fullSrc} (id: ${track.id})`);
        changed = true;
      } else {
        const updated = await updateTrackFromAudio(track, audioPath);
        if (updated) changed = true;
      }
    }
  }

  // Если были изменения — обновляем только массив initialTracks в файле
  if (changed) {
    const newTracksStr = JSON.stringify(tracks, null, 2)
      .replace(/"(\w+)":/g, '$1:')
      .replace(/\\'/g, "'")
      .replace(/"([^"]+)"/g, (m, p1) => {
        // Оставляем кавычки только для строк с пробелами или спецсимволами
        if (/[^a-zA-Z0-9_а-яА-ЯёЁ]/.test(p1)) return `"${p1}"`;
        return m;
      });
    const newMatch = `export const initialTracks: Track[] = ${newTracksStr};`;
    const newSource = source.replace(match, newMatch);
    fs.writeFileSync(DATA_PATH, newSource, 'utf8');
    console.log('Файл data.ts обновлён.');
  } else {
    console.log('Изменений не требуется.');
  }
})();