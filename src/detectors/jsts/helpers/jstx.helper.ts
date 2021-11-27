import { join as joinPath } from "path";
import { readFileSync } from "fs";

import { Deps } from "..";

export const getImportsLibrary = (line: string): string =>
  /from ['"](?<lib>[\w\-]+)['"]/.exec(line)?.groups?.lib as string;

export const getRequireLibrary = (line: string): string =>
  /require\(['"](?<lib>[\w\-]+)['"]\)/.exec(line)?.groups?.lib as string;

export const getFileImports = (rootPath: any, filesDirectory: string[]) => {
  const arrayImports: string[] = [];

  filesDirectory.map(fileDirectory => {
    const fileArray = readFileSync(joinPath(rootPath, fileDirectory)).toString().split("\n");
    const filteredImportsArray: string[] = fileArray.filter(line => line.startsWith('import') || line.includes('require(\''));

    filteredImportsArray.map(lineImports => {
      const importLibrary = getImportsLibrary(lineImports);
      const requireLibrary = getRequireLibrary(lineImports);

      if (importLibrary) {
        arrayImports.push(importLibrary);
      }
      
      if (requireLibrary) {
        arrayImports.push(requireLibrary);
      }
    })
  })

  return arrayImports;
}

export const libraryEquivalence = (library: Deps, arrayImports: string[]): Record<string, number> => {
  const libWeights: Record<string, number> = {};

  arrayImports.map(libImport => {
    if (library[libImport]) {
      if (libWeights[libImport]) {
        libWeights[libImport] += 1;
      } else {
        libWeights[libImport] = 1;
      }
    }
  });

  return libWeights;
}
