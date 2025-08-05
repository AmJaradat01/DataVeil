import {
  maskCardNumber,
  maskEmail,
  maskPassword,
  maskPhoneNumber,
  maskSubstring,
  maskUUID,
  maskJWT,
  maskJSON,
} from "./masking";
import { getNestedField, setNestedField } from "./utils";

type MaskOptions = {
  maskChar?: string;
  unmaskedStartDigits?: number;
  unmaskedEndDigits?: number;
  emailMaskVisibleChars?: number;
  maskOnlyFirstOccurrence?: boolean;
};

export class DataVeil {
  static defaultOptions: MaskOptions = {
    maskChar: "*",
    unmaskedStartDigits: 0,
    unmaskedEndDigits: 4,
    emailMaskVisibleChars: 2,
    maskOnlyFirstOccurrence: false,
  };

  static maskCardNumber(cardNumber: string, options: MaskOptions = {}): string {
    return maskCardNumber(cardNumber, { ...this.defaultOptions, ...options });
  }

  static maskEmail(email: string, options: MaskOptions = {}): string {
    return maskEmail(email, { ...this.defaultOptions, ...options });
  }

  static maskPassword(password: string, options: MaskOptions = {}): string {
    return maskPassword(password, { ...this.defaultOptions, ...options });
  }

  static maskPhoneNumber(phone: string, options: MaskOptions = {}): string {
    return maskPhoneNumber(phone, { ...this.defaultOptions, ...options });
  }

  static maskSubstring(
    text: string,
    substring: string,
    options: MaskOptions = {}
  ): string {
    return maskSubstring(text, substring, {
      ...this.defaultOptions,
      ...options,
    });
  }

  static maskUUID(uuid: string, options: MaskOptions = {}): string {
    return maskUUID(uuid, { ...this.defaultOptions, ...options });
  }

  static maskJWT(token: string, options: MaskOptions = {}): string {
    return maskJWT(token, { ...this.defaultOptions, ...options });
  }

  static maskJSON(
    json: any,
    fieldsToMask: (string | { path: string; type?: 'card' | 'email' | 'phone' | 'uuid' | 'password' | 'custom'; options?: MaskOptions })[],
    options: MaskOptions = {}
  ): any {
    return maskJSON(json, fieldsToMask, { ...this.defaultOptions, ...options });
  }

  static getNestedField(json: any, fieldPath: string): any {
    return getNestedField(json, fieldPath);
  }

  static setNestedField(json: any, fieldPath: string, value: any): any {
    return setNestedField(json, fieldPath, value);
  }
}
export {
  maskCardNumber,
  maskEmail,
  maskPassword,
  maskPhoneNumber,
  maskSubstring,
  maskUUID,
  maskJWT,
  maskJSON,
  getNestedField,
  setNestedField,
};
