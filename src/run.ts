import { Context } from './Context'
import { spawn } from 'child_process'

export const run = (args: string[])=> {
	const cmd = args.shift()
	const argv = args
	
	const stdout: string[] = []

	return new Promise<Context>((resolve) => {
		if(!cmd) throw 'Command must be specified'
		
		const ps = spawn(cmd, argv)			
		
		ps.stdout.on('data', (chunk: Buffer) => {
			stdout.push(chunk.toString())
		})
		ps.stderr.on('data', (error: Buffer) => {
			throw new Error(error.toString())
		})

		ps.on('close', (code) => {
			code = code ?? 1
			const ctx = new Context(code, stdout.join(''))
			resolve(ctx)
		})
		
	})
}
