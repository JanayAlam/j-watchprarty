const { isValidObjectId } = require('mongoose');
const UserResponseModel = require('./user-response-model');

class ProfileResponseModel {
  constructor(profile) {
    this.id = profile._id;
    this.firstName = profile.firstName;
    this.lastName = profile.lastName;
    this.profilePhoto = profile.profilePhoto;
    this.user = isValidObjectId(profile.user)
      ? profile.user
      : new UserResponseModel(profile.user);
    this.updatedAt = profile.updatedAt;
    this.createdAt = profile.createdAt;
  }
}

module.exports = ProfileResponseModel;
