import 'package:doinfine/models/post_meta_data.dart';
import 'package:doinfine/models/profile.dart';

class Fine extends PostMetaData {
  final Profile issuedTo;

  Fine({required this.issuedTo});
}
