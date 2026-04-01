import{j as e,M as r,T as s,C as a}from"./blocks-CLhOYzYX.js";import{useMDXComponents as i}from"./index-V1HyaJEr.js";import{C as p}from"./CustomArgTypes-BQG6KFep.js";import{A as l,D as c}from"./Accordion.stories-n6jLiJxn.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-B38eiIpt.js";import"./utils-CS54QUTa.js";import"./decorators-C8Lh4YSI.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DH8AC8-s.js";import"./dom-utils-_i8W1Ps4.js";import"./utils-BfMeZ1UR.js";import"./base-lit-element-BDsKH4ax.js";import"./directive-jorct-Oe.js";import"./expansion-panel-DK4-VwJ0.js";import"./class-map-Dtr-5sOt.js";import"./state-Cy2JepOx.js";import"./query-assigned-elements-43hYArgI.js";import"./base-DVmwUFg0.js";import"./utils-DU-9AqTO.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./open-icon-OorddBD6.js";import"./tyler-icons-BfEfrJAD.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./divider-BDvO2mIa.js";function t(o){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:l}),`
`,e.jsx(s,{}),`
`,e.jsxs(n.p,{children:["This component does not provide any visual appearance. It is just an orchestrator of child ",e.jsx(n.code,{children:"<forge-expansion-panel>"})," components."]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<forge-accordion>"}),` will ensure that only one child expansion panel, at most, is open at any given time. If you need to allow for multiple panels to be opened
simultaneously, you should opt for using just multiple `,e.jsx(n.code,{children:"<forge-expansion-panel>"})," components together without an accordion wrapper."]}),`
`,e.jsx(n.p,{children:"See the expansion panel component for information on how to use that component separately."}),`
`,e.jsx(a,{of:c}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(p,{}),`
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
`]})]})}function q(o={}){const{wrapper:n}={...i(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{q as default};
