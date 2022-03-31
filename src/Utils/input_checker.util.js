// Utils module for check input

const checker = (text, pattern) => new RegExp(pattern).test(text)
const nameChecker = (text) => checker(text, '^[a-zA-Z ]+$')
const usernameChecker = (text) => checker(text, '^[a-z0-9_.-]{3,20}$')
const emailChecker = (text) => checker(text, '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
const passwordChecker = (text) => checker(text, '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')

export const checkers = {
  nameChecker,
  usernameChecker,
  emailChecker,
  passwordChecker
}
