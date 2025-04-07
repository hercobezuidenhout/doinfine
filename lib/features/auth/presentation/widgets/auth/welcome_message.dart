import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart' as auth;

class WelcomeMessage extends StatelessWidget {
  const WelcomeMessage({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<auth.AuthProvider>(
      builder: (context, authProvider, _) {
        return Center(
          child:
              Text('Welcome to Doinfine, ${authProvider.user?.email ?? ""}!'),
        );
      },
    );
  }
}
