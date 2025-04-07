import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart' as auth;
import '../widgets/auth/email_field.dart';
import '../widgets/auth/password_field.dart';
import '../widgets/auth/auth_error.dart';
import '../widgets/auth/submit_button.dart';

class SignInScreen extends StatefulWidget {
  const SignInScreen({super.key});

  @override
  State<SignInScreen> createState() => _SignInScreenState();
}

class _SignInScreenState extends State<SignInScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  bool _isSignIn = true;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (_formKey.currentState!.validate()) {
      if (_isSignIn) {
        await context.read<auth.AuthProvider>().signIn(
              _emailController.text,
              _passwordController.text,
            );
      } else {
        await context.read<auth.AuthProvider>().register(
              _emailController.text,
              _passwordController.text,
            );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Text(
                    _isSignIn ? 'Sign In' : 'Create Account',
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 32),
                  EmailField(controller: _emailController),
                  const SizedBox(height: 16),
                  PasswordField(
                    controller: _passwordController,
                    isSignIn: _isSignIn,
                  ),
                  if (!_isSignIn) ...[
                    const SizedBox(height: 16),
                    PasswordField(
                      controller: _confirmPasswordController,
                      labelText: 'Confirm Password',
                      isSignIn: _isSignIn,
                    ),
                  ],
                  const SizedBox(height: 24),
                  const AuthError(),
                  SubmitButton(
                    onPressed: _submit,
                    text: _isSignIn ? 'Sign In' : 'Register',
                  ),
                  const SizedBox(height: 16),
                  TextButton(
                    onPressed: () {
                      setState(() {
                        _isSignIn = !_isSignIn;
                        _formKey.currentState?.reset();
                      });
                    },
                    child: Text(
                      _isSignIn
                          ? 'Don\'t have an account? Register'
                          : 'Already have an account? Sign in',
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
