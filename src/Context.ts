import {
    spawn,
    SpawnOptionsWithoutStdio,
    ChildProcessWithoutNullStreams,
} from 'node:child_process'

import { Buffer } from 'node:buffer'

type If<R extends boolean, A, B> = R extends true? A : B

type ChildProperty<E extends boolean> = If<E, ChildProcessWithoutNullStreams, ChildProcessWithoutNullStreams | null>
type StdoutProperty<E extends boolean> = If<E, string, string|null>

export class Context<E extends boolean = false> {
    command: string
    args: string[]
    child: ChildProperty<E>
    stdout: StdoutProperty<E>

    constructor(args: string[]) { 
        if(!args.length)
            throw new RangeError('Missing command for context')
        this.command = args.shift() as string
        this.args = args
        this.child = null as ChildProperty<E>
        this.stdout = null as StdoutProperty<E>
    }

    run(options?: SpawnOptionsWithoutStdio): Promise<Context<true>> {
        const child = this.child = spawn(this.command, this.args, options)
        const stdout = child.stdout
        const stderr = child.stderr

        const data: Buffer[] = []
        const error: Buffer[] = []

        return new Promise((resolve, reject) => {
            stderr.on('data', (err: Buffer) => error.push(err))
            stderr.on('error', err => reject(err))
            stderr.on('end', () => {
                if(error.length)
                    reject(new Error(
                        error
                            .map(chunk => chunk.toString())
                            .join('')
                    ))
            })
            stdout.on('error', (err) => reject(err))

            stdout.on('data', (chunk: Buffer) => data.push(chunk))
            stdout.on('end', () => {
                this.stdout = data
                    .map(chunk => chunk.toString())
                    .join('')

                resolve(this as Context<true>)
            })
        })
    }
}
