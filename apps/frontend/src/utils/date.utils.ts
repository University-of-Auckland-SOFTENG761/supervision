// Calculate age from birthday as a string in format DD/MM/YYYY
export const calculateAge = (birthdayString?: string) => {
  if (!birthdayString) {
    return undefined;
  }
  const [day, month, year] = birthdayString.split('/');
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  const ageDifMs = Date.now() - date.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};
