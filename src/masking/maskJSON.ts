import { maskCardNumber } from "./maskCardNumber";
import { maskEmail } from "./maskEmail";
import { maskPassword } from "./maskPassword";
import { maskPhoneNumber } from "./maskPhoneNumber";
import { maskUUID } from "./maskUUID";
import { maskSubstring } from "./maskSubstring";

type MaskOptions = {
  maskChar?: string;
  unmaskedStartDigits?: number;
  unmaskedEndDigits?: number;
  emailMaskVisibleChars?: number;
  maskOnlyFirstOccurrence?: boolean;
};

export function maskJSON(
  json: any,
  fieldsToMask: string[],
  options: MaskOptions = {}
): any {
  const maskedJson = { ...json };
  fieldsToMask.forEach((field) => {
    if (maskedJson[field]) {
      if (field === "card") {
        maskedJson[field] = maskCardNumber(maskedJson[field], options);
      } else if (field === "email") {
        maskedJson[field] = maskEmail(maskedJson[field], options);
      } else if (field === "phone") {
        maskedJson[field] = maskPhoneNumber(maskedJson[field], options);
      } else if (field === "uuid") {
        maskedJson[field] = maskUUID(maskedJson[field], options);
      } else {
        maskedJson[field] = maskSubstring(
          maskedJson[field],
          maskedJson[field],
          options
        );
      }
    }
  });
  return maskedJson;
}
