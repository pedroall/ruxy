# Example
### Php example file:
```php
<?php
	echo "Hello, World!";
?>
```

### CommonJS Example:
```js
cost Ruxy = require('ruxy');

async function main() {
	const ctx = await Ruxy.run(['php', 'myFile.php']);
	console.log(ctx.stdout); // "Hello, World!"
}
main();
```
### Typescript/Module
```ts
import { run } from 'ruxy'
const ctx = await run(['php', 'myFile.php'])
console.log(ctx.stdout) // "Hello, World!";
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
