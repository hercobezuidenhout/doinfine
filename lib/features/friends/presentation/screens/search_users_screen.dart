import 'package:firebase_auth/firebase_auth.dart' as auth;
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../../../profile/domain/models/user.dart' as app;

class SearchUsersScreen extends StatefulWidget {
  const SearchUsersScreen({super.key});

  @override
  State<SearchUsersScreen> createState() => _SearchUsersScreenState();
}

class _SearchUsersScreenState extends State<SearchUsersScreen> {
  final _searchController = TextEditingController();
  final _firestore = FirebaseFirestore.instance;
  List<app.User> _searchResults = [];
  bool _isLoading = false;
  String? _error;

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  Future<void> _searchUsers(String query) async {
    if (query.isEmpty) {
      setState(() {
        _searchResults = [];
        _isLoading = false;
      });
      return;
    }

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final usersRef = _firestore.collection('users');
      final querySnapshot = await usersRef
          .where('privacySettings.profileVisibility', isEqualTo: 'public')
          .where('username', isGreaterThanOrEqualTo: query.toLowerCase())
          .where('username',
              isLessThanOrEqualTo: '${query.toLowerCase()}\uf8ff')
          .get();

      final results =
          querySnapshot.docs.map((doc) => app.User.fromFirestore(doc)).toList();

      setState(() {
        _searchResults = results;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  Future<void> _sendFriendRequest(String receiverId) async {
    final currentUser = auth.FirebaseAuth.instance.currentUser;
    if (currentUser == null) return;

    try {
      final friendRequestsRef = _firestore.collection('friendRequests');

      // Check if request already exists
      final existingRequest = await friendRequestsRef
          .where('senderId', isEqualTo: currentUser.uid)
          .where('receiverId', isEqualTo: receiverId)
          .get();

      if (existingRequest.docs.isNotEmpty) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Friend request already sent')),
          );
        }
        return;
      }

      // Create new friend request
      await friendRequestsRef.add({
        'senderId': currentUser.uid,
        'receiverId': receiverId,
        'status': 'pending',
        'createdAt': FieldValue.serverTimestamp(),
      });

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Friend request sent!')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: ${e.toString()}')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Add Friends'),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              controller: _searchController,
              decoration: const InputDecoration(
                hintText: 'Search users...',
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(),
              ),
              onChanged: _searchUsers,
            ),
          ),
          if (_isLoading)
            const Center(child: CircularProgressIndicator())
          else if (_error != null)
            Center(child: Text('Error: $_error'))
          else if (_searchResults.isEmpty)
            const Center(child: Text('No users found'))
          else
            Expanded(
              child: ListView.builder(
                itemCount: _searchResults.length,
                itemBuilder: (context, index) {
                  final user = _searchResults[index];
                  return ListTile(
                    leading: const CircleAvatar(
                      child: Icon(Icons.person),
                    ),
                    title: Text(user.fullName),
                    subtitle: Text('@${user.username}'),
                    trailing: TextButton(
                      onPressed: () => _sendFriendRequest(user.uid),
                      child: const Text('Add'),
                    ),
                  );
                },
              ),
            ),
        ],
      ),
    );
  }
}
