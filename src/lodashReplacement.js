const _ = (target) => {
  let accumulator = target;
  const api = {
    keyBy: (fn) => {
      const result = {};
      accumulator.forEach((value, i) => {
        result[fn(value, i)] = value;
      });
      accumulator = result;
      return api;
    },
    isNil: () => typeof accumulator === 'undefined' || accumulator === null,
    value: () => accumulator,
  };
  return api;
};

export default _;
