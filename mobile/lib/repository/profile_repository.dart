import 'package:doinfine/main.dart';
import 'package:doinfine/models/profile.dart';
import 'package:doinfine/repository/entities/user_entity.dart';

class ProfileRepository {
  Future<UserEntity> getUserById(String userId) async {
    var data = await supabase.from('users').select().eq('id', userId).single();
    return UserEntity.fromJson(data);
  }

  Future<Map<String, dynamic>?> tryAndGetUserById(String userId) async {
    var data =
        await supabase.from('users').select().eq('id', userId).maybeSingle();
    return data;
  }

  Future<void> create(String userId, String fullname) async {
    final newUser = {
      'id': userId,
      'fullname': fullname,
    };

    await supabase.from('users').insert(newUser);
  }

  Future<void> update(Profile profile) async {
    final updates = {
      'id': profile.id,
      'username': profile.username,
      'fullname': profile.fullname
    };
    await supabase.from('User').upsert(updates);
  }
}
