import 'package:cloud_firestore/cloud_firestore.dart';

enum PostType {
  fine,
  challenge,
  completedChallenge,
}

class Post {
  final String id;
  final String userId;
  final String description;
  final DateTime createdAt;
  final PostType type;
  final Map<String, dynamic> metadata;

  Post({
    required this.id,
    required this.userId,
    required this.description,
    required this.createdAt,
    required this.type,
    required this.metadata,
  });

  Map<String, dynamic> toMap() {
    return {
      'userId': userId,
      'description': description,
      'createdAt': Timestamp.fromDate(createdAt),
      'type': type.toString().split('.').last,
      'metadata': metadata,
    };
  }

  factory Post.fromMap(String id, Map<String, dynamic> map) {
    return Post(
      id: id,
      userId: map['userId'] as String,
      description: map['description'] as String,
      createdAt: (map['createdAt'] as Timestamp).toDate(),
      type: PostType.values.firstWhere(
        (e) => e.toString().split('.').last == map['type'],
        orElse: () => PostType.fine,
      ),
      metadata: map['metadata'] as Map<String, dynamic>,
    );
  }
}
