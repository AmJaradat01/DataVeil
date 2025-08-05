# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-12-19

### Added
- Enhanced phone number masking with format preservation
- Nested JSON field masking with dot notation support
- Comprehensive input validation and error handling
- Advanced field configuration for JSON masking
- Dual module support (CommonJS + ESM)
- Full TypeScript type definitions

### Fixed
- Phone number masking now preserves original formatting (dashes, spaces, etc.)
- All test cases now pass with 83% coverage
- UUID masking with proper default behavior
- Regex escaping in substring masking

### Changed
- Updated to modern dependencies (Jest 29, TypeScript 5)
- Improved error messages for better debugging
- Enhanced JSON masking to support custom field types

### Technical
- Added CI/CD pipeline with GitHub Actions
- Comprehensive test suite with coverage reporting
- Better project structure and build configuration

## [1.0.0] - 2024-01-12

### Added
- Initial release
- Basic masking functionality for:
  - Card numbers
  - Email addresses
  - Passwords
  - Phone numbers
  - UUIDs
  - JWT tokens
  - JSON objects
  - Substrings
- TypeScript support
- Jest testing framework