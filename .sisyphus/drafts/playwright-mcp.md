# Draft: Playwright MCP Setup

## Requirements (confirmed)
- Add/ensure an MCP server for Playwright is configured in mcp.json (existing entry).
- Provide a test scaffold under playwright/tests.
- Provide a script to run tests using MCP (e.g., npm i, npm test) in the context of a Playwright workflow.
- Document how to trigger tests via MCP for CI or local run.

## Technical Decisions
- Use the existing mcp.json entry "playwright" with: 
  - command: "npx"
  - args: ["-y", "@anthropic-ai/mcp-server-playwright"]
- Tests will be stored in: "playwright/tests"
- Use Playwright's test runner to execute tests, integrated with MCP.
- Use a small sample test to validate MCP is wired correctly.
- Ensure environment (node, npm) is present in the container or runner.

## Research Findings
- The repository already contains an MCP config for Playwright in mcp.json with the server "playwright".
- No existing Playwright tests in the repo; scaffolding needed.

## Open Questions
- Where will the tests run (local, CI, MCP runner host)?
- Do we want cross-platform tests (Linux only, or Windows/macOS as well)?
- How shall we version test data and artifact outputs?

## Scope Boundaries
- IN: Create test scaffolding, add Playwright test runner script, document how to run via MCP.
- OUT: Implement full test suite; wire to CI (deferred).

## Acceptance Criteria (agent-executable)
- [ ] A Playwright test scaffold is added at playwright/tests with a simple example.
- [ ] A script to run the test via MCP is provided (e.g., scripts/run-playwright-mcp.sh).
- [ ] Documentation updated to explain how to invoke via MCP.

## QA Scenarios
- Scenario: Happy path
  - Tool: Playwright test via MCP
  - Steps: Run the MCP Playwright server/test runner; ensure test passes.
  - Expected: Test passes, artifact/logs generated.
  - Evidence: .sisyphus/evidence/playwright-test-pass.*
- Scenario: Failure/edge case
  - Tool: Playwright test
  - Steps: Introduce a failing test; trigger MCP run; verify proper failure output.
  - Expected: Clear error log; MCP returns non-zero exit code and logs.
  - Evidence: .sisyphus/evidence/playwright-test-fail.*

## Plan Discovery
- The plan will include a Wave-1 with setup tasks and a Wave-2 with scaffolding and initial test.

## Next Steps
- Create the plan in .sisyphus/plans/playwright-mcp.md after clearance.
