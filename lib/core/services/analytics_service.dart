import 'package:firebase_analytics/firebase_analytics.dart';

class AnalyticsService {
  final FirebaseAnalytics _analytics = FirebaseAnalytics.instance;

  // Screen tracking
  Future<void> logScreenView({
    required String screenName,
    String? screenClass,
  }) async {
    await _analytics.logScreenView(
      screenName: screenName,
      screenClass: screenClass,
    );
  }

  // User actions
  Future<void> logFineCreated() async {
    await _analytics.logEvent(
      name: 'fine_created',
    );
  }

  Future<void> logFriendRequestSent() async {
    await _analytics.logEvent(
      name: 'friend_request_sent',
    );
  }

  Future<void> logFriendRequestAccepted() async {
    await _analytics.logEvent(
      name: 'friend_request_accepted',
    );
  }

  // User properties
  Future<void> setUserProperties({
    required String userId,
    required String username,
  }) async {
    await _analytics.setUserId(id: userId);
    await _analytics.setUserProperty(
      name: 'username',
      value: username,
    );
  }
}
