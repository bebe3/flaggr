import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sourceDir = path.join(__dirname, '../node_modules/country-flag-icons/3x2');
const targetDir = path.join(__dirname, '../public/flags/3x2');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const files = fs.readdirSync(sourceDir).filter((f) => f.endsWith('.svg'));

files.forEach((file) => {
  fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
});

console.log(`Copied ${files.length} flag SVGs to public/flags/3x2`);
