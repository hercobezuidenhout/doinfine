import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';
import '../../../profile/domain/models/user.dart' as app;
import '../../../profile/domain/repositories/user_repository.dart';

class AuthProvider with ChangeNotifier {
  final FirebaseAuth _auth;
  final UserRepository _userRepository;
  bool _isLoading = false;
  String? _error;
  User? _user;

  AuthProvider({
    FirebaseAuth? auth,
    required UserRepository userRepository,
  })  : _auth = auth ?? FirebaseAuth.instance,
        _userRepository = userRepository {
    _init();
  }

  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isAuthenticated => _user != null;
  User? get user => _user;

  void _init() {
    _auth.authStateChanges().listen((User? user) {
      _user = user;
      notifyListeners();
    });
  }

  String _getErrorMessage(FirebaseAuthException e) {
    switch (e.code) {
      case 'email-already-in-use':
        return 'This email is already registered. Please sign in or use a different email.';
      case 'invalid-email':
        return 'The email address is not valid.';
      case 'operation-not-allowed':
        return 'Email/password accounts are not enabled. Please contact support.';
      case 'weak-password':
        return 'The password is too weak. Please use a stronger password.';
      case 'user-disabled':
        return 'This account has been disabled. Please contact support.';
      case 'user-not-found':
        return 'No account found with this email. Please register first.';
      case 'wrong-password':
        return 'Incorrect password. Please try again.';
      case 'too-many-requests':
        return 'Too many attempts. Please try again later.';
      default:
        return 'An error occurred. Please try again later.';
    }
  }

  Future<void> signInWithEmailAndPassword(String email, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
    } on FirebaseAuthException catch (e) {
      _error = _getErrorMessage(e);
    } catch (e) {
      _error = 'An unexpected error occurred. Please try again.';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> createUserWithEmailAndPassword(
      String email, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final userCredential = await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );

      // Create user profile
      if (userCredential.user != null) {
        final newUser = app.User(
          uid: userCredential.user!.uid,
          username: email.split('@')[0].toLowerCase(),
          fullName: '',
          createdAt: DateTime.now(),
          updatedAt: DateTime.now(),
          badges: [],
          privacySettings: app.PrivacySettings(
            profileVisibility: 'public',
            postVisibility: 'public',
          ),
        );

        await _userRepository.createUser(newUser);
      }
    } on FirebaseAuthException catch (e) {
      _error = _getErrorMessage(e);
    } catch (e) {
      _error = 'An unexpected error occurred. Please try again.';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> signOut() async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await _auth.signOut();
    } catch (e) {
      _error = 'An unexpected error occurred. Please try again.';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
