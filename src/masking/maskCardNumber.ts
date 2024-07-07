type MaskOptions = {
  maskChar?: string;
  unmaskedStartDigits?: number;
  unmaskedEndDigits?: number;
};

export function maskCardNumber(
  cardNumber: string,
  options: MaskOptions = {}
): string {
  const {
    maskChar = "*",
    unmaskedStartDigits = 0,
    unmaskedEndDigits = 4,
  } = options;
  const start = cardNumber.slice(0, unmaskedStartDigits);
  const end = cardNumber.slice(-unmaskedEndDigits);
  const masked = maskChar.repeat(cardNumber.length - start.length - end.length);
  return start + masked + end;
}
