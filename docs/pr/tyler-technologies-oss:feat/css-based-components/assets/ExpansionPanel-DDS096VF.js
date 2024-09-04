import{j as e}from"./jsx-runtime-CFMSJ0Oo.js";import{u as i}from"./index-eZawsjBl.js";import{ae as s,af as r,ag as o}from"./index-CsV2yrIV.js";import{C as l}from"./CustomArgTypes-C9HfBMq3.js";import{C as p}from"./CssOnlyInformation-DEIjq6n8.js";import{E as c,D as d,C as h}from"./ExpansionPanel.stories-bWJJVPWZ.js";import"./iframe-Da-5sk24.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-DxKRhftL.js";import"./index-DrFu-skq.js";import"./utils-CeeIIWTn.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./chunk-454WOBUV-CM0pFb8Z.js";import"./v4-CQkTLCs1.js";import"./style-map-D0ILlpbs.js";import"./directive-CF8sV3Lr.js";import"./ref-BorTy8X1.js";import"./directive-helpers-DYUueT8w.js";import"./class-map-CDZWlD4a.js";import"./constants-DjE6emXm.js";import"./expansion-panel-Da14WzAs.js";import"./base-adapter-F7QHxK2H.js";import"./index-ByifSpfC.js";import"./icon-DHpZ4R73.js";import"./index-Dh0vMUMR.js";import"./card-AhK8i1VF.js";function a(t){const n={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:c}),`
`,e.jsx(r,{}),`
`,e.jsx(n.p,{children:`Expansion panels provide progressive disclosure of content. Use them to group and hide content that is not immediately relevant to the user.
They are useful for organizing information and reducing clutter on the screen.`}),`
`,e.jsx(o,{of:d}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If the user is able to click the expansion panel to toggle its state, ensure that a ",e.jsx(n.code,{children:"<button>"})," element is present and clearly labeled to serve as an accessible point of interaction.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Set the ",e.jsx(n.code,{children:"aria-expanded"})," attribute on the button to reflect the state of the component. Update it when the panel opens or closes."]}),`
`,e.jsxs(n.li,{children:["Enclose the expandable content in an element with ",e.jsx(n.code,{children:'role="group"'})," or another non-generic role."]}),`
`,e.jsxs(n.li,{children:["Set ",e.jsx(n.code,{children:"aria-controls"})," on the button to reference the id of the expandable content."]}),`
`,e.jsx(n.li,{children:"Do not place complex or interactive elements within a button. If your design requires such content in the expansion panel header, place a button in the header alongside that content instead of enclosing it."}),`
`,e.jsx(n.li,{children:"Ensure that the user can focus on the element which activates and deactivates the expansion panel."}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:["Ensure that the expansion panel can be activated by keyboard.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Here is an example of a properly marked up expansion panel:"}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<!-- aria-expanded will be toggled via script to reflect the state of the component -->
<forge-expansion-panel>
  <button slot="header" aria-controls="expandable-content" aria-expanded="false">Toggle panel</button>
  <div id="expandable-content" role="group">Expandable content</div>
</forge-expansion-panel>
`})}),`
`,e.jsx(n.p,{children:"The button can also be placed elsewhere in the document, outside the expansion panel, with the same attributes set:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<button slot="header" aria-controls="expandable-content" aria-expanded="false">Toggle panel</button>

<forge-expansion-panel>
  <div id="expandable-content" role="group">Expandable content</div>
</forge-expansion-panel>
`})}),`
`,e.jsx(n.h2,{id:"css-only",children:"CSS-Only"}),`
`,e.jsx(n.p,{children:"The expansion-panel component is also available as a CSS-only component, but it does require a small amount of JavaScript to toggle the expanded state."}),`
`,e.jsx(o,{of:h}),`
`,e.jsx(n.p,{children:"Below is an example JavaScript snippet that toggles the expanded state of the CSS-only expansion panel:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// Get the button element
const button = expansionPanel.querySelector('#my-button');

// Get the expansion panel element
const expansionPanel = document.querySelector('#my-button + .forge-expansion-panel');

// Toggle the expanded state when the button is clicked
button.addEventListener('click', () => {
  const expanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', !expanded);
  expandableContent.classList.toggle('forge-expansion-panel--open', !expanded);
});
`})}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," This is a simple example. You may need to adjust the JavaScript to fit your specific use case, or to fit framework-specific usage."]}),`
`]}),`
`,e.jsx(p,{})]})}function z(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(a,{...t})}):a(t)}export{z as default};
