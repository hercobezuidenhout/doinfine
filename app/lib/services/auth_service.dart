import 'package:doinfine/main.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class AuthService {
  String getCurrentUserId() {
    return supabase.auth.currentUser!.id;
  }

  User getCurrentUser() {
    return supabase.auth.currentUser!;
  }

  void signOut() {
    supabase.auth.signOut();
  }
}
