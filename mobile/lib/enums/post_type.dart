enum PostType { fine }

extension PostTypeExtension on PostType {
  String get name => toString().split('.').last;

  static PostType fromString(String value) {
    return PostType.values.firstWhere(
      (postType) => postType.name == value,
      orElse: () => PostType.fine,
    );
  }
}
