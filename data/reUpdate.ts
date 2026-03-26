import { parseFile } from 'music-metadata';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const sharp = require('sharp');
import * as fs from 'fs/promises';
import * as path from 'path';
import { Track } from '../types';

// Настройте эти значения
const DATA_PATH = path.join(__dirname, 'data.ts');
const PUBLIC_PATH = path.join(__dirname, '..', 'public');
const TRACK_ID_START = 199; // id первого трека
const TRACK_ID_END = 228;   // id последнего трека

async function main() {
  // 1. Читаем data.ts
  const data = await fs.readFile(DATA_PATH, 'utf-8');

  // 2. Получаем массив initialTracks через eval
  const tracksMatch = data.match(/export const initialTracks: Track\[\] = (\[[\s\S]*?\]);/);
  if (!tracksMatch) throw new Error('Не найден массив initialTracks');
  // eslint-disable-next-line no-eval
  const tracks: Track[] = eval(tracksMatch[1].replace(/(\w+):/g, '"$1":'));

  // 3. Находим нужный диапазон по id
  const startIdx = tracks.findIndex(t => t.id === TRACK_ID_START);
  const endIdx = tracks.findIndex(t => t.id === TRACK_ID_END);
  if (startIdx === -1 || endIdx === -1) throw new Error('Не найден указанный id трека');
  const selectedTracks = tracks.slice(startIdx, endIdx + 1);

  let changed = false;

  for (const track of selectedTracks) {
    const audioPath = path.join(PUBLIC_PATH, track.fullSrc.replace(/^\//, ''));
    // Проверяем метадату
    try {
      const metadata = await parseFile(audioPath);
      let needUpdate = false;
      if (metadata.common.title && metadata.common.title !== track.title) {
        track.title = metadata.common.title;
        needUpdate = true;
      }
      if (metadata.common.artist && metadata.common.artist !== track.artist) {
        track.artist = metadata.common.artist;
        needUpdate = true;
      }
      if (needUpdate) changed = true;
    } catch {
      console.warn(`Не удалось прочитать метадату: ${audioPath}`);
    }

    // Проверяем обложку
    const coverPath = path.join(PUBLIC_PATH, track.cover.replace(/^\//, ''));
    try {
      await fs.access(coverPath);
    } catch {
      // Файл не найден, создаём квадратную обложку
      const coverDir = path.dirname(coverPath);
      await fs.mkdir(coverDir, { recursive: true });
      try {
        const metadata = await parseFile(audioPath);
        if (metadata.common.picture && metadata.common.picture[0]) {
          const img = metadata.common.picture[0];
          await sharp(img.data)
            .resize({ fit: 'cover' })
            .toFile(coverPath);
          console.log(`Создана обложка из embedded: ${coverPath}`);
        } else {
          const noCover = path.join(PUBLIC_PATH, 'covers/no-cover.jpg');
          const image = sharp(noCover);
          const { width, height } = await image.metadata();
          const size = Math.min(width!, height!);
          await image
            .extract({
              left: Math.floor((width! - size) / 2),
              top: Math.floor((height! - size) / 2),
              width: size,
              height: size,
            })
            .toFile(coverPath);
          console.log(`Создана квадратная обложка: ${coverPath}`);
        }
      } catch (e) {
        console.warn(`Ошибка при создании обложки для ${track.title}: ${e}`);
      }
    }
  }

  // 5. Если были изменения — обновляем data.ts
  if (changed) {
    const newTracksStr = JSON.stringify(tracks, null, 2).replace(/"(\w+)":/g, '$1:');
    const newLines = [
      ...data.split('\n').slice(0, TRACK_ID_START),
      `export const initialTracks: Track[] = ${newTracksStr};`,
      ...data.split('\n').slice(TRACK_ID_END + 1),
    ];
    await fs.writeFile(DATA_PATH, newLines.join('\n'), 'utf-8');
    console.log('data.ts обновлён');
  } else {
    console.log('Изменений не найдено');
  }
}

main().catch(console.error);