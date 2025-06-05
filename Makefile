ENV_FILE=.env
PORT=5173

.PHONY: bot kill_bot

bot:
	@echo "📡 Starting Telegram Bot..."
	@echo "🌐 Creating tunnel on port $(PORT)..."
	@pnpm exec cloudflared tunnel --url http://localhost:$(PORT) --no-autoupdate > .cf-log.txt 2>&1 & \
	echo "⏳ Waiting for public URL..." && \
	until grep -q 'https://.*\.trycloudflare\.com' .cf-log.txt; do sleep 1; done && \
	PUBLIC_URL=$$(grep -o 'https://.*\.trycloudflare\.com' .cf-log.txt | head -n 1) && \
	ALLOWED_HOST=$$(echo $$PUBLIC_URL | sed 's|https://||') && \
	echo "✅ Tunnel URL: $$PUBLIC_URL" && \
	echo "🌍 Allowed Host: $$ALLOWED_HOST" && \
	env PUBLIC_URL=$$PUBLIC_URL PORT=$(PORT) node make-bot.js && \
	echo "\n🧠 Tip: To launch Vite with Cloudflare tunnel allowed, run:" && \
	echo "     ALLOWED_HOST=$$ALLOWED_HOST PORT=$(PORT) pnpm dev" && \
	echo "\n💡 Or export it:" && \
	echo "     export ALLOWED_HOST=$$ALLOWED_HOST PORT=$(PORT)"
	rm -f .cf-log.txt

kill_bot:
	pkill -f make-bot.js || true

pull_types_from_npm:
	pnpm update @vylo-app/shared-contract