import 'package:doinfine/components/atoms/editable_profile_picture.dart';
import 'package:doinfine/components/molecules/label_input.dart';
import 'package:doinfine/extensions/context_extension.dart';
import 'package:doinfine/models/profile.dart';
import 'package:doinfine/services/profile_service.dart';
import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class EditProfilePage extends StatefulWidget {
  final Profile profile;
  final String defaultAvatar = 'https://api.dicebear.com/9.x/thumbs/svg';

  const EditProfilePage({super.key, required this.profile});

  @override
  State<EditProfilePage> createState() => _EditProfilePageState();
}

class _EditProfilePageState extends State<EditProfilePage> {
  var profileService = ProfileService();

  bool _loading = false;

  late final TextEditingController _fullnameController =
      TextEditingController();
  late final TextEditingController _usernameController =
      TextEditingController();

  late String _avatarUrl = 'https://avatar.iran.liara.run/public';

  Future<void> _getProfile() async {
    try {
      _fullnameController.text = widget.profile.fullname;
      _usernameController.text = widget.profile.username;
      _avatarUrl = widget.profile.avatarUrl ?? widget.defaultAvatar;
    } on PostgrestException catch (error) {
      if (mounted) context.showSnackBar(error.message, isError: true);
    } catch (error) {
      if (mounted) {
        context.showSnackBar('Unexpected error occurred', isError: true);
      }
    }
  }

  Future<void> _updateProfile() async {
    setState(() {
      _loading = true;
    });
    final fullname = _fullnameController.text.trim();
    final username = _usernameController.text.trim();

    var newProfile = Profile(
      id: widget.profile.id,
      fullname: fullname,
      username: username,
    );

    try {
      await profileService.updateUserProfile(newProfile);
      if (mounted) context.showSnackBar('Successfully updated profile!');
    } on PostgrestException catch (error) {
      if (mounted) context.showSnackBar(error.message, isError: true);
    } catch (error) {
      if (mounted) {
        context.showSnackBar('Unexpected error occurred', isError: true);
      }
    } finally {
      if (mounted) {
        setState(() {
          _loading = false;
        });
      }
    }
  }

  Future<void> _onUpload(String imageUrl, String filePath) async {
    try {
      profileService.updateUserAvatar(widget.profile.id, imageUrl, filePath);

      if (mounted) {
        const SnackBar(
          content: Text('Updated your profile image!'),
        );
      }
    } on PostgrestException catch (error) {
      if (mounted) context.showSnackBar(error.message, isError: true);
    } catch (error) {
      if (mounted) {
        context.showSnackBar('Unexpected error occurred', isError: true);
      }
    }
    if (!mounted) {
      return;
    }

    setState(() {
      _avatarUrl = imageUrl;
    });
  }

  @override
  void initState() {
    super.initState();
    _getProfile();
  }

  @override
  void dispose() {
    _usernameController.dispose();
    _fullnameController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          backgroundColor: Theme.of(context).colorScheme.primary,
          foregroundColor: Theme.of(context).colorScheme.onPrimary,
          title: const Text("Edit Profile"),
        ),
        body: Padding(
          padding: const EdgeInsets.all(20.0),
          child: ListView(
            children: [
              EditableProfilePicture(
                imageUrl: _avatarUrl.isNotEmpty
                    ? _avatarUrl
                    : 'https://avatar.iran.liara.run/public',
                onUpload: _onUpload,
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  LabelInput(
                    label: "Full Name",
                    hintText: "e.g. John Doe",
                    controller: _fullnameController,
                  ),
                  const SizedBox(height: 16),
                  LabelInput(
                    prefix: Text("@"),
                    label: "Username",
                    hintText: "e.g. @johndoe",
                    controller: _usernameController,
                  ),
                ],
              )
            ],
          ),
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: _loading ? null : _updateProfile,
          child: Text(
            '\u{1F4BE}',
            style: TextStyle(fontSize: 24),
          ),
        ),
      ),
    );
  }
}
