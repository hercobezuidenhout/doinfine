import 'package:firebase_auth/firebase_auth.dart' hide User;
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

  Future<void> signInWithEmailAndPassword(String email, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      await _auth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );
    } catch (e) {
      _error = e.toString();
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
          username: _generateUsername(email),
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
    } catch (e) {
      _error = e.toString();
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
      _error = e.toString();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  String _generateUsername(String email) {
    // Generate a random username from color + animal + action
    final colors = ['Red', 'Blue', 'Green', 'Purple', 'Yellow', 'Orange'];
    final animals = ['Lion', 'Tiger', 'Bear', 'Wolf', 'Eagle', 'Fox'];
    final actions = [
      'Runner',
      'Jumper',
      'Dancer',
      'Singer',
      'Player',
      'Wrangler'
    ];

    final color = colors[DateTime.now().microsecond % colors.length];
    final animal = animals[DateTime.now().millisecond % animals.length];
    final action = actions[DateTime.now().second % actions.length];

    return '$color$animal$action'.toLowerCase();
  }
}
