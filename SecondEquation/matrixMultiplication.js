const math = require("Mathjs");

const MatrixMultiplication = (data) => {
  const att = "systeme_arret_urgnce";
  ///data length
  Te = 2 / 60;
  const n = data.length;
  ////sampling time
  const arr = new Array(n).fill(Te); ///   TAB d 'échantillonnage
  /// column of 0 and 1
  const col = [];
  data.forEach((element) => {
    /// convert ("0","1") to ("0,1")
    /// for this col we need the complementary of 0  ===> we reverse the 0 by 1 and the 1 by the 0 with the following method |val -1 | / val  ∈   {1,0}
    col.push(math.abs(parseInt(element[att]) - 1));
  });

  return math.multiply(col, arr);
};

module.exports = { MatrixMultiplication };
