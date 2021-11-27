import { join as joinPath } from 'path';
import glob from 'glob';

import { getFileImports, libraryEquivalence } from './helpers/jstx.helper';
import { ILibrary } from './interface/ILibrary.interface';
import { JSTX_DETECTOR_FILES } from './types/jstx.enum';

export type Deps = Record<string, string>;

const JSTSDetector = (rootPath: string): Promise<ILibrary[]> => {
  return new Promise<any>((resolve, reject) => {
    try {
      const packageJson: any = require(joinPath(rootPath, JSTX_DETECTOR_FILES.packageJson));
      if (!packageJson) return null;
      const srcPath = joinPath(rootPath, 'src');
  
      const library: Deps = {
        ...(packageJson.dependencies ? packageJson.dependencies : {}),
        ...(packageJson.devDependencies ? packageJson.devDependencies : {}),
      };
      
      glob('./**/*.{ts,js,jsx,tsx}', { cwd: srcPath }, (error, filesDirectory) => {
        try {
          if (error) throw error;
          const libraryObject: ILibrary[] = [];
  
          const arrayImports: string[] = getFileImports(srcPath, filesDirectory);
          const missingImports = Array.from(new Set(arrayImports));
          missingImports.map((k) => {
            library[k] = 'true';
          });
          const libraryResult = libraryEquivalence(library, arrayImports);
  
          libraryObject.push(...Object.keys(libraryResult).map((label) => ({
            label,
            r: libraryResult[label],
          })));

          resolve(libraryObject);
        } catch(e) {
          reject(e);
        }
      });
    } catch(e) {
      reject(e);
    }
  });
}

export default JSTSDetector;
