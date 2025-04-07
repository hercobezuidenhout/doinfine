import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../../domain/models/user.dart' as app;
import '../../domain/repositories/user_repository.dart';

class FirebaseUserRepository implements UserRepository {
  final FirebaseFirestore _firestore;
  final FirebaseAuth _auth;

  FirebaseUserRepository({
    FirebaseFirestore? firestore,
    FirebaseAuth? auth,
  })  : _firestore = firestore ?? FirebaseFirestore.instance,
        _auth = auth ?? FirebaseAuth.instance;

  @override
  Future<app.User?> getUser(String uid) async {
    try {
      final doc = await _firestore.collection('users').doc(uid).get();

      if (!doc.exists) {
        // Get the current user's email from Firebase Auth
        final currentUser = _auth.currentUser;
        final email = currentUser?.email ?? '';

        // Create default username from email (everything before @)
        final defaultUsername = email.split('@')[0].toLowerCase();

        // Create a new user with default values
        final newUser = app.User(
          uid: uid,
          username: defaultUsername,
          fullName: '',
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
          badges: [],
          privacySettings: app.PrivacySettings(
            profileVisibility: 'public',
            postVisibility: 'public',
          ),
        );

        // Save the new user to Firestore
        await createUser(newUser);
        return newUser;
      }

      return app.User.fromFirestore(doc);
    } catch (e) {
      throw Exception('Failed to load user: $e');
    }
  }

  @override
  Future<void> updateUser(app.User user) async {
    try {
      await _firestore
          .collection('users')
          .doc(user.uid)
          .update(user.toFirestore());
    } catch (e) {
      throw Exception('Failed to update user: $e');
    }
  }

  @override
  Future<void> createUser(app.User user) async {
    try {
      await _firestore
          .collection('users')
          .doc(user.uid)
          .set(user.toFirestore());
    } catch (e) {
      throw Exception('Failed to create user: $e');
    }
  }
}
