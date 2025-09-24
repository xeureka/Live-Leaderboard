import {expect,test,describe, beforeAll} from "bun:test"
import { hashPassword,verifyPassword } from "../utils/hash"

describe("Password Hashing Module", () => {
    const TEST_PASSWORD = '2ME8uWceag8Y'
    const EMPTY_PASSWORD = ''
    const LONG_PASSWORD = "A".repeat(1000)
    const SPECIAL_CHAR_PASSWORD = "p@$$w0rd!🦄"

    let hashedPassword: string;
    let secondHashSamePassword: string;

    beforeAll(async () => {
        // pre-compute the hases for consistent testing
        hashedPassword = await hashPassword(TEST_PASSWORD)
        secondHashSamePassword = await hashPassword(TEST_PASSWORD)
    })

    describe('hashPassword Function', () => {
        test("should return a string", () => {
            expect(hashedPassword).toBeString()
        })

        test("should not equal to original password",() => {
            expect(hashedPassword).not.toBe(TEST_PASSWORD)
            expect(hashedPassword).not.toEqual(TEST_PASSWORD)
        })

        test("should produce a hash longer than the original password(salting)", () => {
            expect(hashPassword).not.toBe(secondHashSamePassword)
            expect(hashedPassword).not.toEqual(secondHashSamePassword)
        })

        test("should handle empty password", async () => {
            const emptyHash = await hashPassword(EMPTY_PASSWORD)
            expect(emptyHash).toBeString()
            expect(emptyHash.length).toBeGreaterThan(0)
        })

        test("should handle special characters and unicode", async() => {
            const specialHash = await hashPassword(SPECIAL_CHAR_PASSWORD)
            expect(specialHash).toBeString()
            expect(specialHash.length).toBeGreaterThan(SPECIAL_CHAR_PASSWORD.length)
        })

        test("shoudl produce valid hash structure", () => {
            // Basic hash format validation (common bcrypt pattern)
            expect(hashedPassword).toMatch(/^\$2[aby]\$\d+\$.{53}$/)
        })
    })

describe("verifyPassword Function", () => {
    test("should return true for correct password", async () => {
      const isValid = await verifyPassword(TEST_PASSWORD, hashedPassword)
      expect(isValid).toBeTrue()
    })

    test("should return false for incorrect password", async () => {
      const isValid = await verifyPassword("wrongpassword", hashedPassword)
      expect(isValid).toBeFalse()
    })

    test("should return false for empty password", async () => {
      const isValid = await verifyPassword("", hashedPassword)
      expect(isValid).toBeFalse()
    })

    test("should return false when comparing different hashes of same password", async () => {
      const isValidFirst = await verifyPassword(TEST_PASSWORD, hashedPassword)
      const isValidSecond = await verifyPassword(TEST_PASSWORD, secondHashSamePassword)

      expect(isValidFirst).toBeTrue()
      expect(isValidSecond).toBeTrue()
    })

    test("should handle special characters verification", async () => {
      const specialHash = await hashPassword(SPECIAL_CHAR_PASSWORD)
      const isValid = await verifyPassword(SPECIAL_CHAR_PASSWORD, specialHash)
      expect(isValid).toBeTrue()
    })

    test("should return false for malformed hash", async () => {
      const malformedHash = "invalid_hash_format"
      const isValid = await verifyPassword(TEST_PASSWORD, malformedHash)
      expect(isValid).toBeFalse()
    })

    test("should be case-sensitive", async () => {
      const lowerCasePassword = TEST_PASSWORD.toLowerCase()
      const isValid = await verifyPassword(lowerCasePassword, hashedPassword)
      expect(isValid).toBeFalse()
    })
  })

})

