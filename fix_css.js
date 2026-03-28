const fs = require('fs');
const path = require('path');

const srcDir = 'c:/mondotim/projects/mingle/src/features/player/ui';

const playerCss = fs.readFileSync(path.join(srcDir, 'Player.module.css'), 'utf8');

// Extract the pauseIcon and playIcon blocks block
const match = playerCss.match(/\.pauseIcon\s*\{[^}]+\}\s*\.playIcon\s*\{[^}]+\}/g);

if (match && match[0]) {
  const cssBlocks = match[0];
  
  // Inject into PlayerControls.module.css
  const pcPath = path.join(srcDir, 'PlayerControls', 'PlayerControls.module.css');
  let pcCss = fs.readFileSync(pcPath, 'utf8');
  pcCss = pcCss.replace(/\.pauseIcon\s*\{[^}]+\}\s*\.playIcon\s*\{[^}]+\}/g, cssBlocks);
  fs.writeFileSync(pcPath, pcCss);

  // Inject into MobilePlayer.module.css
  const mpPath = path.join(srcDir, 'MobilePlayer', 'MobilePlayer.module.css');
  let mpCss = fs.readFileSync(mpPath, 'utf8');
  mpCss = mpCss.replace(/\.pauseIcon\s*\{[^}]+\}\s*\.playIcon\s*\{[^}]+\}/g, cssBlocks);
  fs.writeFileSync(mpPath, mpCss);
  
  // Inject into ExpandedControlsDrawer.module.css
  const ecPath = path.join(srcDir, 'ExpandedControlsDrawer', 'ExpandedControlsDrawer.module.css');
  let ecCss = fs.readFileSync(ecPath, 'utf8');
  if (!ecCss.includes('.pauseIcon')) {
    ecCss += '\n\n' + cssBlocks + '\n';
  } else {
    ecCss = ecCss.replace(/\.pauseIcon\s*\{[^}]+\}\s*\.playIcon\s*\{[^}]+\}/g, cssBlocks);
  }
  fs.writeFileSync(ecPath, ecCss);

  console.log('CSS updated successfully');
} else {
  console.log('Could not find SVG blocks in Player.module.css');
}
