import{u as i,j as e,M as r,T as s,C as a}from"./blocks-fOgQkmdi.js";import{C as l}from"./CustomArgTypes-mRWyxyVx.js";import{A as p,D as c}from"./Accordion.stories-jm_AKtF_.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BxUalrPu.js";import"./utils-u3kxOSSj.js";import"./decorators-DCpSdx5R.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DXc2zuzs.js";import"./dom-utils-D0uG6d5z.js";import"./utils-CjYv_z18.js";import"./base-lit-element-DjoVktVs.js";import"./directive-CwRn8Fwj.js";import"./expansion-panel-DvBkj4vS.js";import"./class-map-dsSq2Txk.js";import"./base-Bi144_19.js";import"./query-assigned-elements-DSAaAj2A.js";import"./utils-DU-9AqTO.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./open-icon-B_3-VfI2.js";import"./tyler-icons-BqCFNdiX.js";import"./constants-D9XaGcQ2.js";import"./feature-detection-3Hxzrcpn.js";import"./divider-DSwJcXyF.js";function t(o){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:p}),`
`,e.jsx(s,{}),`
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
`]})]})}function P(o={}){const{wrapper:n}={...i(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{P as default};
