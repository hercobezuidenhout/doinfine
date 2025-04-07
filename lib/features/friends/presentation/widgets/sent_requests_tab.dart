import 'package:firebase_auth/firebase_auth.dart' as auth;
import 'package:flutter/material.dart';
import '../../../profile/domain/models/user.dart' as app;
import '../../domain/repositories/friend_repository.dart';

class SentRequestsTab extends StatelessWidget {
  final FriendRepository _friendRepository = FriendRepository();

  SentRequestsTab({super.key});

  @override
  Widget build(BuildContext context) {
    final currentUser = auth.FirebaseAuth.instance.currentUser;
    if (currentUser == null) {
      return const Center(child: Text('Please sign in to view sent requests'));
    }

    return StreamBuilder<List<Map<String, dynamic>>>(
      stream: _friendRepository.getSentFriendRequests(currentUser.uid),
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        }

        if (!snapshot.hasData) {
          return const Center(child: CircularProgressIndicator());
        }

        final requests = snapshot.data!;
        if (requests.isEmpty) {
          return Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(
                  Icons.send,
                  size: 64,
                  color: Colors.grey,
                ),
                const SizedBox(height: 16),
                const Text(
                  'No Sent Requests',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 8),
                const Text(
                  'Your sent friend requests will appear here',
                  style: TextStyle(color: Colors.grey),
                ),
              ],
            ),
          );
        }

        return ListView.builder(
          itemCount: requests.length,
          itemBuilder: (context, index) {
            final request = requests[index];
            return FutureBuilder<app.User?>(
              future: _friendRepository.getUserById(request['receiverId']),
              builder: (context, snapshot) {
                if (!snapshot.hasData) {
                  return const ListTile(
                    leading: CircleAvatar(child: Icon(Icons.person)),
                    title: Text('Loading...'),
                  );
                }

                final user = snapshot.data!;
                if (user == null) {
                  return const ListTile(
                    leading: CircleAvatar(child: Icon(Icons.person)),
                    title: Text('User not found'),
                  );
                }

                return ListTile(
                  leading: const CircleAvatar(child: Icon(Icons.person)),
                  title: Text(user.fullName),
                  subtitle: Text('@${user.username}'),
                  trailing: IconButton(
                    icon: const Icon(Icons.cancel, color: Colors.red),
                    onPressed: () {
                      // TODO: Implement cancel request logic
                    },
                  ),
                );
              },
            );
          },
        );
      },
    );
  }
}
