// Calculate age from birthday as a string in format DD/MM/YYYY
export const calculateAge = (birthdayDate?: Date) => {
  if (!birthdayDate) {
    return undefined;
  }
  console.log(birthdayDate);
  const ageDifMs = Date.now() - birthdayDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
