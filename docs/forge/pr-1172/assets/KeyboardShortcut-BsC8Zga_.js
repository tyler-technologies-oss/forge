import{u as i,j as e,M as n,T as s,C as a}from"./blocks-qYGqEfe4.js";import{C as c}from"./CustomArgTypes-DPtrc7ix.js";import{K as l,D as h}from"./KeyboardShortcut.stories-BRKD7O4e.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DBk9oFP9.js";import"./iframe-BQuUdi9A.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-CElmhe9Y.js";import"./service-adapter-DlT-lJx7.js";import"./keyboard-shortcut-Cp3ihP7e.js";import"./dom-utils-D38acdAW.js";import"./property-DJvCC0I6.js";import"./base-lit-element-CB0pz4XF.js";import"./directive-CwRn8Fwj.js";import"./constants-DVKvft47.js";import"./feature-detection-Cdqsoz5C.js";import"./button-0aFc-rvC.js";import"./class-map-DAzR423m.js";import"./utils-DU-9AqTO.js";import"./focus-indicator--VpOaZ6F.js";import"./tyler-icons--haAADqW.js";import"./state-layer-Y1FZSPuC.js";import"./base-component-DokdPcmx.js";import"./base-adapter-C2s8cO2K.js";import"./base-button-D04UaXVg.js";import"./state-CFsUyUp-.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-CUlOUJ7O.js";import"./button-constants-Dh8wxsDb.js";function r(o){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:l}),`
`,e.jsx(s,{}),`
`,e.jsxs(t.p,{children:[`The keyboard shortcut component provides a simple way to attach keyboard driven functionality to an
element via the DOM. By default placing `,e.jsx(t.code,{children:"<forge-keyboard-shortcut>"}),` as a sibling after an element
enables the shortcut when focus is within the element.`]}),`
`,e.jsxs(t.p,{children:["The shortcut can also be enabled on the entire document body with the ",e.jsx(t.code,{children:"global"}),` attribute or other
elements with the `,e.jsx(t.code,{children:"target"})," attribute which accepts a CSS selector."]}),`
`,e.jsx(a,{of:h}),`
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
`,e.jsx(c,{}),`
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
`]})]})}function R(o={}){const{wrapper:t}={...i(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(r,{...o})}):r(o)}export{R as default};
