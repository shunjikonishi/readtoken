# readtoken
readtoken allows you to read file token by token.

How to use it is similar to [readline](https://nodejs.org/api/readline.html).

You can get token by `token` event.
And you can detect EOF by `close` event.

Currently supported events are only above two.

## Install

```
npm install readtoken
```

## How to use
The constructor of ReadToken class takes 2 arguments.

- 1st. Readable stream. required.
- 2nd. options object. optional.

```
const fs = require("fs");
const ReadToken = require("readtoken");

const is = fs.createReadStream("test/data/simple1.txt", {
  encoding: 'utf8'
});
const tokens = [];
const readToken = new ReadToken(is);
  maxLength: 5
});
readToken.on("token", (token) => {
  tokens.push(token);
});
readToken.on("close", () => {
  console.log(tokens);
});
```

## options
- sep: string
  - separator characters.
  - default: `" \t\r\n"
- maxLength: number
  - The max length of each tokens. If token in file is longer than this value, it will be sliced by this number.
  - default: 0. 0 means it doesn't have maxLength.
