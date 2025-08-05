type MaskOptions = {
  maskChar?: string;
};

export function maskJWT(token: string, options: MaskOptions = {}): string {
  if (!token || typeof token !== 'string') {
    throw new Error('JWT token must be a non-empty string');
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format - must have 3 parts separated by dots');
  }

  const { maskChar = "*" } = options;
  
  if (!maskChar || maskChar.length !== 1) {
    throw new Error('Mask character must be a single character');
  }
  
  const [header, payload, signature] = parts;
  
  return `${maskChar.repeat(header.length)}.${maskChar.repeat(payload.length)}.${maskChar.repeat(signature.length)}`;
}
  