export const config = Object.freeze({
  rootPath: process.cwd(),
});

export const JSTS_TRIGGERS: Record<string, boolean> = {
  'package.json': true,
  'package-lock.json': true,
  'tsconfig.json': true,
};
