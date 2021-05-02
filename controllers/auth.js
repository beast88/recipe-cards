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

const login = async (req, res, next) => {
  const {email, password} = req.body

  if(!email || !password) {
    res.status(400).json({
      title: 'Missing credentials',
      error: 'Please provide an email and password'
    })
  }

  try {
    const user = await User.findOne({ email }).select('+password')

    if(!user) {
      res.status(404).json({
        title: 'Invalid credentials',
        error: 'Invalid credentials'
      })
    }

    const isMatch = await user.matchPasswords(password)

    if(!isMatch) {
      res.status(404).json({
        title: 'Invalid credentials'
      })
    }

    res.status(200).json({
      title: 'Logged in',
      user: user
    })
  } catch (err) {
    res.status(500).json({
      title: 'error',
      error: err.message
    })
  }
}

const forgotpassword = (req, res, next) => {
  res.send('Forgot Password Route')
}

const resetpassword = (req, res, next) => {
  res.send('Reset Password Route')
}

export {register, login, forgotpassword, resetpassword}
