import 'package:cloud_firestore/cloud_firestore.dart';
import '../../../profile/domain/models/user.dart' as app;

class FriendRepository {
  final FirebaseFirestore _firestore;

  FriendRepository({FirebaseFirestore? firestore})
      : _firestore = firestore ?? FirebaseFirestore.instance;

  Future<List<app.User>> searchPublicUsers(String query) async {
    if (query.isEmpty) return [];

    final usersRef = _firestore.collection('users');

    // Query for users with matching username
    final querySnapshot = await usersRef
        .where('username', isGreaterThanOrEqualTo: query.toLowerCase())
        .where('username', isLessThanOrEqualTo: '${query.toLowerCase()}\uf8ff')
        .get();

    // Filter for public profiles in memory
    return querySnapshot.docs
        .map((doc) => app.User.fromFirestore(doc))
        .where((user) => user.privacySettings.profileVisibility == 'public')
        .toList();
  }

  Future<void> sendFriendRequest(String senderId, String receiverId) async {
    final friendRequestsRef = _firestore.collection('friendRequests');

    // Check if request already exists
    final existingRequest = await friendRequestsRef
        .where('senderId', isEqualTo: senderId)
        .where('receiverId', isEqualTo: receiverId)
        .get();

    if (existingRequest.docs.isNotEmpty) {
      throw Exception('Friend request already sent');
    }

    // Create new friend request
    await friendRequestsRef.add({
      'senderId': senderId,
      'receiverId': receiverId,
      'status': 'pending',
      'createdAt': FieldValue.serverTimestamp(),
    });
  }

  Stream<List<Map<String, dynamic>>> getSentFriendRequests(String userId) {
    return _firestore
        .collection('friendRequests')
        .where('senderId', isEqualTo: userId)
        .where('status', isEqualTo: 'pending')
        .snapshots()
        .map((snapshot) => snapshot.docs.map((doc) {
              final data = doc.data();
              return {
                'id': doc.id,
                'receiverId': data['receiverId'],
                'status': data['status'],
                'createdAt': data['createdAt'],
              };
            }).toList());
  }

  Stream<List<Map<String, dynamic>>> getReceivedFriendRequests(String userId) {
    return _firestore
        .collection('friendRequests')
        .where('receiverId', isEqualTo: userId)
        .where('status', isEqualTo: 'pending')
        .snapshots()
        .map((snapshot) => snapshot.docs.map((doc) {
              final data = doc.data();
              return {
                'id': doc.id,
                'senderId': data['senderId'],
                'status': data['status'],
                'createdAt': data['createdAt'],
              };
            }).toList());
  }

  Future<app.User?> getUserById(String userId) async {
    final doc = await _firestore.collection('users').doc(userId).get();
    if (!doc.exists) return null;
    return app.User.fromFirestore(doc);
  }

  Future<void> cancelFriendRequest(String requestId) async {
    await _firestore.collection('friendRequests').doc(requestId).delete();
  }

  Future<void> acceptFriendRequest(String requestId) async {
    await _firestore.collection('friendRequests').doc(requestId).update({
      'status': 'accepted',
      'updatedAt': FieldValue.serverTimestamp(),
    });
  }

  Future<void> rejectFriendRequest(String requestId) async {
    await _firestore.collection('friendRequests').doc(requestId).update({
      'status': 'rejected',
      'updatedAt': FieldValue.serverTimestamp(),
    });
  }
}
