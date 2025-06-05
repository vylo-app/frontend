## GitHub Packages / `.npmrc` Setup

### `.npmrc` already exists with:

  ```ini
  @vylo-app:registry=https://npm.pkg.github.com
  //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
  ```

### Local Development

- Ensure your `GITHUB_TOKEN` (Personal Access Token) has `read:packages` scope.
- Run:

     ```sh
     pnpm install
     ```

* **Pull Shared Types**

  ```makefile
  pull_types_from_npm:
      pnpm update @vylo-app/shared-contract --latest
  ```


## Launching the Telegram Bot

This section explains how to start your Telegram WebApp bot and expose the frontend via Cloudflare Tunnel.

### 1. Set up `.env`

Create a file named `.env` in the project root with:

```env
BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
```

### 2. Run the bot + tunnel

In your project root, run:

```sh
make bot
```

That will:

- Start a Cloudflare Tunnel to `http://localhost:5173`
- Wait until the tunnel URL appears (e.g. `https://abc-xyz.trycloudflare.com`)
- Extract:

  - `PUBLIC_URL` (full tunnel URL)
  - `ALLOWED_HOST` (domain without `https://`)

- Launch the Telegram bot with `PUBLIC_URL` in its env.

#### Sample output:

```sh
✅ Tunnel URL: https://abc-xyz.trycloudflare.com
🌍 Allowed Host: abc-xyz.trycloudflare.com
```

### 3. Start the frontend

Open a new terminal (keep the bot running). Use the printed `ALLOWED_HOST` to start Vite:

```sh
ALLOWED_HOST=abc-xyz.trycloudflare.com pnpm dev
```

This ensures Vite’s server accepts requests from the tunnel domain.

### 4. Open the bot in Telegram

- In Telegram, send `/start` to your bot.
- Click **Launch App**. It opens the frontend inside Telegram’s WebView via the Cloudflare Tunnel.

### 5. Stop the bot

When done, run:

```sh
make kill_bot
```

This kills the bot process; tunnel closes automatically.

---

## Code Quality

We enforce consistent style and prevent errors by running automated checks:

- **On commit (Husky + lint-staged):**
  See [`.husky/pre-commit`](https://github.com/vylo-app/frontend-saas-bootstrap/blob/main/.husky/pre-commit) and [`.husky/pre-push`](https://github.com/vylo-app/frontend-saas-bootstrap/blob/main/.husky/pre-push).

- **On push (Husky pre-push hook):**
  Details in [`.husky/pre-push`](https://github.com/vylo-app/frontend-saas-bootstrap/blob/main/.husky/pre-push).

- **VS Code integration:**
  Configuration in [`.vscode/settings.json`](https://github.com/vylo-app/frontend-saas-bootstrap/blob/main/.vscode/settings.json) to run formatting and linting on save.

- **Continuous Integration (GitHub Actions):**
  Workflow defined in [`.github/workflows/ci.yml`](https://github.com/vylo-app/frontend-saas-bootstrap/blob/main/.github/workflows/ci.yml) runs lint, format-check, and type-check on every PR to `main`.

These automated checks keep the codebase clean and error-free with minimal manual steps.

For code style rules, see [`.eslintrc.js`](https://github.com/vylo-app/frontend-saas-bootstrap/blob/main/eslint.config.js) and [`.prettierrc`](https://github.com/vylo-app/frontend-saas-bootstrap/blob/main/.prettierrc).

---

[Makefile](https://github.com/vylo-app/frontend-saas-bootstrap/blob/main/Makefile) handles launching the bot and tunnel.

[Telegram Bot Script](https://github.com/vylo-app/frontend-saas-bootstrap/blob/main/TelegramBot/make-bot.js) sends the WebApp button.

[Vite Config](https://github.com/vylo-app/frontend-saas-bootstrap/blob/main/vite.config.ts) sets up `allowedHosts` based on environment.

[Source Code](https://github.com/vylo-app/frontend-saas-bootstrap/tree/main/src) lives in `src/` for your React components.
