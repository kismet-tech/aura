export const deepEqual = <T extends object>(
  object1?: T,
  object2?: T
): boolean => {
  if (object1 === undefined || object2 === undefined) {
    if (object1 === undefined && object2 === undefined) {
      return true;
    }
    return false;
  }

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key as keyof T];
    const val2 = object2[key as keyof T];

    const areObjects = val1 instanceof Object && val2 instanceof Object;

    if (
      areObjects &&
      !deepEqual(val1 as Record<string, T>, val2 as Record<string, T>)
    ) {
      return false;
    } else if (!areObjects && val1 !== val2) {
      return false;
    }
  }

  return true;
};
