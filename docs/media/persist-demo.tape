# Persist OS demo — render with: vhs docs/media/persist-demo.tape
# Requires `persist` on PATH (npm install -g persist-os) and `figlet` for the title banner.

Output docs/media/persist-demo.gif

Require persist
Require figlet

Set Shell bash
Set FontSize 16
Set Width 1240
Set Height 860
Set Padding 24
Set Theme "Dracula"
Set TypingSpeed 42ms

# --- Title card: big banner built off-screen, then shown on a clean screen ---
Hide
Type "cd $(mktemp -d)"
Enter
Type "{ tput setaf 6; figlet -f colossal 'Persist OS'; tput sgr0; echo; echo '   Durable, AI-ready engineering memory for your repository.'; echo '   Git tracks what changed.  Persist tracks why.'; echo; } > banner.txt"
Enter
Type "clear"
Enter
Show
Type@1ms "clear; cat banner.txt"
Enter
Sleep 2800ms

Hide
Type "clear"
Enter
Show
Sleep 400ms

# --- 1. Create reviewable repository memory (with an opinion pack) ---
Type "# 1. Create durable memory — docs, agent skills, a session hook, CI, and a commit gate"
Sleep 700ms
Enter
Sleep 500ms
Type "persist init --preset nextjs"
Sleep 400ms
Enter
Sleep 3500ms

# --- 2. Promote a proposed decision to accepted truth ---
Type "# 2. Presets only *propose* — a human accepts the decision"
Sleep 700ms
Enter
Sleep 400ms
Type "persist adr accept nextjs-framework"
Sleep 400ms
Enter
Sleep 2600ms

# --- 3. Bring an MCP tool's context into durable memory, offline ---
Type "# 3. Capture an MCP tool's context into the repo — no network, proposed for review"
Sleep 700ms
Enter
Sleep 400ms
Type "persist mcp add figma"
Sleep 400ms
Enter
Sleep 2600ms

# --- 4. The deterministic gate — honest, not a rubber stamp ---
Type "# 4. The gate is deterministic and honest — it flags the threat model you still owe:"
Sleep 700ms
Enter
Sleep 400ms
Type "persist doctor"
Sleep 400ms
Enter
Sleep 4000ms
