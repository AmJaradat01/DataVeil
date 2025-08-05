type MaskOptions = {
  maskChar?: string;
  maskOnlyFirstOccurrence?: boolean;
};

export function maskSubstring(text: string, substring: string, options: MaskOptions = {}): string {
  if (!text || typeof text !== 'string') {
    throw new Error('Text must be a non-empty string');
  }
  
  if (text.length > 10000) {
    throw new Error('Text too long (maximum: 10,000 characters)');
  }
  
  if (!substring || typeof substring !== 'string') {
    throw new Error('Substring must be a non-empty string');
  }
  
  if (substring.length > 1000) {
    throw new Error('Substring too long (maximum: 1,000 characters)');
  }

  const { maskChar = "*", maskOnlyFirstOccurrence = false } = options;
  
  if (!maskChar || maskChar.length !== 1) {
    throw new Error('Mask character must be a single character');
  }
  const escapedSubstring = substring.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(escapedSubstring, maskOnlyFirstOccurrence ? "" : "g");
  return text.replace(regex, maskChar.repeat(substring.length));
}
  