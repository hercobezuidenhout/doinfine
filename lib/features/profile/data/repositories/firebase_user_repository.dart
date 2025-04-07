import 'package:cloud_firestore/cloud_firestore.dart';
import '../../domain/models/user.dart';
import '../../domain/repositories/user_repository.dart';

class FirebaseUserRepository implements UserRepository {
  final FirebaseFirestore _firestore;
  final String _collection = 'users';

  FirebaseUserRepository({FirebaseFirestore? firestore})
      : _firestore = firestore ?? FirebaseFirestore.instance;

  @override
  Future<User?> getUser(String uid) async {
    final doc = await _firestore.collection(_collection).doc(uid).get();
    if (!doc.exists) return null;
    return User.fromFirestore(doc);
  }

  @override
  Future<void> updateUser(User user) async {
    await _firestore
        .collection(_collection)
        .doc(user.uid)
        .update(user.toFirestore());
  }

  @override
  Future<void> createUser(User user) async {
    await _firestore
        .collection(_collection)
        .doc(user.uid)
        .set(user.toFirestore());
  }
}
