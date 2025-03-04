import 'package:doinfine/main.dart';
import 'package:doinfine/repository/entities/user_entity.dart';

class FriendsRepository {
  final _tableName = 'user_friends';

  Future<List<UserEntity>> findFriendsByUserId(String userId) async {
    var data = await supabase
        .from(_tableName)
        .select('users!user_friends_friend_id_fkey(id, fullname, created_at)')
        .eq('user_id', userId);

    var friends =
        data.map((item) => UserEntity.fromJson(item['users'])).toList();

    return friends;
  }
}
