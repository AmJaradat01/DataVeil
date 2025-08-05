type MaskOptions = {
  maskChar?: string;
};

export function maskPassword(password: string, options: MaskOptions = {}): string {
  if (!password || typeof password !== 'string') {
    throw new Error('Password must be a non-empty string');
  }

  const { maskChar = "*" } = options;
  
  if (!maskChar || maskChar.length !== 1) {
    throw new Error('Mask character must be a single character');
  }
  
  return maskChar.repeat(password.length);
}
  