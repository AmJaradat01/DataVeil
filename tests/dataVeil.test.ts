import { DataVeil } from "../src/dataVeil";

describe("DataVeil", () => {
  describe("maskCardNumber", () => {
    test("masks card numbers with default options", () => {
      expect(DataVeil.maskCardNumber("1234567812345678")).toBe("************5678");
    });

    test("masks card numbers with custom options", () => {
      expect(DataVeil.maskCardNumber("1234567812345678", {
        maskChar: "#",
        unmaskedStartDigits: 2,
        unmaskedEndDigits: 4,
      })).toBe("12##########5678");
    });

    test("throws error for invalid input", () => {
      expect(() => DataVeil.maskCardNumber("")).toThrow();
      expect(() => DataVeil.maskCardNumber(null as any)).toThrow();
      expect(() => DataVeil.maskCardNumber("1234", { maskChar: "" })).toThrow();
      expect(() => DataVeil.maskCardNumber("1234", { maskChar: "ABC" })).toThrow();
      expect(() => DataVeil.maskCardNumber("1234", { unmaskedStartDigits: -1 })).toThrow();
    });
  });

  describe("maskEmail", () => {
    test("masks email addresses with default options", () => {
      expect(DataVeil.maskEmail("example@example.com")).toBe("ex*****@example.com");
    });

    test("masks email addresses with custom options", () => {
      expect(DataVeil.maskEmail("example@example.com", { 
        maskChar: "#",
        emailMaskVisibleChars: 3 
      })).toBe("exa####@example.com");
    });

    test("throws error for invalid email", () => {
      expect(() => DataVeil.maskEmail("invalid-email")).toThrow();
      expect(() => DataVeil.maskEmail("")).toThrow();
      expect(() => DataVeil.maskEmail("test@test.com", { maskChar: "" })).toThrow();
      expect(() => DataVeil.maskEmail("test@test.com", { emailMaskVisibleChars: -1 })).toThrow();
    });
  });

  describe("maskPassword", () => {
    test("masks passwords with default options", () => {
      expect(DataVeil.maskPassword("supersecret")).toBe("***********");
    });

    test("masks passwords with custom mask character", () => {
      expect(DataVeil.maskPassword("supersecret", { maskChar: "#" })).toBe("###########");
    });

    test("throws error for invalid input", () => {
      expect(() => DataVeil.maskPassword("")).toThrow();
    });
  });

  describe("maskPhoneNumber", () => {
    test("masks phone numbers with default options", () => {
      expect(DataVeil.maskPhoneNumber("123-456-7890")).toBe("***-***-7890");
      expect(DataVeil.maskPhoneNumber("+123-456-7890")).toBe("+***-***-7890");
      expect(DataVeil.maskPhoneNumber("1234567890")).toBe("******7890");
    });

    test("masks phone numbers with custom options", () => {
      expect(DataVeil.maskPhoneNumber("123-456-7890", {
        maskChar: "#",
        unmaskedStartDigits: 2,
        unmaskedEndDigits: 1,
      })).toBe("12#-###-###0");
    });

    test("throws error for invalid input", () => {
      expect(() => DataVeil.maskPhoneNumber("")).toThrow();
      expect(() => DataVeil.maskPhoneNumber("no-digits")).toThrow();
    });
  });

  describe("maskSubstring", () => {
    test("masks substrings with default options", () => {
      expect(DataVeil.maskSubstring("hello world", "world")).toBe("hello *****");
    });

    test("masks substrings with custom options", () => {
      expect(DataVeil.maskSubstring("hello world world", "world", {
        maskChar: "#",
        maskOnlyFirstOccurrence: true,
      })).toBe("hello ##### world");
    });

    test("handles special regex characters", () => {
      expect(DataVeil.maskSubstring("test (123) test", "(123)")).toBe("test ***** test");
    });
  });

  describe("maskUUID", () => {
    test("masks UUIDs with default options", () => {
      expect(DataVeil.maskUUID("123e4567-e89b-12d3-a456-426614174000")).toBe("********************************4000");
    });

    test("masks UUIDs with custom options", () => {
      expect(DataVeil.maskUUID("123e4567-e89b-12d3-a456-426614174000", {
        maskChar: "#",
        unmaskedStartDigits: 8,
        unmaskedEndDigits: 2,
      })).toBe("123e4567##########################00");
    });

    test("throws error for invalid UUID", () => {
      expect(() => DataVeil.maskUUID("invalid-uuid")).toThrow();
    });
  });

  describe("maskJWT", () => {
    test("masks JWT tokens with default options", () => {
      expect(DataVeil.maskJWT("header.payload.signature")).toBe("******.*******.*********");
    });

    test("masks JWT tokens with custom mask character", () => {
      expect(DataVeil.maskJWT("header.payload.signature", { maskChar: "#" })).toBe("######.#######.#########");
    });

    test("throws error for invalid JWT", () => {
      expect(() => DataVeil.maskJWT("invalid.jwt")).toThrow();
      expect(() => DataVeil.maskJWT("too.many.parts.here")).toThrow();
    });
  });

  describe("maskJSON", () => {
    test("masks JSON fields with default options", () => {
      const json = { card: "1234567812345678", email: "example@example.com" };
      const maskedJson = DataVeil.maskJSON(json, ["card", "email"]);
      expect(maskedJson).toEqual({
        card: "************5678",
        email: "ex*****@example.com",
      });
    });

    test("masks nested JSON fields", () => {
      const json = { user: { card: "1234567812345678", contact: { email: "test@test.com" } } };
      const maskedJson = DataVeil.maskJSON(json, ["user.card", "user.contact.email"]);
      expect(maskedJson.user.card).toBe("************5678");
      expect(maskedJson.user.contact.email).toBe("te**@test.com");
    });

    test("masks with field configurations", () => {
      const json = { cardNumber: "1234567812345678", userEmail: "test@example.com" };
      const maskedJson = DataVeil.maskJSON(json, [
        { path: "cardNumber", type: "card" as const, options: { maskChar: "#" } },
        { path: "userEmail", type: "email" as const, options: { emailMaskVisibleChars: 1 } }
      ]);
      expect(maskedJson.cardNumber).toBe("############5678");
      expect(maskedJson.userEmail).toBe("t***@example.com");
    });
  });

  describe("utility functions", () => {
    test("gets nested field from JSON", () => {
      const json = { a: { b: { c: "value" } } };
      expect(DataVeil.getNestedField(json, "a.b.c")).toBe("value");
      expect(DataVeil.getNestedField(json, "a.b.d")).toBeNull();
    });

    test("sets nested field in JSON", () => {
      const json = { a: { b: { c: "value" } } };
      DataVeil.setNestedField(json, "a.b.c", "newValue");
      expect(json.a.b.c).toBe("newValue");
      
      DataVeil.setNestedField(json, "a.d.e", "created");
      expect((json.a as any).d.e).toBe("created");
    });
  });
});