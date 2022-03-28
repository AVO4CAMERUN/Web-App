// Utils module for check input

const checker = (text, pattern) => new RegExp(pattern).test(text)
const fullnameChecker = (text) => checker(text, '^[a-zA-Z ]+$')
const usernameChecker = (text) => checker(text, '^[a-z0-9_.-]{3,20}$')
const emailChecker = (text) => checker(text, '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
const passwordChecker = (text) => checker(text, '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$')

export const checkers = {
  fullnameChecker,
  usernameChecker,
  emailChecker,
  passwordChecker
}
