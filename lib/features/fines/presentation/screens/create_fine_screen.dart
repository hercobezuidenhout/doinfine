import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../../auth/presentation/providers/auth_provider.dart';
import '../../domain/models/fine.dart';
import '../../domain/repositories/fine_repository.dart';
import '../../../friends/domain/repositories/friend_repository.dart';
import '../../../profile/domain/models/user.dart' as app;

class CreateFineScreen extends StatefulWidget {
  const CreateFineScreen({super.key});

  @override
  State<CreateFineScreen> createState() => _CreateFineScreenState();
}

class _CreateFineScreenState extends State<CreateFineScreen> {
  final _formKey = GlobalKey<FormState>();
  final _descriptionController = TextEditingController();
  final _friendRepository = FriendRepository();
  final _fineRepository = FineRepository();
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
    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final currentUser = context.read<AuthProvider>().user;
      if (currentUser == null) {
        setState(() {
          _error = 'User not found';
          _isLoading = false;
        });
        return;
      }

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
    if (!_formKey.currentState!.validate() || _selectedFriend == null) {
      return;
    }

    final currentUser = context.read<AuthProvider>().user;
    if (currentUser == null) return;

    setState(() {
      _isLoading = true;
      _error = null;
    });

    try {
      final fine = Fine(
        id: '', // Will be set by Firestore
        description: _descriptionController.text,
        senderId: currentUser.uid,
        receiverId: _selectedFriend!.uid,
        createdAt: DateTime.now(),
      );

      await _fineRepository.createFine(fine);

      if (mounted) {
        Navigator.of(context).pop();
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Fine created successfully!')),
        );
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
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(16.0),
          children: [
            if (_isLoading)
              const Center(child: CircularProgressIndicator())
            else if (_error != null)
              Center(
                child: Column(
                  children: [
                    Text(
                      'Error: $_error',
                      style: const TextStyle(color: Colors.red),
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: _loadFriends,
                      child: const Text('Retry'),
                    ),
                  ],
                ),
              )
            else if (_friends.isEmpty)
              const Center(child: Text('No friends found'))
            else
              Column(
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
                        child: Text(friend.fullName),
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
                      labelText: 'Fine Description',
                      border: OutlineInputBorder(),
                    ),
                    maxLength: 240,
                    maxLines: 3,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter a fine description';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 24),
                  ElevatedButton(
                    onPressed: _isLoading ? null : _createFine,
                    child: _isLoading
                        ? const SizedBox(
                            height: 20,
                            width: 20,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                            ),
                          )
                        : const Text('Create Fine'),
                  ),
                ],
              ),
          ],
        ),
      ),
    );
  }
}
