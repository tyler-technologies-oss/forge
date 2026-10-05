import{u as n,j as e,M as i,T as t,C as c}from"./blocks-CirCQbee.js";import{C as l}from"./CustomArgTypes-Dc8OxB10.js";import{K as h,D as o}from"./Kbd.stories-CHxn_6ar.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CF6N-kpB.js";import"./iframe-QHnGQDtP.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-BRc3IP6u.js";import"./service-adapter-8tADcN_b.js";import"./kbd-cGe-hmev.js";import"./platform-C5RrLkNt.js";import"./string-utils-Csf55pEv.js";import"./utils-B9Oh4ZKp.js";import"./custom-element-C-crYl4r.js";import"./property-f3DW9gPR.js";import"./class-map-BTaYBOLy.js";import"./directive-CwRn8Fwj.js";import"./base-lit-element-CcRb-sAO.js";import"./async-directive-qle1HN31.js";function s(d){const r={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...n(),...d.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:h}),`
`,e.jsx(t,{}),`
`,e.jsx(r.p,{children:`Use the kbd component to visually display a keyboard key combination, such as a shortcut described
in documentation or a hint within the UI.`}),`
`,e.jsx(r.h2,{id:"example",children:"Example"}),`
`,e.jsx(c,{of:o}),`
`,e.jsx(r.h2,{id:"key-strings",children:"Key strings"}),`
`,e.jsxs(r.p,{children:["The ",e.jsx(r.code,{children:"keys"}),` property accepts an array of strings representing each non-modifier key to display. The
attribute equivalent accepts a space-separated string of keys. Some keys require special handling to
show to correct name or glyph.`]}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Key string"}),e.jsx(r.th,{children:"Output"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"Enter"}),e.jsxs(r.td,{children:[e.jsx(r.code,{children:"Enter"})," (",e.jsx(r.code,{children:"Return"})," on Apple platforms)"]})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"ArrowUp"}),e.jsx(r.td,{children:e.jsx(r.code,{children:"↑"})})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"ArrowDown"}),e.jsx(r.td,{children:e.jsx(r.code,{children:"↓"})})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"ArrowLeft"}),e.jsx(r.td,{children:e.jsx(r.code,{children:"←"})})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"ArrowRight"}),e.jsx(r.td,{children:e.jsx(r.code,{children:"→"})})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"Escape"}),e.jsx(r.td,{children:e.jsx(r.code,{children:"Esc"})})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"Pagedown"}),e.jsx(r.td,{children:e.jsx(r.code,{children:"Page Down"})})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"Pageup"}),e.jsx(r.td,{children:e.jsx(r.code,{children:"Page Up"})})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"Printscreen"}),e.jsx(r.td,{children:e.jsx(r.code,{children:"Print Screen"})})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"Scrolllock"}),e.jsx(r.td,{children:e.jsx(r.code,{children:"Scroll Lock"})})]})]})]}),`
`,e.jsx(r.p,{children:"All other keys are displayed as provided but transformed to title case."}),`
`,e.jsx(r.h2,{id:"modifier-keys",children:"Modifier keys"}),`
`,e.jsx(r.p,{children:"Modifer keys are displayed using platform-appropriate glyphs."}),`
`,e.jsxs(r.table,{children:[e.jsx(r.thead,{children:e.jsxs(r.tr,{children:[e.jsx(r.th,{children:"Modifier key"}),e.jsx(r.th,{children:"Windows / Linux"}),e.jsx(r.th,{children:"Apple"})]})}),e.jsxs(r.tbody,{children:[e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"Control"}),e.jsx(r.td,{children:e.jsx(r.code,{children:"Ctrl"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"⌃"})})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"Shift"}),e.jsx(r.td,{children:e.jsx(r.code,{children:"⇧"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"⇧"})})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"Alt"}),e.jsx(r.td,{children:e.jsx(r.code,{children:"Alt"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"⌥"})})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"Meta"}),e.jsx(r.td,{children:e.jsx(r.code,{children:"⊞"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"⌘"})})]}),e.jsxs(r.tr,{children:[e.jsx(r.td,{children:"Mod"}),e.jsx(r.td,{children:e.jsx(r.code,{children:"Ctrl"})}),e.jsx(r.td,{children:e.jsx(r.code,{children:"⌘"})})]})]})]}),`
`,e.jsx(r.h3,{id:"mod-key",children:"Mod key"}),`
`,e.jsxs(r.p,{children:["Use the ",e.jsx(r.code,{children:"mod"})," property to display the primary modifier key for the current platform: ",e.jsx(r.code,{children:"⌘"}),` on Apple
platforms and `,e.jsx(r.code,{children:"Ctrl"})," on Windows / Linux."]}),`
`,e.jsx(r.pre,{children:e.jsx(r.code,{className:"language-html",children:`<forge-kbd mod keys="S"></forge-kbd>
`})}),`
`,e.jsxs(r.p,{children:["Modifiers are displayed in the following order: Control, Alt, Shift, Meta, Mod, followed by ",e.jsx(r.code,{children:"keys"}),"."]}),`
`,e.jsx(r.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(r.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:["The kbd component renders native ",e.jsx(r.code,{children:"<kbd>"}),` elements, which are recognized by assistive technology as
representing keyboard input.`]}),`
`]})]})}function E(d={}){const{wrapper:r}={...n(),...d.components};return r?e.jsx(r,{...d,children:e.jsx(s,{...d})}):s(d)}export{E as default};
