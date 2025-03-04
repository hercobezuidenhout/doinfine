import 'package:doinfine/main.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class FriendRequestRepository {
  final _tableName = 'friend_requests';

  Future<void> createFriendRequest(String userId, String receiverId) async {
    await supabase.from(_tableName).insert({
      'sender_id': supabase.auth.currentUser!.id,
      'receiver_id': receiverId
    });
  }

  Future<PostgrestList> getFriendRequestsByUserId(String userId) async {
    return await supabase
        .from(_tableName)
        .select(
            'id, created_at, sender: sender_id (id, fullname), receiver: receiver_id (id, fullname)')
        .or('receiver_id.eq.$userId, sender_id.eq.$userId')
        .order('created_at', ascending: false);
  }

  Future getFriendRequestById(String requestId) async {
    return await supabase
        .from(_tableName)
        .select('sender_id, receiver_id')
        .eq('id', requestId)
        .single();
  }
}
