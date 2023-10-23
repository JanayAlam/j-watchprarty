/* eslint-disable comma-dangle */
const { model, Schema } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      maxlength: 150,
      minlength: 5,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema);

module.exports = User;
