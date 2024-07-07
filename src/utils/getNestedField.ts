export function getNestedField(json: any, fieldPath: string): any {
    return fieldPath
      .split(".")
      .reduce((o, key) => (o && o[key] !== "undefined" ? o[key] : null), json);
  }
  