import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart' as auth;

class AuthError extends StatelessWidget {
  const AuthError({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<auth.AuthProvider>(
      builder: (context, authProvider, _) {
        final error = authProvider.error;
        if (error != null) {
          return Padding(
            padding: const EdgeInsets.only(bottom: 16),
            child: Text(
              error,
              style: const TextStyle(color: Colors.red),
              textAlign: TextAlign.center,
            ),
          );
        }
        return const SizedBox.shrink();
      },
    );
  }
}
