import User from '../models/user.model.js'
import sendEmail from '../utils/sendEmail.js'
import crypto from 'crypto'

const register = async (req, res, next) => {
  const {firstName, lastName, email, password} = req.body

  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password
    })

    sendToken(newUser, 201, res)

  } catch (err) {
    res.status(500).json({
      title: 'Error',
      error: err
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
      res.status(401).json({
        title: 'Invalid credentials',
        error: 'Invalid credentials'
      })
    }

    const isMatch = await user.matchPasswords(password)

    if(!isMatch) {
      res.status(401).json({
        title: 'Invalid credentials'
      })
    }

    sendToken(user, 200, res)

  } catch (err) {
    res.status(500).json({
      title: 'error',
      error: err
    })
  }
}

const forgotpassword = async (req, res, next) => {
  const { email } = req.body

  try {
    const user = await User.findOne({email})

    if(!user) {
      res.status(404).json({
        title: 'Email could not be sent'
      })
    }

    const resetPasswordToken = user.getResetPasswordToken()

    await user.save()

    const resetUrl = `https://cryptic-springs-38989.herokuapp.com/user/passwordreset/${resetPasswordToken}`

    const message = `
      <h1>Password reset request</h1>
      <p>Click the link to change your password</p>
      <a href="${resetUrl}" clicktracking=off >Reset Password</a>
    `

    try {
      await sendEmail({
        to: user.email,
        subject: 'Password Reset Request',
        text: message
      })

      res.status(200).json({
        title: 'Email sent'
      })

    } catch (error) {
      user.resetPasswordToken = undefined
      user.resetExpiration = undefined

      await user.save()

      res.status(500).json({
        title: 'Email could not be sent'
      })
    }
    
  } catch (err) {
    res.status(500).json({
      title: 'Email could not be sent'
    })
  }
}

const resetpassword = async (req, res, next) => {
  const resetToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex')

  try {
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetExpiration: { $gt: Date.now() },
    })

    if(!user) {
      res.status(400).json({
        title: 'Invalid token',
        message: 'User cannot be found'
      })
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetExpiration = undefined

    await user.save()

    res.status(201).json({
      title: 'Password has been reset'
    })

  } catch (error) {
    res.status(500).json({
      title: 'Error',
      message: 'Something went wrong'
    })    
  }
}

const sendToken = (user, status, res) => {
  const token = user.getToken()
  res.status(status).json({
    title: 'Success',
    token: token
  })
}

export {register, login, forgotpassword, resetpassword}
