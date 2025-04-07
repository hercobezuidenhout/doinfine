import 'package:firebase_auth/firebase_auth.dart' as auth;
import 'package:flutter/material.dart';
import '../../../profile/domain/models/user.dart' as app;
import '../../domain/models/post.dart';
import '../../domain/repositories/post_repository.dart';
import '../../../friends/domain/repositories/friend_repository.dart';

class CreatePostScreen extends StatefulWidget {
  const CreatePostScreen({super.key});

  @override
  State<CreatePostScreen> createState() => _CreatePostScreenState();
}

class _CreatePostScreenState extends State<CreatePostScreen> {
  final _formKey = GlobalKey<FormState>();
  final _searchController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _friendRepository = FriendRepository();
  final _postRepository = PostRepository();
  List<app.User> _searchResults = [];
  app.User? _selectedFriend;
  bool _isLoading = false;
  String? _error;

  @override
  void dispose() {
    _searchController.dispose();
    _descriptionController.dispose();
    super.dispose();
  }

  Future<void> _searchFriends(String query) async {
    if (query.isEmpty) {
      setState(() {
        _searchResults = [];
      });
      return;
    }

    final currentUser = auth.FirebaseAuth.instance.currentUser;
    if (currentUser == null) return;

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final friends = await _friendRepository.getFriends(currentUser.uid).first;
      setState(() {
        _searchResults = friends
            .where((friend) =>
                friend.username.toLowerCase().contains(query.toLowerCase()) ||
                friend.fullName.toLowerCase().contains(query.toLowerCase()))
            .toList();
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  Future<void> _createPost() async {
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
          const SnackBar(content: Text('Post created successfully!')),
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
        title: const Text('Create Post'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              TextField(
                controller: _searchController,
                decoration: const InputDecoration(
                  labelText: 'Search Friends',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.search),
                ),
                onChanged: _searchFriends,
              ),
              if (_isLoading)
                const Padding(
                  padding: EdgeInsets.all(8.0),
                  child: Center(child: CircularProgressIndicator()),
                )
              else if (_error != null)
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Text(
                    _error!,
                    style: const TextStyle(color: Colors.red),
                  ),
                )
              else if (_searchResults.isNotEmpty)
                Container(
                  margin: const EdgeInsets.only(top: 8),
                  decoration: BoxDecoration(
                    border: Border.all(color: Colors.grey.shade300),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  constraints: const BoxConstraints(maxHeight: 200),
                  child: ListView.builder(
                    shrinkWrap: true,
                    itemCount: _searchResults.length,
                    itemBuilder: (context, index) {
                      final friend = _searchResults[index];
                      final isSelected = _selectedFriend?.uid == friend.uid;
                      return ListTile(
                        leading: const CircleAvatar(child: Icon(Icons.person)),
                        title: Text(friend.fullName),
                        subtitle: Text('@${friend.username}'),
                        selected: isSelected,
                        onTap: () {
                          setState(() {
                            _selectedFriend = friend;
                            _searchController.text = friend.fullName;
                            _searchResults = [];
                          });
                        },
                      );
                    },
                  ),
                ),
              if (_selectedFriend != null) ...[
                const SizedBox(height: 24),
                Chip(
                  avatar:
                      const CircleAvatar(child: Icon(Icons.person, size: 16)),
                  label: Text(_selectedFriend!.fullName),
                  onDeleted: () {
                    setState(() {
                      _selectedFriend = null;
                      _searchController.clear();
                    });
                  },
                ),
              ],
              const SizedBox(height: 24),
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
                onPressed: _isLoading ? null : _createPost,
                child: const Text('Create Post'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
