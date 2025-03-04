import 'package:doinfine/models/profile.dart';
import 'package:doinfine/repository/profile_repository.dart';

class ProfileService {
  final ProfileRepository _profileRepository = ProfileRepository();

  Future<void> checkAndCreateUser(String userId) async {
    var defaultFullname = 'Doinfiner';

    var user = await _profileRepository.tryAndGetUserById(userId);

    if (user == null) {
      await _profileRepository.create(userId, defaultFullname);
    }
  }

  Future<Profile> getUserProfile(String userId) async {
    final user = await _profileRepository.getUserById(userId);

    return Profile(
      id: userId,
      fullname: user.fullname,
    );
  }

  Future<void> updateUserProfile(Profile newProfile) async {
    await _profileRepository.update(newProfile);
  }
}
