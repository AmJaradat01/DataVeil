type MaskOptions = {
  maskChar?: string;
  unmaskedStartDigits?: number;
  unmaskedEndDigits?: number;
};

export function maskPhoneNumber(phone: string, options: MaskOptions = {}): string {
  if (!phone || typeof phone !== 'string') {
    throw new Error('Phone number must be a non-empty string');
  }

  const {
    maskChar = "*",
    unmaskedStartDigits = 0,
    unmaskedEndDigits = 4,
  } = options;
  
  if (!maskChar || maskChar.length !== 1) {
    throw new Error('Mask character must be a single character');
  }
  
  if (unmaskedStartDigits < 0 || unmaskedEndDigits < 0) {
    throw new Error('Unmasked digits cannot be negative');
  }

  let prefix = "";
  let workingPhone = phone;

  // Extract prefix
  if (phone.startsWith("+")) {
    prefix = "+";
    workingPhone = phone.slice(1);
  } else if (phone.startsWith("00")) {
    prefix = "00";
    workingPhone = phone.slice(2);
  }

  // Extract digits and their positions
  const digits = workingPhone.replace(/[^0-9]/g, "");
  
  if (digits.length === 0) {
    throw new Error('Phone number must contain at least one digit');
  }

  // Create mask pattern
  const startVisible = Math.min(unmaskedStartDigits, digits.length);
  const endVisible = Math.min(unmaskedEndDigits, digits.length - startVisible);
  
  const resultArray = (prefix + workingPhone).split('');
  let digitIndex = 0;

  for (let i = prefix.length; i < resultArray.length; i++) {
    if (/[0-9]/.test(resultArray[i])) {
      if (digitIndex >= startVisible && digitIndex < digits.length - endVisible) {
        resultArray[i] = maskChar;
      }
      digitIndex++;
    }
  }

  return resultArray.join('');
}
  