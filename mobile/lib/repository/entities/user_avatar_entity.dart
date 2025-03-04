class UserAvatarEntity {
  final String id;
  final String avatarUrl;
  final String fileName;
  final DateTime createdAt;
  final DateTime updatedAt;

  UserAvatarEntity(
      this.id, this.avatarUrl, this.fileName, this.createdAt, this.updatedAt);

  factory UserAvatarEntity.fromJson(Map<String, dynamic> json) =>
      UserAvatarEntity(
        json['id'],
        json['avatarUrl'],
        json['fileName'],
        DateTime.parse(json['createdAt']),
        DateTime.parse(json['updatedAt']),
      );
}
