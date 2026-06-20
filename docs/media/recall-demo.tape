# Recall OS demo — render with: vhs docs/media/recall-demo.tape
# Requires the `recall` CLI on PATH (npm install -g recall-os).

Output docs/media/recall-demo.gif

Require recall

Set Shell bash
Set FontSize 16
Set Width 1240
Set Height 860
Set Padding 22
Set Theme "Dracula"
Set TypingSpeed 45ms

Hide
Type "cd $(mktemp -d) && clear"
Enter
Show

Type "# Recall OS — durable, AI-ready repository memory"
Sleep 800ms
Enter
Sleep 700ms

Type "recall init --preset nextjs"
Sleep 400ms
Enter
Sleep 3s

Type "recall adr accept nextjs-framework"
Sleep 400ms
Enter
Sleep 2500ms

Type "recall mcp add figma"
Sleep 400ms
Enter
Sleep 2500ms

Type "recall doctor"
Sleep 400ms
Enter
Sleep 3500ms
