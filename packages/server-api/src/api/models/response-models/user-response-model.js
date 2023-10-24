class UserResponseModel {
  constructor(user) {
    this.id = user._id;
    this.email = user.email;
    this.updatedAt = user.updatedAt;
    this.createdAt = user.createdAt;
    if (user.profile) this.profile = user.profile;
  }
}

module.exports = UserResponseModel;
