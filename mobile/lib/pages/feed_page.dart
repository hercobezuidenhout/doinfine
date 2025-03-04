import 'package:doinfine/pages/menu_page.dart';
import 'package:flutter/material.dart';

class FeedPage extends StatelessWidget {
  const FeedPage({super.key});

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
    );
  }
}
