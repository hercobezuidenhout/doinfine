import 'package:flutter/material.dart';

class FriendsDestination extends StatelessWidget {
  const FriendsDestination({super.key});

  @override
  Widget build(BuildContext context) {
    return NavigationDestination(
      icon: Text(
        'FRIENDS',
        style: TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 16,
          color: Theme.of(context).colorScheme.onPrimary,
        ),
      ),
      label: 'Friends',
    );
  }
}
