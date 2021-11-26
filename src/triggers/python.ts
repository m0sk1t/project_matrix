import { readdirSync } from 'fs';

const TRIGGERS: Record<string, boolean> = {
    '__init__': true,
    'pipenv': true,
    'Pipfile': true,
};

const triggerPythonProject = (rootPath: string): Trigger | null => {
    if (readdirSync(rootPath).some((fileName: string) => TRIGGERS[fileName])) return Trigger.Python;
    return null;
}

export default triggerPythonProject;
