/* eslint-disable comma-dangle */
const { model, Schema } = require('mongoose');

const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      maxlength: 30,
      minlength: 2,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: 30,
      minlength: 2,
      required: true,
    },
    profilePhoto: {
      type: String,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Profile = model('Profile', profileSchema);

module.exports = Profile;
