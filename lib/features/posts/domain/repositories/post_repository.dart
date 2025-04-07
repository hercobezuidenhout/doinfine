import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/post.dart';

class PostRepository {
  final _firestore = FirebaseFirestore.instance;
  final _postsCollection = 'posts';

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
}
