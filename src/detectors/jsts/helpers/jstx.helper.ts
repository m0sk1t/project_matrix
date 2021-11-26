import { readFileSync } from "fs"
import { ILibrary } from "../interface/jstx.interface"

export const getImportsLibrary = (line: string): string => {
    return line.substring(line.indexOf('from '), line.length + 1)
        .replace('from ', '').replace(/["']+/g, '')
}

export const getFileImports = (rootDirectory: any, filesDirectory: Array<string>) => {
    const arrayImports: Array<string> = []

    filesDirectory.map(fileDirectory => {
        const fileArray = readFileSync(rootDirectory.join(fileDirectory)).toString().split("\n")
        const filteredImportsArray: string[] = fileArray.filter(line => line.includes('import') === true)
        filteredImportsArray.map(lineImports => {
            const importLibrary = getImportsLibrary(lineImports)
            if (importLibrary !== null) {
                arrayImports.push(importLibrary)
            }
        })
    })

    return arrayImports
}

export const libraryEquivalence = (library: Array<string>, arrayImports: Array<string>, libraryObject: Array<ILibrary>) => {
    library.map((lib) => {
        arrayImports.map(importFile => {
            if (lib === importFile) {
                const item: ILibrary | undefined = libraryObject.find(res => res.label === lib)
                if (item !== null) {
                    item!.r += 1
                } else {
                    libraryObject.push({
                        label: lib,
                        r: 1
                    })
                }
            }
        })
    })
}
