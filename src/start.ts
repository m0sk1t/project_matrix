import runDetector from './detectors';
import renderImage from './drawer';
import runTriggers from './triggers';
import ProjectStack from './types/ProjectStack.enum';

const start = async () => {
  const trigger = runTriggers();
  const data = await runDetector(trigger as ProjectStack);
  await renderImage(undefined, data);
};

export default start;
