import { readdirSync } from 'fs';

const TRIGGERS: Record<string, boolean> = {
    'package.json': true,
    'package-lock.json': true,
    'tsconfig.json': true,
};

const triggerPythonProject = (rootPath: string): Trigger | null => {
    if (readdirSync(rootPath).some((fileName: string) => TRIGGERS[fileName])) return Trigger.Python;
    return null;
}

export default triggerPythonProject;
