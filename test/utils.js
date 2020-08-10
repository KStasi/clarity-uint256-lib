exports.hexToUint256 = (str) => {
  var re = /[0-9A-Fa-f]{64}/g;
  str = str.replace(/$0x/, "");
  str = str.padStart(64, "0");
  if (!re.test(str)) throw "Invalid hex string";
  let parts = [];
  for (let i = 0; i < 64; i += 16) {
    parts.push(BigInt("0x" + str.slice(i, i + 16)));
  }
  return `(tuple (i0 u${parts[0]}) (i1 u${parts[1]}) (i2 u${parts[2]}) (i3 u${parts[3]}))`;
};
