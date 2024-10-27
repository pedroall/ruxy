import { Context } from '../dist/ruxy'
import { test, expect } from '@jest/globals'
import path from 'path'

const ENDL = '\n'

const errorScript = path.join(__dirname, 'error.js')

test('It should call echo and return hello world', async () => {
    const text = 'Foo, Bar.'
    const ctx = new Context(['echo', text])
    await ctx.run()
    const stdout = ctx.stdout

    expect(stdout).toBe(text + ENDL)
})

test('It should return an error trying to run gcc with unknown directory', async () => {
    const ctx = new Context(['node', errorScript])
    try {
        await ctx.run()
        throw 'Expected error!'
    } catch (error) {
        if (error instanceof Error) {
            expect(error.message).toBe('foo' + ENDL)
        } else {
            throw error
        }
    }
})
