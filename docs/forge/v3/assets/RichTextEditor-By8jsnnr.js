import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-Byzp6JFn.js";import{n as c,t as l}from"./CustomArgTypes-QAslgvtG.js";import{a as u,i as d,n as f,o as p,r as m,s as h,t as g}from"./Editor.stories-m3PpfmZL.js";import{i as _,r as v,t as y}from"./Features.stories-1zVCQVQj.js";import{i as b,n as x,t as S}from"./Recipes.stories-D03QPg9a.js";import{r as C,t as w}from"./Renderer.stories-YpkMizgM.js";function T(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(s,{of:d}),`
`,(0,D.jsx)(o,{}),`
`,(0,D.jsxs)(n.p,{children:[`The rich text editor provides a WYSIWYG editing surface built on `,(0,D.jsx)(n.a,{href:`https://tiptap.dev/`,rel:`nofollow`,children:`Tiptap`}),`, along with a read-only renderer for displaying saved
content. Unlike most Forge components it ships in its own package, `,(0,D.jsx)(n.code,{children:`@tylertech/forge-rich-text-editor`}),`, because Tiptap is a heavy dependency that
consumers of the main library should not pay for. `,(0,D.jsx)(n.code,{children:`@tylertech/forge`}),` is a peer dependency.`]}),`
`,(0,D.jsx)(a,{of:f}),`
`,(0,D.jsx)(n.h2,{id:`installation`,children:`Installation`}),`
`,(0,D.jsx)(n.pre,{children:(0,D.jsx)(n.code,{className:`language-bash`,children:`npm install @tylertech/forge-rich-text-editor
`})}),`
`,(0,D.jsx)(n.p,{children:`Registration is split in two so an application only pays for the tools it uses. The core elements and the feature elements are registered separately:`}),`
`,(0,D.jsx)(n.pre,{children:(0,D.jsx)(n.code,{className:`language-ts`,children:`import { defineRichTextEditorComponents } from '@tylertech/forge-rich-text-editor';
import { defineRteFeatureComponents } from '@tylertech/forge-rich-text-editor/features';

defineRichTextEditorComponents();
defineRteFeatureComponents();
`})}),`
`,(0,D.jsx)(n.p,{children:`Or simply side-effect import both entry points:`}),`
`,(0,D.jsx)(n.pre,{children:(0,D.jsx)(n.code,{className:`language-ts`,children:`import '@tylertech/forge-rich-text-editor';
import '@tylertech/forge-rich-text-editor/features';
`})}),`
`,(0,D.jsx)(n.h2,{id:`composition`,children:`Composition`}),`
`,(0,D.jsxs)(n.p,{children:[(0,D.jsx)(n.strong,{children:`The editor's capabilities are determined by the feature elements slotted into it.`}),` Each `,(0,D.jsx)(n.code,{children:`<forge-rte-*>`}),` element contributes its own Tiptap extension,
and the editor collects them to build its schema. An editor with nothing slotted supports no formatting at all.`]}),`
`,(0,D.jsxs)(n.p,{children:[`This is the most important thing to understand about the component, and the most common source of confusion: content handling looks broken when the
feature providing a given mark simply is not slotted. `,(0,D.jsx)(n.code,{children:`<forge-rte-standard-tools>`}),` is the usual starting point — it composes ten of the feature elements,
excluding `,(0,D.jsx)(n.code,{children:`code`}),` and `,(0,D.jsx)(n.code,{children:`link`}),`, which are opt-in.`]}),`
`,(0,D.jsx)(n.pre,{children:(0,D.jsx)(n.code,{className:`language-html`,children:`<forge-rich-text-editor>
  <forge-rte-standard-tools></forge-rte-standard-tools>
