import{j as e,M as s,T as r,C as a}from"./blocks-BXWYo71c.js";import{useMDXComponents as i}from"./index-CdNTQBuI.js";import{C as l}from"./CustomArgTypes-B7Qt9hVL.js";import{A as p,D as c}from"./Accordion.stories-D7BGvPjS.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-Co1TxWa1.js";import"./utils-3yMKERXj.js";import"./decorators-B0wVhVKv.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BcfAM8qe.js";import"./base-component-DXuuJMhq.js";import"./feature-detection-BkmzHgah.js";import"./base-adapter-Dwntuuli.js";import"./expansion-panel-BV8pjqCF.js";import"./open-icon-BdOtvQ_6.js";import"./tyler-icons-BS8_pNWa.js";import"./index-DTwfV0k0.js";import"./base-lit-element-x5FuV5gp.js";import"./class-map-C2o-_jGF.js";import"./directive-jorct-Oe.js";import"./utils-DU-9AqTO.js";import"./divider-CY-gug5I.js";function t(o){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
`,e.jsx(r,{}),`
`,e.jsxs(n.p,{children:["This component does not provide any visual appearance. It is just an orchestrator of child ",e.jsx(n.code,{children:"<forge-expansion-panel>"})," components."]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<forge-accordion>"}),` will ensure that only one child expansion panel, at most, is open at any given time. If you need to allow for multiple panels to be opened
simultaneously, you should opt for using just multiple `,e.jsx(n.code,{children:"<forge-expansion-panel>"})," components together without an accordion wrapper."]}),`
`,e.jsx(n.p,{children:"See the expansion panel component for information on how to use that component separately."}),`
`,e.jsx(a,{of:c}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Verify that you can tab to each panel in the accordion.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure that there is a visual cue that the panel is selected."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Verify that pressing the space bar or enter key while focusing on a panel will toggle it open and closed."}),`
`,e.jsx(n.li,{children:"If any open panel contains a link, button, or other navigation element, ensure that those tab stops are included while tabbing through the accordion."}),`
`,e.jsx(n.li,{children:"If any closed panel contains a link, button, or other navigation element, ensure those tab stops are skipped while tabbing through the accordion."}),`
`]})]})}function _(o={}){const{wrapper:n}={...i(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{_ as default};
