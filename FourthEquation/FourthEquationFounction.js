////// E= P*T /// P:power// E engery /// T=== Time
//// input :{ Power , Time(munite)}
const math = require("Mathjs");

const MatrixMultiplication = (data) => {
  const attributeToSearch = "puissance";
  const Te = 2; ///// 2 second is time sending data
  ///data length0
  const n = data.length;
  ////sampling time
  const arr = new Array(n).fill(Te); ///   TAB d 'échantillonnage
  /// column of 0 and 1
  const col = [];
  data.forEach((element) => {
    col.push(element[attributeToSearch]);
  });

  return math.multiply(col, arr); //// nb hours
};

module.exports = { MatrixMultiplication };
