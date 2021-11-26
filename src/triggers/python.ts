import { readdirSync } from 'fs';

const TRIGGERS: Record<string, boolean> = {
    'requirements.txt': true,
};

const triggerPythonProject = (rootPath: string): ProjectStack | null => {
    if (readdirSync(rootPath).some((fileName: string) => TRIGGERS[fileName])) return ProjectStack.Python;
    if (readdirSync(rootPath).some((fileName: string) => fileName.endsWith('.py'))) return ProjectStack.Python;
    return null;
}

export default triggerPythonProject;
