type MaskOptions = {
    maskChar?: string;
  };
  
  export function maskJWT(token: string, options: MaskOptions = {}): string {
    const { maskChar = "*" } = options;
    const [header, payload, signature] = token.split(".");
    return `${maskChar.repeat(header.length)}.${maskChar.repeat(
      payload.length
    )}.${maskChar.repeat(signature.length)}`;
  }
  