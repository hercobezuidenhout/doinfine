import 'package:doinfine/models/profile.dart';

class DetailedFriendRequest {
  final String id;
  final DateTime createdAt;
  final Profile sender;
  final Profile receiver;

  DetailedFriendRequest({
    required this.id,
    required this.createdAt,
    required this.sender,
    required this.receiver,
  });

  factory DetailedFriendRequest.fromJson(Map<String, dynamic> json,
      {required Profile sender, required Profile receiver}) {
    return DetailedFriendRequest(
      id: json['id'],
      createdAt: DateTime.parse(json['created_at']),
      sender: sender,
      receiver: receiver,
    );
  }
}
