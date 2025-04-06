import 'package:doinfine/enums/post_type.dart';
import 'package:doinfine/models/post_meta_data.dart';
import 'package:doinfine/models/profile.dart';

class EnrichedPost {
  final String id;
  final Profile user;
  final String content;
  final PostType postType;
  final DateTime createdAt;
  final PostMetaData? metaData;

  EnrichedPost({
    required this.id,
    required this.user,
    required this.content,
    required this.postType,
    required this.createdAt,
    this.metaData,
  });
}
