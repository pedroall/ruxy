import {run} from '../src/run'
import { test, expect } from '@jest/globals'

const ENDL = '\n'

test('It should call echo and return hello world', async() => {
	const ctx = await run(['echo', 'hello world'])

	expect(ctx.stdout).toBe('hello world' + ENDL)
})
