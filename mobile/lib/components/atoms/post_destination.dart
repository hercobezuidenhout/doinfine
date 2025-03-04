import 'package:flutter/material.dart';

class PostDestination extends StatelessWidget {
  const PostDestination({super.key});

  @override
  Widget build(BuildContext context) {
    return NavigationDestination(
      icon: Icon(
        Icons.add,
        color: Theme.of(context).colorScheme.onPrimary,
        size: 24,
      ),
      label: 'Post',
    );
  }
}
