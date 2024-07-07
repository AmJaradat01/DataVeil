type MaskOptions = {
    maskChar?: string;
    unmaskedStartDigits?: number;
    unmaskedEndDigits?: number;
  };
  
  export function maskUUID(uuid: string, options: MaskOptions = {}): string {
    const {
      maskChar = "*",
      unmaskedStartDigits = 4,
      unmaskedEndDigits = 4,
    } = options;
    const start = uuid.slice(0, unmaskedStartDigits);
    const end = uuid.slice(-unmaskedEndDigits);
    const masked = maskChar.repeat(uuid.length - start.length - end.length);
    return start + masked + end;
  }
  