const calc = require("./FifthEquationFunction");
const fs = require("fs");
const math = require("mathjs");

const filePath = "../18Jan.json";
////// data of json /////
const jsonData = fs.readFileSync(filePath);
const data = JSON.parse(jsonData);
const EPM = calc.MatrixMultiplication(data); //// EPM :: Energie Produite pa le Moteur

console.log(
  "l'énergie produite par le moteur ::::" +
    math.format(EPM, { notation: "exponential" })
);
