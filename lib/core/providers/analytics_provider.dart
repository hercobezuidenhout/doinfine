import 'package:flutter/foundation.dart';
import '../services/analytics_service.dart';

class AnalyticsProvider with ChangeNotifier {
  final AnalyticsService _analyticsService = AnalyticsService();

  Future<void> logScreenView({
    required String screenName,
    String? screenClass,
  }) async {
    await _analyticsService.logScreenView(
      screenName: screenName,
      screenClass: screenClass,
    );
  }

  Future<void> logFineCreated() async {
    await _analyticsService.logFineCreated();
  }

  Future<void> logFriendRequestSent() async {
    await _analyticsService.logFriendRequestSent();
  }

  Future<void> logFriendRequestAccepted() async {
    await _analyticsService.logFriendRequestAccepted();
  }

  Future<void> setUserProperties({
    required String userId,
    required String username,
  }) async {
    await _analyticsService.setUserProperties(
      userId: userId,
      username: username,
    );
  }
}
