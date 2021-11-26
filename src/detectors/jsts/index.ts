import { readFileSync } from 'fs'
import { getImportsLibrary } from './helpers/jstx.helper'
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

            glob('*/**/*.{ts,js,jsx,tsx}', { cwd: rootDirectory }, (error: Error, filesDirectory: Array<String>) => {
                try {
                    if (error) throw error

                    const ArrayImportsFiles: Array<string> = []
                    filesDirectory.forEach(fileDirectory => {
                        const fileArray = readFileSync(rootDirectory.join(fileDirectory)).toString().split("\n")
                        const filteredImportsArray: string[] = fileArray.filter(line => line.includes('import') === true)
                        filteredImportsArray.forEach(lineImports => {
                            const importLibrary = getImportsLibrary(lineImports)
                            if (importLibrary !== null) {
                                ArrayImportsFiles.push(importLibrary)
                            }
                        })
                    })

                    library.forEach((lib) => {
                        ArrayImportsFiles.forEach(importFile => {
                            if (lib === importFile) {
                                const item: ILibrary | undefined = libraryObject.find(res => res.label === lib)
                                if (item !== null) {
                                    item!.count += 1
                                } else {
                                    libraryObject.push({
                                        label: lib,
                                        count: 1
                                    })
                                } 
                            }
                        })
                    })
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
