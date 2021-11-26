import { config } from 'config';
import triggerCSharpProject from './CSharp';
import triggerJSProject from './jsts';
import triggerPythonProject from './python';

const { rootPath } = config;

const TRIGGERS = [
  triggerJSProject,
  triggerPythonProject,
  triggerCSharpProject,
];

const runTriggers = () =>
  TRIGGERS.map((trigger) =>  trigger(rootPath)).filter(Boolean).pop();

export default runTriggers;
