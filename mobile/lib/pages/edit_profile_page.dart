import 'package:doinfine/components/molecules/label_input.dart';
import 'package:doinfine/extensions/context_extension.dart';
import 'package:doinfine/models/profile.dart';
import 'package:doinfine/services/profile_service.dart';
import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class EditProfilePage extends StatefulWidget {
  final Profile profile;

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

  Future<void> _getProfile() async {
    try {
      _fullnameController.text = widget.profile.fullname;
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

    var newProfile = Profile(
      id: widget.profile.id,
      fullname: fullname,
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
