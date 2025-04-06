class FineEntity {
  final String id;
  final String issuedToId;

  FineEntity({
    required this.id,
    required this.issuedToId,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'issued_to_id': issuedToId,
    };
  }

  // Convert Map from database to Fine object
  factory FineEntity.fromMap(Map<String, dynamic> map) {
    return FineEntity(
      id: map['id'] as String,
      issuedToId: map['issued_to_id'] as String,
    );
  }
}
