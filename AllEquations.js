///// tous les equations
/// first//
const CalculateCO2Saved = (CO2saved, nbHoursMotors, nbOfDay) => {
  return CO2saved * nbHoursMotors * nbOfDay;
};

//// second
const SecondEquationDay = (factor, avabilityTime) => {
  return (factor * avabilityTime) / 1440;
};

const SecondEquationMonth = (factor, avabilityTime, NbrDayOfMonth) => {
  return SecondEquationDay(factor, avabilityTime) * NbrDayOfMonth;
};

//// third
const AvailabilityOfMotorsPerDay = (factor, avabilityTime) => {
  return (factor * avabilityTime) / 1440;
};

const AvailabilityOfMotorsPerMonth = (factor, avabilityTime, NbrDayOfMonth) => {
  return AvailabilityOfMotorsPerDay(factor, avabilityTime) * NbrDayOfMonth;
};

///// fourth/// fifth ce sont des produit matricel == calcule direct

module.exports = {
  CalculateCO2Saved,
  SecondEquationDay,
  SecondEquationMonth,
  AvailabilityOfMotorsPerDay,
  AvailabilityOfMotorsPerMonth,
};
