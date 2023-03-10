////// E= P*T /// P:power// E engery /// T=== Time
//// input :{ Power , Time(munite)}
const math = require("Mathjs");

const MatrixMultiplication = (data) => {
  const attributeToSearch = "puissance";
  const conditionAttribute = "fonctionnement_moteur1";
  const Te = 2; ///// 2 second is time sending data

  ////sampling time
  ///   TAB d 'échantillonnage
  /// column of 0 and 1
  const col = [];
  data.forEach((element) => {
    if (element[conditionAttribute] === "1")
      col.push(element[attributeToSearch]);
  });
  const nCol = col.length;
  const arr = new Array(nCol).fill(Te);
  return math.multiply(col, arr); //// nb hours
};

module.exports = { MatrixMultiplication };
