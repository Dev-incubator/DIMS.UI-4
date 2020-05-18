export default function compareObjects(leftObject, rightObject) {
  if (leftObject === rightObject) {
    return true;
  }
  return (
    JSON.stringify(leftObject, Object.keys(leftObject).sort()) ===
    JSON.stringify(rightObject, Object.keys(rightObject).sort())
  );
}
