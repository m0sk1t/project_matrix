import JSTSDetector from './jsts';

const DETECTORS: Record<string, any> = {
  [ProjectStack.JSTS]: JSTSDetector,
};

const runDetector = (detector: string): any =>
  DETECTORS[detector]();

export default runDetector;
