import 'package:doinfine/main.dart';
import 'package:doinfine/models/profile.dart';
import 'package:doinfine/repository/entities/user_entity.dart';

class ProfileRepository {
  Future<UserEntity> getUserById(String userId) async {
    var data = await supabase.from('User').select().eq('id', userId).single();
    return UserEntity.fromJson(data);
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
