[![npm][npm]][npm-url]
[![travis][travis]][travis-url]

# node-lyft-client

A Lyft client for calling Lyft's public API endpoints. See [their API
reference](https://developer.lyft.com/reference) for more information.

## Installation

```sh
npm install lyft-client
```

## Usage

Sign up for a lyft developer account
[here](https://www.lyft.com/developers). You will get a `client id` and
a `client secret`. You will need these to initialize a `Lyft` client
object.

```typescript
// commonjs
const { Lyft } = require('lyft-client');

// es2015
import Lyft from 'lyft-client';

const CLIENT_ID = // your client id
const CLIENT_SECRET = // your client secret

const lyft = new Lyft(CLIENT_ID, CLIENT_SECRET);

lyft.getRideTypes({
  latitude: /* latitude coordinate */,
  longitude: /* longitude coordinate */,
}).then((response) => {
  // do something with the response
});

```

I recommend using [dotenv](https://www.npmjs.com/package/dotenv) to load
your private Lyft tokens.

```sh
npm install dotenv
```

Create a file named `.env` in the root of your project:

```
LYFT_CLIENT_ID=MY_CLIENT_ID
LYFT_CLIENT_SECRET=MY_CLIENT_SECRET
```

Then use `dotenv` to load your `.env` file into your environment:

```js
require('dotenv').config();
const { Lyft } = require('lyft-client');

const lyft = new Lyft(
  process.env.LYFT_CLIENT_ID,
  process.env.LYFT_CLIENT_SECRET,
);
```

See
[bschlenk.github.io/node-lyft-client](http://bschlenk.github.io/node-lyft-client/docs/classes/_lyft_.lyft.html)
for more documentation.

## License

[MIT](LICENSE.md)

## Credits

Forked from [djchie/lyft-node](https://github.com/djchie/lyft-node).

[npm]: https://img.shields.io/npm/v/lyft-client.svg?logo=npm
[npm-url]: https://npmjs.com/package/lyft-client
[travis]: https://img.shields.io/travis/bschlenk/node-lyft-client/master.svg?logo=travis
[travis-url]: https://travis-ci.org/bschlenk/node-lyft-client
