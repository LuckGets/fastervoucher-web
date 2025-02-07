export function prependHttpsToString(str: string) {
  return str.startsWith('http') || str.startsWith('https')
    ? str
    : `https:///${str}`;
}
