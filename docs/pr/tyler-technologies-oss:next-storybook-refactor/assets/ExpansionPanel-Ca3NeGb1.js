import{j as e}from"./jsx-runtime-DGnkjteD.js";import{u as a}from"./index-BYwqUUVQ.js";import{M as i,T as s,C as r}from"./index-B0QLvtoE.js";import{C as l}from"./CustomArgTypes-DK7odAGp.js";import{E as c,D as p}from"./ExpansionPanel.stories-Bsi7Vvh-.js";import"./iframe-DRZLxZqB.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./icon-CkW3gFTv.js";import"./lit-element-Dm2J4qPi.js";import"./chunk-MZXVCX43-CM0pFb8Z.js";import"./v4-CQkTLCs1.js";import"./expansion-panel-BZX7ZVL9.js";function o(t){const n={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...a(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:c}),`
`,e.jsx(s,{}),`
`,e.jsx(n.p,{children:`Expansion panels provide progressive disclosure of content. Use them to group and hide content that is not immediately relevant to the user.
They are useful for organizing information and reducing clutter on the screen.`}),`
`,e.jsx(r,{of:p}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["If the user is able to click the expansion panel to toggle its state, ensure that a ",e.jsx(n.code,{children:"<button>"})," element is present and clearly labeled to serve as an accessible point of interaction.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Set the ",e.jsx(n.code,{children:"aria-expanded"})," atribute on the button to reflect the state of the component. Update it when the panel opens or closes."]}),`
`,e.jsxs(n.li,{children:["Enclose the expandable content in an element with ",e.jsx(n.code,{children:'role="group"'})," or another non-generic role."]}),`
`,e.jsxs(n.li,{children:["Set ",e.jsx(n.code,{children:"aria-controls"})," on the button to reference the id of the expandable content."]}),`
`,e.jsx(n.li,{children:"Do not place complex or interactive elements within a button. If your design requires such content in the expanion panel header, place a button in the header alongside that content instead of enclosing it."}),`
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
`})})]})}function k(t={}){const{wrapper:n}={...a(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{k as default};
