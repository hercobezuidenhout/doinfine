import 'package:cloud_firestore/cloud_firestore.dart';

class User {
  final String uid;
  final String username;
  final String fullName;
  final DateTime createdAt;
  final DateTime updatedAt;
  final List<Badge> badges;
  final PrivacySettings privacySettings;

  User({
    required this.uid,
    required this.username,
    required this.fullName,
    required this.createdAt,
    required this.updatedAt,
    required this.badges,
    required this.privacySettings,
  });

  factory User.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return User(
      uid: doc.id,
      username: data['username'] ?? '',
      fullName: data['fullName'] ?? '',
      createdAt: (data['createdAt'] as Timestamp).toDate(),
      updatedAt: (data['updatedAt'] as Timestamp).toDate(),
      badges: (data['badges'] as List<dynamic>? ?? [])
          .map((badge) => Badge.fromMap(badge))
          .toList(),
      privacySettings: PrivacySettings.fromMap(data['privacySettings'] ?? {}),
    );
  }

  Map<String, dynamic> toFirestore() {
    return {
      'username': username,
      'fullName': fullName,
      'createdAt': Timestamp.fromDate(createdAt),
      'updatedAt': Timestamp.fromDate(updatedAt),
      'badges': badges.map((badge) => badge.toMap()).toList(),
      'privacySettings': privacySettings.toMap(),
    };
  }

  User copyWith({
    String? username,
    String? fullName,
    List<Badge>? badges,
    PrivacySettings? privacySettings,
  }) {
    return User(
      uid: uid,
      username: username ?? this.username,
      fullName: fullName ?? this.fullName,
      createdAt: createdAt,
      updatedAt: DateTime.now(),
      badges: badges ?? this.badges,
      privacySettings: privacySettings ?? this.privacySettings,
    );
  }
}

class Badge {
  final String id;
  final String name;
  final String description;
  final String iconUrl;
  final DateTime earnedAt;

  Badge({
    required this.id,
    required this.name,
    required this.description,
    required this.iconUrl,
    required this.earnedAt,
  });

  factory Badge.fromMap(Map<String, dynamic> map) {
    return Badge(
      id: map['id'] ?? '',
      name: map['name'] ?? '',
      description: map['description'] ?? '',
      iconUrl: map['iconUrl'] ?? '',
      earnedAt: (map['earnedAt'] as Timestamp).toDate(),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'iconUrl': iconUrl,
      'earnedAt': Timestamp.fromDate(earnedAt),
    };
  }
}

class PrivacySettings {
  final String profileVisibility;
  final String postVisibility;

  PrivacySettings({
    required this.profileVisibility,
    required this.postVisibility,
  });

  factory PrivacySettings.fromMap(Map<String, dynamic> map) {
    return PrivacySettings(
      profileVisibility: map['profileVisibility'] ?? 'public',
      postVisibility: map['postVisibility'] ?? 'public',
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'profileVisibility': profileVisibility,
      'postVisibility': postVisibility,
    };
  }
}
