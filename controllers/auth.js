import User from '../models/user.model.js'

const register = async (req, res, next) => {
  const {firstName, lastName, email, password} = req.body

  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password
    })

    res.status(201).json({
      title: 'User added'
    })

  } catch (err) {
    res.status(500).json({
      title: 'Error',
      error: err.message
    })
    
  }
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
