export function setNestedField(json: any, fieldPath: string, value: any): any {
    const keys = fieldPath.split(".");
    const lastKey = keys.pop();
    if (lastKey) {
      const lastObj = keys.reduce(
        (obj, key) => (obj[key] = obj[key] || {}),
        json
      );
      lastObj[lastKey] = value;
    }
    return json;
  }
  