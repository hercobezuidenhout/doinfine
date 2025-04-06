import 'package:doinfine/main.dart';

class FineRepository {
  final _tableName = 'fines';

  Future<void> createFine({
    required String postId,
    required String issuedToId,
  }) async {
    await supabase.from(_tableName).insert({
      'id': postId,
      'issued_to_id': issuedToId,
    });
  }
}
