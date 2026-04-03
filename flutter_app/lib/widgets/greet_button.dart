import 'package:flutter/material.dart';

class GreetButton extends StatelessWidget {
  final VoidCallback onPressed;
  final String label;

  const GreetButton({Key? key, required this.onPressed, this.label = '打招呼'}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(minimumSize: const Size(80, 36)),
      child: Text(label),
    );
  }
}
