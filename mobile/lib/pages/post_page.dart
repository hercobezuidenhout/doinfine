import 'dart:async';

import 'package:doinfine/models/profile.dart';
import 'package:doinfine/services/friends_service.dart';
import 'package:flutter/material.dart';

class PostPage extends StatefulWidget {
  const PostPage({super.key});

  @override
  State<PostPage> createState() => _PostPageState();
}

class _PostPageState extends State<PostPage> {
  Timer? _debounce;

  final _friendService = FriendsService();
  final TextEditingController _searchController = TextEditingController();

  List<Profile> _userFriends = [];
  late Profile _selectedFriend;

  Future<void> _filterFriends() async {
    String query = _searchController.text.toLowerCase();
    if (_debounce?.isActive ?? false) {
      _debounce?.cancel();
    }

    _debounce = Timer(const Duration(milliseconds: 500), () async {
      if (query.isEmpty) {
        return;
      }

      try {
        List<Profile> results = await _friendService.getUserFriends(query);
        setState(() {
          _userFriends = results;
        });
      } catch (e) {
        // Handle error (e.g., show an error message)
        print('Error searching for friends: $e');
      }
    });
  }

  Future<void> _fetchUserFriends() async {
    final userFriends = await _friendService.getUserFriends('');
    setState(() {
      _userFriends = userFriends;
    });
  }

  @override
  void initState() {
    super.initState();
    _fetchUserFriends();
    _searchController.addListener(_filterFriends);
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        FocusScope.of(context).unfocus();
      },
      child: Scaffold(
        appBar: AppBar(
          centerTitle: false,
          backgroundColor: Theme.of(context).colorScheme.primary,
          foregroundColor: Theme.of(context).colorScheme.onPrimary,
          title: const Text(
            'Post a fine',
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
        ),
        floatingActionButton: FloatingActionButton.extended(
          onPressed: () {
            Navigator.of(context).pop();
          },
          label: Text('Post'),
          icon: Icon(Icons.post_add),
        ),
        body: Padding(
          padding: const EdgeInsets.all(20.0),
          child: ListView(
            children: [
              DropdownMenu(
                requestFocusOnTap: true,
                width: double.infinity,
                onSelected: (menuItem) {
                  setState(() {
                    if (menuItem != null) {
                      _selectedFriend = menuItem;
                      print(_selectedFriend.fullname);
                    }
                  });
                },
                label: Text('Who'),
                helperText: 'Who do you want to fine?',
                controller: _searchController,
                enabled: _userFriends.isNotEmpty,
                dropdownMenuEntries: _userFriends
                    .map(
                      (friend) => DropdownMenuEntry(
                          value: friend, label: friend.fullname),
                    )
                    .toList(),
              ),
              SizedBox(
                height: 20,
              ),
              const TextField(
                minLines: 5,
                maxLines: 5,
                decoration: InputDecoration(
                  labelText: 'What',
                  alignLabelWithHint: true,
                  helperText: 'What did they do?',
                  border: OutlineInputBorder(),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
