import 'package:doinfine/components/molecules/received_friend_request_list_item.dart';
import 'package:doinfine/components/molecules/sent_friend_request_list_item.dart';
import 'package:doinfine/models/detailed_friend_request.dart';
import 'package:doinfine/services/auth_service.dart';
import 'package:flutter/material.dart';

class FriendRequestsTabview extends StatefulWidget {
  final List<DetailedFriendRequest> friendRequests;
  final Function() onRefreshRequestsClick;

  const FriendRequestsTabview(
      {super.key,
      required this.friendRequests,
      required this.onRefreshRequestsClick});

  @override
  State<FriendRequestsTabview> createState() => _FriendRequestsTabviewState();
}

class _FriendRequestsTabviewState extends State<FriendRequestsTabview> {
  final _authService = AuthService();

  Widget _determineListItem(DetailedFriendRequest friendRequest) {
    var currentUserIsSender =
        friendRequest.sender.id == _authService.getCurrentUserId();

    return currentUserIsSender
        ? SentFriendRequestListItem(
            friendRequest: friendRequest,
            onRefreshRequestsClick: widget.onRefreshRequestsClick)
        : ReceivedFriendRequestListItem(
            friendRequest: friendRequest,
            onRefreshRequestsClick: widget.onRefreshRequestsClick);
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedSwitcher(
      duration: Duration(milliseconds: 300),
      child: widget.friendRequests.isEmpty
          ? Center(
              key: ValueKey('empty'),
              child: Text('No active requests found'),
            )
          : ListView.builder(
              key: ValueKey(
                widget.friendRequests.length,
              ),
              itemCount: widget.friendRequests.length,
              itemBuilder: (context, index) {
                return _determineListItem(widget.friendRequests[index]);
              },
            ),
    );
  }
}
