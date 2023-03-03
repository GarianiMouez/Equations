// Disponibilité jour = facteur * Temps dispo en min/1440 min
// (facteur parametrable accessible a super admin) avec une valeure max de 98%

//  Disponibilité mois = facteur * Temps dispo en min/1440 min*nbr du jour du mois
// (facteur parametrable accessible a super admin) avec une valeure max de 98%

const SecondEquationDay = (factor, avabilityTime) => {
  return (factor * avabilityTime) / 1440;
};

const SecondEquationMonth = (factor, avabilityTime, NbrDayOfMonth) => {
  return SecondEquationDay(factor, avabilityTime) * NbrDayOfMonth;
};

module.exports = {
  SecondEquationMonth,
  SecondEquationDay,
};
