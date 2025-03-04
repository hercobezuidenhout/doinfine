class UserEntity {
  final String id;
  final String fullname;
  final DateTime createdAt;

  UserEntity(this.id, this.fullname, this.createdAt);

  factory UserEntity.fromJson(Map<String, dynamic> json) => UserEntity(
        json['id'],
        json['fullname'],
        DateTime.parse(json['created_at']),
      );
}
