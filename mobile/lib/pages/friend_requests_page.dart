import 'package:doinfine/components/organisms/friend_requests_tabview.dart';
import 'package:doinfine/models/detailed_friend_request.dart';
import 'package:doinfine/services/auth_service.dart';
import 'package:doinfine/services/friends_service.dart';
import 'package:flutter/material.dart';

class FriendRequestsPage extends StatefulWidget {
  const FriendRequestsPage({super.key});

  @override
  State<FriendRequestsPage> createState() => _FriendRequestsPageState();
}

class _FriendRequestsPageState extends State<FriendRequestsPage> {
  final _friendsService = FriendsService();
  final _authService = AuthService();

  List<DetailedFriendRequest> _sentFriendRequests = [];
  List<DetailedFriendRequest> _receivedFriendRequests = [];

  Future<void> _fetchUserRequests() async {
    var currentUserId = _authService.getCurrentUserId();

    List<DetailedFriendRequest> friendRequests =
        await _friendsService.getUserRequests();

    setState(() {
      _sentFriendRequests = friendRequests
          .where((request) => request.sender.id == currentUserId)
          .toList();
      _receivedFriendRequests = friendRequests
          .where((request) => request.receiver.id == currentUserId)
          .toList();
    });
  }

  @override
  void initState() {
    super.initState();

    _fetchUserRequests();
  }

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      initialIndex: 0,
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          centerTitle: false,
          backgroundColor: Theme.of(context).colorScheme.primary,
          foregroundColor: Theme.of(context).colorScheme.onPrimary,
          title: Text('Friend Requests'),
          bottom: TabBar(
            labelColor: Theme.of(context).colorScheme.onPrimary,
            unselectedLabelColor: Theme.of(context).colorScheme.onPrimary,
            tabs: <Widget>[
              Tab(text: 'Received'),
              Tab(text: 'Sent'),
            ],
          ),
        ),
        body: Padding(
          padding: const EdgeInsets.all(8.0),
          child: TabBarView(
            children: <Widget>[
              FriendRequestsTabview(
                  friendRequests: _receivedFriendRequests,
                  onRefreshRequestsClick: _fetchUserRequests),
              FriendRequestsTabview(
                  friendRequests: _sentFriendRequests,
                  onRefreshRequestsClick: _fetchUserRequests),
            ],
          ),
        ),
      ),
    );
  }
}
