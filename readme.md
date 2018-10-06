# batch-reduce

`npm install batch-reduce`

Usage:

```js
const items = [/*list of items to be reduced*/];
const batchSize = 100; // default batch-size
const batchOp = (lastVal, batch) => {
  // do something with batch and return val
};

const reducedVal = batchReduce(
 items, batchSize, batchOp, val
);
```
