import 'package:flutter/foundation.dart';
import '../services/crashlytics_service.dart';

class CrashlyticsProvider with ChangeNotifier {
  final CrashlyticsService _crashlyticsService = CrashlyticsService();

  Future<void> initialize() async {
    await _crashlyticsService.initialize();
  }

  Future<void> recordError(
    dynamic error,
    StackTrace? stack, {
    bool fatal = false,
  }) async {
    await _crashlyticsService.recordError(error, stack, fatal: fatal);
  }

  Future<void> setUserIdentifier(String userId) async {
    await _crashlyticsService.setUserIdentifier(userId);
  }

  Future<void> log(String message) async {
    await _crashlyticsService.log(message);
  }
}
