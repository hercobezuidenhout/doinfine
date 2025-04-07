import '../models/user.dart';

abstract class UserRepository {
  Future<User?> getUser(String uid);
  Future<void> updateUser(User user);
  Future<void> createUser(User user);
}
