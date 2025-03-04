import 'package:flutter/material.dart';

class LabelInput extends StatelessWidget {
  final String label;
  final String hintText;
  final Widget? prefix;
  final TextEditingController controller;

  const LabelInput(
      {super.key,
      required this.label,
      required this.hintText,
      this.prefix,
      required this.controller});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: TextStyle(fontWeight: FontWeight.bold)),
        const SizedBox(
          height: 4,
        ),
        TextField(
          controller: controller,
          decoration: InputDecoration(
            prefix: prefix,
            suffixIcon: Icon(Icons.clear),
            hintText: hintText,
            border: OutlineInputBorder(),
          ),
        ),
      ],
    );
  }
}
