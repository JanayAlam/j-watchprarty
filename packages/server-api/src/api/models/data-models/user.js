const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    maxlength: 150,
    minlength: 5,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const User = model('User', userSchema);

module.exports = User;