## Plan: Fix Front-end Text Readability (Flutter UI)

## TL;DR
> Summary: Implement a unified typography system for the Flutter app to improve readability and accessibility across all screens. Update ThemeData(TextTheme), font sizes, and color contrast. Validate with quick checks and document changes.
> Deliverables: 1) typography tokens, 2) ThemeData updates, 3) updated widgets to use tokens, 4) accessibility test plan, 5) documentation.
> Effort: Medium
> Parallel: YES - 1st wave audit + 2nd wave implementation
> Critical Path: Define typography tokens → implement in ThemeData → apply to widgets

## Context
### Original Request
- Fix readability issues in front-end UI text.
### Decisions
- Will implement a typography scale with body, title, and display tokens.
- Ensure accessibility by respecting font scaling and color contrast.

## Work Objectives
### Core Objective
- Achieve consistent, legible typography across all front-end screens.
### Deliverables
- A central typography token set (fontFamily, fontSizes, lineHeights, colorRoles).
- ThemeData/TextTheme wired to tokens.
- Updated widgets to consume tokens rather than hard-coded values.
- Accessibility test plan and documentation.

## Definition of Done (DO)
- All screens render with the new typography tokens.
- Text scales with system font size (textScaleFactor respected).
- No major readability regressions in QA.
- Documentation updated in plan notes.

## Must Have / Must Not Have
- Must Have: Typography tokens; Theme integration; QA checks.
- Must Not Have: Fragmented font sizes; hard-coded values scattered.

## Verification Strategy
- Visual inspection on 4-5 representative screens (Home, Discover, Profile, Chat).
- Test: simple widget tests to ensure Text widgets render using expected styles.
- Accessibility: verify contrast in light/dark themes.

## Execution Outline (Phases)
Phase 0: Audit
- Identify problem text on key screens and components.
Phase 1: Design
- Define tokens: fontFamily, fontSize scale, lineHeight, color tokens for text.
 Phase 2: Implementation
- Update flutter_app/lib/theme.dart or equivalent to introduce TextTheme tokens.
- Replace in widgets: Text(... style: ...) to use tokens.
 Phase 3: Testing
- Widget tests and manual QA; verify scaling and contrast.
 Phase 4: Documentation
- Update design notes and changelog.

## Parallel Execution Waves
- Wave 1: Audit tasks (identify where changes needed)
- Web Testing (Flutter Web)
  - Enable web: `flutter config --enable-web`
  - Build web: `flutter build web`
  - Run: `flutter run -d chrome` or `flutter run -d web-server`
  - Validate: text readability on web across viewports; test with browser zoom
  - Capture baseline screenshots
  - Acceptance: web rendering matches desktop typography; text scales properly
- Linux font readiness (local desktop)
  - Check system fonts: ensure fonts-noto-cjk and fonts-noto-sans are installed
  - If missing, install via: `sudo apt-get update` && `sudo apt-get install -y fonts-noto-cjk fonts-noto-sans`
  - Verify with: `fc-list | grep -E "Noto|文泉|sans"`
  - Confirm pubspec.yaml fonts declaration or plan to fallback to system font
  - Validate by running a quick desktop session: `flutter run -d linux` (if environment allows) or inspect UI after rebuild
- Web Testing (Flutter Web)
  - Enable web: `flutter config --enable-web`
  - Build web: `flutter build web`
  - Run: `flutter run -d chrome` or `flutter run -d web-server`
  - Validate: text readability on web across viewports; test with browser zoom
  - Capture baseline screenshots
  - Acceptance: web rendering matches desktop typography; text scales properly
- Wave 2: Implement typography token set and ThemeData integration
- Wave 3: Apply tokens to widgets and run tests

## References / Dependencies
- Existing Theme setup in flutter_app
- Current color palette and dark/light theme support

## Notes
- Output artifacts: .sisyphus/evidence/… (to be created during execution)
