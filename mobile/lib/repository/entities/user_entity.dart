class UserEntity {
  final String id;
  final String fullname;
  final String username;
  final DateTime createdAt;

  UserEntity(this.id, this.fullname, this.username, this.createdAt);

  factory UserEntity.fromJson(Map<String, dynamic> json) => UserEntity(
        json['id'],
        json['fullname'],
        json['username'],
        DateTime.parse(json['createdAt']),
      );
}
