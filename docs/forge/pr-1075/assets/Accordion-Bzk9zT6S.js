import{j as e,M as s,T as r,C as a}from"./blocks-c81nojJq.js";import{useMDXComponents as i}from"./index-srxrMyqs.js";import{C as l}from"./CustomArgTypes-CMTqcV0o.js";import{A as p,D as c}from"./Accordion.stories-C7o0DSt3.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-Cyv46XVN.js";import"./utils-DJF5Ajxq.js";import"./decorators-DGGtauBw.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DCRACpP9.js";import"./feature-detection-CiXpQaRQ.js";import"./property-wAJbOwSc.js";import"./base-lit-element-DVGqRCw7.js";import"./expansion-panel-Ddnhu1du.js";import"./base-component-CgTc0tMd.js";import"./base-adapter-Dd2Rwp6N.js";import"./open-icon-zfnrNF6k.js";import"./tyler-icons-DG1d6qey.js";import"./index-DTwfV0k0.js";import"./utils-DU-9AqTO.js";import"./divider-BL37Lb2g.js";function t(o){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
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
`]})]})}function V(o={}){const{wrapper:n}={...i(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{V as default};
