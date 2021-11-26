import config from 'config';
import triggerJSProject from './jsts';
import triggerPythonProject from './python';

const { rootPath } = config;

const TRIGGERS = [
  triggerJSProject,
  triggerPythonProject,
];

const runTriggers = () =>
  TRIGGERS.map((trigger) =>  trigger(rootPath)).filter(Boolean).pop();

export default runTriggers;
