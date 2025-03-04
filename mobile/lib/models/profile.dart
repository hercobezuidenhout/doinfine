class Profile {
  final String id;
  final String fullname;
  final String username;
  final String? avatarUrl;

  Profile({
    required this.id,
    required this.fullname,
    required this.username,
    this.avatarUrl,
  });

  factory Profile.fromJson(Map<String, dynamic> json) {
    return Profile(
      id: json['id'],
      fullname: json['fullname'],
      username: json['username'],
    );
  }
}
