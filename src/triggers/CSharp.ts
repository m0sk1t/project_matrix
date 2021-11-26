import { readdirSync } from 'fs';

const TRIGGERS: Record<string, boolean> = {
    'App.config': true,

};

const triggerCSharpProject = (rootPath: string): ProjectStack | null => {
    if (readdirSync(rootPath).some((fileName: string) => TRIGGERS[fileName])) return ProjectStack.CSharp;
    if (readdirSync(rootPath).some((fileName: string) => fileName.endsWith('.cs'))) return ProjectStack.CSharp;
    if (readdirSync(rootPath).some((fileName: string) => fileName.endsWith('.sln'))) return ProjectStack.CSharp;
    if (readdirSync(rootPath).some((fileName: string) => fileName.endsWith('.csproj'))) return ProjectStack.CSharp;
    return null;
}

export default triggerCSharpProject;