import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/post.dart';
import '../../../friends/domain/repositories/friend_repository.dart';

class PostRepository {
  final _firestore = FirebaseFirestore.instance;
  final _postsCollection = 'posts';
  final _friendRepository = FriendRepository();

  Future<void> createPost(Post post) async {
    await _firestore.collection(_postsCollection).add(post.toMap());
  }

  Stream<List<Post>> getPostsForUser(String userId) {
    return _firestore
        .collection(_postsCollection)
        .where('userId', isEqualTo: userId)
        .orderBy('createdAt', descending: true)
        .snapshots()
        .map((snapshot) => snapshot.docs
            .map((doc) => Post.fromMap(doc.id, doc.data()))
            .toList());
  }

  Stream<List<Post>> getPostsByType(String userId, PostType type) {
    return _firestore
        .collection(_postsCollection)
        .where('userId', isEqualTo: userId)
        .where('type', isEqualTo: type.toString().split('.').last)
        .orderBy('createdAt', descending: true)
        .snapshots()
        .map((snapshot) => snapshot.docs
            .map((doc) => Post.fromMap(doc.id, doc.data()))
            .toList());
  }

  Stream<List<Post>> getRelatedPosts(String userId) async* {
    // Get user's friends
    final friends = await _friendRepository.getFriends(userId).first;
    final friendIds = friends.map((f) => f.uid).toList();

    // Get posts where:
    // 1. User is the author
    // 2. User has been fined
    // 3. User's friends have been fined (and either user or mutual friend is author)
    final postsQuery = _firestore
        .collection(_postsCollection)
        .where('type', isEqualTo: PostType.fine.toString().split('.').last)
        .orderBy('createdAt', descending: true);

    await for (final snapshot in postsQuery.snapshots()) {
      final posts =
          snapshot.docs.map((doc) => Post.fromMap(doc.id, doc.data())).toList();

      // Filter posts based on criteria
      final relatedPosts = posts.where((post) {
        // User is author
        if (post.userId == userId) return true;

        // User has been fined
        if (post.metadata['issuedToId'] == userId) return true;

        // Friend has been fined
        if (friendIds.contains(post.metadata['issuedToId'])) {
          // Check if author is user or mutual friend
          if (post.userId == userId) return true;
          return friendIds.contains(post.userId);
        }

        return false;
      }).toList();

      yield relatedPosts;
    }
  }
}
