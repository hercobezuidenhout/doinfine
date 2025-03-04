import 'dart:typed_data';

import 'package:doinfine/repository/entities/user_avatar_entity.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

import '../main.dart';

class UserAvatarRepository {
  Future<UserAvatarEntity?> tryGetUserAvatarByUserId(String userId) async {
    final response = await supabase
        .from('UserAvatar')
        .select()
        .eq('id', userId)
        .maybeSingle();

    if (response == null) {
      return null;
    }

    return UserAvatarEntity.fromJson(response);
  }

  Future<void> updateUserAvatar(UserAvatarEntity userAvatar) async {
    await supabase.from('UserAvatar').upsert({
      'id': userAvatar.id,
      'avatarUrl': userAvatar.avatarUrl,
      'fileName': userAvatar.fileName
    });
  }

  Future<void> removeUserAvatarFromStorage(String fileName) async {
    await supabase.storage.from('avatars').remove([fileName]);
  }

  Future<void> uploadUserAvatar(
    Uint8List bytes,
    String filePath,
    String? mimeType,
  ) async {
    await supabase.storage.from('avatars').uploadBinary(
          filePath,
          bytes,
          fileOptions: FileOptions(contentType: mimeType),
        );
  }

  Future<String> getUserAvatarUrl(String filePath) async {
    final imageUrlResponse = await supabase.storage
        .from('avatars')
        .createSignedUrl(filePath, 60 * 60 * 24 * 365 * 10);

    return imageUrlResponse;
  }
}
