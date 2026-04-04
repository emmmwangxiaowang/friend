## Plan: Add dependency paths to .gitignore and commit to dev

### Objective
- Update repository-level .gitignore to ignore common dependency artifacts and archives, then commit the change to the dev branch.

### Suggested ignore entries (add to .gitignore)
- archived/
- **/node_modules/
- node_modules/
- package-lock.json
- yarn.lock
- pubspec.lock
- **/pubspec.lock
- .dart_tool/
- **/.dart_tool/
- .packages
- **/.packages
- build/
- dist/
- .next/
- .cache/
- flutter_app/pubspec.lock

> Note: Do not ignore source code files or essential configuration files besides the dependency artifacts described above.

### Execution Outline (two options)
Option A (recommended): Create a feature branch and merge to dev
- 1) Ensure you have the latest dev: `git fetch origin && git checkout dev && git pull`.
- 2) Create a feature branch: `git checkout -b chore/update-gitignore-deps`.
- 3) Append ignore patterns to `.gitignore` and save.
- 4) Stage changes: `git add .gitignore`.
- 5) Commit: `git commit -m "chore: update .gitignore to ignore dependency artifacts (node_modules, pubspec.lock, package-lock.json, etc.)"`.
- 6) Push: `git push -u origin chore/update-gitignore-deps`.
- 7) Open a PR from `chore/update-gitignore-deps` to `dev` and request review.

Option B: Direct commit to dev (if your repo policy allows direct commits on dev)
- 1) Checkout dev: `git fetch origin && git checkout dev && git pull`.
- 2) Modify .gitignore in place (same ignore entries).
- 3) Commit directly: `git add .gitignore` and `git commit -m "chore: update .gitignore to ignore dependency artifacts"`.
- 4) Push: `git push origin dev`.

### Acceptance Criteria
- [ ] .gitignore contains entries for dependency artifacts and archives as above.
- [ ] Change is committed to the intended target branch (dev or a feature branch) and pushed.
- [ ] If using a branch, a PR is opened and ready for review.

### Post-Commit/Verification
- Run `git status` to verify clean working tree.
- Optionally run a quick `git ls-files -i --exclude-standard` to verify ignored files are excluded from tracking.

### Output / Artifacts
- Updated .gitignore patch applied in the repo.
- Commit reference (if on branch): TBD after execution.
