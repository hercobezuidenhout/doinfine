import 'package:flutter/foundation.dart';
import '../../domain/models/user.dart';
import '../../domain/repositories/user_repository.dart';

class ProfileProvider with ChangeNotifier {
  final UserRepository _userRepository;
  User? _user;
  bool _isLoading = false;
  String? _error;

  ProfileProvider(this._userRepository);

  User? get user => _user;
  bool get isLoading => _isLoading;
  String? get error => _error;

  Future<void> loadUser(String uid) async {
    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      _user = await _userRepository.getUser(uid);
      if (_user == null) {
        _error = 'User not found';
      }
    } catch (e) {
      _error = 'Failed to load user: ${e.toString()}';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> updateProfile({
    String? fullName,
    String? username,
  }) async {
    if (_user == null) return;

    _isLoading = true;
    _error = null;
    notifyListeners();

    try {
      final updatedUser = _user!.copyWith(
        fullName: fullName,
        username: username,
      );
      await _userRepository.updateUser(updatedUser);
      _user = updatedUser;
    } catch (e) {
      _error = 'Failed to update profile: ${e.toString()}';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
