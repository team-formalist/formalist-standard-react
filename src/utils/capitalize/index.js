/**
 * Capitalize a string
 */

export default function capitalize(str, lowercaseRest) {
  if (!str) return;
  const remainingChars = !lowercaseRest
    ? str.slice(1)
    : str.slice(1).toLowerCase();
  return str.charAt(0).toUpperCase() + remainingChars;
}
