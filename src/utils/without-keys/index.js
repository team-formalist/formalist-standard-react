/**
 * Return copy of `obj` without matching `keys`
 */

export default function withoutKeys(obj, without = []) {
  const output = {};
  const objKeys = Object.keys(obj);
  objKeys.forEach(key => {
    const allowed = without.indexOf(key) === -1;
    if (allowed) {
      output[key] = obj[key];
    }
  });
  return output;
}
