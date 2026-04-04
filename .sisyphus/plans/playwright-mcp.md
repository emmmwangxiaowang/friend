## Plan Structure

Plan Title: Enable Playwright MCP integration

## TL;DR
> **Summary**: Set up Playwright MCP integration using the existing mcp.json entry and scaffold a minimal Playwright test suite to validate end-to-end testing within the repo.

## Context
### Original Request
- Add/enable Playwright MCP integration in the project for end-to-end testing.
### Interview Summary
- Playwright MCP entry exists in mcp.json. Need scaffolding and run scripts.
### Metis Review (gaps addressed)
- Gap: None critical; minor docs and test scaffolding needed.

## Work Objectives
### Core Objective
- Establish Playwright MCP-based testing workflow with a minimal test scaffold.
### Deliverables
- 1) Playwright test scaffold under playwright/tests
- 2) Script to trigger Playwright MCP server runner
- 3) Documentation to guide usage
### Definition of Done (verifiable conditions)
- [ ] Playwright MCP entry is confirmed in mcp.json
- [ ] A sample Playwright test suite exists at playwright/tests
- [ ] A run script (scripts/run-playwright-mcp.sh) is added and executable
- [ ] Documentation describing how to run MCP Playwright tests is added
### Must Have
- Playwright-based tests scaffold
- Run script
- Documentation
### Must NOT Have
- No hard dependencies beyond the existing MCP server

## Verification Strategy
- Test decision: basic smoke test runs via MCP (no network tests required for initial pass)
- QA policy: A tiny test passes locally with minimal config
- Evidence: plan artifacts in .sisyphus/evidence (to be created by execution)

## Execution Strategy
### Parallel Execution Waves
Wave 1: Scaffold + Run Script
Wave 2: Documentation + Sample Test

### Dependency Matrix
- mcp.json must have the Playwright server entry (exists)
- Node/NPM environment must be available for MCP execution
- Playwright dependencies installed via npm/yarn in test runner

### Agent Dispatch Summary
- Wave 1: 2 tasks (scaffold + runner script)
- Wave 2: 1 task (docs) + 1 task (sample test)

## TODOs
- [ ] Create Playwright test scaffold under playwright/tests
- [ ] Create scripts/run-playwright-mcp.sh to trigger MCP runner
- [ ] Add README.md with Quick Start for MCP Playwright tests
- [ ] Verify MCP entry in mcp.json is wired and runnable

## Final Verification Wave
- F1 Plan Compliance Audit — oracle
- F2 Code Quality Review — unspecified-high
- F3 Manual QA — unspecified-high
- F4 Scope Fidelity Check — deep

## Commit Strategy
## Success Criteria
