import { Deps } from "..";
import { getImportsLibrary, getRequireLibrary, libraryEquivalence } from "./jstx.helper"

const assert = require('assert');

describe('getImportsLibrary', () => {
    it('getImportsLibrary returned string library where imported in single quotes', () => {
        // Arrange
        const importedLibrary: string = "import React from 'react'"

        const expected: string = 'react'

        // Actual
        const actual = getImportsLibrary(importedLibrary)

        // Assert
        assert.equal(actual, expected)
    })

    it('getImportsLibrary returned string library where imported in double quotes', () => {
        // Arrange
        const importedLibrary: string = 'import React from "react"'

        const expected: string = 'react'

        // Actual
        const actual = getImportsLibrary(importedLibrary)

        // Assert
        assert.equal(actual, expected)
    })
})

describe('getRequireLibrary', () => {
    it('getRequireLibrary returned string where required library in single quotes', () => {
        // Arrange
        const requiredLibrary: string = "require('glob')"

        const expected: string = 'glob'

        // Actual
        const actual = getRequireLibrary(requiredLibrary)
        
        // Assert
        assert.equal(actual, expected)
    })

    it('getRequireLibrary returned string where required library in double quotes', () => {
        // Arrange
        const requiredLibrary: string = 'require("glob")'

        const expected: string = 'glob'

        // Actual
        const actual = getRequireLibrary(requiredLibrary)
        
        // Assert
        assert.equal(actual, expected)
    })
})

describe('libraryEquivalence', () => {
    it('libraryEquivalence returned library and count uses where imported', () => {
        // Arrange
        const library: Deps = {
            "react": "^7.2.0"
        }
        const arrayImports = ['svelte', 'typescript', 'scss', 'react']

        const expected: Record<string, number> = {
            'react': 1
        }

        // Actual
        const actual = libraryEquivalence(library, arrayImports)

        // Assert
        assert.deepEqual(actual, expected)
    })

    it('libraryEquivalence returned empty object library and count uses where not imported', () => {
        // Arrange
        const library: Deps = {
            "react": "^7.2.0"
        }
        const arrayImports = ['svelte']

        const expected: Record<string, number> = {}

        // Actual
        const actual = libraryEquivalence(library, arrayImports)

        // Assert
        assert.deepEqual(actual, expected)
    })
})