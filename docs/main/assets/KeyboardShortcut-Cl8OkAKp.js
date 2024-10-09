import{j as e}from"./jsx-runtime-09Psuw5f.js";import{u as n}from"./index-CifnwB8G.js";import{ae as i,af as s,ag as a}from"./index-DS3-dU_A.js";import{C as c}from"./CustomArgTypes-BNrPzZVJ.js";import{K as l,D as h}from"./KeyboardShortcut.stories-BvKRruaN.js";import"./iframe-CQnZhdaF.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-DxKRhftL.js";import"./index-DrFu-skq.js";import"./utils-CRuDW25z.js";import"./lit-element-Dk2-kgKT.js";import"./lit-html-DZH-Jm0H.js";import"./chunk-454WOBUV-CM0pFb8Z.js";import"./v4-CQkTLCs1.js";import"./constants-DjE6emXm.js";import"./keyboard-shortcut-DFBCtY5O.js";import"./base-adapter-F7QHxK2H.js";import"./button-C5f1g9CL.js";import"./icon-DHpZ4R73.js";import"./index-Dh0vMUMR.js";import"./focus-indicator-_fDu4ZqT.js";import"./state-layer-DTKAXCUq.js";import"./base-button-adapter-WOmen6Ii.js";import"./index-ByifSpfC.js";import"./with-label-aware-CLWydNrR.js";import"./with-default-aria-DCLjqsVH.js";function r(o){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:l}),`
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
`]})]})}function L(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(r,{...o})}):r(o)}export{L as default};
