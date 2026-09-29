import{u as i,j as t,M as n,T as s,C as a}from"./blocks-Ck8GEe5N.js";import{C as c}from"./CustomArgTypes-BL556TU4.js";import{K as l,D as h}from"./KeyboardShortcut.stories-z9_6kImQ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BieQ8965.js";import"./iframe-BJxToyET.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-UHZ10xki.js";import"./service-adapter-8tADcN_b.js";import"./keyboard-shortcut-ByjEp9ng.js";import"./component-utils-DXwuBG7n.js";import"./dom-utils-BrrHV3zE.js";import"./property-DFrfpKpf.js";import"./base-lit-element-CpHFhxvO.js";import"./async-directive-jA1Mz7ci.js";import"./directive-CwRn8Fwj.js";import"./constants-C55SM-CY.js";import"./create-context-BxR5I8pu.js";import"./feature-detection-iQu3yOww.js";import"./platform-EVTRdOou.js";import"./button-BFMR-gG-.js";import"./class-map-BnEDXcyy.js";import"./utils-C31il88P.js";import"./focus-indicator-DrGqahUv.js";import"./floating-ui.dom-DaMtbvS2.js";import"./icon-CxJqbZxZ.js";import"./state-layer-C_jpB3Dn.js";import"./custom-element-DBARb8MV.js";import"./core-property-Co8uF8PW.js";import"./base-adapter-DoIKtOh1.js";import"./base-component-Fg022xRz.js";import"./base-button-TqALiGM0.js";import"./tyler-icons-BAsQ94Lf.js";import"./state-Chsbeeao.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-DMYgbTDM.js";import"./button-constants-CBCPGxiy.js";function r(o){const e={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...o.components};return t.jsxs(t.Fragment,{children:[t.jsx(n,{of:l}),`
`,t.jsx(s,{}),`
`,t.jsxs(e.p,{children:[`The keyboard shortcut component provides a simple way to attach keyboard driven functionality to an
element via the DOM. By default placing `,t.jsx(e.code,{children:"<forge-keyboard-shortcut>"}),` as a sibling after an element
enables the shortcut when focus is within the element.`]}),`
`,t.jsxs(e.p,{children:["The shortcut can also be enabled on the entire document body with the ",t.jsx(e.code,{children:"global"}),` attribute or other
elements with the `,t.jsx(e.code,{children:"target"})," attribute which accepts a CSS selector."]}),`
`,t.jsx(a,{of:h}),`
`,t.jsx(e.h3,{id:"targeting-a-different-host-element",children:"Targeting a different host element"}),`
`,t.jsxs(e.p,{children:["Keyboard shortcut can also target a specific element using the ",t.jsx(e.code,{children:"target"})," attribute:"]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-html",children:`<forge-button type="raised" id="shortcut-target">
  <button type="button">Button</button>
</forge-button>
<p>Some other element</p>
<forge-keyboard-shortcut id="shortcut" key="shift+a" target="#shortcut-target"></forge-keyboard-shortcut>
`})}),`
`,t.jsxs(e.blockquote,{children:[`
`,t.jsxs(e.p,{children:[t.jsx(e.strong,{children:"Note:"})," the ",t.jsx(e.code,{children:"target"})," attribute must be a valid CSS selector."]}),`
`]}),`
`,t.jsx(e.h3,{id:"targeting-the-document-body",children:"Targeting the document body"}),`
`,t.jsxs(e.p,{children:["Additionally, keyboard shortcut can be set to work across the whole page using the ",t.jsx(e.code,{children:"global"})," attribute:"]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-html",children:`<forge-keyboard-shortcut id="shortcut" key="shift+a" global></forge-keyboard-shortcut>
`})}),`
`,t.jsx(e.h2,{id:"api",children:"API"}),`
`,t.jsx(c,{}),`
`,t.jsx(e.h2,{id:"accessibility",children:"Accessibility"}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsx(e.li,{children:"Ensure that the shortcut is described in a logical, visible spot on the page. Include its function and the key combination that activates it."}),`
`,t.jsx(e.li,{children:"Don't override browser, operating system, or assistive technology shortcuts."}),`
`,t.jsxs(e.li,{children:["Set ",t.jsx(e.code,{children:"aria-keyshortcuts"}),` on any element that is focused or activated by a global shortcut. See the
`,t.jsx(e.a,{href:"https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-keyshortcuts",rel:"nofollow",children:"MDN docs"})," for more information."]}),`
`,t.jsxs(e.li,{children:["Avoid using the ",t.jsx(e.code,{children:"accesskey"})," attribute. See the ",t.jsx(e.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/accesskey",rel:"nofollow",children:"MDN docs"})," for more information."]}),`
`,t.jsx(e.li,{children:"Don't duplicate behavior provided by the browser. A form will automatically submit when enter is pressed if it includes a submit button."}),`
`]}),`
`,t.jsxs(e.blockquote,{children:[`
`,t.jsxs(e.p,{children:[`Even though the keyboard shortcut component exists in the DOM, the element itself doesn't affect
accessibility or layout due to having its `,t.jsx(e.code,{children:"display"})," style property set to ",t.jsx(e.code,{children:"none"}),"."]}),`
`]})]})}function V(o={}){const{wrapper:e}={...i(),...o.components};return e?t.jsx(e,{...o,children:t.jsx(r,{...o})}):r(o)}export{V as default};
