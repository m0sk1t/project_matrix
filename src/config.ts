import { tmpdir } from 'os';

export const config = Object.freeze({
  rootPath: process.cwd(),
  tmpPath: tmpdir(),
});

export const JSTS_TRIGGERS: Record<string, boolean> = {
  'package.json': true,
  'package-lock.json': true,
  'tsconfig.json': true,
};
