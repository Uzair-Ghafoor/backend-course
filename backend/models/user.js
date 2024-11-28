import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'user'],
  },
});

// userSchema.methods.token = function (id) {
//   this;
//   return jwt.sign({ id: id }, 'asdfadfasdfa');
// };

// userSchema.method.comparePassword = function () {
//   return this.password === this.confrmPassword;
// };

const User = mongoose.model('User', userSchema);

export default User;
