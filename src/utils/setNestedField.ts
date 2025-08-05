export function setNestedField(json: any, fieldPath: string, value: any): any {
  if (!json || !fieldPath) return json;
  
  const keys = fieldPath.split(".");
  const lastKey = keys.pop();
  
  if (lastKey) {
    const lastObj = keys.reduce(
      (obj, key) => {
        if (!obj[key] || typeof obj[key] !== 'object') {
          obj[key] = {};
        }
        return obj[key];
      },
      json
    );
    lastObj[lastKey] = value;
  }
  
  return json;
}
  