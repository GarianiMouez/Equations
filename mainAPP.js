const calc = require("./AllEquations");
const fs = require("fs");
const fn = require("./allMatrixMultiplication");

const Taux_journalier_de_CO2_epargne = 10;
const Facteur_disponibilite_installation = 0.98;
const Facteur_disponibilite_motors = 0.98;

var methania = {
  CO2_epargne: 0,
  Disponibilite_d_installation_jour: 0,
  Disponibilite_d_installation_mois: 0,
  Disponibilite_des_moteur_jour: 0,
  Disponibilite_des_moteur_mois: 0,
  Energie_produite_par_moteur1: 0,
  Energie_produite_par_moteur2: 0,
  Energie_produite_totale: 0,
};

const filePath = "./methania_data.json";

////// data of json /////
const jsonData = fs.readFileSync(filePath);
const data = JSON.parse(jsonData);

///// First Equation ////////
const tE11 = fn.MatrixMultiplicationEq1(data, "fonctionnement_moteur1");
const tE21 = fn.MatrixMultiplicationEq1(data, "fonctionnement_moteur2");

methania.CO2_epargne = calc.CalculateCO2Saved(
  Taux_journalier_de_CO2_epargne,
  tE11 + tE21,
  2
);

//// Second equation ////
const tE2 = fn.MatrixMultiplicationEq2(data);

methania.Disponibilite_d_installation_jour = calc.AvailabilityOfMotorsPerDay(
  Facteur_disponibilite_installation,
  tE2
);
methania.Disponibilite_d_installation_mois = calc.AvailabilityOfMotorsPerMonth(
  Facteur_disponibilite_installation,
  tE2,
  31
);
////// third equation
const tE3 = fn.MatrixMultiplicationEq3(data);
methania.Disponibilite_des_moteur_jour = calc.AvailabilityOfMotorsPerDay(
  Facteur_disponibilite_motors,
  tE3
);
methania.Disponibilite_des_moteur_mois = calc.AvailabilityOfMotorsPerMonth(
  Facteur_disponibilite_motors,
  tE3,
  31
);

///// Fouth Equation //
methania.Energie_produite_par_moteur1 = fn.MatrixMultiplicationEq4(
  data,
  "puissance_mouteur1"
);
methania.Energie_produite_par_moteur2 = fn.MatrixMultiplicationEq4(
  data,
  "puissance_mouteur2"
);
//// fifth Equation  ///
methania.Energie_produite_totale =
  methania.Energie_produite_par_moteur1 + methania.Energie_produite_par_moteur2;

console.log(methania);
