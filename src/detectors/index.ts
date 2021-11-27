import JSTSDetector from './jsts';

import { config } from '../config';
import ProjectStack from '../types/ProjectStack.enum';

const { rootPath } = config;

const DETECTORS: Record<string, any> = {
  [ProjectStack.JSTS]: JSTSDetector,
};

const runDetector = async (detector: string): Promise<any> =>
  await DETECTORS[detector](rootPath);

export default runDetector;
