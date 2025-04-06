import 'package:doinfine/enums/post_type.dart';
import 'package:doinfine/repository/fine_repository.dart';
import 'package:doinfine/repository/post_repository.dart';
import 'package:doinfine/services/auth_service.dart';
import 'package:doinfine/models/enriched_post.dart';

class PostService {
  final _authService = AuthService();
  final _postRepository = PostRepository();
  final _fineRepository = FineRepository();

  Future<List<EnrichedPost>> fetchUserFeed() async {
    final userId = _authService.getCurrentUserId();
    return await _postRepository.fetchPostsByUserId(userId: userId);
  }

  Future<void> fineSomeone({
    required String someoneId,
    required String content,
  }) async {
    final userId = _authService.getCurrentUserId();

    String postId = await _postRepository.createPost(
      userId: userId,
      content: content,
      postType: PostType.fine,
    );

    await _fineRepository.createFine(postId: postId, issuedToId: someoneId);
  }
}
