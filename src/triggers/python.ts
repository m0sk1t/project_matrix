import { readdirSync } from 'fs';

const TRIGGERS: Record<string, boolean> = {
    'requirements.txt': true,
};

const triggerPythonProject = (rootPath: string): Trigger | null => {
    if (readdirSync(rootPath).some((fileName: string) => TRIGGERS[fileName])) return Trigger.Python;
    if (readdirSync(rootPath).some((fileName: string) => fileName.endsWith('.py'))) return Trigger.Python;
    return null;
}

export default triggerPythonProject;
