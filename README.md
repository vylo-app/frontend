## 🧼 Code Quality (ESLint + Prettier + Husky)

This project uses pre-commit hooks to enforce code quality.

### ✅ Tools

- ESLint — code linting (no autofix)
- Prettier — formatting check
- lint-staged — runs only on staged files
- Husky — blocks commit on error

### 🔁 Auto-check on commit

No manual steps required:

```sh
git add .
git commit -m “…”
```

If errors exist, commit will be blocked.

### 🔍 Manual check (optional)

```sh
pnpm check
```

Runs full-project:

- `eslint .`
- `prettier --check .`

### 🛠 Fix issues

```sh
pnpm format
```

Runs: `prettier --write .`  
Fix ESLint errors manually.
