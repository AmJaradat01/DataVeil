import { maskCardNumber } from "./maskCardNumber";
import { maskEmail } from "./maskEmail";
import { maskPassword } from "./maskPassword";
import { maskPhoneNumber } from "./maskPhoneNumber";
import { maskUUID } from "./maskUUID";
import { maskSubstring } from "./maskSubstring";
import { getNestedField, setNestedField } from "../utils";

type MaskOptions = {
  maskChar?: string;
  unmaskedStartDigits?: number;
  unmaskedEndDigits?: number;
  emailMaskVisibleChars?: number;
  maskOnlyFirstOccurrence?: boolean;
};

type FieldConfig = {
  path: string;
  type?: 'card' | 'email' | 'phone' | 'uuid' | 'password' | 'custom';
  options?: MaskOptions;
};

export function maskJSON(
  json: any,
  fieldsToMask: (string | FieldConfig)[],
  options: MaskOptions = {}
): any {
  if (!json || typeof json !== 'object') {
    throw new Error('JSON must be a valid object');
  }
  
  if (fieldsToMask.length > 100) {
    throw new Error('Too many fields to mask (maximum: 100)');
  }
  
  // Estimate object size to prevent memory exhaustion
  const jsonString = JSON.stringify(json);
  if (jsonString.length > 10 * 1024 * 1024) { // 10MB limit
    throw new Error('JSON object too large (maximum: 10MB)');
  }

  const maskedJson = deepClone(json);

  fieldsToMask.forEach((fieldConfig) => {
    let fieldPath: string;
    let fieldType: string | undefined;
    let fieldOptions: MaskOptions;

    if (typeof fieldConfig === 'string') {
      fieldPath = sanitizeFieldPath(fieldConfig);
      fieldType = inferFieldType(fieldPath);
      fieldOptions = options;
    } else {
      fieldPath = sanitizeFieldPath(fieldConfig.path);
      fieldType = fieldConfig.type || inferFieldType(fieldPath);
      fieldOptions = fieldConfig.options ? Object.assign({}, options, fieldConfig.options) : options;
    }

    const value = getNestedField(maskedJson, fieldPath);
    if (value && typeof value === 'string') {
      let maskedValue: string;

      try {
        switch (fieldType) {
          case 'card':
            maskedValue = maskCardNumber(value, fieldOptions);
            break;
          case 'email':
            maskedValue = maskEmail(value, fieldOptions);
            break;
          case 'phone':
            maskedValue = maskPhoneNumber(value, fieldOptions);
            break;
          case 'uuid':
            maskedValue = maskUUID(value, fieldOptions);
            break;
          case 'password':
            maskedValue = maskPassword(value, fieldOptions);
            break;
          default:
            maskedValue = maskSubstring(value, value, fieldOptions);
        }
        setNestedField(maskedJson, fieldPath, maskedValue);
      } catch (error) {
        // If specific masking fails, fall back to generic masking
        maskedValue = maskSubstring(value, value, fieldOptions);
        setNestedField(maskedJson, fieldPath, maskedValue);
      }
    }
  });

  return maskedJson;
}

function deepClone(obj: any, depth = 0, seen = new WeakSet()): any {
  if (depth > 100) {
    throw new Error('Maximum cloning depth exceeded - possible circular reference');
  }
  
  if (obj !== null && typeof obj === 'object') {
    if (seen.has(obj)) {
      throw new Error('Circular reference detected');
    }
    seen.add(obj);
  }
  
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (Array.isArray(obj)) return obj.map(item => deepClone(item, depth + 1, seen));
  
  const cloned: any = {};
  for (const key in obj) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue; // Skip dangerous keys
    }
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key] = deepClone(obj[key], depth + 1, seen);
    }
  }
  return cloned;
}

function sanitizeFieldPath(fieldPath: string): string {
  if (!fieldPath || typeof fieldPath !== 'string') {
    throw new Error('Field path must be a non-empty string');
  }
  
  // Prevent dangerous paths
  const dangerousPatterns = [
    '__proto__',
    'constructor',
    'prototype',
    '../',
    '..\\',
    'eval',
    'function'
  ];
  
  const lowerPath = fieldPath.toLowerCase();
  for (const pattern of dangerousPatterns) {
    if (lowerPath.includes(pattern)) {
      throw new Error(`Dangerous field path detected: ${pattern}`);
    }
  }
  
  // Limit path depth
  const parts = fieldPath.split('.');
  if (parts.length > 20) {
    throw new Error('Field path depth exceeds maximum allowed (20 levels)');
  }
  
  // Validate each part
  for (const part of parts) {
    if (!part || !/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(part)) {
      throw new Error(`Invalid field path component: ${part}`);
    }
  }
  
  return fieldPath;
}

function inferFieldType(fieldPath: string): string {
  const lowerPath = fieldPath.toLowerCase();
  if (lowerPath.includes('card') || lowerPath.includes('credit')) return 'card';
  if (lowerPath.includes('email')) return 'email';
  if (lowerPath.includes('phone') || lowerPath.includes('mobile')) return 'phone';
  if (lowerPath.includes('uuid') || lowerPath.includes('id')) return 'uuid';
  if (lowerPath.includes('password') || lowerPath.includes('pwd')) return 'password';
  return 'custom';
}
