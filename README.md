# DataVeil

[![npm version](https://badge.fury.io/js/dataveil.svg)](https://badge.fury.io/js/dataveil)
[![CI](https://github.com/AmJaradat01/dataveil/workflows/CI/badge.svg)](https://github.com/AmJaradat01/dataveil/actions)
[![Coverage](https://img.shields.io/badge/coverage-82%25-brightgreen)](https://github.com/AmJaradat01/dataveil)

A robust TypeScript library for masking sensitive data including card numbers, email addresses, passwords, phone numbers, UUIDs, JWT tokens, and JSON objects. Perfect for GDPR compliance and data privacy protection.

## Features

- 🔒 **Comprehensive Data Masking**: Support for cards, emails, phones, passwords, UUIDs, JWTs
- 🎯 **Flexible Configuration**: Customizable mask characters and visibility options
- 🏗️ **TypeScript First**: Full type safety and IntelliSense support
- 📱 **Format Preservation**: Maintains original formatting (dashes, spaces, etc.)
- 🌳 **Nested JSON Support**: Deep object masking with dot notation
- 🌍 **Unicode Support**: Full Unicode character support
- ✅ **Input Validation**: Built-in validation for all data types
- 🛡️ **Security Hardened**: Protection against injection and DoS attacks
- 🚀 **Zero Dependencies**: Lightweight and fast
- 📦 **Dual Module Support**: CommonJS and ES modules

## Installation

```bash
npm install dataveil
```

## Quick Start

```typescript
import { DataVeil } from 'dataveil';

// Basic usage with default options
DataVeil.maskCardNumber('1234567812345678');        // "************5678"
DataVeil.maskEmail('user@example.com');             // "us**@example.com"
DataVeil.maskPhoneNumber('123-456-7890');           // "***-***-7890"
```

## API Reference

### Card Number Masking

```typescript
DataVeil.maskCardNumber('1234567812345678', {
  maskChar: '#',
  unmaskedStartDigits: 2,
  unmaskedEndDigits: 4
}); // "12##########5678"
```

### Email Masking

```typescript
DataVeil.maskEmail('example@example.com', {
  maskChar: '#',
  emailMaskVisibleChars: 3
}); // "exa####@example.com"
```

### Phone Number Masking (Format Preserving)

```typescript
DataVeil.maskPhoneNumber('123-456-7890', {
  maskChar: '#',
  unmaskedStartDigits: 2,
  unmaskedEndDigits: 1
}); // "12#-###-###0"

// International formats supported
DataVeil.maskPhoneNumber('+1-234-567-8900'); // "+*-***-***-8900"
```

### Password Masking

```typescript
DataVeil.maskPassword('supersecret', { maskChar: '#' }); // "###########"
```

### UUID Masking

```typescript
DataVeil.maskUUID('123e4567-e89b-12d3-a456-426614174000', {
  maskChar: '#',
  unmaskedStartDigits: 8,
  unmaskedEndDigits: 4
}); // "123e4567########################4000"
```

### JWT Token Masking

```typescript
DataVeil.maskJWT('header.payload.signature', { maskChar: '#' });
// "######.#######.#########"
```

### Substring Masking

```typescript
DataVeil.maskSubstring('hello world world', 'world', {
  maskChar: '#',
  maskOnlyFirstOccurrence: true
}); // "hello ##### world"
```

### JSON Object Masking

#### Simple Field Masking
```typescript
const data = {
  card: '1234567812345678',
  email: 'user@example.com'
};

DataVeil.maskJSON(data, ['card', 'email']);
// { card: "************5678", email: "us**@example.com" }
```

#### Nested Field Masking
```typescript
const data = {
  user: {
    payment: { card: '1234567812345678' },
    contact: { email: 'user@example.com' }
  }
};

DataVeil.maskJSON(data, ['user.payment.card', 'user.contact.email']);
```

#### Advanced Field Configuration
```typescript
const data = {
  creditCard: '1234567812345678',
  userEmail: 'user@example.com'
};

DataVeil.maskJSON(data, [
  {
    path: 'creditCard',
    type: 'card',
    options: { maskChar: '#', unmaskedStartDigits: 4 }
  },
  {
    path: 'userEmail',
    type: 'email',
    options: { emailMaskVisibleChars: 1 }
  }
]);
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `maskChar` | string | `"*"` | Character used for masking |
| `unmaskedStartDigits` | number | `0` | Number of digits to show at start |
| `unmaskedEndDigits` | number | `4` | Number of digits to show at end |
| `emailMaskVisibleChars` | number | `2` | Visible characters in email username |
| `maskOnlyFirstOccurrence` | boolean | `false` | Mask only first occurrence in substring |

## Field Types for JSON Masking

- `card` - Credit card numbers
- `email` - Email addresses
- `phone` - Phone numbers
- `uuid` - UUID strings
- `password` - Passwords
- `custom` - Generic string masking

## Error Handling

All functions include input validation and throw descriptive errors:

```typescript
try {
  DataVeil.maskEmail('invalid-email');
} catch (error) {
  console.error(error.message); // "Invalid email format"
}
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build the library
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed release notes and version history.
