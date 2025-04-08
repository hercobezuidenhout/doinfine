import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../screens/sign_in_screen.dart';
import '../../../profile/presentation/providers/profile_provider.dart';
import '../../../../core/providers/analytics_provider.dart';

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

        // Load user profile and set analytics properties when authenticated
        WidgetsBinding.instance.addPostFrameCallback((_) async {
          final profileProvider = context.read<ProfileProvider>();
          final analyticsProvider = context.read<AnalyticsProvider>();

          await profileProvider.loadUser(authProvider.user!.uid);

          if (profileProvider.user != null) {
            await analyticsProvider.setUserProperties(
              userId: profileProvider.user!.uid,
              username: profileProvider.user!.username,
            );
          }
        });

        return child;
      },
    );
  }
}
