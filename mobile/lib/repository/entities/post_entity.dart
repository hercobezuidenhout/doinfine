import 'package:doinfine/enums/post_type.dart';

class PostEntity {
  final String id;
  final String userId;
  final String content;
  final PostType postType;
  final DateTime createdAt;

  PostEntity({
    required this.id,
    required this.userId,
    required this.content,
    required this.postType,
    required this.createdAt,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'user_id': userId,
      'content': content,
      'post_type': postType.name,
      'created_at': createdAt.toIso8601String(),
    };
  }

  factory PostEntity.fromMap(Map<String, dynamic> map) {
    return PostEntity(
      id: map['id'] as String,
      userId: map['user_id'] as String,
      content: map['content'] as String,
      postType: PostTypeExtension.fromString(map['post_type'] as String),
      createdAt: DateTime.parse(map['created_at'] as String),
    );
  }
}
