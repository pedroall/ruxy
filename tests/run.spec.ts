import { Context } from '../dist/ruxy'
import { test, expect } from '@jest/globals'

const ENDL = '\n'

test('It should call echo and return hello world', async () => {
    const text = 'Foo, Bar.'
    const ctx = new Context(['echo', text])
    await ctx.run()
    const stdout = ctx.stdout

    expect(stdout).toBe(text + ENDL)
})

test('It should return an error trying to run gcc with unknown directory', async () => {
    const text = 'something random'

    const ctx = new Context(['gcc', text])
    function run() {
        return ctx.run()
    }

    expect(run).rejects.toThrowError()
})