</forge-rich-text-editor>
`})}),`
`,(0,D.jsxs)(n.p,{children:[`Individual features can be composed instead when a narrower toolbar is wanted, and they can be arranged freely alongside dividers. In a composed
layout, group them in `,(0,D.jsx)(n.code,{children:`<forge-rich-text-toolbar>`}),`, which provides the toolbar role, an accessible name through its `,(0,D.jsx)(n.code,{children:`label`}),`, and keyboard navigation.`]}),`
`,(0,D.jsx)(a,{of:y}),`
`,(0,D.jsx)(n.h2,{id:`content`,children:`Content`}),`
`,(0,D.jsxs)(n.p,{children:[`The `,(0,D.jsx)(n.code,{children:`content`}),` property accepts `,(0,D.jsx)(n.strong,{children:`either an HTML string or a ProseMirror document`}),` — the same shape the editor's `,(0,D.jsx)(n.code,{children:`change`}),` event emits and `,(0,D.jsx)(n.code,{children:`toJSON()`}),`
returns. This means saved content can round-trip without being serialized to HTML first.`]}),`
`,(0,D.jsxs)(n.p,{children:[`The matching `,(0,D.jsx)(n.code,{children:`content`}),` `,(0,D.jsx)(n.strong,{children:`attribute`}),` is necessarily HTML-only, since an attribute cannot carry an object. Pass a document through the property.`]}),`
`,(0,D.jsx)(a,{of:x}),`
`,(0,D.jsxs)(n.p,{children:[`Document input is stricter than HTML input, and the difference matters. ProseMirror discards the `,(0,D.jsx)(n.strong,{children:`entire`}),` document when it encounters a mark it has no
extension for, whereas HTML parsing drops the unknown formatting and keeps the text. Because the schema is built from the slotted features, a document
that round-trips in one editor can be rejected wholesale by another with a narrower toolbar.`]}),`
`,(0,D.jsxs)(n.p,{children:[`When a document is rejected the editor dispatches its `,(0,D.jsx)(n.code,{children:`error`}),` event with `,(0,D.jsx)(n.code,{children:`{ context: 'Invalid document content', error }`}),`, where the message names the
offending mark. The content is still discarded — the event reports the failure so an application can react to it, which Tiptap alone does not allow.
HTML input is deliberately not reported, since dropping unsupported formatting there is expected behaviour rather than a fault.`]}),`
`,(0,D.jsx)(n.h2,{id:`displaying-saved-content`,children:`Displaying saved content`}),`
`,(0,D.jsxs)(n.p,{children:[`Use `,(0,D.jsx)(n.code,{children:`<forge-rich-text-renderer>`}),` to present content read-only. It takes `,(0,D.jsx)(n.strong,{children:`only a ProseMirror document`}),`; an HTML string renders as escaped text.`]}),`
`,(0,D.jsx)(a,{of:w}),`
`,(0,D.jsx)(n.h2,{id:`links`,children:`Links`}),`
`,(0,D.jsxs)(n.p,{children:[(0,D.jsx)(n.code,{children:`<forge-rte-link>`}),` is opt-in, and adds a popover for entering and editing URLs anchored to the current selection. URLs are protocol-checked, and
dangerous protocols are rejected.`]}),`
`,(0,D.jsx)(a,{of:v}),`
`,(0,D.jsx)(n.h2,{id:`character-limits-and-validation`,children:`Character limits and validation`}),`
`,(0,D.jsxs)(n.p,{children:[(0,D.jsx)(n.code,{children:`maxLength`}),` limits the content length and can be changed on an editor that already exists. The count includes block boundaries, so adding paragraphs
counts toward the limit rather than being free.`]}),`
`,(0,D.jsxs)(n.p,{children:[(0,D.jsx)(n.code,{children:`showCharacterCount`}),` and `,(0,D.jsx)(n.code,{children:`showWordCount`}),` render counters in the footer. When content exceeds the limit the editor reports through its `,(0,D.jsx)(n.code,{children:`validation`}),` event
with `,(0,D.jsx)(n.code,{children:`{ isValid, errors }`}),`, which is the hook to gate form submission on.`]}),`
`,(0,D.jsx)(a,{of:g}),`
`,(0,D.jsx)(n.p,{children:`Note that a paste which would exceed the limit is refused in its entirety rather than truncated to fit.`}),`
`,(0,D.jsx)(n.h2,{id:`disabled-and-read-only`,children:`Disabled and read-only`}),`
`,(0,D.jsxs)(n.p,{children:[`Both states prevent editing and are visually dimmed, but they differ in intent. `,(0,D.jsx)(n.code,{children:`disabled`}),` presents the content as inactive and makes it unselectable.
`,(0,D.jsx)(n.code,{children:`readOnly`}),` keeps the content selectable and copyable, which is usually what is wanted for presenting content the user may need to read or quote.`]}),`
`,(0,D.jsxs)(n.p,{children:[`Readonly dims only the toolbar, and `,(0,D.jsx)(n.code,{children:`disabled`}),` dims the whole editor. In a composed layout the same readonly dimming applies to a
`,(0,D.jsx)(n.code,{children:`<forge-rich-text-toolbar>`}),`, and `,(0,D.jsx)(n.code,{children:`--forge-rich-text-toolbar-readonly-opacity`}),` adjusts it.`]}),`
`,(0,D.jsx)(a,{of:m}),`
`,(0,D.jsx)(a,{of:p}),`
`,(0,D.jsx)(n.h2,{id:`forms`,children:`Forms`}),`
`,(0,D.jsxs)(n.p,{children:[`The editor is not a native form control, so its value is read from the component rather than submitted automatically. Listen for `,(0,D.jsx)(n.code,{children:`change`}),` and keep the
document, or read `,(0,D.jsx)(n.code,{children:`toJSON()`}),` / `,(0,D.jsx)(n.code,{children:`toHTML()`}),` when submitting.`]}),`
`,(0,D.jsx)(a,{of:S}),`
`,(0,D.jsx)(n.h2,{id:`sanitization`,children:`Sanitization`}),`
`,(0,D.jsxs)(n.p,{children:[`All content is sanitized before it reaches Tiptap — HTML through `,(0,D.jsx)(n.code,{children:`sanitizeHTML`}),`, documents through `,(0,D.jsx)(n.code,{children:`sanitizeJSON`}),`. Dangerous elements are removed, every
URL-bearing attribute is protocol-checked, and `,(0,D.jsx)(n.code,{children:`on*`}),` handlers are stripped.`]}),`
`,(0,D.jsxs)(n.p,{children:[`Style handling is an allow-list rather than a blanket removal: `,(0,D.jsx)(n.code,{children:`text-align`}),`, `,(0,D.jsx)(n.code,{children:`color`}),` and `,(0,D.jsx)(n.code,{children:`background-color`}),` survive with validated values, because
alignment has no carrier other than the `,(0,D.jsx)(n.code,{children:`style`}),` attribute and would otherwise be lost on save and reload. `,(0,D.jsx)(n.code,{children:`class`}),` and `,(0,D.jsx)(n.code,{children:`data-*`}),` attributes are stripped
entirely, so formatting that depends on them is not preserved.`]}),`
`,(0,D.jsx)(a,{of:u}),`
`,(0,D.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,D.jsxs)(n.ul,{children:[`
`,(0,D.jsxs)(n.li,{children:[`Tiptap builds its own `,(0,D.jsx)(n.code,{children:`contenteditable`}),` element inside the one it is handed, and `,(0,D.jsx)(n.strong,{children:`that inner element is the real control`}),` — it receives focus and is
where assistive technology lands. Anything applied to the outer host does not necessarily reach it.`]}),`
`,(0,D.jsxs)(n.li,{children:[`The renderer host takes `,(0,D.jsx)(n.code,{children:`role="article"`}),` unless a `,(0,D.jsx)(n.code,{children:`role`}),` is already set, so consumers can override it for their own document structure.`]}),`
`,(0,D.jsxs)(n.li,{children:[`Formatting buttons are toggle buttons: they expose their active state through `,(0,D.jsx)(n.code,{children:`aria-pressed`}),`, advertise their shortcut via `,(0,D.jsx)(n.code,{children:`aria-keyshortcuts`}),`, and
are disabled together with the editor. Undo and redo are plain action buttons with no pressed state.`]}),`
`,(0,D.jsxs)(n.li,{children:[`The toolbar is a single tab stop, following the WAI-ARIA toolbar pattern. Tab enters it on the last button used, the arrow keys move between
buttons, and Home and End jump to the first and last. Disabled buttons are skipped. `,(0,D.jsx)(n.code,{children:`forge-rich-text-editor`}),` does this for you. In a composed
layout, wrap the tools in `,(0,D.jsx)(n.code,{children:`<forge-rich-text-toolbar>`}),` to get the same behaviour, along with the toolbar role and an accessible name; tools in a
plain container are each their own tab stop. Several toolbars in one layout are each a separate tab stop.`]}),`
`,(0,D.jsxs)(n.li,{children:[`Formatting changes are announced politely through Forge's `,(0,D.jsx)(n.code,{children:`LiveAnnouncer`}),`, so applying a mark is not a silent action for screen reader users.`]}),`
`]}),`
`,(0,D.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,D.jsx)(l,{})]})}function E(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,D.jsx)(n,{...e,children:(0,D.jsx)(T,{...e})}):T(e)}var D;function O(){return(O=e((()=>{D=r(),n(),i(),c(),h(),_(),C(),b()})))()}O();export{E as default};