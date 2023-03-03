// CO2 épargné: Taux journalier de CO2 épargné[$var] * nombre de jours * nombre d’heures de

const CalculateCO2Saved = (CO2saved, nbHoursMotors, nbOfDay) => {
  return CO2saved * nbHoursMotors * nbOfDay;
};

module.exports = { CalculateCO2Saved };
