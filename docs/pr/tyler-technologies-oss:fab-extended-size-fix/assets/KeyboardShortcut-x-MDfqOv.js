import{j as e,M as s,T as i,C as c}from"./blocks-BSdAbMTe.js";import{useMDXComponents as n}from"./index-CX3z61x2.js";import{C as a}from"./CustomArgTypes-CC88PgcC.js";import{K as l,D as h}from"./KeyboardShortcut.stories-BXdhilaO.js";import"./iframe-CQyu4TFV.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-B9OMirVp.js";import"./feature-detection-uS6p5jc8.js";import"./keyboard-shortcut-Cs_3tUZu.js";import"./constants-wOq9K3uV.js";import"./base-adapter-Mla2Q9YN.js";import"./button-r2EMLpWm.js";import"./icon-B8CdcxqJ.js";import"./index-CiLSBptl.js";import"./focus-indicator-IWpzSXYP.js";import"./utils-CRxrUqQD.js";import"./state-layer-BFwsAUDA.js";import"./base-button-adapter-D0zqnDMQ.js";import"./with-label-aware-D31hYnqk.js";import"./with-default-aria-CUUWGrPB.js";import"./a11y-utils-fzPGYZJ6.js";function r(o){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:l}),`
`,e.jsx(i,{}),`
`,e.jsxs(t.p,{children:[`The keyboard shortcut component provides a simple way to attach keyboard driven functionality to an
element via the DOM. By default placing `,e.jsx(t.code,{children:"<forge-keyboard-shortcut>"}),` as a sibling after an element
enables the shortcut when focus is within the element.`]}),`
`,e.jsxs(t.p,{children:["The shortcut can also be enabled on the entire document body with the ",e.jsx(t.code,{children:"global"}),` attribute or other
elements with the `,e.jsx(t.code,{children:"target"})," attribute which accepts a CSS selector."]}),`
`,e.jsx(c,{of:h}),`
`,e.jsx(t.h3,{id:"targeting-a-different-host-element",children:"Targeting a different host element"}),`
`,e.jsxs(t.p,{children:["Keyboard shortcut can also target a specific element using the ",e.jsx(t.code,{children:"target"})," attribute:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<forge-button type="raised" id="shortcut-target">
  <button type="button">Button</button>
</forge-button>
<p>Some other element</p>
<forge-keyboard-shortcut id="shortcut" key="shift+a" target="#shortcut-target"></forge-keyboard-shortcut>
`})}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note:"})," the ",e.jsx(t.code,{children:"target"})," attribute must be a valid CSS selector."]}),`
`]}),`
`,e.jsx(t.h3,{id:"targeting-the-document-body",children:"Targeting the document body"}),`
`,e.jsxs(t.p,{children:["Additionally, keyboard shortcut can be set to work across the whole page using the ",e.jsx(t.code,{children:"global"})," attribute:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<forge-keyboard-shortcut id="shortcut" key="shift+a" global></forge-keyboard-shortcut>
`})}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(a,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure that the shortcut is described in a logical, visible spot on the page. Include its function and the key combination that activates it."}),`
`,e.jsx(t.li,{children:"Don't override browser, operating system, or assistive technology shortcuts."}),`
`,e.jsxs(t.li,{children:["Set ",e.jsx(t.code,{children:"aria-keyshortcuts"}),` on any element that is focused or activated by a global shortcut. See the
`,e.jsx(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-keyshortcuts",rel:"nofollow",children:"MDN docs"})," for more information."]}),`
`,e.jsxs(t.li,{children:["Avoid using the ",e.jsx(t.code,{children:"accesskey"})," attribute. See the ",e.jsx(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey",rel:"nofollow",children:"MDN docs"})," for more information."]}),`
`,e.jsx(t.li,{children:"Don't duplicate behavior provided by the browser. A form will automatically submit when enter is pressed if it includes a submit button."}),`
`]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[`Even though the keyboard shortcut component exists in the DOM, the element itself doesn't affect
accessibility or layout due to having its `,e.jsx(t.code,{children:"display"})," style property set to ",e.jsx(t.code,{children:"none"}),"."]}),`
`]})]})}function E(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(r,{...o})}):r(o)}export{E as default};
