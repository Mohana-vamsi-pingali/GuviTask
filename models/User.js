import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide Name'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide Email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid Email',
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide Password'],
    minlength: 6,
    select: false,
  },
  dob: {
    type: String,
    required: [true, 'Please provide Date Of Birth'],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  mobile: {
    type: String,
    required: [true, 'Please provide Mobile'],
    minlength: 10,
    maxlength: 20,
    trim: true,
  },
  gender: {
    type: String,
    required: [true, 'Please provide Gender'],
    minlength: 4,
    maxlength: 6,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'lastName',
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'my city',
  },
})

UserSchema.pre('save', async function () {
  // console.log(this.modifiedPaths())
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

export default mongoose.model('User', UserSchema)
