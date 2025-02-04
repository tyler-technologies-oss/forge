import{j as e,M as i,T as s,C as c}from"./index-w01xucW8.js";import{useMDXComponents as n}from"./index-Be4DGfmT.js";import{C as a}from"./CustomArgTypes-cTufunHN.js";import{K as l,D as h}from"./KeyboardShortcut.stories-3-gCPPLo.js";import"./iframe-BHKin_8s.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-DyehaB2W.js";import"./lit-element-JplMEnZc.js";import"./lit-html-paDGiEfB.js";import"./chunk-D5ZWXAHU-CGElDDNX.js";import"./v4-CQkTLCs1.js";import"./feature-detection-ONR9WHvu.js";import"./keyboard-shortcut-7Y52yWVL.js";import"./constants-BjnHqKgS.js";import"./base-adapter-CQdYccXX.js";import"./button-vPgaRyW5.js";import"./icon-B5S0VGIT.js";import"./index-BmocOEUj.js";import"./focus-indicator-R2otSvsR.js";import"./state-layer-B7GOb8iB.js";import"./base-button-adapter-OmzAW3c3.js";import"./index-ByifSpfC.js";import"./with-label-aware-DAaZnhel.js";import"./with-default-aria-BcIvJ7-x.js";import"./a11y-utils-BOPvdiVn.js";function r(o){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:l}),`
`,e.jsx(s,{}),`
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
`]})]})}function L(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(r,{...o})}):r(o)}export{L as default};
