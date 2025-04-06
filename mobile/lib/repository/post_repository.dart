import 'package:doinfine/enums/post_type.dart';
import 'package:doinfine/main.dart';

class PostRepository {
  final _tableName = 'posts';

  Future<String> createPost({
    required String userId,
    required String content,
    required PostType postType,
  }) async {
    final postInsert = await supabase
        .from(_tableName)
        .insert({
          'user_id': userId,
          'content': content,
          'post_type': postType.name,
        })
        .select()
        .single();

    return postInsert['id'] as String;
  }
}
