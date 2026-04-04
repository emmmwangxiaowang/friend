# Draft: Fix Front-end Text Readability (Flutter App)

## Goals
- Improve readability of on-screen text across the Flutter app (font size, weight, color contrast).
- Ensure accessibility considerations (text scaling, contrast ratios).

## Assumptions
- The front-end is Flutter-based (flutter_app).
- Global typography managed via ThemeData/TextTheme in the app.

## Plan (Summary)
- Audit: identify pages and components with text readability issues.
- Design: define typography tokens (fontFamily, fontSizeScale, color palette) and contrast targets.
- Implement: update ThemeData/TextTheme and relevant widgets to use new typography tokens.
- Test: verify via widget tests and manual inspection; ensure text scales properly with system font size changes.
- Document: update plan notes with decisions and changes.

## Open Questions
- Which pages are priority for readability fixes first?
- Do we want to introduce a typography scale (e.g., small, body, title, display) with named constants?
- Confirm color contrast targets for light/dark themes.

## Acceptance Criteria
- [ ] Typography updated consistently across app
- [ ] Text scales with system font size changes (TextScaleFactor respected)
- [ ] No color contrast violations in inspected pages
- [ ] QA sign-off on readability improvements

## Next Steps
- Create a plan with concrete tasks and assign to Wave 1/2.
- Implement changes and run tests.

## Wave 1 Details (Execution Plan)
- T1: Linux font readiness
  - Action: install fonts-noto-cjk and fonts-noto-sans on the build host if not present.
  - Commands: `sudo apt-get update`, `sudo apt-get install -y fonts-noto-cjk fonts-noto-sans`.
  - Validation: `fc-list | grep -E "Noto|文泉|Sans"` returns font entries.
- T2: Pubspec font declaration verification
  - Action: inspect flutter_app/pubspec.yaml; if fonts block missing, add a default font (e.g., NotoSans) and assets folder.
  - Commands: edit pubspec.yaml to include fonts: - family: NotoSans; fonts: - asset: assets/fonts/NotoSans-Regular.ttf
  - Validation: `flutter pub get` succeeds; assets/fonts/ contains font file.
- T3: Global typography integration
  - Action: set ThemeData textTheme to use NotoSans as default font-family.
  - Patch location: flutter_app/lib/main.dart or flutter_app/lib/theme.dart.
  - Validation: app rebuilds without font-family errors; visible text uses the intended font.
- T4: Web readiness
  - Action: enable web, build, and run tests in Chrome.
  - Commands: `flutter config --enable-web`, `flutter build web`, `flutter run -d chrome`.
  - Validation: web page renders with legible text; check at multiple viewports and zoom levels.
- T5: Linux desktop run sanity
  - Action: run a quick linux build and verify text rendering.
  - Commands: `flutter clean`, `flutter pub get`, `flutter run -d linux`.
- T6: Verification & QA
  - Action: run 2-3 representative screens through a manual QA pass; capture screenshots.
- T7: Documentation updates
  - Action: record decisions, font choices, and test results in the plan notes.
