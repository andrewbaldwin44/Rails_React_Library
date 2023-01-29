export function merge<ObjectA, ObjectB>(objectA: ObjectA, objectB: ObjectB) {
  return {
    ...objectA,
    ...objectB,
  };
}
