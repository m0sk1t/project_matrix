import triggerCSharpProject from './CSharp';
import triggerJSProject from './jsts';
import triggerPythonProject from './python';

const TRIGGERS = [
  triggerJSProject,
  triggerPythonProject,
  triggerCSharpProject,
];

const runTriggers = (rootPath: string) =>
  TRIGGERS.map((trigger) => trigger(rootPath)).filter(Boolean).pop();

export default runTriggers;
