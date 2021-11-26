import { readFileSync } from 'fs'
import { JSTX_DETECTOR_FILES } from './types/jstx.enum';

const JSTSDetector = (rootPath: string): Array<string> | null => {
    const file: Buffer = readFileSync(rootPath + JSTX_DETECTOR_FILES.packageJson)
    const result = JSON.parse(file.toString())

    if (result !== null && result.devDependencies) {
        const library: Array<string> = Object.keys(result.devDependencies)
        return library
    } else {
        return null
    }
}

export default JSTSDetector;
