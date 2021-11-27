import { join as joinPath } from 'path';
import glob from 'glob';

import { getFileImports, libraryEquivalence } from './helpers/py.helper';
import { ILibrary } from './interface/ILibrary.interface';
import { PY_DETECTOR_FILES } from './types/py.enum';

export type Deps = Record<string, string>;

const PYDetector = (rootPath: string): Promise<ILibrary[]> => {
  return new Promise<any>((resolve, reject) => {
    try {
      const packageJson: any = require(joinPath(rootPath, PY_DETECTOR_FILES.requirements));
      if (!packageJson) return null;
      const srcPath = joinPath(rootPath, 'src');
  
      const library: Deps = {
        ...(packageJson.dependencies ? packageJson.dependencies : {}),
        ...(packageJson.devDependencies ? packageJson.devDependencies : {}),
      };
      
      glob('./**/*.{py,pys}', { cwd: srcPath }, (error, filesDirectory) => {
        try {
          if (error) throw error;
          const libraryObject: ILibrary[] = [];
  
          const arrayImports: string[] = getFileImports(srcPath, filesDirectory);
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

export default PYDetector;