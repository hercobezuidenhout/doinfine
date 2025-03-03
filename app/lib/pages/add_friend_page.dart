import 'dart:async';

import 'package:doinfine/extensions/context_extension.dart';
import 'package:doinfine/models/profile.dart';
import 'package:doinfine/services/friends_service.dart';
import 'package:flutter/material.dart';

class AddFriendPage extends StatefulWidget {
  const AddFriendPage({super.key});

  @override
  State<AddFriendPage> createState() => _AddFriendPageState();
}

class _AddFriendPageState extends State<AddFriendPage> {
  Timer? _debounce;

  final FriendsService friendsService = FriendsService();

  final String defaultAvatar = 'https://api.dicebear.com/9.x/thumbs/png';
  final TextEditingController _searchController = TextEditingController();

  List<Profile> _filteredFriends = [];

  void _sendRequest(String userId) async {
    try {
      await friendsService.sendFriendRequest(userId);
      if (mounted) {
        context.showSnackBar("Friend request sent!");
      }
    } catch (error) {
      if (mounted) {
        context.showSnackBar("Something went wrong.");
      }
    }
  }

  void _showConfirmDialog(Profile friend) async {
    String fullname = friend.fullname;

    return showDialog<void>(
      context: context,
      barrierDismissible: false, // user must tap button!
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Confirm friend request'),
          content: SingleChildScrollView(
            child: ListBody(
              children: <Widget>[
                Text(
                    'Are you sure you want to send $fullname a friend request?'),
              ],
            ),
          ),
          actions: <Widget>[
            TextButton(
              child: const Text('No, wait.'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
            TextButton(
              child: const Text('Yes, full send!'),
              onPressed: () {
                _sendRequest(friend.id);
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  @override
  void initState() {
    super.initState();
    _searchController.addListener(_filterFriends);
  }

  void _filterFriends() async {
    String query = _searchController.text.toLowerCase();
    if (_debounce?.isActive ?? false) {
      _debounce?.cancel();
    }

    _debounce = Timer(const Duration(milliseconds: 500), () async {
      if (query.isEmpty) {
        setState(() {
          _filteredFriends = [];
        });
        return;
      }

      try {
        List<Profile> results = await friendsService.searchAllUsers(query);
        setState(() {
          _filteredFriends = results;
        });
      } catch (e) {
        // Handle error (e.g., show an error message)
        print('Error searching for friends: $e');
      }
    });
  }

  @override
  void dispose() {
    _searchController.removeListener(_filterFriends);
    _searchController.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: false,
        backgroundColor: Theme.of(context).colorScheme.primary,
        foregroundColor: Theme.of(context).colorScheme.onPrimary,
        title: Text('Find a friend'),
      ),
      body: Padding(
        padding: EdgeInsets.all(20),
        child: Column(
          children: [
            TextField(
              controller: _searchController,
              decoration: InputDecoration(
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(),
                filled: true,
                hintText: 'Search...',
              ),
            ),
            SizedBox(
              height: 16,
            ),
            Expanded(
              child: AnimatedSwitcher(
                duration: Duration(milliseconds: 300),
                child: _filteredFriends.isEmpty
                    ? Center(
                        key: ValueKey('empty'),
                        child: Text('Start typing to see friends'),
                      )
                    : ListView.builder(
                        key: ValueKey(
                          _filteredFriends.length,
                        ),
                        itemCount: _filteredFriends.length,
                        itemBuilder: (context, index) {
                          return AnimatedContainer(
                            duration: Duration(milliseconds: 300),
                            curve: Curves.easeInOut,
                            margin: EdgeInsets.symmetric(vertical: 5),
                            child: Card(
                              key: ValueKey(
                                _filteredFriends[index].id,
                              ),
                              child: ListTile(
                                onTap: () {
                                  _showConfirmDialog(_filteredFriends[index]);
                                },
                                leading: CircleAvatar(
                                  backgroundColor: Colors.amber,
                                  child: ClipOval(
                                    child: Image.network(
                                      defaultAvatar,
                                      fit: BoxFit.cover,
                                      width: 50,
                                      height: 50,
                                    ),
                                  ),
                                ),
                                title: Text(_filteredFriends[index].fullname),
                              ),
                            ),
                          );
                        },
                      ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
