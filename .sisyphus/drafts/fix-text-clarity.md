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
