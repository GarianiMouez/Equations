const math = require("Mathjs");

const MatrixMultiplication = (data, attributeToSearch) => {
  const Te = 2 / 60; ///// 2 second is time sending data
  ///data length
  const n = data.length;
  ////sampling time
  const arr = new Array(n).fill(Te); ///   TAB d 'échantillonnage
  /// column of 0 and 1
  const col = [];
  data.forEach((element) => {
    col.push(parseInt(element[attributeToSearch]));
  });

  return math.multiply(col, arr) / 60; //// nb hours
};

module.exports = { MatrixMultiplication };
