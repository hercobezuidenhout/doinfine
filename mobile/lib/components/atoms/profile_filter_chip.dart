import 'package:flutter/material.dart';

class ProfileFilterChip extends StatelessWidget {
  final String label;
  final bool selected;
  final Function(bool) onSelected;

  const ProfileFilterChip({
    super.key,
    required this.label,
    required this.selected,
    required this.onSelected,
  });

  @override
  Widget build(BuildContext context) {
    return ChoiceChip(
      label: Text(label),
      selected: selected,
      selectedColor: Colors.grey.shade900,
      showCheckmark: false,
      labelStyle: TextStyle(
        color: selected
            ? Colors.white
            : Colors.black, // Change color when selected
      ),
      onSelected: onSelected,
    );
  }
}
