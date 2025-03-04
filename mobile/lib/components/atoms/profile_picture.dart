import 'package:flutter/material.dart';

class ProfilePicture extends StatelessWidget {
  final String imageUrl;

  const ProfilePicture({super.key, required this.imageUrl});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        shape: BoxShape.circle,
      ),
      child: CircleAvatar(
        radius: 40,
        backgroundColor: Colors.grey.shade800,
        child: ClipOval(
          child: Image.network(
            imageUrl,
            fit: BoxFit.cover,
            width: 100,
            height: 100,
          ),
        ),
      ),
    );
  }
}
