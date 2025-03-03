import 'package:doinfine/components/atoms/profile_filter_chip.dart';
import 'package:flutter/material.dart';

class ProfileFilterBar extends StatefulWidget {
  const ProfileFilterBar({super.key});

  @override
  State<ProfileFilterBar> createState() => _ProfileFilterBarState();
}

class _ProfileFilterBarState extends State<ProfileFilterBar> {
  int? _selectedChip = 0;

  List<String> chips = [
    '🪙 Fines',
    '🙌 Friends',
    '🎖️ Badges',
    '💪 Challenges'
  ];

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 50,
      child: ListView.separated(
        itemCount: chips.length,
        scrollDirection: Axis.horizontal,
        itemBuilder: (context, index) {
          return ProfileFilterChip(
              label: chips[index],
              selected: _selectedChip == index,
              onSelected: (selected) {
                setState(() {
                  _selectedChip = selected ? index : 0;
                });
              });
        },
        separatorBuilder: (context, index) {
          return SizedBox(
            width: 8,
          );
        },
      ),
    );
  }
}
