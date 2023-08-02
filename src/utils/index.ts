/**
 * The function `validateIsDigit` checks if a string contains any non-digit characters and returns the
 * string if it does, otherwise it returns an empty string.
 * @param {string} param - The parameter `param` is a string that you want to validate if it contains
 * only digits.
 * @returns If the input string `param` contains any character that is not a digit (0-9), then the
 * function will return the input string `param`. Otherwise, it will return an empty string.
 */
export const validateIsDigit = (param: string) => {
  const regext = /[^0-9]/g
  if (regext.test(param)) {
    return param
  }
  return ''
}
