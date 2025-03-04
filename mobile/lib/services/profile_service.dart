import 'dart:typed_data';

import 'package:doinfine/models/profile.dart';
import 'package:doinfine/repository/entities/user_avatar_entity.dart';
import 'package:doinfine/repository/profile_repository.dart';
import 'package:doinfine/repository/user_avatar_repository.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class ProfileService {
  final ProfileRepository _profileRepository = ProfileRepository();
  final UserAvatarRepository _userAvatarRepository = UserAvatarRepository();

  Future<void> checkAndCreateUser(String userId) async {
    var defaultFullname = 'Doinfiner';

    var user = await _profileRepository.tryAndGetUserById(userId);

    if (user == null) {
      await _profileRepository.create(userId, defaultFullname);
    }
  }

  Future<Profile> getUserProfile(String userId) async {
    final user = await _profileRepository.getUserById(userId);

    final userAvatar =
        await _userAvatarRepository.tryGetUserAvatarByUserId(userId);

    return Profile(
      id: userId,
      fullname: user.fullname,
      username: user.username,
      avatarUrl: userAvatar?.avatarUrl ?? '',
    );
  }

  Future<void> updateUserProfile(Profile newProfile) async {
    await _profileRepository.update(newProfile);
  }

  Future<String> uploadUserAvatar(
      Uint8List bytes, String filePath, String? mimeType) async {
    await _userAvatarRepository.uploadUserAvatar(bytes, filePath, mimeType);
    return await _userAvatarRepository.getUserAvatarUrl(filePath);
  }

  Future<void> updateUserAvatar(
    String userId,
    String imageUrl,
    String filePath,
  ) async {
    var userAvatar =
        await _userAvatarRepository.tryGetUserAvatarByUserId(userId);

    if (userAvatar != null) {
      try {
        _userAvatarRepository.removeUserAvatarFromStorage(userAvatar.fileName);
      } on StorageException catch (error) {
        print('Failed to remove $userAvatar.fileName due toe $error');
      }
    }

    userAvatar = UserAvatarEntity(
      userId,
      imageUrl,
      filePath,
      DateTime.now(),
      DateTime.now(),
    );

    await _userAvatarRepository.updateUserAvatar(userAvatar);
  }
}
