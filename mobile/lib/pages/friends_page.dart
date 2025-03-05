import 'package:doinfine/extensions/context_extension.dart';
import 'package:doinfine/models/profile.dart';
import 'package:doinfine/pages/add_friend_page.dart';
import 'package:doinfine/services/auth_service.dart';
import 'package:doinfine/services/friends_service.dart';
import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class FriendsPage extends StatefulWidget {
  const FriendsPage({super.key});

  @override
  State<FriendsPage> createState() => _FriendsPageState();
}

class _FriendsPageState extends State<FriendsPage> {
  final _friendsService = FriendsService();
  final _authService = AuthService();

  late Future<List<Profile>> _friendsListFuture;

  Future<List<Profile>> _getAllFriends() async {
    try {
      final userId = _authService.getCurrentUserId();
      return await _friendsService.getAllFriends(userId);
    } on PostgrestException catch (error) {
      if (mounted) context.showSnackBar(error.message, isError: true);
      rethrow;
    } catch (error) {
      if (mounted) {
        context.showSnackBar('Unexpected error occurred', isError: true);
      }
      rethrow;
    }
  }

  @override
  void initState() {
    super.initState();
    _friendsListFuture = _getAllFriends();
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: _friendsListFuture,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            final allFriends = snapshot.data;

            if (allFriends == null) {
              return Text('You don not have any friends.');
            }

            return Scaffold(
              appBar: AppBar(
                centerTitle: false,
                backgroundColor: Theme.of(context).colorScheme.primary,
                foregroundColor: Theme.of(context).colorScheme.onPrimary,
                title: Text('Friends'),
                actions: [
                  IconButton(
                      onPressed: () {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (context) => const AddFriendPage(),
                          ),
                        );
                      },
                      icon: Icon(Icons.person_add))
                ],
              ),
              body: Padding(
                padding: EdgeInsets.all(20),
                child: Column(
                  children: [
                    Expanded(
                      child: AnimatedSwitcher(
                        duration: Duration(milliseconds: 300),
                        child: allFriends.isEmpty
                            ? Center(
                                key: ValueKey('empty'),
                                child: Text('No friends found'),
                              )
                            : ListView.builder(
                                key: ValueKey(
                                  allFriends.length,
                                ),
                                itemCount: allFriends.length,
                                itemBuilder: (context, index) {
                                  return AnimatedContainer(
                                    duration: Duration(milliseconds: 300),
                                    curve: Curves.easeInOut,
                                    margin: EdgeInsets.symmetric(vertical: 5),
                                    child: Card(
                                      key: ValueKey(
                                        allFriends[index],
                                      ),
                                      child: ListTile(
                                        title: Text(allFriends[index].fullname),
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
          return Center(child: CircularProgressIndicator());
        });
  }
}
