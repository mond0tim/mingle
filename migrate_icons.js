const fs = require('fs');
const path = require('path');

const projectRoot = 'c:/mondotim/projects/mingle';
const publicIconsDir = path.join(projectRoot, 'public/icons');
const sharedIconsDir = path.join(projectRoot, 'src/shared/ui/icons');

// 1. Create directory
if (!fs.existsSync(sharedIconsDir)) {
  fs.mkdirSync(sharedIconsDir, { recursive: true });
}

// 2. Identify the export names we want mapped to the files
const fileToExportName = {
  'AboutIcon.svg': 'AboutIcon',
  'LogoIcon.svg': 'LogoIcon',
  'LogoText.svg': 'LogoText',
  'PausePlaylistIcon.svg': 'PausePlaylistIcon',
  'PlayPlaylistIcon.svg': 'PlayPlaylistIcon',
  'PlaylistIcon.svg': 'PlaylistIcon',
  'QueueMusic.svg': 'QueueIcon',
  'VibeIcon.svg': 'VibeIcon',
  'arrow_back4.svg': 'BackIcon',
  'download.svg': 'DownloadIcon',
  'more.svg': 'MoreIcon',
  'next.svg': 'NextIcon',
  'pause.svg': 'PauseIcon',
  'pauseOtherIcon.svg': 'OtherPause',
  'play.svg': 'PlayIcon',
  'playOtherIcon.svg': 'OtherPlay',
  'previous.svg': 'PrevIcon',
  'searchIcon.svg': 'SearchIcon',
  'simple-very-rounded-bold--vinyl-discs-icon.svg': 'VinylIcon',
  'textIcon.svg': 'TextIcon',
};

// 3. Move icons and build index.ts
let exportsText = '';
if (fs.existsSync(publicIconsDir)) {
  const files = fs.readdirSync(publicIconsDir);
  for (const file of files) {
    if (file.endsWith('.svg')) {
      fs.renameSync(path.join(publicIconsDir, file), path.join(sharedIconsDir, file));
      
      const exportName = fileToExportName[file] || file.replace('.svg', '').replace(/[^a-zA-Z0-9]/g, '_');
      exportsText += `export { default as ${exportName} } from './${file}';\n`;
    }
  }
}

fs.writeFileSync(path.join(sharedIconsDir, 'index.ts'), exportsText);

// 4. Update all imports in src/
function updateImports(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      updateImports(fullPath);
    } else if (/\.(tsx|ts)$/.test(entry.name) && !fullPath.includes('shared\\ui\\icons')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      // Regex to find `import SomeName from '.../public/icons/some.svg'`
      // Or `// import SomeName from '.../public/icons/some.svg'`
      const importRegex = /^(\s*\/\/\s*)?import\s+([A-Za-z0-9_]+)\s+from\s+['"]([^'"]*public\/icons\/[^'"]*\.svg)['"];?/gm;
      
      content = content.replace(importRegex, (match, comment, importName, p2) => {
        modified = true;
        const prefix = comment || '';
        return `${prefix}import { ${importName} } from '@/shared/ui/icons';`;
      });

      if (modified) {
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

updateImports(path.join(projectRoot, 'src'));

// remove directory if empty
try { fs.rmdirSync(publicIconsDir); } catch(e){}
console.log('Done migrating icons');
