const getValue = (object: any, propName: string) => {
  const arr = propName.split('.');
  let result = object;

  while (arr.length && result) {
    result = result[arr.shift()];
  }

  return result;
};

export { getValue };
