import 'package:flutter/material.dart';

class HeroBanner extends StatelessWidget {
  const HeroBanner({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: double.infinity,
      height: 150,
      child: Container(
        decoration: const BoxDecoration(
          borderRadius: BorderRadius.all(Radius.circular(16.0)),
          gradient: LinearGradient(
            colors: [Colors.blueAccent, Colors.lightBlueAccent],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
        ),
        padding: const EdgeInsets.all(16.0),
        child: Align(
          alignment: Alignment.bottomLeft,
          child: Text(
            'Welcome to Flutter Home Skeleton',
            style: Theme.of(context).textTheme.headline6?.copyWith(color: Colors.white),
          ),
        ),
      ),
    );
  }
}
