import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../screens/sign_in_screen.dart';
import '../../../profile/presentation/providers/profile_provider.dart';

class AuthWrapper extends StatelessWidget {
  final Widget child;

  const AuthWrapper({
    super.key,
    required this.child,
  });

  @override
  Widget build(BuildContext context) {
    return Consumer<AuthProvider>(
      builder: (context, authProvider, _) {
        if (authProvider.isLoading) {
          return const Scaffold(
            body: Center(
              child: CircularProgressIndicator(),
            ),
          );
        }

        if (!authProvider.isAuthenticated) {
          return const SignInScreen();
        }

        // Load user profile when authenticated
        WidgetsBinding.instance.addPostFrameCallback((_) {
          context.read<ProfileProvider>().loadUser(authProvider.user!.uid);
        });

        return child;
      },
    );
  }
}
