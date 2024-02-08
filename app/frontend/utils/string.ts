const snakeToCamelCase = (string) =>
  string.replace(/([_][a-z])/g, (match) =>
    match.toUpperCase().replace("_", "")
  );

const camelToSnakeCase = (string) =>
  string.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const transformValueKeys = (value, mutation) => {
  if (!value) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((n) => transformValueKeys(n, mutation));
  }
  if (typeof value === "object") {
    return transformKeys(value, mutation);
  }
  return value;
};

const transformKeys = (object, mutation) =>
  Object.entries(object).reduce(
    (transformedObject, [key, value]) => ({
      ...transformedObject,
      [mutation(key)]: transformValueKeys(value, mutation),
    }),
    {}
  );

export const camelCaseKeys = (object) =>
  transformKeys(object, snakeToCamelCase);
export const snakeCaseKeys = (object) =>
  transformKeys(object, camelToSnakeCase);
