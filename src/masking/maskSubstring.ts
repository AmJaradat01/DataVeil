type MaskOptions = {
    maskChar?: string;
    maskOnlyFirstOccurrence?: boolean;
  };
  
  export function maskSubstring(text: string, substring: string, options: MaskOptions = {}): string {
    const { maskChar = "*", maskOnlyFirstOccurrence = false } = options;
    const regex = new RegExp(substring, maskOnlyFirstOccurrence ? "" : "g");
    return text.replace(regex, maskChar.repeat(substring.length));
  }
  