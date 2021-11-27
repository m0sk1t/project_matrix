import { readdirSync } from 'fs';

import { JSTS_TRIGGERS } from '../config';
import ProjectStack from '../types/ProjectStack.enum';

const triggerJSProject = (rootPath: string): ProjectStack | null => {
  if (readdirSync(rootPath).some((fileName: string) => JSTS_TRIGGERS[fileName])) return ProjectStack.JSTS;
  return null;
}

export default triggerJSProject;
