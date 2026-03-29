# AGENTS for server/src/controllers

Overview: HTTP request handlers for all API endpoints.

## WHERE TO LOOK
- authController.ts — login, signup, JWT
- aiController.ts — AI recommendations
- chatController.ts — chat messages
- postsController.ts — social posts
- soulTestsController.ts — quiz/test endpoints

## CONVENTIONS
- Controllers accept req/res, delegate to services, return JSON
- Errors handled with try/catch
- Consistent response shape and proper HTTP status codes
- Include input validation where possible

## ERROR HANDLING
- Prefer centralized error handling when possible
- Log method, path, and status for traceability
- Sanitize error messages before sending to clients

## TESTS
- Each handler exported as a named function
- Tests mock the service layer
- Cover success and error paths
