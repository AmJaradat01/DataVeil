type MaskOptions = {
  maskChar?: string;
  unmaskedStartDigits?: number;
  unmaskedEndDigits?: number;
};

export function maskCardNumber(
  cardNumber: string,
  options: MaskOptions = {}
): string {
  if (!cardNumber || typeof cardNumber !== 'string') {
    throw new Error('Card number must be a non-empty string');
  }
  
  if (cardNumber.length > 50) {
    throw new Error('Card number too long (maximum: 50 characters)');
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

  if (unmaskedStartDigits + unmaskedEndDigits >= cardNumber.length) {
    return cardNumber;
  }

  const start = cardNumber.slice(0, unmaskedStartDigits);
  const end = cardNumber.slice(-unmaskedEndDigits);
  const masked = maskChar.repeat(cardNumber.length - start.length - end.length);
  return start + masked + end;
}
