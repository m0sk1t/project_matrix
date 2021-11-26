import { config } from 'config';
import JSTSDetector from './jsts';

const { rootPath } = config;

const DETECTORS: Record<string, any> = {
  [ProjectStack.JSTS]: JSTSDetector,
};

const runDetector = (detector: string): any =>
  DETECTORS[detector](rootPath);

export default runDetector;
