import { readdirSync } from 'fs';
import ProjectStack from '../types/ProjectStack.enum';

const TRIGGERS: Record<string, boolean> = {
    'App.config': true,

};

const triggerCSharpProject = (rootPath: string): ProjectStack | null => {
    for (const fileName of readdirSync(rootPath)) {
        if (TRIGGERS[fileName]) return ProjectStack.CSharp;
        if (fileName.endsWith('.cs')) return ProjectStack.CSharp;
        if (fileName.endsWith('.sln')) return ProjectStack.CSharp;
        if (fileName.endsWith('.csproj')) return ProjectStack.CSharp;
    }
    return null;
}

export default triggerCSharpProject;