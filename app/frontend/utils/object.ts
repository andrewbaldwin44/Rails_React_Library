export function merge<ObjectA, ObjectB>(objectA: ObjectA, objectB: ObjectB) {
  if (Array.isArray(objectA) && Array.isArray(objectB)) {
    return [...objectA, ...objectB];
  }

  return {
    ...objectA,
    ...objectB,
  };
}
