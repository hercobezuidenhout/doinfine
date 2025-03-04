import 'package:doinfine/pages/friend_requests_page.dart';
import 'package:doinfine/pages/friends_page.dart';
import 'package:doinfine/pages/login_page.dart';
import 'package:doinfine/services/auth_service.dart';
import 'package:flutter/material.dart';

class MenuPage extends StatelessWidget {
  const MenuPage({super.key});

  @override
  Widget build(BuildContext context) {
    final authService = AuthService();
    var user = authService.getCurrentUser();

    return Scaffold(
        appBar: AppBar(
          centerTitle: false,
          backgroundColor: Theme.of(context).colorScheme.primary,
          foregroundColor: Theme.of(context).colorScheme.onPrimary,
          title: Text('Menu'),
        ),
        body: Padding(
          padding: EdgeInsets.all(20),
          child: ListView(
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Friends',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  SizedBox(
                    height: 8,
                  ),
                  Card(
                    child: ListTile(
                      title: Text('All'),
                      onTap: () {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (context) => const FriendsPage(),
                          ),
                        );
                      },
                      trailing: Icon(Icons.chevron_right),
                    ),
                  ),
                  Card(
                    child: ListTile(
                      title: Text('Friend requests'),
                      onTap: () {
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (context) => const FriendRequestsPage(),
                          ),
                        );
                      },
                      trailing: Icon(Icons.chevron_right),
                    ),
                  ),
                ],
              ),
              SizedBox(
                height: 16,
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Account',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  SizedBox(
                    height: 8,
                  ),
                  Card(
                    child: ListTile(
                      title: Text('Sign out'),
                      onTap: () {
                        authService.signOut();
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (context) => const LoginPage(),
                          ),
                        );
                      },
                      trailing: Icon(Icons.logout),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ));
  }
}
