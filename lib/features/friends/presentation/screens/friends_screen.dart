import 'package:firebase_auth/firebase_auth.dart' as auth;
import 'package:flutter/material.dart';
import '../../../profile/domain/models/user.dart' as app;
import '../../domain/repositories/friend_repository.dart';
import '../widgets/received_requests_tab.dart';
import '../widgets/sent_requests_tab.dart';
import 'search_users_screen.dart';

class FriendsScreen extends StatefulWidget {
  const FriendsScreen({super.key});

  @override
  State<FriendsScreen> createState() => _FriendsScreenState();
}

class _FriendsScreenState extends State<FriendsScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final _friendRepository = FriendRepository();

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _refreshData() async {
    final currentUser = auth.FirebaseAuth.instance.currentUser;
    if (currentUser == null) return;

    // Refresh friends and requests
    await Future.wait([
      _friendRepository.getFriends(currentUser.uid).first,
      _friendRepository.getSentFriendRequests(currentUser.uid).first,
      _friendRepository.getReceivedFriendRequests(currentUser.uid).first,
    ]);
  }

  Widget _buildFriendsList() {
    final currentUser = auth.FirebaseAuth.instance.currentUser;
    if (currentUser == null) {
      return const Center(child: Text('Please sign in to view friends'));
    }

    return StreamBuilder<List<app.User>>(
      stream: _friendRepository.getFriends(currentUser.uid),
      builder: (context, snapshot) {
        if (snapshot.hasError) {
          return Center(child: Text('Error: ${snapshot.error}'));
        }

        if (!snapshot.hasData) {
          return const Center(child: CircularProgressIndicator());
        }

        final friends = snapshot.data!;
        if (friends.isEmpty) {
          return _buildEmptyState(
            icon: Icons.people,
            title: 'No Friends Yet',
            subtitle: 'Your friends will appear here',
            buttonText: 'Add Friends',
            onButtonPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => const SearchUsersScreen(),
                ),
              );
            },
          );
        }

        return ListView.builder(
          itemCount: friends.length,
          itemBuilder: (context, index) {
            final friend = friends[index];
            return ListTile(
              leading: const CircleAvatar(child: Icon(Icons.person)),
              title: Text(friend.fullName),
              subtitle: Text('@${friend.username}'),
            );
          },
        );
      },
    );
  }

  Widget _buildEmptyState({
    required IconData icon,
    required String title,
    required String subtitle,
    required String buttonText,
    required VoidCallback onButtonPressed,
  }) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            icon,
            size: 64,
            color: Colors.grey,
          ),
          const SizedBox(height: 16),
          Text(
            title,
            style: const TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            subtitle,
            style: const TextStyle(
              color: Colors.grey,
            ),
          ),
          const SizedBox(height: 24),
          ElevatedButton.icon(
            onPressed: onButtonPressed,
            icon: const Icon(Icons.person_add),
            label: Text(buttonText),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Friends'),
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Friends'),
            Tab(text: 'Received'),
            Tab(text: 'Sent'),
          ],
        ),
      ),
      body: RefreshIndicator(
        onRefresh: _refreshData,
        child: TabBarView(
          controller: _tabController,
          children: [
            _buildFriendsList(),
            ReceivedRequestsTab(),
            SentRequestsTab(),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (context) => const SearchUsersScreen(),
            ),
          );
        },
        child: const Icon(Icons.person_add),
      ),
    );
  }
}
