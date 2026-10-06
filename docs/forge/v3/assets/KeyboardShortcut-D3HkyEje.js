import{u as o,j as e,M as i,T as c,C as n}from"./blocks-XFXxCHax.js";import{C as d}from"./CustomArgTypes-CWzbzuQH.js";import{K as h,D as a,S as l,a as x,G as j}from"./KeyboardShortcut.stories-DZF3L_6-.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BFW4bN8h.js";import"./iframe-oAO0QRyC.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-BUadP3tW.js";import"./service-adapter-8tADcN_b.js";import"./button-CSrhRaCz.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./property-CsZj1UFS.js";import"./class-map-DX-Fvzp4.js";import"./directive-CwRn8Fwj.js";import"./utils-C31il88P.js";import"./focus-indicator-DF5CnxaH.js";import"./floating-ui.dom-DaMtbvS2.js";import"./base-lit-element-BfYfGFH_.js";import"./async-directive-B0mdDXAn.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./icon-BNaE2C0t.js";import"./constants-ffvdo6x3.js";import"./create-context-BxR5I8pu.js";import"./state-layer-gtlkuVuf.js";import"./custom-element-DR9AFpIK.js";import"./core-property-Co8uF8PW.js";import"./base-adapter-DOky_or5.js";import"./dom-utils-BDbRr6KM.js";import"./base-component-BFu9bkgC.js";import"./base-button-CPl2ikJN.js";import"./tyler-icons-_o7MAz4c.js";import"./state-CcYvR2OD.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-DssnAab5.js";import"./button-constants-DRqTH6Pv.js";import"./keyboard-shortcut-BxZBjJfj.js";import"./text-field-Cm3IZ4rz.js";import"./base-field-R00t77-F.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./label-DWc44Up3.js";import"./button-toggle-group-constants-CvfmN-z8.js";import"./checkbox-constants-BJ3elUIK.js";import"./icon-button-constants-JHHxiN9v.js";import"./switch-constants-BZVST_qJ.js";import"./with-label-aware-B4Q13qtt.js";import"./icon-button-BUDykOqB.js";import"./tooltip-BnZGP5cf.js";import"./overlay-DWOSAut5.js";import"./with-longpress-listener-D4ROnnkg.js";import"./dismissible-stack-DyoP5jNB.js";import"./with-element-internals-CFYP_epH.js";import"./object-utils-CUPteeNI.js";function s(r){const t={a:"a",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...o(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:h}),`
`,e.jsx(c,{}),`
`,e.jsxs(t.p,{children:[`The keyboard shortcut component provides a declarative way to bind keyboard shortcuts to elements.
Place `,e.jsx(t.code,{children:"<forge-keyboard-shortcut>"}),` as a sibling after an element to listen for key combinations
within the nearest scope.`]}),`
`,e.jsx(n,{of:a}),`
`,e.jsx(t.h2,{id:"anchors",children:"Anchors"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.strong,{children:"anchor"}),` is the element that the shortcut is logically associated with. It receives
`,e.jsx(t.code,{children:"aria-keyshortcuts"})," automatically and is checked for disabled state."]}),`
`,e.jsxs(t.p,{children:[`By default the anchor is the previous sibling element. You can also target a specific element using
the `,e.jsx(t.code,{children:"anchor"})," attribute with an element id:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<forge-button id="save-btn">Save</forge-button>
<forge-keyboard-shortcut key="Control+s" anchor="save-btn"></forge-keyboard-shortcut>
`})}),`
`,e.jsxs(t.p,{children:["You can also set ",e.jsx(t.code,{children:"anchorElement"})," programmatically to bypass the anchor resolution logic."]}),`
`,e.jsx(t.h3,{id:"actions",children:"Actions"}),`
`,e.jsxs(t.p,{children:["By default, activating a shortcut only emits the ",e.jsx(t.code,{children:"forge-keyboard-shortcut-activate"}),` event and invokes
`,e.jsx(t.code,{children:"activateCallback"}),"; you are responsible for performing the work. Set the ",e.jsx(t.code,{children:"action"})," property to ",e.jsx(t.code,{children:"'click'"}),`
to also click the anchor element when the shortcut is activated:`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<forge-button id="save-btn">Save</forge-button>
<forge-keyboard-shortcut key="Control+s" anchor="save-btn" action="click"></forge-keyboard-shortcut>
`})}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Value"}),e.jsx(t.th,{children:"Behavior"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"'default'"})}),e.jsx(t.td,{children:"No action is performed on the anchor."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"'click'"})}),e.jsxs(t.td,{children:["Calls ",e.jsx(t.code,{children:"click()"})," on the anchor after the activate event is emitted and ",e.jsx(t.code,{children:"activateCallback"})," is invoked."]})]})]})]}),`
`,e.jsx(t.h2,{id:"scopes",children:"Scopes"}),`
`,e.jsxs(t.p,{children:["A ",e.jsx(t.strong,{children:"scope"}),` determines where the shortcut listens for keyboard events. The closest ancestor with the
`,e.jsx(t.code,{children:"forge-keyboard-shortcut-scope"}),` attribute becomes the scope element. When the same key is bound in
nested scopes, only the innermost scope that contains the event target activates.`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<div forge-keyboard-shortcut-scope>
  <forge-button id="bold-1">Bold</forge-button>
  <forge-keyboard-shortcut key="mod+b" anchor="bold-1"></forge-keyboard-shortcut>
</div>

<div forge-keyboard-shortcut-scope>
  <forge-button id="bold-2">Bold</forge-button>
  <forge-keyboard-shortcut key="mod+b" anchor="bold-2"></forge-keyboard-shortcut>
</div>
`})}),`
`,e.jsx(n,{of:l}),`
`,e.jsx(t.p,{children:`In this example, pressing Ctrl+B (or Cmd+B on Mac) only activates the shortcut in the focused
editor. Each shortcut automatically binds to its nearest ancestor scope marker.`}),`
`,e.jsxs(t.p,{children:["You can also target a specific element by id with the ",e.jsx(t.code,{children:"scope"}),` attribute, bypassing the ancestor
marker walk:`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<div id="app-scope" forge-keyboard-shortcut-scope>
  <div forge-keyboard-shortcut-scope>
    <!-- This shortcut binds to #app-scope, not the nearest marker -->
    <forge-keyboard-shortcut key="/" scope="app-scope"></forge-keyboard-shortcut>
  </div>
</div>
`})}),`
`,e.jsxs(t.p,{children:["You can also set ",e.jsx(t.code,{children:"scopeElement"})," programmatically to bypass the scope resolution logic."]}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"global"})," attribute to listen on the entire document regardless of scope markers."]}),`
`,e.jsx(t.h2,{id:"key-syntax",children:"Key syntax"}),`
`,e.jsxs(t.p,{children:["Keys are written as modifier names joined by ",e.jsx(t.code,{children:"+"}),` with the key name last. A comma separates
alternative bindings, and a space separates the steps of a `,e.jsx(t.a,{href:"#key-sequences",children:"key sequence"}),`. Matching is
case-insensitive.`]}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Alias"}),e.jsx(t.th,{children:"Resolves to"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"mod"})}),e.jsxs(t.td,{children:[e.jsx(t.code,{children:"Meta"})," on Mac, ",e.jsx(t.code,{children:"Control"})," elsewhere"]})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"ctrl"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"Control"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"cmd"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"Meta"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"option"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"Alt"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"esc"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"Escape"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"return"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"Enter"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"del"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"Delete"})})]}),e.jsxs(t.tr,{children:[e.jsxs(t.td,{children:[e.jsx(t.code,{children:"up"})," / ",e.jsx(t.code,{children:"down"})," / ",e.jsx(t.code,{children:"left"})," / ",e.jsx(t.code,{children:"right"})]}),e.jsx(t.td,{children:"Arrow keys"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"plus"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:"+"})})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"space"})}),e.jsx(t.td,{children:e.jsx(t.code,{children:" "})})]})]})]}),`
`,e.jsxs(t.p,{children:[`A comma is only treated as a separator when it directly follows a key. A comma that is preceded by
whitespace or `,e.jsx(t.code,{children:"+"}),", or that starts the binding, is the comma key itself:"]}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Binding"}),e.jsx(t.th,{children:"Meaning"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"Control+,"})}),e.jsx(t.td,{children:"Ctrl and the comma key"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:","})}),e.jsx(t.td,{children:"The comma key"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"g ,"})}),e.jsxs(t.td,{children:[e.jsx(t.code,{children:"g"}),", then the comma key (a sequence)"]})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"a,Control+,"})}),e.jsxs(t.td,{children:["Either ",e.jsx(t.code,{children:"a"})," or Ctrl and the comma key"]})]})]})]}),`
`,e.jsx(t.h3,{id:"key-sequences",children:"Key sequences"}),`
`,e.jsx(t.p,{children:`Separate chords with a space to define multi-step sequences where chords must be pressed in order within a 1-second
timeout window:`}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<!-- Two-chord sequence: Ctrl+K then Ctrl+C -->
<forge-keyboard-shortcut key="Control+k Control+c"></forge-keyboard-shortcut>

<!-- Sequence OR single chord (two alternatives) -->
<forge-keyboard-shortcut key="Control+k Control+c, Control+/"></forge-keyboard-shortcut>

<!-- Three-chord sequence -->
<forge-keyboard-shortcut key="a b c"></forge-keyboard-shortcut>
`})}),`
`,e.jsx(t.p,{children:`When a sequence start chord conflicts with a standalone shortcut bound to the same key, the
standalone is deferred — if the sequence completes, the standalone is discarded; if the timeout
expires or a non-matching key is pressed, the deferred standalone fires instead.`}),`
`,e.jsxs(t.p,{children:["Multi-chord sequences are omitted from ",e.jsx(t.code,{children:"aria-keyshortcuts"})," as the ARIA spec has no sequence syntax."]}),`
`,e.jsx(n,{of:x}),`
`,e.jsx(t.h2,{id:"handling-activation",children:"Handling activation"}),`
`,e.jsxs(t.p,{children:["Listen for the ",e.jsx(t.code,{children:"forge-keyboard-shortcut-activate"}),` event. The event bubbles, so you can use a single
listener on a container and read `,e.jsx(t.code,{children:"event.target.anchorElement"})," to determine which shortcut fired."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<div forge-keyboard-shortcut-scope @forge-keyboard-shortcut-activate=\${handleActivate}>
  <forge-button id="cut-btn">Cut</forge-button>
  <forge-keyboard-shortcut key="mod+x" anchor="cut-btn"></forge-keyboard-shortcut>

  <forge-button id="copy-btn">Copy</forge-button>
  <forge-keyboard-shortcut key="mod+c" anchor="copy-btn"></forge-keyboard-shortcut>
</div>
`})}),`
`,e.jsx(n,{of:j}),`
`,e.jsx(t.h2,{id:"imperative-registration",children:"Imperative registration"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.code,{children:"registerKeyboardShortcut()"}),` registers a shortcut without rendering an element, which is useful when
the shortcut belongs to code rather than a template. The options mirror the element's properties.`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-ts",children:`import { registerKeyboardShortcut } from '@tylertech/forge/keyboard-shortcut';

const registration = registerKeyboardShortcut({
  key: 'mod+s',
  scopeElement: editor,
  onActivate: () => save()
});

// Later, when the shortcut should stop listening
registration.dispose();
`})}),`
`,e.jsx(t.p,{children:"Pass one of three options to set where the shortcut listens:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"global"})," — the whole document."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"scopeElement"})," — that element."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"ownerElement"})," — the closest ancestor with the ",e.jsx(t.code,{children:"forge-keyboard-shortcut-scope"}),` attribute, the same
lookup the element does.`]}),`
`]}),`
`,e.jsxs(t.p,{children:[`If more than one is passed, the first in this list is used. The call throws if none is passed, or if
`,e.jsx(t.code,{children:"ownerElement"})," has no scope marker above it."]}),`
`,e.jsx(t.p,{children:`Registrations otherwise behave like element-based ones, including the nesting rule above: when the
same key is bound in nested scopes, only the innermost scope containing the event target activates.`}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["The component automatically sets ",e.jsx(t.code,{children:"aria-keyshortcuts"}),` on the anchor element when
`,e.jsx(t.code,{children:"anchorAccessibility"})," is ",e.jsx(t.code,{children:"'auto'"})," (the default). Set it to ",e.jsx(t.code,{children:"'none'"})," to opt out."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"formatKeyboardShortcutBinding()"})," returns a human-readable string for a binding (e.g. ",e.jsx(t.code,{children:"Ctrl+A"}),`) for use in
visible hints such as menu items and tooltips.`]}),`
`,e.jsx(t.li,{children:"Don't override browser, operating system, or assistive technology shortcuts."}),`
`,e.jsxs(t.li,{children:["Avoid using the ",e.jsx(t.code,{children:"accesskey"})," attribute."]}),`
`,e.jsx(t.li,{children:"Don't duplicate behavior provided by the browser."}),`
`]}),`
`,e.jsxs(t.h2,{id:"migrating-from-target",children:["Migrating from ",e.jsx(t.code,{children:"target"})]}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"target"})," attribute is deprecated. Replace it with ",e.jsx(t.code,{children:"anchor"}),` (for the element to act on) and a
`,e.jsx(t.code,{children:"forge-keyboard-shortcut-scope"})," marker (for where to listen)."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<!-- Before -->
<forge-keyboard-shortcut key="a" target="#my-button"></forge-keyboard-shortcut>

<!-- After -->
<div forge-keyboard-shortcut-scope>
  <button id="my-button">Click me</button>
  <forge-keyboard-shortcut key="a" anchor="my-button"></forge-keyboard-shortcut>
</div>
`})}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(d,{})]})}function be(r={}){const{wrapper:t}={...o(),...r.components};return t?e.jsx(t,{...r,children:e.jsx(s,{...r})}):s(r)}export{be as default};
