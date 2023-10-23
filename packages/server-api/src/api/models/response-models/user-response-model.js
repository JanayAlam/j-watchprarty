class UserResponseModel {
  constructor(user) {
    this.id = user._id;
    this.email = user.email;
    this.updatedAt = user.updatedAt;
    this.createdAt = user.createdAt;
  }
}

module.exports = UserResponseModel;
