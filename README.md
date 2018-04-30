# JS ASync

Utility library for handling async/await.

## Usage

### denodeify

Turns a function that accepts a node-style callback into one that returns a `Promise`:

```javascript
import {denodeify} from "@prodo-ai/js-async";

const nodeStyleFunction = (arg1, arg2, callback) => {
  if (arg1 == null) {
    callback(new Error("Must specify `arg1`."));
  }
  callback(null, arg1 + arg2);
}

const asyncFunction = denodeify(nodeStyleFunction);

asyncFunction(1, 2)
  .then(console.log)
  .catch(console.error);
```

### fromCallback

The same as `denodeify`, but without error handling. Probably don't use this.

### keepTrying

Keeps attempting a behaviour until it succeeds:

```javascript
import {keepTrying} from "@prodo-ai/js-async";

const result = await keepTrying({
  behaviour: () => service.getResult()
});
```

You can also pass additional parameters for greater control:

* `until` - a predicate that can be used to determine success. By default, this predicate just checks if the result is non-null.
* `ignoreErrors` - if `false`, gives up trying after an error is thrown.
* `timeout` - a timeout, after which an `Error` is thrown.
* `inbetweenAttempts` - a callback that is executed between each attempt.

### waitUntil

Waits until a predicate passes:

```javascript
import {waitUntil} from "@prodo-ai/js-async";
import {duration, SECOND} from "@prodo-ai/js-timing";

waitUntil({
  condition: async () => (await service.getStatus()) === "OK",
  pauseTime: duration(1, SECOND),
}).then(service.getResult);
```

You can also pass additional parameters for greater control:

* `timeout` - a timeout, after which an `Error` is thrown.


## Information

Owner: Prodo Tech Ltd

Maintainer: [tdawes](https://github.com/tdawes)

License: UNLICENSED (for now)
