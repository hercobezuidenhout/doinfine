class Profile {
  final String id;
  final String fullname;

  Profile({
    required this.id,
    required this.fullname,
  });

  factory Profile.fromJson(Map<String, dynamic> json) {
    return Profile(
      id: json['id'],
      fullname: json['fullname'],
    );
  }
}
