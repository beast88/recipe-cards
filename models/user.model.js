import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

const userSchema = new Schema ({
  firstName: {type: String, required: [true, 'Please provide a first name']},
  lastName: {type: String, required: [true, 'Please provide a second name']},
  email: {type: String, required: [true, 'Please provide an email address'], unique: true},
  password: {type: String, required: [true, 'Please enter a password'], minLength: 6, select: false}
}, {
  timestamps: true,
})

userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})

const User = mongoose.model('User', userSchema)

export default User
