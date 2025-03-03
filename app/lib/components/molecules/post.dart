import 'package:flutter/material.dart';

class Post extends StatelessWidget {
  const Post({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Column(
        children: [
          Row(
            children: [
              Text(
                'This is some post',
                style: TextStyle(
                  fontSize: 18,
                ),
              )
            ],
          ),
          SizedBox(
            height: 16,
          ),
          Divider()
        ],
      ),
    );
  }
}
