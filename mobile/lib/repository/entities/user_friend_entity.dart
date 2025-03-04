class UserFriendEntity {
  final String userId;
  final String friendId;
  final String createdAt;

  UserFriendEntity(this.userId, this.friendId, this.createdAt);

  factory UserFriendEntity.fromJson(Map<String, dynamic> json) {
    return UserFriendEntity(
      json['user_id'],
      json['friend_id'],
      json['created_at'],
    );
  }
}
