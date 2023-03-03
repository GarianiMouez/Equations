// CO2 épargné: Taux journalier de CO2 épargné[$var] * nombre de jours * nombre d’heures de

const clac = require("./FirstEquationFunction");
const fs = require("fs");
const fn = require("./matrixMultiplication");
const attributeToSearch1 = "fonctionnement_moteur1";
const attributeToSearch2 = "fonctionnement_moteur2";
const filePath = "../18Jan.json";
////// data of json /////
const jsonData = fs.readFileSync(filePath);
const data = JSON.parse(jsonData);

const t1 = fn.MatrixMultiplication(data, attributeToSearch1);
console.log(t1);
const t2 = fn.MatrixMultiplication(data, attributeToSearch2);
console.log(t2);

const co2 = clac.CalculateCO2Saved(10, t1 + t2, 1);
console.log(co2);
