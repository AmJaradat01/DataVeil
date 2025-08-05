type MaskOptions = {
  maskChar?: string;
  unmaskedStartDigits?: number;
  unmaskedEndDigits?: number;
};

export function maskUUID(uuid: string, options: MaskOptions = {}): string {
  if (!uuid || typeof uuid !== 'string') {
    throw new Error('UUID must be a non-empty string');
  }

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(uuid)) {
    throw new Error('Invalid UUID format');
  }

  const {
    maskChar = "*",
    unmaskedStartDigits = 4,
    unmaskedEndDigits = 4,
  } = options;
  
  if (!maskChar || maskChar.length !== 1) {
    throw new Error('Mask character must be a single character');
  }
  
  if (unmaskedStartDigits < 0 || unmaskedEndDigits < 0) {
    throw new Error('Unmasked digits cannot be negative');
  }

  if (unmaskedStartDigits + unmaskedEndDigits >= uuid.length) {
    return uuid;
  }

  const start = uuid.slice(0, unmaskedStartDigits);
  const end = uuid.slice(-unmaskedEndDigits);
  const masked = maskChar.repeat(uuid.length - start.length - end.length);
  return start + masked + end;
}
  