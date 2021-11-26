import config from 'config';
import triggerJSProject from './jsts';

const { rootPath } = config;

const TRIGGERS = [
  triggerJSProject,
];

const runTriggers = () =>
  TRIGGERS.map((trigger) =>  trigger(rootPath)).filter(Boolean).pop();

export default runTriggers;
