import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema ({
  firstName: {type: String, required: [true, 'Please provide a first name']},
  lastName: {type: String, required: [true, 'Please provide a second name']},
  email: {type: String, required: [true, 'Please provide an email address'], unique: true},
  password: {type: String, required: [true, 'Please enter a password'], minLength: 6, select: false}
}, {
  timestamps: true,
})

const User = mongoose.model('User', userSchema)

export default User
