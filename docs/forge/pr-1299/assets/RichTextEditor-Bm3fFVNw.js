import{u as i,j as e,M as s,T as a,C as n}from"./blocks-CirCQbee.js";import{C as d}from"./CustomArgTypes-Dc8OxB10.js";import{E as c,D as h,C as l,a as p,R as m,P as x}from"./Editor.stories-CVtbkiDE.js";import{ComposedLayout as u,Links as j}from"./Features.stories-Cf5cTQVy.js";import{Renderer as g}from"./Renderer.stories-D2FVfqoh.js";import{OutputFormats as f,FormIntegration as b}from"./Recipes.stories-Bisg0926.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CF6N-kpB.js";import"./iframe-QHnGQDtP.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-BRc3IP6u.js";import"./service-adapter-8tADcN_b.js";import"./rich-text-renderer-ewjfFuX9.js";import"./custom-element-C-crYl4r.js";import"./property-f3DW9gPR.js";import"./context-root-BrWOZWcP.js";import"./consume-DtITIqjN.js";import"./provide-CZDhzwTe.js";import"./live-announcer-DuLqNKxe.js";import"./a11y-BxM9_46k.js";import"./state-DY2-o1CP.js";import"./when-CI7b_ccM.js";import"./create-context-BxR5I8pu.js";import"./ref-DtKCF3WG.js";import"./async-directive-qle1HN31.js";import"./directive-CwRn8Fwj.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./rte-standard-tools-C4Q-gkYF.js";import"./tyler-icons-_o7MAz4c.js";import"./index-BHXiN6PC.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./if-defined-BqYpXCqD.js";import"./dom-utils-BDbRr6KM.js";import"./class-map-BTaYBOLy.js";import"./query-assigned-elements-43hYArgI.js";import"./platform-C5RrLkNt.js";import"./custom-element-DR9AFpIK.js";import"./core-property-Co8uF8PW.js";import"./floating-ui.dom-DaMtbvS2.js";import"./event-utils-C1SDeUaq.js";import"./scroll-axis-observer-DmuibK9q.js";import"./style-map-D69N4WVg.js";import"./object-utils-CUPteeNI.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./string-utils-Csf55pEv.js";import"./item-manager-C8nNcpm6.js";import"./live-BHqIjV2a.js";import"./date-utils-DSnx7xZn.js";function r(o){const t={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:c}),`
`,e.jsx(a,{}),`
`,e.jsxs(t.p,{children:["The rich text editor provides a WYSIWYG editing surface built on ",e.jsx(t.a,{href:"https://tiptap.dev/",rel:"nofollow",children:"Tiptap"}),`, along with a read-only renderer for displaying saved
content. Unlike most Forge components it ships in its own package, `,e.jsx(t.code,{children:"@tylertech/forge-rich-text-editor"}),`, because Tiptap is a heavy dependency that
consumers of the main library should not pay for. `,e.jsx(t.code,{children:"@tylertech/forge"})," is a peer dependency."]}),`
`,e.jsx(n,{of:h}),`
`,e.jsx(t.h2,{id:"installation",children:"Installation"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-bash",children:`npm install @tylertech/forge-rich-text-editor
`})}),`
`,e.jsx(t.p,{children:"Registration is split in two so an application only pays for the tools it uses. The core elements and the feature elements are registered separately:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-ts",children:`import { defineRichTextEditorComponents } from '@tylertech/forge-rich-text-editor';
import { defineRteFeatureComponents } from '@tylertech/forge-rich-text-editor/features';

defineRichTextEditorComponents();
defineRteFeatureComponents();
`})}),`
`,e.jsx(t.p,{children:"Or simply side-effect import both entry points:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-ts",children:`import '@tylertech/forge-rich-text-editor';
import '@tylertech/forge-rich-text-editor/features';
`})}),`
`,e.jsx(t.h2,{id:"composition",children:"Composition"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"The editor's capabilities are determined by the feature elements slotted into it."})," Each ",e.jsx(t.code,{children:"<forge-rte-*>"}),` element contributes its own Tiptap extension,
and the editor collects them to build its schema. An editor with nothing slotted supports no formatting at all.`]}),`
`,e.jsxs(t.p,{children:[`This is the most important thing to understand about the component, and the most common source of confusion: content handling looks broken when the
feature providing a given mark simply is not slotted. `,e.jsx(t.code,{children:"<forge-rte-standard-tools>"}),` is the usual starting point — it composes ten of the feature elements,
excluding `,e.jsx(t.code,{children:"code"})," and ",e.jsx(t.code,{children:"link"}),", which are opt-in."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<forge-rich-text-editor>
  <forge-rte-standard-tools></forge-rte-standard-tools>
</forge-rich-text-editor>
`})}),`
`,e.jsxs(t.p,{children:[`Individual features can be composed instead when a narrower toolbar is wanted, and they can be arranged freely alongside dividers. In a composed
layout, group them in `,e.jsx(t.code,{children:"<forge-rich-text-toolbar>"}),", which provides the toolbar role, an accessible name through its ",e.jsx(t.code,{children:"label"}),", and keyboard navigation."]}),`
`,e.jsx(n,{of:u}),`
`,e.jsx(t.h2,{id:"content",children:"Content"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"content"})," property accepts ",e.jsx(t.strong,{children:"either an HTML string or a ProseMirror document"})," — the same shape the editor's ",e.jsx(t.code,{children:"change"})," event emits and ",e.jsx(t.code,{children:"toJSON()"}),`
returns. This means saved content can round-trip without being serialized to HTML first.`]}),`
`,e.jsxs(t.p,{children:["The matching ",e.jsx(t.code,{children:"content"})," ",e.jsx(t.strong,{children:"attribute"})," is necessarily HTML-only, since an attribute cannot carry an object. Pass a document through the property."]}),`
`,e.jsx(n,{of:f}),`
`,e.jsxs(t.p,{children:["Document input is stricter than HTML input, and the difference matters. ProseMirror discards the ",e.jsx(t.strong,{children:"entire"}),` document when it encounters a mark it has no
extension for, whereas HTML parsing drops the unknown formatting and keeps the text. Because the schema is built from the slotted features, a document
that round-trips in one editor can be rejected wholesale by another with a narrower toolbar.`]}),`
`,e.jsxs(t.p,{children:["When a document is rejected the editor dispatches its ",e.jsx(t.code,{children:"error"})," event with ",e.jsx(t.code,{children:"{ context: 'Invalid document content', error }"}),`, where the message names the
offending mark. The content is still discarded — the event reports the failure so an application can react to it, which Tiptap alone does not allow.
HTML input is deliberately not reported, since dropping unsupported formatting there is expected behaviour rather than a fault.`]}),`
`,e.jsx(t.h2,{id:"displaying-saved-content",children:"Displaying saved content"}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"<forge-rich-text-renderer>"})," to present content read-only. It takes ",e.jsx(t.strong,{children:"only a ProseMirror document"}),"; an HTML string renders as escaped text."]}),`
`,e.jsx(n,{of:g}),`
`,e.jsx(t.h2,{id:"links",children:"Links"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.code,{children:"<forge-rte-link>"}),` is opt-in, and adds a popover for entering and editing URLs anchored to the current selection. URLs are protocol-checked, and
dangerous protocols are rejected.`]}),`
`,e.jsx(n,{of:j}),`
`,e.jsx(t.h2,{id:"character-limits-and-validation",children:"Character limits and validation"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.code,{children:"maxLength"}),` limits the content length and can be changed on an editor that already exists. The count includes block boundaries, so adding paragraphs
counts toward the limit rather than being free.`]}),`
`,e.jsxs(t.p,{children:[e.jsx(t.code,{children:"showCharacterCount"})," and ",e.jsx(t.code,{children:"showWordCount"})," render counters in the footer. When content exceeds the limit the editor reports through its ",e.jsx(t.code,{children:"validation"}),` event
with `,e.jsx(t.code,{children:"{ isValid, errors }"}),", which is the hook to gate form submission on."]}),`
`,e.jsx(n,{of:l}),`
`,e.jsx(t.p,{children:"Note that a paste which would exceed the limit is refused in its entirety rather than truncated to fit."}),`
`,e.jsx(t.h2,{id:"disabled-and-read-only",children:"Disabled and read-only"}),`
`,e.jsxs(t.p,{children:["Both states prevent editing and are visually dimmed, but they differ in intent. ",e.jsx(t.code,{children:"disabled"}),` presents the content as inactive and makes it unselectable.
`,e.jsx(t.code,{children:"readOnly"})," keeps the content selectable and copyable, which is usually what is wanted for presenting content the user may need to read or quote."]}),`
`,e.jsxs(t.p,{children:["Readonly dims only the toolbar, and ",e.jsx(t.code,{children:"disabled"}),` dims the whole editor. In a composed layout the same readonly dimming applies to a
`,e.jsx(t.code,{children:"<forge-rich-text-toolbar>"}),", and ",e.jsx(t.code,{children:"--forge-rich-text-toolbar-readonly-opacity"})," adjusts it."]}),`
`,e.jsx(n,{of:p}),`
`,e.jsx(n,{of:m}),`
`,e.jsx(t.h2,{id:"forms",children:"Forms"}),`
`,e.jsxs(t.p,{children:["The editor is not a native form control, so its value is read from the component rather than submitted automatically. Listen for ",e.jsx(t.code,{children:"change"}),` and keep the
document, or read `,e.jsx(t.code,{children:"toJSON()"})," / ",e.jsx(t.code,{children:"toHTML()"})," when submitting."]}),`
`,e.jsx(n,{of:b}),`
`,e.jsx(t.h2,{id:"sanitization",children:"Sanitization"}),`
`,e.jsxs(t.p,{children:["All content is sanitized before it reaches Tiptap — HTML through ",e.jsx(t.code,{children:"sanitizeHTML"}),", documents through ",e.jsx(t.code,{children:"sanitizeJSON"}),`. Dangerous elements are removed, every
URL-bearing attribute is protocol-checked, and `,e.jsx(t.code,{children:"on*"})," handlers are stripped."]}),`
`,e.jsxs(t.p,{children:["Style handling is an allow-list rather than a blanket removal: ",e.jsx(t.code,{children:"text-align"}),", ",e.jsx(t.code,{children:"color"})," and ",e.jsx(t.code,{children:"background-color"}),` survive with validated values, because
alignment has no carrier other than the `,e.jsx(t.code,{children:"style"})," attribute and would otherwise be lost on save and reload. ",e.jsx(t.code,{children:"class"})," and ",e.jsx(t.code,{children:"data-*"}),` attributes are stripped
entirely, so formatting that depends on them is not preserved.`]}),`
`,e.jsx(n,{of:x}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Tiptap builds its own ",e.jsx(t.code,{children:"contenteditable"})," element inside the one it is handed, and ",e.jsx(t.strong,{children:"that inner element is the real control"}),` — it receives focus and is
where assistive technology lands. Anything applied to the outer host does not necessarily reach it.`]}),`
`,e.jsxs(t.li,{children:["The renderer host takes ",e.jsx(t.code,{children:'role="article"'})," unless a ",e.jsx(t.code,{children:"role"})," is already set, so consumers can override it for their own document structure."]}),`
`,e.jsxs(t.li,{children:["Formatting buttons are toggle buttons: they expose their active state through ",e.jsx(t.code,{children:"aria-pressed"}),", advertise their shortcut via ",e.jsx(t.code,{children:"aria-keyshortcuts"}),`, and
are disabled together with the editor. Undo and redo are plain action buttons with no pressed state.`]}),`
`,e.jsxs(t.li,{children:[`The toolbar is a single tab stop, following the WAI-ARIA toolbar pattern. Tab enters it on the last button used, the arrow keys move between
buttons, and Home and End jump to the first and last. Disabled buttons are skipped. `,e.jsx(t.code,{children:"forge-rich-text-editor"}),` does this for you. In a composed
layout, wrap the tools in `,e.jsx(t.code,{children:"<forge-rich-text-toolbar>"}),` to get the same behaviour, along with the toolbar role and an accessible name; tools in a
plain container are each their own tab stop. Several toolbars in one layout are each a separate tab stop.`]}),`
`,e.jsxs(t.li,{children:["Formatting changes are announced politely through Forge's ",e.jsx(t.code,{children:"LiveAnnouncer"}),", so applying a mark is not a silent action for screen reader users."]}),`
`]}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(d,{})]})}function je(o={}){const{wrapper:t}={...i(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(r,{...o})}):r(o)}export{je as default};
