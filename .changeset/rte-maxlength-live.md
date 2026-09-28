---
'@tylertech/forge-rich-text-editor': minor
---

Apply `maxLength` changes to an editor that already exists. Extensions are configured once, when the
editor is created, so the limit was captured at that moment — a `maxLength` raised or lowered
afterwards was never enforced. The counter and validation read the new value while the editor kept
filtering against the old one, and an editor created with no limit accepted unlimited text and
paragraphs no matter what it was later set to.

The limit is now resolved per transaction rather than captured, so a change takes effect without
recreating the editor and losing its content, selection and history. Validation is also re-run when
the limit changes, so the error state does not lag a keystroke behind.
