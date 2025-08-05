type MaskOptions = {
  maskChar?: string;
  emailMaskVisibleChars?: number;
};

export function maskEmail(email: string, options: MaskOptions = {}): string {
  if (!email || typeof email !== 'string') {
    throw new Error('Email must be a non-empty string');
  }
  
  if (email.length > 320) { // RFC 5321 limit
    throw new Error('Email too long (maximum: 320 characters)');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }

  const { maskChar = "*", emailMaskVisibleChars = 2 } = options;
  
  if (!maskChar || maskChar.length !== 1) {
    throw new Error('Mask character must be a single character');
  }
  
  if (emailMaskVisibleChars < 0) {
    throw new Error('Email mask visible characters cannot be negative');
  }
  
  const [user, domain] = email.split("@");
  
  if (emailMaskVisibleChars >= user.length) {
    return email;
  }

  const visibleChars = user.slice(0, emailMaskVisibleChars);
  const maskedUser = visibleChars + maskChar.repeat(user.length - emailMaskVisibleChars);
  return `${maskedUser}@${domain}`;
}
  