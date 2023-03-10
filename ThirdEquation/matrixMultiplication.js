const math = require("Mathjs");

const MatrixMultiplication = (data) => {
  const attributeToSearch1 = "defaut moteur2";
  const attributeToSearch2 = "defaut moteur1";
  const Te = 2 / 60; ///// 2 second is time sending data
  ///data length
  const n = data.length;
  ////sampling time
  const arr = new Array(n).fill(Te); ///   TAB d 'échantillonnage
  /// column of 0 and 1
  const col1 = []; //// default motor 1
  const col2 = []; //// deafault motor 2
  data.forEach((element) => {
    /// for this col we need the complementary of 0  ===> we reverse the 0 by 1 and the 1 by the 0 with the following method |val -1 | / val  ∈   {1,0}
    const val1 = math.abs(parseInt(element[attributeToSearch1]) - 1);
    const val2 = math.abs(parseInt(element[attributeToSearch2]) - 1);

    col1.push(val1);
    col2.push(val2);
  });

  const TdefM1 = math.multiply(col1, arr);
  const TdefM2 = math.multiply(col2, arr);

  return TdefM1 + TdefM2; /// nb hours
};

module.exports = { MatrixMultiplication };
