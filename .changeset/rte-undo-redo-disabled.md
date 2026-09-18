---
'@tylertech/forge-rich-text-editor': minor
---

Disable the undo and redo buttons when the editor is disabled or readonly. The condition was
`isEditable() && !canUndo()`, so a non-editable editor made the whole expression false and the
buttons rendered fully enabled — they looked and focused like active controls while the editor
they act on could not be modified. Every other feature already used
`?disabled=${!isEditable()}`; undo/redo now combines both conditions, staying disabled when the
editor is not editable and when there is no history to move through.

Two existing specs asserted the old behavior, with a comment noting it "may be a bug in the
component, but testing actual behavior" — their names already described the correct expectation
and contradicted their assertions. They now assert that both buttons are disabled, plus a new case
covering an editor that has history and is then disabled.
