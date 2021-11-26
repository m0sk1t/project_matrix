import runDetector from "detectors";
import renderImage from "drawer";
import runTriggers from "triggers";

const start = async () => {
  const trigger = runTriggers();
  const data = runDetector(trigger as ProjectStack);
  await renderImage(undefined, data);
};

export default start;
