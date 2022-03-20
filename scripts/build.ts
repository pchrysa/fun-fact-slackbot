import fs from 'fs';
import path from 'path';

const rootDir = path.resolve(__dirname, '..');

fs.copyFileSync(
  path.resolve(rootDir, './package.json'),
  path.resolve(rootDir, './dist/package.json')
);
fs.copyFileSync(
  path.resolve(rootDir, './tsconfig.json'),
  path.resolve(rootDir, './dist/tsconfig.json')
);
fs.copyFileSync(
  path.resolve(rootDir, './yarn.lock'),
  path.resolve(rootDir, './dist/yarn.lock')
);
