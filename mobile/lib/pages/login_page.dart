import 'dart:async';

import 'package:doinfine/extensions/context_extension.dart';
import 'package:doinfine/main.dart';
import 'package:doinfine/pages/home_page.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:supabase_flutter/supabase_flutter.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  bool _isLoading = false;
  bool _isRedirecting = false;
  bool _isVerifying = false;

  late final TextEditingController _emailController = TextEditingController();
  late final TextEditingController _otpController = TextEditingController();

  late final StreamSubscription<AuthState> _authStateSubscription;

  Future<void> _sendOtp() async {
    try {
      setState(() {
        _isLoading = true;
      });

      if (kDebugMode) {
        await supabase.auth.signInWithPassword(
          email: _emailController.text.trim(),
          password: 'jouma',
        );

        return;
      }

      await supabase.auth.signInWithOtp(
        email: _emailController.text.trim(),
      );

      if (mounted) {
        context.showSnackBar('OTP sent!');
        setState(() {
          _isVerifying = true;
        });
      }
    } on AuthException catch (error) {
      print(error.message);
      if (mounted) context.showSnackBar(error.message, isError: true);
    } catch (error) {
      if (mounted) context.showSnackBar('Something went wrong.', isError: true);
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  Future<void> _verifyOtp() async {
    try {
      setState(() {
        _isLoading = true;
      });

      await supabase.auth.verifyOTP(
        type: OtpType.email,
        email: _emailController.text.trim(),
        token: _otpController.text.trim(),
      );
    } on AuthException catch (error) {
      if (mounted) context.showSnackBar(error.message, isError: true);
    } catch (error) {
      if (mounted) context.showSnackBar('Something went wrong.', isError: true);
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  @override
  void initState() {
    _authStateSubscription = supabase.auth.onAuthStateChange.listen(
      (data) {
        if (_isRedirecting) return;

        final session = data.session;

        if (session != null) {
          _isRedirecting = true;

          Navigator.of(context).pushReplacement(
            MaterialPageRoute(builder: (context) => const HomePage()),
          );
        }
      },
      onError: (error) {
        if (error is AuthException) {
          context.showSnackBar(error.message, isError: true);
        } else {
          context.showSnackBar('Unexpected error occured', isError: true);
        }
      },
    );

    super.initState();
  }

  @override
  void dispose() {
    _emailController.dispose();
    _otpController.dispose();
    _authStateSubscription.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              "Welcome!",
              style: TextStyle(
                fontSize: 30,
              ),
            ),
            const SizedBox(height: 9),
            const Text(
              'Please sign in with your email. An OTP will be sent to you to verify.',
            ),
            const SizedBox(height: 18),
            _isVerifying
                ? TextFormField(
                    controller: _otpController,
                    decoration: const InputDecoration(
                      labelText: 'OTP',
                      border: OutlineInputBorder(),
                      filled: true,
                    ),
                  )
                : TextFormField(
                    controller: _emailController,
                    decoration: const InputDecoration(
                      labelText: 'Email',
                      border: OutlineInputBorder(),
                      filled: true,
                    ),
                  ),
            const SizedBox(height: 18),
            _isVerifying
                ? ElevatedButton(
                    onPressed: _isLoading ? null : _verifyOtp,
                    child: Text(_isLoading ? 'Sending' : 'Continue'),
                  )
                : ElevatedButton(
                    onPressed: _isLoading ? null : _sendOtp,
                    child: Text(_isLoading ? 'Sending' : 'Continue'),
                  )
          ],
        ),
      ),
    );
  }
}
