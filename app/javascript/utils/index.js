export function isContainingData(object) {
  return Object.keys(object).length > 0;
}

export function snakeCase(string) {
  return string.toLowerCase().replace(' ', '_');
}
