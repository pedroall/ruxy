import { Context } from './Context'
export { Context } from './Context'

export async function run(args: string[]): Promise<string> {
    const ctx = new Context(args)

    await ctx.run()
    return ctx.stdout as string
}
export default Context
