import calculateAge from './calculateAge';

export default function filterMembers(memberData, filterString) {
  if (filterString) {
    const age = calculateAge(memberData.birthDate);
    console.log(filterString, Object.values(memberData).join(' ') + age);
    console.log((Object.values(memberData).join(' ') + age).search(filterString));
    return (Object.values(memberData).join(' ') + age).search(filterString) >= 0;
  }
  return false;
}
