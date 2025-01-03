/* eslint-disable @typescript-eslint/no-explicit-any */

export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as T;
  }

  const clonedObj: Record<string, any> = {};
  for (const key in obj) {
    // Use Object.prototype.hasOwnProperty.call to avoid accessing the prototype directly
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }

  return clonedObj as T;
};
