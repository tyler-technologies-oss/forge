# @tylertech/forge-rich-text-editor

## 0.1.0

### Minor Changes

- 696fc4d: Fix three ARIA defects and add an automated accessibility suite.
  - **The editable element had no accessible name.** TipTap builds its own contenteditable element
    inside the one it is handed, and that inner element is the real textbox — focusable, and where
    assistive technology lands. The name was on the container instead, so the field a user actually
    reaches was anonymous. It is now named through `editorProps`.
  - **`aria-controls` referenced an id across a shadow boundary.** The toolbar and all thirteen tool
    buttons carried `aria-controls="forge-rte-content"`, but that id lives inside
    `forge-rich-text-content`'s shadow root. IDREF attributes cannot cross a shadow boundary, so all
    fourteen references were invalid — axe rates this critical. The relationship is now expressed with
    `ariaControlsElements`, which can cross a boundary, exposed on the editor context as
    `controlsElement`. It targets `forge-rich-text-editor` (or `forge-rich-text-context` when composed)
    rather than the editable element: element references only resolve into the same tree or an
    ancestor tree, and the editable element sits in a sibling branch. Feature-detected, so engines without ARIA element reflection simply carry no controls
    relationship.
  - **The renderer advertised itself as an unnamed text input.** ProseMirror marks its element
    `role="textbox"` even when not editable, leaving the renderer as an unnamed, read-only text field.
    It is display surface, and the host already carries `role="article"` and the consumer's label, so
    the inner element now carries `role="presentation"` while its children keep their own semantics.

  The new suite runs axe over the editable, readonly, disabled, counted and error states, the link
  popover while open, a composed layout, and the renderer. All three defects were invisible to the
  existing 600 specs, and two of those specs asserted the invalid `aria-controls` value as expected
  behavior.

- 696fc4d: Count block boundaries toward `maxLength`, and refuse new blocks once the limit is reached.

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

- 696fc4d: Make the disabled and readonly states visually distinct. Both dimmed through
  `opacity: var(--forge-theme-disabled-opacity)`, a custom property forge does not define — forge
  scopes disabled opacity per component rather than exposing a theme-level one — so the declaration
  was invalid and nothing dimmed. A disabled editor rendered at full opacity, and disabled was
  indistinguishable from readonly.

  Both now resolve to forge's `emphasis(medium-low)` (0.38) behind the customizable
  `--forge-rich-text-editor-disabled-opacity` and `--forge-rich-text-content-disabled-opacity`.

  `forge-rich-text-content` also mirrors the context's disabled and readonly state onto its host.
  It takes that state from the surrounding context rather than from attributes, so its own
  `:host([disabled])` and `:host([readonly])` rules never matched and were dead — including the
  readonly `cursor: default`. This matters most for composed layouts, where the content element is
  used directly and there is no editor host to dim.

  A disabled editor also sets `user-select: none`. `pointer-events: none` prevents a selection
  starting inside the editor but not one dragged in from outside, so disabled content remained
  selectable.

  The two specs covering this asserted only that the attribute and property were set — one noted it
  "triggers :host([disabled]) styles" without checking any — so they now assert computed opacity,
  pointer-events and user-select instead.

- 696fc4d: Initial release of the Tyler Forge™ rich text editor Web Components, lifted from
  `@tylertech/forge-extended`. Ships `forge-rich-text-editor`, `forge-rich-text-renderer`,
  `forge-rich-text-content`, `forge-rich-text-context` and the `forge-rte-*` feature elements.
  TipTap is bundled as a dependency of this package so that `@tylertech/forge` consumers who do
  not need a rich text editor are unaffected.

  Every custom element tag name except one is unchanged from `@tylertech/forge-extended`, so
  markup ports across almost as-is. The TypeScript API was normalized to match the rest of the
  monorepo:
  - The `forge-rte-feature-divider` element is renamed to `forge-rte-divider`, the only tag
    change. It was the one tag that did not follow the `forge-rte-<tool>` pattern.
  - Tag constants are now `SCREAMING_SNAKE_CASE`, e.g. `RichTextEditorComponentTagName` is now
    `RICH_TEXT_EDITOR_TAG_NAME`.
  - Feature classes are named after their tag, e.g. `RichTextFeatureBoldComponent` is now
    `RteBoldComponent`. Affects `Align`, `Bold`, `Code`, `Divider`, `Heading`, `Link`, `Strike`
    and `UndoRedo`.
  - The `RichTextEditorFeature` interface is now `IRichTextEditorFeature`.
  - Every component exposes a `defineXComponent()` function, plus the
    `defineRichTextEditorComponents()` and `defineRteFeatureComponents()` aggregates.
  - The `forge-rte-tool-toggle` event is now correctly declared on `HTMLElementEventMap`; the
    previous declaration named an event that was never dispatched.
  - `content` on `forge-rich-text-editor` and `forge-rich-text-context` accepts either an HTML string
    or a ProseMirror document. The runtime already sanitized both; only the declared type was
    narrower. The matching `content` attribute remains HTML-only, since an attribute cannot carry an
    object — pass a document through the property. Note that the React adapter forwards props as
    attributes, so documents must be assigned through a ref there; see that package's README.

- 696fc4d: Apply `maxLength` changes to an editor that already exists. Extensions are configured once, when the
  editor is created, so the limit was captured at that moment — a `maxLength` raised or lowered
  afterwards was never enforced. The counter and validation read the new value while the editor kept
  filtering against the old one, and an editor created with no limit accepted unlimited text and
  paragraphs no matter what it was later set to.

  The limit is now resolved per transaction rather than captured, so a change takes effect without
  recreating the editor and losing its content, selection and history. Validation is also re-run when
  the limit changes, so the error state does not lag a keystroke behind.

- 696fc4d: Preserve schema-supported `style` declarations instead of stripping the attribute outright.
  `sanitizeHTML` removed `style` from every element, and `TextAlign` declares no tag selector —
  `element.style.textAlign` is its only carrier — so text alignment was discarded from all HTML
  input. This was not limited to pasted content: feeding the editor's own `toHTML()` output back
  through `content` dropped the alignment too, silently losing it on a save and reload cycle.

  `style` is now rewritten to an allow-list of declarations, each validated against a value pattern
  rather than passed through, so the attribute still cannot carry `url()`, `expression()`, a
  dangerous protocol or `!important`. `text-align` is accepted for `left`, `right`, `center` and
  `justify`; `color` and `background-color` are accepted as hex, `rgb()`/`rgba()`, `hsl()`/`hsla()`
  or a keyword, so a future text color feature works without another sanitizer change.

  Formatting held in `class` or `data-*` is still stripped. Extensions that keep attributes there —
  a code block's `language-*` class, a task item's `data-checked` — will each need an allow-list
  entry of the same shape when those features are added.

- 696fc4d: Disable the undo and redo buttons when the editor is disabled or readonly. The condition was
  `isEditable() && !canUndo()`, so a non-editable editor made the whole expression false and the
  buttons rendered fully enabled — they looked and focused like active controls while the editor
  they act on could not be modified. Every other feature already used
  `?disabled=${!isEditable()}`; undo/redo now combines both conditions, staying disabled when the
  editor is not editable and when there is no history to move through.

  Two existing specs asserted the old behavior, with a comment noting it "may be a bug in the
  component, but testing actual behavior" — their names already described the correct expectation
  and contradicted their assertions. They now assert that both buttons are disabled, plus a new case
  covering an editor that has history and is then disabled.
