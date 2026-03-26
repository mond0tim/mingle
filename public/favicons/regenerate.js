// Скрипт для генерации PNG-иконок разных размеров из исходного изображения
// Использование: node regenerate.js путь_к_исходному_файлу.png

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sizes = [
  { name: 'web-app-manifest-72x72.png', size: 72 },
  { name: 'web-app-manifest-96x96.png', size: 96 },
  { name: 'web-app-manifest-128x128.png', size: 128 },
  { name: 'web-app-manifest-144x144.png', size: 144 },
  { name: 'web-app-manifest-144x144maskable.png', size: 144 },
  { name: 'web-app-manifest-152x152.png', size: 152 },
  { name: 'web-app-manifest-192x192.png', size: 192 },
  { name: 'web-app-manifest-192x192maskable.png', size: 192 },
  { name: 'web-app-manifest-384x384.png', size: 384 },
  { name: 'web-app-manifest-512x512.png', size: 512 },
  { name: 'web-app-manifest-512x512maskable.png', size: 512 },
];

async function generateIcons(inputPath) {
  if (!fs.existsSync(inputPath)) {
    console.error('Файл не найден:', inputPath);
    process.exit(1);
  }

  for (const { name, size } of sizes) {
    try {
      await sharp(inputPath)
        .resize(size, size)
        .png()
        .toFile(path.join(__dirname, name));
      console.log(`Создано: ${name}`);
    } catch (err) {
      console.error(`Ошибка при создании ${name}:`, err.message);
    }
  }
}

if (require.main === module) {
  const inputPath = process.argv[2];
  if (!inputPath) {
    console.log('Использование: node regenerate.js путь_к_исходному_файлу.png');
    process.exit(1);
  }
  generateIcons(inputPath);
}