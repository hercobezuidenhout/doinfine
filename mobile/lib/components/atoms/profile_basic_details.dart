import 'package:doinfine/models/profile.dart';
import 'package:flutter/material.dart';

class ProfileBasicDetails extends StatelessWidget {
  final Profile profile;

  const ProfileBasicDetails({super.key, required this.profile});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            profile.fullname,
            style: TextStyle(
              fontWeight: FontWeight.w500,
              fontSize: 18,
            ),
          ),
        ],
      ),
    );
  }
}
