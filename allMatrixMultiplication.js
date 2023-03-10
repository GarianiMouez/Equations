const math = require("Mathjs");
////first
const MatrixMultiplicationEq1 = (data, attributeToSearch) => {
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

//second
const MatrixMultiplicationEq2 = (data) => {
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

// third
const MatrixMultiplicationEq3 = (data) => {
  const attributeToSearch1 = "defaut_moteur2";
  const attributeToSearch2 = "defaut_moteur1";
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

/// fourth
const MatrixMultiplicationEq4 = (data, attributeToSearch) => {
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

///// fifth
const MatrixMultiplicationEq5 = (data) => {
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

module.exports = {
  MatrixMultiplicationEq1,
  MatrixMultiplicationEq2,
  MatrixMultiplicationEq3,
  MatrixMultiplicationEq4,
  MatrixMultiplicationEq5,
};
