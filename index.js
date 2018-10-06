function batchReduce(items=[], batchSize=100, batchOp=(() => {}), val=null) {
  const reducer = (i, val) => {
    const batch = items.slice(i, i+batchSize);
    const nextVal = batchOp(val, batch);

    if (batch.length < batchSize) {
      return nextVal;
    } else {
      return reducer(i+batchSize, nextVal);
    }
  };

  return reducer(0, val);
}

module.exports = batchReduce;
