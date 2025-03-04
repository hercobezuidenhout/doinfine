import 'package:flutter/material.dart';

class FeedDestination extends StatelessWidget {
  const FeedDestination({super.key});

  @override
  Widget build(BuildContext context) {
    return NavigationDestination(
      icon: Text(
        'FEED',
        style: TextStyle(
          fontWeight: FontWeight.bold,
          fontSize: 16,
          color: Theme.of(context).colorScheme.onPrimary,
        ),
      ),
      label: 'Home',
    );
  }
}
