type MaskOptions = {
    maskChar?: string;
    unmaskedStartDigits?: number;
    unmaskedEndDigits?: number;
  };
  
  export function maskPhoneNumber(phone: string, options: MaskOptions = {}): string {
    const {
      maskChar = "*",
      unmaskedStartDigits = 0,
      unmaskedEndDigits = 4,
    } = options;
    let prefix = "";
    let number = phone;
  
    if (phone.startsWith("+")) {
      prefix = "+";
      number = phone.slice(1);
    } else if (phone.startsWith("00")) {
      prefix = "00";
      number = phone.slice(2);
    }
  
    number = number.replace(/[^0-9]/g, "");
  
    const start = number.slice(0, unmaskedStartDigits);
    const end = number.slice(-unmaskedEndDigits);
    const masked = maskChar.repeat(number.length - start.length - end.length);
    return prefix + start + masked + end;
  }
  