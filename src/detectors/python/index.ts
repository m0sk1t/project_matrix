import { readFileSync } from 'fs'
import { getFileImports, libraryEquivalence } from './helpers/py.helper'
import { ILibrary } from './interface/py.interface'
import { PY_DETECTOR_FILES } from './types/py.unum'

const glob = require('glob')

const PYDetector = (rootPath: string): Array<ILibrary> | null => {
    try {
        const rootDirectory = require(rootPath)
        const file: Buffer = readFileSync(rootDirectory.join(PY_DETECTOR_FILES.requirements))
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

            glob('*/**/*.{py,pys,ipynb}', { cwd: rootDirectory }, (error: Error, filesDirectory: Array<string>) => {
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

export default PYDetector;
