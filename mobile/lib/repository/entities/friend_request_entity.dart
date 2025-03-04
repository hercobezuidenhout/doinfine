class FriendRequestEntity {
  final String id;
  final DateTime createdAt;
  final String senderId;
  final String receiverId;

  FriendRequestEntity(
    this.id,
    this.createdAt,
    this.senderId,
    this.receiverId,
  );

  factory FriendRequestEntity.fromJson(Map<String, dynamic> json) {
    return FriendRequestEntity(
      json['id'],
      DateTime.parse(json['created_at']),
      json['sender_id'],
      json['receiver_id'],
    );
  }
}
