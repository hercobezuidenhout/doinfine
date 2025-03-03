import 'package:doinfine/components/molecules/main_bottom_bar.dart';
import 'package:doinfine/pages/feed_page.dart';
import 'package:doinfine/pages/friends_page.dart';
import 'package:doinfine/pages/profile_page.dart';
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _selectedIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: <Widget>[
        FeedPage(),
        const Text('Post'),
        FriendsPage()
      ][_selectedIndex],
      bottomNavigationBar: MainBottomBar(
        onDestinationSelected: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
        selectedIndex: _selectedIndex,
      ),
    );
  }
}
