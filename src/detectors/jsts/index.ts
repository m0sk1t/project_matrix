import { readFileSync } from 'fs'
import { getFileImports, libraryEquivalence } from './helpers/jstx.helper'
import { ILibrary } from './interface/jstx.interface'
import { JSTX_DETECTOR_FILES } from './types/jstx.enum'

const glob = require('glob')

const JSTSDetector = (rootPath: string): Array<ILibrary> | null => {
    try {
        const rootDirectory = require(rootPath)
        const file: Buffer = readFileSync(rootDirectory.join(JSTX_DETECTOR_FILES.packageJson))
        const result = JSON.parse(file.toString())

        if (result !== null) {
            const library: Array<string> = []
            const libraryObject: Array<ILibrary> = []

            if (result.devDependencies) {
                Object.keys(result.devDependencies).forEach(data => library.push(data))
            }
            if (result.dependencies) {
                Object.keys(result.dependencies).forEach(data => library.push(data))
            }

            glob('*/**/*.{ts,js,jsx,tsx}', { cwd: rootDirectory }, (error: Error, filesDirectory: Array<string>) => {
                try {
                    if (error) throw error

                    const arrayImports: Array<string> = getFileImports(rootDirectory, filesDirectory)
                    const libraryResult = libraryEquivalence(library, arrayImports, libraryObject)

                    return libraryResult
                } catch {
                    return null
                }
            })

            return libraryObject
        } else {
            return null
        }
    } catch {
        return null
    }
}

export default JSTSDetector;
