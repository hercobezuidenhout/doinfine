import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class FriendRequestListItem extends StatelessWidget {
  final String id;
  final String title;
  final DateTime createdAt;
  final GestureTapCallback onTap;

  const FriendRequestListItem({
    super.key,
    required this.id,
    required this.title,
    required this.createdAt,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return AnimatedContainer(
      duration: Duration(milliseconds: 300),
      curve: Curves.easeInOut,
      margin: EdgeInsets.symmetric(vertical: 5),
      child: Card(
        key: ValueKey(id),
        child: ListTile(
          onTap: onTap,
          title: Text(title),
          subtitle: Text(
            DateFormat('MMMM dd, yyyy').format(createdAt),
          ),
        ),
      ),
    );
  }
}
