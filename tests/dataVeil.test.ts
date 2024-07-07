import { DataVeil } from "../src/dataVeil";

describe("DataVeil", () => {
  test("masks card numbers with default options", () => {
    expect(DataVeil.maskCardNumber("1234567812345678")).toBe(
      "************5678"
    );
  });

  // TODO: To be fixed later!

  //   test("masks card numbers with custom options", () => {
  //     expect(
  //       DataVeil.maskCardNumber("1234567812345678", {
  //         unmaskedStartDigits: 2,
  //         unmaskedEndDigits: 4,
  //       })
  //     ).toBe("12**********5678");
  //   });

  //   test("masks email addresses with default options", () => {
  //     expect(DataVeil.maskEmail("example@example.com")).toBe(
  //       "ex*****@example.com"
  //     );
  //   });

  //   test("masks email addresses with custom options", () => {
  //     expect(
  //       DataVeil.maskEmail("example@example.com", { emailMaskVisibleChars: 3 })
  //     ).toBe("exa****@example.com");
  //   });

  //   test("masks passwords with default options", () => {
  //     expect(DataVeil.maskPassword("supersecret")).toBe("***********");
  //   });

  //   test("masks passwords with custom mask character", () => {
  //     expect(DataVeil.maskPassword("supersecret", { maskChar: "#" })).toBe(
  //       "###########"
  //     );
  //   });

  //   test("masks phone numbers with default options", () => {
  //     expect(DataVeil.maskPhoneNumber("123-456-7890")).toBe("******7890");
  //     expect(DataVeil.maskPhoneNumber("+123-456-7890")).toBe("+******7890");
  //     expect(DataVeil.maskPhoneNumber("00123-456-7890")).toBe("00******7890");
  //     expect(DataVeil.maskPhoneNumber("1234567890")).toBe("******7890");
  //   });

  //   test("masks phone numbers with custom options", () => {
  //     expect(
  //       DataVeil.maskPhoneNumber("123-456-7890", {
  //         maskChar: "#",
  //         unmaskedStartDigits: 2,
  //         unmaskedEndDigits: 1,
  //       })
  //     ).toBe("12#######0");
  //     expect(
  //       DataVeil.maskPhoneNumber("+123-456-7890", {
  //         maskChar: "#",
  //         unmaskedStartDigits: 2,
  //         unmaskedEndDigits: 1,
  //       })
  //     ).toBe("+12#######0");
  //     expect(
  //       DataVeil.maskPhoneNumber("00123-456-7890", {
  //         maskChar: "#",
  //         unmaskedStartDigits: 2,
  //         unmaskedEndDigits: 1,
  //       })
  //     ).toBe("0012#######0");
  //     expect(
  //       DataVeil.maskPhoneNumber("1234567890", {
  //         maskChar: "#",
  //         unmaskedStartDigits: 2,
  //         unmaskedEndDigits: 1,
  //       })
  //     ).toBe("12#######0");
  //   });

  //   test("masks substrings with default options", () => {
  //     expect(DataVeil.maskSubstring("hello world", "world")).toBe("hello *****");
  //   });

  //   test("masks substrings with custom options", () => {
  //     expect(
  //       DataVeil.maskSubstring("hello world world", "world", {
  //         maskChar: "#",
  //         maskOnlyFirstOccurrence: true,
  //       })
  //     ).toBe("hello ##### world");
  //   });

  //   test("masks UUIDs with default options", () => {
  //     expect(DataVeil.maskUUID("123e4567-e89b-12d3-a456-426614174000")).toBe(
  //       "********************************4000"
  //     );
  //   });

  //   test("masks UUIDs with custom options", () => {
  //     expect(
  //       DataVeil.maskUUID("123e4567-e89b-12d3-a456-426614174000", {
  //         maskChar: "#",
  //         unmaskedStartDigits: 4,
  //         unmaskedEndDigits: 2,
  //       })
  //     ).toBe("123e##############################00");
  //   });

  //   test("masks JWT tokens with default options", () => {
  //     expect(DataVeil.maskJWT("header.payload.signature")).toBe(
  //       "******.*******.*********"
  //     );
  //   });

  //   test("masks JWT tokens with custom mask character", () => {
  //     expect(DataVeil.maskJWT("header.payload.signature", { maskChar: "#" })).toBe(
  //       "######.#######.#########"
  //     );
  //   });

  //   test("masks JSON fields with default options", () => {
  //     const json = { card: "1234567812345678", email: "example@example.com" };
  //     const maskedJson = DataVeil.maskJSON(json, ["card", "email"]);
  //     expect(maskedJson).toEqual({
  //       card: "************5678",
  //       email: "ex*****@example.com",
  //     });
  //   });

  //   test("masks JSON fields with custom options", () => {
  //     const json = { card: "1234567812345678", email: "example@example.com" };
  //     const maskedJson = DataVeil.maskJSON(json, ["card", "email"], {
  //       emailMaskVisibleChars: 3,
  //     });
  //     expect(maskedJson).toEqual({
  //       card: "************5678",
  //       email: "exa****@example.com",
  //     });
  //   });

  //   test("gets nested field from JSON", () => {
  //     const json = { a: { b: { c: "value" } } };
  //     expect(DataVeil.getNestedField(json, "a.b.c")).toBe("value");
  //   });

  //   test("sets nested field in JSON", () => {
  //     const json = { a: { b: { c: "value" } } };
  //     DataVeil.setNestedField(json, "a.b.c", "newValue");
  //     expect(json.a?.b?.c).toBe("newValue");
  //   });
});
