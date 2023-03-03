// CO2 épargné: Taux journalier de CO2 épargné[$var] * nombre de jours * nombre d’heures de

const calc = require("./ThirdEquationFunction");
const fs = require("fs");
const fn = require("./matrixMultiplication");

const filePath = "../18Jan.json";
////// data of json /////
const jsonData = fs.readFileSync(filePath);
const data = JSON.parse(jsonData);

const t = fn.MatrixMultiplication(data);

const AvailabilityOfMotors = calc.AvailabilityOfMotorsPerDay(0.98, t);
const AvailabilityOfMotorsPerMonth = calc.AvailabilityOfMotorsPerMonth(
  0.98,
  t,
  31
);

console.log(
  `Availability  Motors Per ::: \n Day :: ${AvailabilityOfMotors} \n Month ::: ${AvailabilityOfMotorsPerMonth}`
);
