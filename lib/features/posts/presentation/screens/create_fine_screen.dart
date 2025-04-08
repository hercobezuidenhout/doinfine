import 'package:firebase_auth/firebase_auth.dart' as auth;
import 'package:flutter/material.dart';
import '../../../profile/domain/models/user.dart' as app;
import '../../domain/models/post.dart';
import '../../domain/repositories/post_repository.dart';
import '../../../friends/domain/repositories/friend_repository.dart';

class CreateFineScreen extends StatefulWidget {
  const CreateFineScreen({super.key});

  @override
  State<CreateFineScreen> createState() => _CreateFineScreenState();
}

class _CreateFineScreenState extends State<CreateFineScreen> {
  final _formKey = GlobalKey<FormState>();
  final _descriptionController = TextEditingController();
  final _friendRepository = FriendRepository();
  final _postRepository = PostRepository();
  List<app.User> _friends = [];
  app.User? _selectedFriend;
  bool _isLoading = false;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadFriends();
  }

  @override
  void dispose() {
    _descriptionController.dispose();
    super.dispose();
  }

  Future<void> _loadFriends() async {
    final currentUser = auth.FirebaseAuth.instance.currentUser;
    if (currentUser == null) return;

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      _friendRepository.getFriends(currentUser.uid).listen(
        (friends) {
          setState(() {
            _friends = friends;
            _isLoading = false;
          });
        },
        onError: (error) {
          setState(() {
            _error = error.toString();
            _isLoading = false;
          });
        },
      );
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  Future<void> _createFine() async {
    if (!_formKey.currentState!.validate()) return;
    if (_selectedFriend == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please select a friend')),
      );
      return;
    }

    final currentUser = auth.FirebaseAuth.instance.currentUser;
    if (currentUser == null) return;

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final post = Post(
        id: '', // Will be set by Firestore
        userId: currentUser.uid,
        description: _descriptionController.text,
        createdAt: DateTime.now(),
        type: PostType.fine,
        metadata: {
          'issuedToId': _selectedFriend!.uid,
        },
      );

      await _postRepository.createPost(post);

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Fine created successfully!')),
        );
        Navigator.pop(context);
      }
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Create Fine'),
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text('Error: $_error'))
              : _friends.isEmpty
                  ? const Center(child: Text('No friends to fine'))
                  : SingleChildScrollView(
                      padding: const EdgeInsets.all(16.0),
                      child: Form(
                        key: _formKey,
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            DropdownButtonFormField<app.User>(
                              value: _selectedFriend,
                              decoration: const InputDecoration(
                                labelText: 'Select Friend',
                                border: OutlineInputBorder(),
                              ),
                              items: _friends.map((friend) {
                                return DropdownMenuItem(
                                  value: friend,
                                  child: Text(
                                      '${friend.fullName} (@${friend.username})'),
                                );
                              }).toList(),
                              onChanged: (value) {
                                setState(() {
                                  _selectedFriend = value;
                                });
                              },
                              validator: (value) {
                                if (value == null) {
                                  return 'Please select a friend';
                                }
                                return null;
                              },
                            ),
                            const SizedBox(height: 16),
                            TextFormField(
                              controller: _descriptionController,
                              decoration: const InputDecoration(
                                labelText: 'Description',
                                border: OutlineInputBorder(),
                              ),
                              maxLines: 3,
                              maxLength: 240,
                              validator: (value) {
                                if (value == null || value.isEmpty) {
                                  return 'Please enter a description';
                                }
                                return null;
                              },
                            ),
                            const SizedBox(height: 24),
                            ElevatedButton(
                              onPressed: _isLoading ? null : _createFine,
                              child: const Text('Create Fine'),
                            ),
                          ],
                        ),
                      ),
                    ),
    );
  }
}
