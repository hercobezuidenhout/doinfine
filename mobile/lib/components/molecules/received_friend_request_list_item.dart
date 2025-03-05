import 'package:doinfine/components/molecules/friend_request_list_item.dart';
import 'package:doinfine/models/detailed_friend_request.dart';
import 'package:doinfine/services/friends_service.dart';
import 'package:flutter/material.dart';

class ReceivedFriendRequestListItem extends StatefulWidget {
  final DetailedFriendRequest friendRequest;
  final Function onRefreshRequestsClick;

  const ReceivedFriendRequestListItem(
      {super.key,
      required this.friendRequest,
      required this.onRefreshRequestsClick});

  @override
  State<ReceivedFriendRequestListItem> createState() =>
      _ReceivedFriendRequestListItemState();
}

class _ReceivedFriendRequestListItemState
    extends State<ReceivedFriendRequestListItem> {
  final _friendService = FriendsService();

  void _acceptRequest() async {
    Navigator.of(context).pop();
    await _friendService.acceptFriendRequest(widget.friendRequest.id);
    widget.onRefreshRequestsClick();
  }

  void _handleReceivedTap() {
    var fullname = widget.friendRequest.sender.fullname;

    showDialog<void>(
      context: context,
      barrierDismissible: false, // user must tap button!
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Friend request'),
          content: SingleChildScrollView(
            child: ListBody(
              children: <Widget>[
                Text('$fullname wants to be friends'),
              ],
            ),
          ),
          actions: <Widget>[
            TextButton(
              child: const Text('Decline'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              onPressed: _acceptRequest,
              child: const Text('Accept'),
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
      title: widget.friendRequest.sender.fullname,
      createdAt: widget.friendRequest.createdAt,
      onTap: _handleReceivedTap,
    );
  }
}
