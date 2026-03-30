import 'package:flutter/material.dart';

class PostFilterBar extends StatelessWidget {
  final String current;
  final ValueChanged<String> onChanged;

  const PostFilterBar({Key? key, required this.current, required this.onChanged}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 44,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          _FilterChip(label: 'Latest', value: 'latest', active: current == 'latest', onChanged: onChanged),
          _FilterChip(label: 'Hot', value: 'hot', active: current == 'hot', onChanged: onChanged),
          _FilterChip(label: 'Following', value: 'following', active: current == 'following', onChanged: onChanged),
        ],
      ),
    );
  }
}

class _FilterChip extends StatelessWidget {
  final String label;
  final String value;
  final bool active;
  final ValueChanged<String> onChanged;

  const _FilterChip({required this.label, required this.value, required this.active, required this.onChanged});

  @override
  Widget build(BuildContext context) {
    return ChoiceChip(
      label: Text(label),
      selected: active,
      onSelected: (_) => onChanged(value),
    );
  }
}
