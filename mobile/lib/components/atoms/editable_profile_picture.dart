import 'package:doinfine/extensions/context_extension.dart';
import 'package:doinfine/services/profile_service.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class EditableProfilePicture extends StatefulWidget {
  final String imageUrl;
  final void Function(String, String) onUpload;

  const EditableProfilePicture({
    super.key,
    required this.imageUrl,
    required this.onUpload,
  });

  @override
  State<EditableProfilePicture> createState() => _EditableProfilePictureState();
}

class _EditableProfilePictureState extends State<EditableProfilePicture> {
  final _profileService = ProfileService();

  bool _isLoading = false;

  Future<void> _uploadAsync() async {
    final picker = ImagePicker();
    final imageFile = await picker.pickImage(
      source: ImageSource.gallery,
      maxWidth: 300,
      maxHeight: 300,
    );

    if (imageFile == null) {
      return;
    }

    setState(() => _isLoading = true);

    try {
      final bytes = await imageFile.readAsBytes();
      final fileExt = imageFile.path.split('.').last;
      final fileName = '${DateTime.now().toIso8601String()}.$fileExt';
      final filePath = fileName;
      var imageUrlResponse = await _profileService.uploadUserAvatar(
          bytes, filePath, imageFile.mimeType);

      widget.onUpload(imageUrlResponse, filePath);
    } on StorageException catch (error) {
      if (mounted) {
        context.showSnackBar(error.message, isError: true);
      }
    } catch (error) {
      if (mounted) {
        context.showSnackBar('Unexpected error occurred', isError: true);
      }
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(left: 8.0),
      child: Container(
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: Border.all(
            color: Colors.white, // Border color
            width: 5.0, // Border width
          ),
        ),
        child: GestureDetector(
          onTap: _isLoading ? null : _uploadAsync,
          child: CircleAvatar(
            radius: 50,
            backgroundColor: Colors.grey.shade800,
            child: ClipOval(
              child: Image.network(
                widget.imageUrl,
                fit: BoxFit.cover,
                width: 100,
                height: 100,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
