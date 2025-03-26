export const convertToCamelCase = (obj: any) => {
  if (Array.isArray(obj)) {
    return obj.map((item) => convertToCamelCase(item));
  } else if (obj && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase(),
      );
      acc[camelKey] = convertToCamelCase(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
};
