---
'@tylertech/forge-rich-text-editor': minor
---

Count block boundaries toward `maxLength`, and refuse new blocks once the limit is reached.

TipTap's `CharacterCount` derives its count from `textBetween(0, size, undefined, ' ')`, where the
third argument is the block separator — passing `undefined` joins blocks with nothing, so a
paragraph break costs zero characters. A document sitting exactly at its limit could therefore
still grow without bound by pressing Enter: the count stayed pinned at the limit while blank
paragraphs accumulated, and every pasted block added structure the limit never accounted for.

The limit is now enforced by a `CharacterLimit` extension that counts each block boundary as one
character, the way a textarea with `maxlength` counts a newline, and the reported count uses the
same figure. `CharacterCount` is still used for the word count. Transactions that leave the count
unchanged or reduce it are always allowed, so content that arrives over the limit can be edited
back down rather than becoming uneditable.

Note that a document of `abc` and `def` in two paragraphs now reports 7 characters rather than 6.
