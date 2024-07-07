type MaskOptions = {
    maskChar?: string;
  };
  
  export function maskPassword(password: string, options: MaskOptions = {}): string {
    const { maskChar = "*" } = options;
    return maskChar.repeat(password.length);
  }
  