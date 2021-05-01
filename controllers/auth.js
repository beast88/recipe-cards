import User from '../models/user.model.js'

const register = (req, res, next) => {
  res.send('Register Route')
}

const login = (req, res, next) => {
  res.send('Login Route')
}

const forgotpassword = (req, res, next) => {
  res.send('Forgot Password Route')
}

const resetpassword = (req, res, next) => {
  res.send('Reset Password Route')
}

export {register, login, forgotpassword, resetpassword}
