const calc = require("./SecondEquationFunction");
const fs = require("fs");
const fn = require("./matrixMultiplication");

const filePath = "../18Jan.json";

////// data of json /////
const jsonData = fs.readFileSync(filePath);
const data = JSON.parse(jsonData);

const time = fn.MatrixMultiplication(data);
const x = calc.SecondEquationDay(0.98, time);
const y = calc.SecondEquationMonth(0.98, x, 31);
console.log(
  `la disponibilté de systeme ::: \n par jour :::  ${x} \n par mois ::: ${y}`
);
