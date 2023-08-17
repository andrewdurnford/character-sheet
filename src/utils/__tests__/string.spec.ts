import { mod, titleCase } from "../string"

describe("mod", () => {
  test("handle 0", () => {
    expect(mod(0)).toBe("+0")
  })

  test("handle positive numbers", () => {
    expect(mod(1)).toBe("+1")
  })

  test("handle negative numbers", () => {
    expect(mod(-1)).toBe("-1")
  })
})

describe("titleCase", () => {
  test("handle lower case", () => {
    expect(titleCase("test")).toBe("Test")
  })

  test("handle upper case", () => {
    expect(titleCase("Test")).toBe("Test")
  })

  test("handle kebab case", () => {
    expect(titleCase("test-test")).toBe("Test-test")
  })
})
