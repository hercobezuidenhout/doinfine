import 'package:doinfine/components/molecules/friend_request_list_item.dart';
import 'package:doinfine/models/detailed_friend_request.dart';
import 'package:doinfine/services/friends_service.dart';
import 'package:flutter/material.dart';

class SentFriendRequestListItem extends StatefulWidget {
  final DetailedFriendRequest friendRequest;
  final Function onRefreshRequestsClick;

  const SentFriendRequestListItem(
      {super.key,
      required this.friendRequest,
      required this.onRefreshRequestsClick});

  @override
  State<SentFriendRequestListItem> createState() =>
      _SentFriendRequestListItemState();
}

class _SentFriendRequestListItemState extends State<SentFriendRequestListItem> {
  final _friendService = FriendsService();
  final String defaultAvatar = 'https://api.dicebear.com/9.x/thumbs/png';

  void _cancelRequest() async {
    Navigator.of(context).pop();
    await _friendService.cancelFriendRequest(widget.friendRequest.id);
    widget.onRefreshRequestsClick();
  }

  void _handleReceivedTap() {
    var fullname = widget.friendRequest.receiver.fullname;

    showDialog<void>(
      context: context,
      barrierDismissible: false, // user must tap button!
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Cancel friend request'),
          content: SingleChildScrollView(
            child: ListBody(
              children: <Widget>[
                Text('Do you want to cancel the friend request to $fullname?'),
              ],
            ),
          ),
          actions: <Widget>[
            TextButton(
              child: const Text('No'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              onPressed: _cancelRequest,
              child: const Text('Yes'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return FriendRequestListItem(
      id: widget.friendRequest.id,
      title: widget.friendRequest.receiver.fullname,
      createdAt: widget.friendRequest.createdAt,
      onTap: _handleReceivedTap,
    );
  }
}
