import 'package:flutter/material.dart';
import '../models/user.dart';

enum FilterOption { all, online, nearby }

class FilterBar extends StatelessWidget {
  final FilterOption selected;
  final ValueChanged<FilterOption> onSelected;

  const FilterBar({Key? key, required this.selected, required this.onSelected}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(12.0),
      child: ToggleButtons(
        isSelected: [selected == FilterOption.all, selected == FilterOption.online, selected == FilterOption.nearby],
        onPressed: (index) {
          onSelected(FilterOption.values[index]);
        },
        borderRadius: BorderRadius.circular(8.0),
        children: const [
          Padding(padding: EdgeInsets.symmetric(horizontal: 12.0), child: Text('全部')),
          Padding(padding: EdgeInsets.symmetric(horizontal: 12.0), child: Text('在线')),
          Padding(padding: EdgeInsets.symmetric(horizontal: 12.0), child: Text('附近')),
        ],
      ),
    );
  }
}
