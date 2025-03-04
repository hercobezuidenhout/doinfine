import 'package:doinfine/main.dart';
import 'package:doinfine/models/detailed_friend_request.dart';
import 'package:doinfine/models/profile.dart';
import 'package:doinfine/repository/entities/friend_request_entity.dart';
import 'package:doinfine/repository/friend_request_repository.dart';
import 'package:doinfine/repository/friends_repository.dart';
import 'package:doinfine/repository/profile_repository.dart';
import 'package:doinfine/services/auth_service.dart';

class FriendsService {
  final _authService = AuthService();
  final _friendsRepository = FriendsRepository();
  final _friendRequestRepository = FriendRequestRepository();
  final _profileRepository = ProfileRepository();

  Future<List<Profile>> getAllFriends(String userId) async {
    final friends = await _friendsRepository.findFriendsByUserId(userId);
    return friends
        .map((friend) => Profile(id: friend.id, fullname: friend.fullname))
        .toList();
  }

  Future<List<Profile>> getUserFriends(String query) async {
    final userId = _authService.getCurrentUserId();
    final friends =
        await _friendsRepository.findFriendsWhereQuery(userId, query);
    return friends
        .map((friend) => Profile(id: friend.id, fullname: friend.fullname))
        .toList();
  }

  Future<void> sendFriendRequest(String receiverId) async {
    try {
      final userId = _authService.getCurrentUserId();
      await _friendRequestRepository.createFriendRequest(userId, receiverId);
    } catch (e) {
      rethrow;
    }
  }

  Future<List<Profile>> searchAllUsers(String query) async {
    try {
      final data = await _profileRepository.getAllBySearchQuery(query);

      return data.map((friend) {
        return Profile(
          id: friend['id'],
          fullname: friend['fullname'],
        );
      }).toList();
    } catch (e) {
      rethrow;
    }
  }

  Future<List<DetailedFriendRequest>> getUserRequests() async {
    String userId = supabase.auth.currentUser!.id;

    final response =
        await _friendRequestRepository.getFriendRequestsByUserId(userId);

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

  Future<void> acceptFriendRequest(String requestId) async {
    final data = await _friendRequestRepository.getFriendRequestById(requestId);

    final friendRequest = FriendRequestEntity.fromJson(data);

    var userHasFriend = await _friendsRepository.getUserFriend(
        friendRequest.receiverId, friendRequest.senderId);

    var userIsFriend = await _friendsRepository.getUserFriend(
        friendRequest.senderId, friendRequest.receiverId);

    if (userHasFriend == null && userIsFriend == null) {
      await _friendsRepository.createUserFriend(
          friendRequest.receiverId, friendRequest.senderId);

      await _friendRequestRepository.removeFriendRequest(friendRequest.id);

      final otherRequest = await _friendRequestRepository.getFriendRequestByIds(
          friendRequest.receiverId, friendRequest.senderId);

      if (otherRequest != null) {
        await _friendRequestRepository.removeFriendRequest(otherRequest.id);
      }
    }
  }

  Future<void> cancelFriendRequest(String requestId) async {
    await _friendRequestRepository.removeFriendRequest(requestId);
  }
}
