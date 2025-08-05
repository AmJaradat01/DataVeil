export function getNestedField(json: any, fieldPath: string): any {
  if (!json || !fieldPath) return null;
  
  return fieldPath
    .split(".")
    .reduce((obj, key) => {
      return obj && obj[key] !== undefined ? obj[key] : null;
    }, json);
}
  