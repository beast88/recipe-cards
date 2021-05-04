import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const Schema = mongoose.Schema

const userSchema = new Schema ({
  firstName: {type: String, required: [true, 'Please provide a first name']},
  lastName: {type: String, required: [true, 'Please provide a second name']},
  email: {type: String, required: [true, 'Please provide an email address'], unique: true},
  password: {type: String, required: [true, 'Please enter a password'], minLength: 6, select: false},
  resetPasswordToken: String,
  resetExpiration: Date
}, {
  timestamps: true,
})

userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.matchPasswords = async function(password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.getToken = function() {
  return jwt.sign({id: this._id}, 'secret_key', {expiresIn: process.env.LOGIN_EXPIRES})
}

userSchema.methods.getResetPasswordToken = function() {
  const resetToken = crypto.randomBytes(20).toString('hex')

  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  this.resetExpiration = Date.now() + 10 * (60 * 1000)

  return resetToken
}

const User = mongoose.model('User', userSchema)

export default User
