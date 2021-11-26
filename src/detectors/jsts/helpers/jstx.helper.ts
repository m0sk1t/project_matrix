export const getImportsLibrary = (line: string): string => {
    return line.substring(line.indexOf('from '), line.length + 1)
        .replace('from ', '').replace(/["']+/g, '')
}