import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/fine.dart';

class FineRepository {
  final FirebaseFirestore _firestore;
  final String _collection = 'fines';

  FineRepository({FirebaseFirestore? firestore})
      : _firestore = firestore ?? FirebaseFirestore.instance;

  Future<void> createFine(Fine fine) async {
    await _firestore.collection(_collection).add(fine.toMap());
  }

  Stream<List<Fine>> getFinesForUser(String userId) {
    return _firestore
        .collection(_collection)
        .where('receiverId', isEqualTo: userId)
        .orderBy('createdAt', descending: true)
        .snapshots()
        .map((snapshot) {
      return snapshot.docs
          .map((doc) => Fine.fromMap(doc.id, doc.data()))
          .toList();
    });
  }

  Stream<List<Fine>> getFinesByUser(String userId) {
    return _firestore
        .collection(_collection)
        .where('senderId', isEqualTo: userId)
        .orderBy('createdAt', descending: true)
        .snapshots()
        .map((snapshot) {
      return snapshot.docs
          .map((doc) => Fine.fromMap(doc.id, doc.data()))
          .toList();
    });
  }
}
