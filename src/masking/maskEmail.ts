type MaskOptions = {
    maskChar?: string;
    emailMaskVisibleChars?: number;
  };
  
  export function maskEmail(email: string, options: MaskOptions = {}): string {
    const { maskChar = "*", emailMaskVisibleChars = 2 } = options;
    const [user, domain] = email.split("@");
    const visibleChars = user.slice(0, emailMaskVisibleChars);
    const maskedUser =
      visibleChars + maskChar.repeat(user.length - emailMaskVisibleChars);
    return `${maskedUser}@${domain}`;
  }
  