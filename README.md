# Example
### Sh example file:
```sh
echo "Hello, World!";
```

### Example code

```ts
import { Context } from 'ruxy'

const ctx = new Context('sh', './exampleScript.sh')
    .run()

const response = await ctx.stdout()
console.log(response) // Hello, World!
```

### Testing
```sh
yarn test
```

### Installing
```sh
yarn install ruxy
# or
npm install ruxy
```

Thanks for using this package :)!
