import 'package:doinfine/components/atoms/profile_basic_details.dart';
import 'package:doinfine/components/atoms/profile_picture.dart';
import 'package:doinfine/models/profile.dart';
import 'package:flutter/material.dart';

class ProfileDetailsBanner extends StatelessWidget {
  final String defaultAvatar = 'https://api.dicebear.com/9.x/thumbs/svg';
  final Profile profile;

  const ProfileDetailsBanner({super.key, required this.profile});

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        ProfilePicture(imageUrl: profile.avatarUrl ?? defaultAvatar),
        ProfileBasicDetails(
          profile: profile,
        ),
      ],
    );
  }
}
