const math = require("Mathjs");

const MatrixMultiplication = (data) => {
  const attributeToSearch1 = "fonctionnement_moteur1";
  const attributeToSearch2 = "fonctionnement_moteur2";
  const Te = 2 / 60; ///// 2 second is time sending data
  ///data length
  const n = data.length;
  ////sampling time
  const arr = new Array(n).fill(Te); ///   TAB d 'échantillonnage
  /// column of 0 and 1
  const col = [];
  data.forEach((element) => {
    /// for this col we need the complementary of 0  ===> we reverse the 0 by 1 and the 1 by the 0 with the following method |val -1 | / val  ∈   {1,0}
    const val1 = parseInt(element[attributeToSearch1]);
    const val2 = parseInt(element[attributeToSearch2]);

    col.push(val1 || val2);
  });

  return math.multiply(col, arr); //// nb hours
};

module.exports = { MatrixMultiplication };
