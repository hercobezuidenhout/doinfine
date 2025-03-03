import 'package:doinfine/components/molecules/profile_details_banner.dart';
import 'package:doinfine/components/molecules/profile_filter_bar.dart';
import 'package:doinfine/extensions/context_extension.dart';
import 'package:doinfine/pages/edit_profile_page.dart';
import 'package:doinfine/services/auth_service.dart';
import 'package:doinfine/services/profile_service.dart';
import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';
import 'package:doinfine/models/profile.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  final _profileService = ProfileService();
  final _authService = AuthService();

  late Future<Profile> _profileFuture;

  Future<Profile> _getProfile() async {
    try {
      final userId = _authService.getCurrentUserId();
      return await _profileService.getUserProfile(userId);
    } on PostgrestException catch (error) {
      if (mounted) context.showSnackBar(error.message, isError: true);
      rethrow;
    } catch (error) {
      if (mounted) {
        context.showSnackBar('Unexpected error occurred', isError: true);
      }
      rethrow;
    }
  }

  @override
  void initState() {
    super.initState();
    _profileFuture = _getProfile();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: FutureBuilder(
          future: _profileFuture,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return Scaffold(
                extendBodyBehindAppBar: true,
                extendBody: true,
                floatingActionButton: FloatingActionButton.extended(
                  icon: Icon(Icons.edit),
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute(
                        builder: (context) => EditProfilePage(
                          profile: snapshot.data!,
                        ),
                      ),
                    );
                  },
                  label: Text('Edit Profile'),
                ),
                body: Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: ListView(
                    children: [
                      ProfileDetailsBanner(
                        profile: snapshot.data!,
                      ),
                      SizedBox(
                        height: 16,
                      ),
                      ProfileFilterBar()
                    ],
                  ),
                ),
              );
            }

            return Center(child: CircularProgressIndicator());
          }),
    );
  }
}
