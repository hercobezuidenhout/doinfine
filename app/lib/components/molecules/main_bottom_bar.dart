import 'package:doinfine/components/atoms/feed_destination.dart';
import 'package:doinfine/components/atoms/friends_destination.dart';
import 'package:doinfine/components/atoms/post_destination.dart';
import 'package:flutter/material.dart';

class MainBottomBar extends StatelessWidget {
  final int selectedIndex;
  final Function(int) onDestinationSelected;

  const MainBottomBar(
      {required this.onDestinationSelected,
      required this.selectedIndex,
      super.key});

  @override
  Widget build(BuildContext context) {
    return NavigationBar(
      height: 60,
      backgroundColor: Theme.of(context).primaryColor,
      onDestinationSelected: onDestinationSelected,
      indicatorColor: Colors.red.shade700,
      selectedIndex: selectedIndex,
      labelBehavior: NavigationDestinationLabelBehavior.alwaysHide,
      destinations: [
        FeedDestination(),
        PostDestination(),
        FriendsDestination()
      ],
    );
  }
}
