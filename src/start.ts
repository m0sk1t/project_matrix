import { execSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';

import { config } from './config';
import runDetector from './detectors';
import renderImage from './drawer';
import runTriggers from './triggers';
import ProjectStack from './types/ProjectStack.enum';

const { tmpPath } = config;

const start = async (ssh_url: string) => {
  if (!ssh_url) return;

  const repoName = ssh_url.split('/')?.slice(-1)?.[0]?.split('.')[0];
  const repoPath = path.join(tmpPath, repoName);

  if (!existsSync(repoPath)) {
    execSync(`git clone ${ssh_url}`, { cwd: tmpPath });
  }

  const trigger = runTriggers(repoPath);
  const data = await runDetector(trigger as ProjectStack);
  await renderImage(repoName, undefined, data);
};

export default start;
