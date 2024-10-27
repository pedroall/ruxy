# Example
### Sh example file:
```sh
echo Hello, World!
```

### Example code

```ts
import { Context } from 'ruxy'

const ctx = new Context(['sh', './exampleScript.sh'])

ctx.run()
    .then((ctx) => {
        console.log(ctx.stdout) // Hello, World!
    })
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
