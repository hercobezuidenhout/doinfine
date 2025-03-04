import 'package:flutter/material.dart';

class ProfileCoverImage extends StatelessWidget {
  final double coverHeight;

  const ProfileCoverImage({super.key, this.coverHeight = 100});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Theme.of(context).colorScheme.primary, // Set the background color
      height: coverHeight, // Maintain the same height as before
      width: double.infinity, // Make sure it stretches to full width
    );
  }
}
