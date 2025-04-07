import 'package:cloud_firestore/cloud_firestore.dart';

class Fine {
  final String id;
  final String description;
  final String senderId;
  final String receiverId;
  final DateTime createdAt;
  final bool isPrivate;

  Fine({
    required this.id,
    required this.description,
    required this.senderId,
    required this.receiverId,
    required this.createdAt,
    this.isPrivate = true,
  });

  Map<String, dynamic> toMap() {
    return {
      'description': description,
      'senderId': senderId,
      'receiverId': receiverId,
      'createdAt': Timestamp.fromDate(createdAt),
      'isPrivate': isPrivate,
    };
  }

  factory Fine.fromMap(String id, Map<String, dynamic> map) {
    return Fine(
      id: id,
      description: map['description'] as String,
      senderId: map['senderId'] as String,
      receiverId: map['receiverId'] as String,
      createdAt: (map['createdAt'] as Timestamp).toDate(),
      isPrivate: map['isPrivate'] as bool? ?? true,
    );
  }
}
