import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-Byzp6JFn.js";import{n as c,t as l}from"./CustomArgTypes-QAslgvtG.js";import{a as u,i as d,n as f,o as p,r as m,t as h}from"./KeyboardShortcut.stories-AiHsmbVu.js";function g(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(s,{of:d}),`
`,(0,v.jsx)(o,{}),`
`,(0,v.jsxs)(n.p,{children:[`The keyboard shortcut component provides a declarative way to bind keyboard shortcuts to elements.
Place `,(0,v.jsx)(n.code,{children:`<forge-keyboard-shortcut>`}),` as a sibling after an element to listen for key combinations
within the nearest scope.`]}),`
`,(0,v.jsx)(a,{of:h}),`
`,(0,v.jsx)(n.h2,{id:`anchors`,children:`Anchors`}),`
`,(0,v.jsxs)(n.p,{children:[`The `,(0,v.jsx)(n.strong,{children:`anchor`}),` is the element that the shortcut is logically associated with. It receives
`,(0,v.jsx)(n.code,{children:`aria-keyshortcuts`}),` automatically and is checked for disabled state.`]}),`
`,(0,v.jsxs)(n.p,{children:[`By default the anchor is the previous sibling element. You can also target a specific element using
the `,(0,v.jsx)(n.code,{children:`anchor`}),` attribute with an element id:`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-html`,children:`<forge-button id="save-btn">Save</forge-button>
<forge-keyboard-shortcut key="Control+s" anchor="save-btn"></forge-keyboard-shortcut>
`})}),`
`,(0,v.jsxs)(n.p,{children:[`You can also set `,(0,v.jsx)(n.code,{children:`anchorElement`}),` programmatically to bypass the anchor resolution logic.`]}),`
`,(0,v.jsx)(n.h3,{id:`actions`,children:`Actions`}),`
`,(0,v.jsxs)(n.p,{children:[`By default, activating a shortcut only emits the `,(0,v.jsx)(n.code,{children:`forge-keyboard-shortcut-activate`}),` event and invokes
`,(0,v.jsx)(n.code,{children:`activateCallback`}),`; you are responsible for performing the work. Set the `,(0,v.jsx)(n.code,{children:`action`}),` property to `,(0,v.jsx)(n.code,{children:`'click'`}),`
to also click the anchor element when the shortcut is activated:`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-html`,children:`<forge-button id="save-btn">Save</forge-button>
<forge-keyboard-shortcut key="Control+s" anchor="save-btn" action="click"></forge-keyboard-shortcut>
`})}),`
`,(0,v.jsxs)(n.table,{children:[(0,v.jsx)(n.thead,{children:(0,v.jsxs)(n.tr,{children:[(0,v.jsx)(n.th,{children:`Value`}),(0,v.jsx)(n.th,{children:`Behavior`})]})}),(0,v.jsxs)(n.tbody,{children:[(0,v.jsxs)(n.tr,{children:[(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`'default'`})}),(0,v.jsx)(n.td,{children:`No action is performed on the anchor.`})]}),(0,v.jsxs)(n.tr,{children:[(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`'click'`})}),(0,v.jsxs)(n.td,{children:[`Calls `,(0,v.jsx)(n.code,{children:`click()`}),` on the anchor after the activate event is emitted and `,(0,v.jsx)(n.code,{children:`activateCallback`}),` is invoked.`]})]})]})]}),`
`,(0,v.jsx)(n.h2,{id:`scopes`,children:`Scopes`}),`
`,(0,v.jsxs)(n.p,{children:[`A `,(0,v.jsx)(n.strong,{children:`scope`}),` determines where the shortcut listens for keyboard events. The closest ancestor with the
`,(0,v.jsx)(n.code,{children:`forge-keyboard-shortcut-scope`}),` attribute becomes the scope element. When the same key is bound in
nested scopes, only the innermost scope that contains the event target activates.`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-html`,children:`<div forge-keyboard-shortcut-scope>
  <forge-button id="bold-1">Bold</forge-button>
  <forge-keyboard-shortcut key="mod+b" anchor="bold-1"></forge-keyboard-shortcut>
</div>

<div forge-keyboard-shortcut-scope>
  <forge-button id="bold-2">Bold</forge-button>
  <forge-keyboard-shortcut key="mod+b" anchor="bold-2"></forge-keyboard-shortcut>
</div>
`})}),`
`,(0,v.jsx)(a,{of:u}),`
`,(0,v.jsx)(n.p,{children:`In this example, pressing Ctrl+B (or Cmd+B on Mac) only activates the shortcut in the focused
editor. Each shortcut automatically binds to its nearest ancestor scope marker.`}),`
`,(0,v.jsxs)(n.p,{children:[`You can also target a specific element by id with the `,(0,v.jsx)(n.code,{children:`scope`}),` attribute, bypassing the ancestor
marker walk:`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-html`,children:`<div id="app-scope" forge-keyboard-shortcut-scope>
  <div forge-keyboard-shortcut-scope>
    <!-- This shortcut binds to #app-scope, not the nearest marker -->
    <forge-keyboard-shortcut key="/" scope="app-scope"></forge-keyboard-shortcut>
  </div>
</div>
`})}),`
`,(0,v.jsxs)(n.p,{children:[`You can also set `,(0,v.jsx)(n.code,{children:`scopeElement`}),` programmatically to bypass the scope resolution logic.`]}),`
`,(0,v.jsxs)(n.p,{children:[`Use the `,(0,v.jsx)(n.code,{children:`global`}),` attribute to listen on the entire document regardless of scope markers.`]}),`
`,(0,v.jsx)(n.h2,{id:`key-syntax`,children:`Key syntax`}),`
`,(0,v.jsxs)(n.p,{children:[`Keys are written as modifier names joined by `,(0,v.jsx)(n.code,{children:`+`}),` with the key name last. A comma separates
alternative bindings, and a space separates the steps of a `,(0,v.jsx)(n.a,{href:`#key-sequences`,children:`key sequence`}),`. Matching is
case-insensitive.`]}),`
`,(0,v.jsxs)(n.table,{children:[(0,v.jsx)(n.thead,{children:(0,v.jsxs)(n.tr,{children:[(0,v.jsx)(n.th,{children:`Alias`}),(0,v.jsx)(n.th,{children:`Resolves to`})]})}),(0,v.jsxs)(n.tbody,{children:[(0,v.jsxs)(n.tr,{children:[(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`mod`})}),(0,v.jsxs)(n.td,{children:[(0,v.jsx)(n.code,{children:`Meta`}),` on Mac, `,(0,v.jsx)(n.code,{children:`Control`}),` elsewhere`]})]}),(0,v.jsxs)(n.tr,{children:[(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`ctrl`})}),(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`Control`})})]}),(0,v.jsxs)(n.tr,{children:[(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`cmd`})}),(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`Meta`})})]}),(0,v.jsxs)(n.tr,{children:[(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`option`})}),(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`Alt`})})]}),(0,v.jsxs)(n.tr,{children:[(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`esc`})}),(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`Escape`})})]}),(0,v.jsxs)(n.tr,{children:[(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`return`})}),(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`Enter`})})]}),(0,v.jsxs)(n.tr,{children:[(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`del`})}),(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`Delete`})})]}),(0,v.jsxs)(n.tr,{children:[(0,v.jsxs)(n.td,{children:[(0,v.jsx)(n.code,{children:`up`}),` / `,(0,v.jsx)(n.code,{children:`down`}),` / `,(0,v.jsx)(n.code,{children:`left`}),` / `,(0,v.jsx)(n.code,{children:`right`})]}),(0,v.jsx)(n.td,{children:`Arrow keys`})]}),(0,v.jsxs)(n.tr,{children:[(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`plus`})}),(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`+`})})]}),(0,v.jsxs)(n.tr,{children:[(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`space`})}),(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:` `})})]})]})]}),`
`,(0,v.jsxs)(n.p,{children:[`A comma is only treated as a separator when it directly follows a key. A comma that is preceded by
whitespace or `,(0,v.jsx)(n.code,{children:`+`}),`, or that starts the binding, is the comma key itself:`]}),`
`,(0,v.jsxs)(n.table,{children:[(0,v.jsx)(n.thead,{children:(0,v.jsxs)(n.tr,{children:[(0,v.jsx)(n.th,{children:`Binding`}),(0,v.jsx)(n.th,{children:`Meaning`})]})}),(0,v.jsxs)(n.tbody,{children:[(0,v.jsxs)(n.tr,{children:[(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`Control+,`})}),(0,v.jsx)(n.td,{children:`Ctrl and the comma key`})]}),(0,v.jsxs)(n.tr,{children:[(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`,`})}),(0,v.jsx)(n.td,{children:`The comma key`})]}),(0,v.jsxs)(n.tr,{children:[(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`g ,`})}),(0,v.jsxs)(n.td,{children:[(0,v.jsx)(n.code,{children:`g`}),`, then the comma key (a sequence)`]})]}),(0,v.jsxs)(n.tr,{children:[(0,v.jsx)(n.td,{children:(0,v.jsx)(n.code,{children:`a,Control+,`})}),(0,v.jsxs)(n.td,{children:[`Either `,(0,v.jsx)(n.code,{children:`a`}),` or Ctrl and the comma key`]})]})]})]}),`
`,(0,v.jsx)(n.h3,{id:`key-sequences`,children:`Key sequences`}),`
`,(0,v.jsx)(n.p,{children:`Separate chords with a space to define multi-step sequences where chords must be pressed in order within a 1-second
timeout window:`}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-html`,children:`<!-- Two-chord sequence: Ctrl+K then Ctrl+C -->
<forge-keyboard-shortcut key="Control+k Control+c"></forge-keyboard-shortcut>

<!-- Sequence OR single chord (two alternatives) -->
<forge-keyboard-shortcut key="Control+k Control+c, Control+/"></forge-keyboard-shortcut>

<!-- Three-chord sequence -->
<forge-keyboard-shortcut key="a b c"></forge-keyboard-shortcut>
`})}),`
`,(0,v.jsx)(n.p,{children:`When a sequence start chord conflicts with a standalone shortcut bound to the same key, the
standalone is deferred — if the sequence completes, the standalone is discarded; if the timeout
expires or a non-matching key is pressed, the deferred standalone fires instead.`}),`
`,(0,v.jsxs)(n.p,{children:[`Multi-chord sequences are omitted from `,(0,v.jsx)(n.code,{children:`aria-keyshortcuts`}),` as the ARIA spec has no sequence syntax.`]}),`
`,(0,v.jsx)(a,{of:m}),`
`,(0,v.jsx)(n.h2,{id:`handling-activation`,children:`Handling activation`}),`
`,(0,v.jsxs)(n.p,{children:[`Listen for the `,(0,v.jsx)(n.code,{children:`forge-keyboard-shortcut-activate`}),` event. The event bubbles, so you can use a single
listener on a container and read `,(0,v.jsx)(n.code,{children:`event.target.anchorElement`}),` to determine which shortcut fired.`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-html`,children:`<div forge-keyboard-shortcut-scope @forge-keyboard-shortcut-activate=\${handleActivate}>
  <forge-button id="cut-btn">Cut</forge-button>
  <forge-keyboard-shortcut key="mod+x" anchor="cut-btn"></forge-keyboard-shortcut>

  <forge-button id="copy-btn">Copy</forge-button>
  <forge-keyboard-shortcut key="mod+c" anchor="copy-btn"></forge-keyboard-shortcut>
</div>
`})}),`
`,(0,v.jsx)(a,{of:f}),`
`,(0,v.jsx)(n.h2,{id:`imperative-registration`,children:`Imperative registration`}),`
`,(0,v.jsxs)(n.p,{children:[(0,v.jsx)(n.code,{children:`registerKeyboardShortcut()`}),` registers a shortcut without rendering an element, which is useful when
the shortcut belongs to code rather than a template. The options mirror the element's properties.`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-ts`,children:`import { registerKeyboardShortcut } from '@tylertech/forge/keyboard-shortcut';

const registration = registerKeyboardShortcut({
  key: 'mod+s',
  scopeElement: editor,
  onActivate: () => save()
});

// Later, when the shortcut should stop listening
registration.dispose();
`})}),`
`,(0,v.jsx)(n.p,{children:`Pass one of three options to set where the shortcut listens:`}),`
`,(0,v.jsxs)(n.ul,{children:[`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.code,{children:`global`}),` — the whole document.`]}),`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.code,{children:`scopeElement`}),` — that element.`]}),`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.code,{children:`ownerElement`}),` — the closest ancestor with the `,(0,v.jsx)(n.code,{children:`forge-keyboard-shortcut-scope`}),` attribute, the same
lookup the element does.`]}),`
`]}),`
`,(0,v.jsxs)(n.p,{children:[`If more than one is passed, the first in this list is used. The call throws if none is passed, or if
`,(0,v.jsx)(n.code,{children:`ownerElement`}),` has no scope marker above it.`]}),`
`,(0,v.jsx)(n.p,{children:`Registrations otherwise behave like element-based ones, including the nesting rule above: when the
same key is bound in nested scopes, only the innermost scope containing the event target activates.`}),`
`,(0,v.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,v.jsxs)(n.ul,{children:[`
`,(0,v.jsxs)(n.li,{children:[`The component automatically sets `,(0,v.jsx)(n.code,{children:`aria-keyshortcuts`}),` on the anchor element when
`,(0,v.jsx)(n.code,{children:`anchorAccessibility`}),` is `,(0,v.jsx)(n.code,{children:`'auto'`}),` (the default). Set it to `,(0,v.jsx)(n.code,{children:`'none'`}),` to opt out.`]}),`
`,(0,v.jsxs)(n.li,{children:[(0,v.jsx)(n.code,{children:`formatKeyboardShortcutBinding()`}),` returns a human-readable string for a binding (e.g. `,(0,v.jsx)(n.code,{children:`Ctrl+A`}),`) for use in
visible hints such as menu items and tooltips.`]}),`
`,(0,v.jsx)(n.li,{children:`Don't override browser, operating system, or assistive technology shortcuts.`}),`
`,(0,v.jsxs)(n.li,{children:[`Avoid using the `,(0,v.jsx)(n.code,{children:`accesskey`}),` attribute.`]}),`
`,(0,v.jsx)(n.li,{children:`Don't duplicate behavior provided by the browser.`}),`
`]}),`
`,(0,v.jsxs)(n.h2,{id:`migrating-from-target`,children:[`Migrating from `,(0,v.jsx)(n.code,{children:`target`})]}),`
`,(0,v.jsxs)(n.p,{children:[`The `,(0,v.jsx)(n.code,{children:`target`}),` attribute is deprecated. Replace it with `,(0,v.jsx)(n.code,{children:`anchor`}),` (for the element to act on) and a
`,(0,v.jsx)(n.code,{children:`forge-keyboard-shortcut-scope`}),` marker (for where to listen).`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-html`,children:`<!-- Before -->
<forge-keyboard-shortcut key="a" target="#my-button"></forge-keyboard-shortcut>

<!-- After -->
<div forge-keyboard-shortcut-scope>
  <button id="my-button">Click me</button>
  <forge-keyboard-shortcut key="a" anchor="my-button"></forge-keyboard-shortcut>
</div>
`})}),`
`,(0,v.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,v.jsx)(l,{})]})}function _(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,v.jsx)(n,{...e,children:(0,v.jsx)(g,{...e})}):g(e)}var v;function y(){return(y=e((()=>{v=r(),n(),i(),c(),p()})))()}y();export{_ as default};