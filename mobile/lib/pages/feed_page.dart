import 'package:doinfine/enums/post_type.dart';
import 'package:doinfine/models/enriched_post.dart';
import 'package:doinfine/models/fine.dart';
import 'package:doinfine/models/profile.dart';
import 'package:doinfine/pages/menu_page.dart';
import 'package:doinfine/pages/post_page.dart';
import 'package:doinfine/services/post_service.dart';
import 'package:flutter/material.dart';

class FeedPage extends StatefulWidget {
  const FeedPage({super.key});

  @override
  State<FeedPage> createState() => _FeedPageState();
}

class _FeedPageState extends State<FeedPage> {
  final _postService = PostService();
  List<EnrichedPost>? _posts;
  bool _isLoading = true;

  Future<void> _refreshPosts() async {
    try {
      final newPosts = await _postService.fetchUserFeed();
      setState(() {
        _posts = newPosts;
      });
    } catch (e) {
      // Silently handle errors during refresh
      debugPrint('Error refreshing posts: $e');
    }
  }

  Future<List<EnrichedPost>> fetchPosts() async {
    await Future.delayed(const Duration(seconds: 1)); // simulate network delay
    _posts = await _postService.fetchUserFeed();
    _isLoading = false;
    return _posts!;
  }

  String formatTime(DateTime dt) {
    return '${dt.hour}:${dt.minute.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        centerTitle: false,
        foregroundColor: Theme.of(context).colorScheme.secondary,
        title: const Text('Doinfine',
            style: TextStyle(fontWeight: FontWeight.bold)),
        actions: [
          IconButton(
            onPressed: () {
              Navigator.of(context).push(
                MaterialPageRoute(builder: (context) => const MenuPage()),
              );
            },
            icon: Icon(Icons.menu),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (context) => const PostPage(),
            ),
          );
        },
        child: Icon(Icons.add),
      ),
      body: FutureBuilder<List<EnrichedPost>>(
        future: fetchPosts(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting &&
              _isLoading) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError || !snapshot.hasData) {
            return const Center(child: Text('Error loading posts'));
          }

          final posts = snapshot.data!;
          if (posts.isEmpty) {
            return const Center(child: Text('No posts yet'));
          }

          return RefreshIndicator(
            onRefresh: _refreshPosts,
            child: ListView.builder(
              physics: const AlwaysScrollableScrollPhysics(),
              itemCount: posts.length,
              itemBuilder: (context, index) {
                final post = posts[index];
                final created = formatTime(post.createdAt);

                String subtitle;
                if (post.metaData is Fine) {
                  final fine = post.metaData as Fine;
                  subtitle =
                      '${post.user.fullname} fined ${fine.issuedTo.fullname}';
                } else {
                  subtitle = post.content;
                }

                return ListTile(
                  title: Padding(
                    padding: const EdgeInsets.only(bottom: 4.0),
                    child: Text(post.content),
                  ),
                  subtitle: Text(subtitle),
                  trailing: Text(created,
                      style: const TextStyle(fontSize: 12, color: Colors.grey)),
                );
              },
            ),
          );
        },
      ),
    );
  }
}
