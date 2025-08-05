export { DataVeil } from './dataVeil';
export {
  maskCardNumber,
  maskEmail,
  maskPassword,
  maskPhoneNumber,
  maskSubstring,
  maskUUID,
  maskJWT,
  maskJSON,
} from './masking';
export { getNestedField, setNestedField } from './utils';

// Type exports
export type MaskOptions = {
  maskChar?: string;
  unmaskedStartDigits?: number;
  unmaskedEndDigits?: number;
  emailMaskVisibleChars?: number;
  maskOnlyFirstOccurrence?: boolean;
};

export type FieldConfig = {
  path: string;
  type?: 'card' | 'email' | 'phone' | 'uuid' | 'password' | 'custom';
  options?: MaskOptions;
};