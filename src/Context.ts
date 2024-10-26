import {
    spawn,
    SpawnOptionsWithoutStdio,
    ChildProcessWithoutNullStreams,
} from 'node:child_process'

export class Context {
    command: string
    args: string[]
    child?: ChildProcessWithoutNullStreams

    constructor(command: string, ...args: string[]) {
        this.command = command
        this.args = args
    }
    stdout(): Promise<string> {
        return new Promise((resolve, reject) => {
            const stdout = this.stdoutStream
            const stderr = this.stderrStream

            const errors: Uint8Array[] = []
            const data: Uint8Array[] = []

            stderr.on('data', (err) => errors.push(err))
            stderr.once('error', (err) => reject(err))
            stdout.once('error', (err) => reject(err))

            stdout.on('data', (chunk) => data.push(chunk))

            stderr.on('end', () => {
                if (errors.length) {
                    const buf = Buffer.concat(errors)
                    reject(new Error(buf.toString()))
                }
            })
            stdout.on('end', () => {
                const text = data.map((chunk) => chunk.toString()).join('')

                resolve(text)
            })
        })
    }

    get stdoutStream() {
        const child = this.getChild()
        return child.stdout
    }

    get stderrStream() {
        const child = this.getChild()
        return child.stderr
    }

    getChild() {
        if (!this.child) throw Error('Context child has not been spawned.')
        return this.child
    }
    run(options?: SpawnOptionsWithoutStdio) {
        this.child = spawn(this.command, this.args, options)
        return this
    }
}
