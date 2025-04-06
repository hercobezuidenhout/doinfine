import 'package:doinfine/enums/post_type.dart';
import 'package:doinfine/main.dart';
import 'package:doinfine/models/enriched_post.dart';
import 'package:doinfine/models/fine.dart';
import 'package:doinfine/models/profile.dart';
import 'package:doinfine/models/post_meta_data.dart';

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

  Future<List<EnrichedPost>> fetchPostsByUserId({
    required String userId,
  }) async {
    try {
      final userCreatedPosts = await supabase.from('posts').select('''
      id,
      content,
      post_type,
      created_at,
      user_id,
      users(fullname),
      fines (
        issued_to_id,
        users(fullname)
      )
    ''').eq('user_id', userId);

      print('User created posts: $userCreatedPosts');

      final userReceivedPosts = await supabase.from('fines').select('''
      id,
      issued_to_id,
      users(fullname),
      posts(*, users(fullname))
    ''').eq('issued_to_id', userId);

      var response = userCreatedPosts + userReceivedPosts;

      return _convertToEnrichedPosts(response);
    } catch (error) {
      print('Error fetching posts: $error');
    }

    return [];
  }

  List<EnrichedPost> _convertToEnrichedPosts(List<Map<String, dynamic>> posts) {
    return posts.map((post) {
      // Handle posts created by the user
      if (post['fines'] != null) {
        final user = post['users'] as Map<String, dynamic>;
        final fine = post['fines'] as Map<String, dynamic>;
        return EnrichedPost(
          id: post['id'],
          user: Profile(
            id: post['user_id'],
            fullname: user['fullname'],
          ),
          content: post['content'],
          postType: PostType.values.firstWhere(
            (type) => type.name == post['post_type'],
            orElse: () => PostType.fine,
          ),
          createdAt: DateTime.parse(post['created_at']),
          metaData: Fine(
            issuedTo: Profile(
              id: fine['issued_to_id'],
              fullname: fine['users']['fullname'],
            ),
          ),
        );
      }

      // Handle posts received by the user (fines)
      if (post['posts'] != null) {
        final postData = post['posts'] as Map<String, dynamic>;
        return EnrichedPost(
          id: post['id'],
          user: Profile(
            id: postData['user_id'],
            fullname: postData['users']['fullname'],
          ),
          content: postData['content'],
          postType: PostType.values.firstWhere(
            (type) => type.name == postData['post_type'],
            orElse: () => PostType.fine,
          ),
          createdAt: DateTime.parse(postData['created_at']),
          metaData: Fine(
            issuedTo: Profile(
              id: post['issued_to_id'],
              fullname: post['users']['fullname'],
            ),
          ),
        );
      }

      // Fallback for any other post types
      return EnrichedPost(
        id: post['id'],
        user: Profile(
          id: post['user_id'],
          fullname: '', // This should be populated from user data
        ),
        content: post['content'],
        postType: PostType.values.firstWhere(
          (type) => type.name == post['post_type'],
          orElse: () => PostType.fine,
        ),
        createdAt: DateTime.parse(post['created_at']),
        metaData: PostMetaData(),
      );
    }).toList();
  }
}
