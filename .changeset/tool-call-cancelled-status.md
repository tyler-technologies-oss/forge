---
'@tylertech/forge-ai': minor
---

feat(tool-call): add `cancelled` tool call status for calls that end without a result

Widening `ToolCall['status']` can break exhaustive status switches in consumer code.
