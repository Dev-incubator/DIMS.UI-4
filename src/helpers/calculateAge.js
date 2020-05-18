export default function calculateAge(birthDate) {
  let now = new Date();
  if (now.getMonth() === birthDate.getMonth()) {
    if (now.getDate() > birthDate.getDate()) {
      return new Date().getFullYear() - birthDate.getFullYear() - 1;
    }
  }
  if (now.getMonth() < birthDate.getMonth()) {
    return new Date().getFullYear() - birthDate.getFullYear() - 1;
  }
  return new Date().getFullYear() - birthDate.getFullYear();
}
