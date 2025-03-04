import 'package:doinfine/main.dart';
import 'package:doinfine/models/detailed_friend_request.dart';
import 'package:doinfine/models/profile.dart';

class FriendsService {
  Future<void> sendFriendRequest(String receiverId) async {
    try {
      await supabase.from('FriendRequest').insert({
        'senderId': supabase.auth.currentUser!.id,
        'receiverId': receiverId,
        'status': 'PENDING',
      });

      print('Friend request sent successfully!');
    } catch (e) {
      rethrow;
    }
  }

  Future<List<Profile>> searchAllUsers(String query) async {
    try {
      final data = await supabase
          .from('User')
          .select('id, fullname, username')
          .ilike('fullname', '%$query%')
          .or('username.ilike.%$query%')
          .limit(10);

      return data.map((friend) {
        return Profile(
          id: friend['id'],
          fullname: friend['fullname'],
          username: friend['username'],
        );
      }).toList();
    } catch (e) {
      rethrow;
    }
  }

  Future<List<DetailedFriendRequest>> getUserRequests() async {
    String userId = supabase.auth.currentUser!.id;

    final response = await supabase
        .from('FriendRequest')
        .select(
            'id, status, createdAt, sender: senderId (id, fullname, username), receiver: receiverId (id, fullname, username)')
        .or('receiverId.eq.$userId, senderId.eq.$userId')
        .order('createdAt', ascending: false);

    return response
        .map(
          (entry) => DetailedFriendRequest.fromJson(
            entry,
            sender: Profile.fromJson(entry['sender']),
            receiver: Profile.fromJson(
              entry['receiver'],
            ),
          ),
        )
        .toList();
  }
}
