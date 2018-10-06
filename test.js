const test = require('tape');
const {range} = require('ramda');

const batchReduce = require('./index');

test('simple reduce', (t) => {
  t.plan(1);

  const items = range(0, 7000);

  const batchReduceSum = batchReduce(items, 100, (sum, batch) => {
    return sum + batch.reduce((sum, n) => sum + n, 0);
  }, 0);

  const sum = items.reduce((sum, n) => sum + n, 0);

  t.equal(batchReduceSum, sum);
});

test('reducing promises', async (t) => {
  t.plan(1);

  const items = range(0, 70).map((n) => Promise.resolve(n));

  const batchReduceSum = await batchReduce(items, 100, (chain, batch) => {
    return chain.then((sum) => batch.reduce((chain, n) => {
      return chain.then((batchSum) => n.then((n) => n + batchSum));
    }, Promise.resolve(0)).then((batchSum) => batchSum + sum));
  }, Promise.resolve(0));

  const sum = await items.reduce((chain, n) => {
    return chain.then((sum) => n.then((n) => sum + n));
  }, Promise.resolve(0));

  console.log(batchReduceSum, sum);

  t.equal(batchReduceSum, sum);
});
