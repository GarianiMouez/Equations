// Disponibilité jour = facteur * Temps dispo en min/1440 min
// (facteur parametrable accessible a super admin) avec une valeure max de 98%

//  Disponibilité mois = facteur * Temps dispo en min/1440 min*nbr du jour du mois
// (facteur parametrable accessible a super admin) avec une valeure max de 98%

const AvailabilityOfMotorsPerDay = (factor, avabilityTime) => {
  return (factor * avabilityTime) / 1440;
};

const AvailabilityOfMotorsPerMonth = (factor, avabilityTime, NbrDayOfMonth) => {
  return AvailabilityOfMotorsPerDay(factor, avabilityTime) * NbrDayOfMonth;
};

module.exports = {
  AvailabilityOfMotorsPerMonth,
  AvailabilityOfMotorsPerDay,
};
