import 'package:flutter/material.dart';

enum FilterOption { all, online, nearby, latest, hot, following }

class FilterBar extends StatelessWidget {
  final FilterOption selected;
  final ValueChanged<FilterOption> onSelected;

  const FilterBar({Key? key, required this.selected, required this.onSelected}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Determine which options to show based on context
    final isCommunity = [FilterOption.latest, FilterOption.hot, FilterOption.following].contains(selected);
    
    final options = isCommunity 
      ? [FilterOption.latest, FilterOption.hot, FilterOption.following]
      : [FilterOption.all, FilterOption.online, FilterOption.nearby];
    
    final labels = isCommunity 
      ? ['最新', '热门', '关注']
      : ['全部', '在线', '附近'];
    
    return Padding(
      padding: const EdgeInsets.all(12.0),
      child: Wrap(
        spacing: 8,
        children: List.generate(options.length, (index) {
          final option = options[index];
          final isSelected = selected == option;
          return ChoiceChip(
            label: Text(labels[index]),
            selected: isSelected,
            onSelected: (selected) {
              if (selected) onSelected(option);
            },
          );
        }),
      ),
    );
  }
}
