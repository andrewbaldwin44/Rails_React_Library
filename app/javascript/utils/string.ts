type MutationFunction = (string: string) => string;

function transformValueKeys<ObjectInterface>(
  object: ObjectInterface,
  value: (typeof object)[keyof typeof object],
  mutation: MutationFunction,
): (typeof object)[keyof typeof object] | string[] | string {
  if (!value) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((n): string => transformValueKeys(object, n, mutation) as string);
  }
  if (typeof value === 'object') {
    return transformKeys(value, mutation);
  }
  return value;
}

const transformKeys = <ObjectInterface>(
  object: ObjectInterface,
  mutation: MutationFunction,
): ObjectInterface =>
  Object.entries(object).reduce(
    (transformedObject, [key, value]) => ({
      ...transformedObject,
      [mutation(key)]: transformValueKeys<ObjectInterface>(object, value, mutation),
    }),
    {},
  ) as ObjectInterface;

export const snakeToCamelCase = (string: string) =>
  string.replace(/([_][a-z])/g, match => match.toUpperCase().replace('_', ''));

export const camelToSnakeCase = (string: string) =>
  string.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export const camelCaseKeys = <ObjectInterface>(object: ObjectInterface) =>
  transformKeys<ObjectInterface>(object, snakeToCamelCase);
export const snakeCaseKeys = <ObjectInterface>(object: ObjectInterface) =>
  transformKeys<ObjectInterface>(object, camelToSnakeCase);
