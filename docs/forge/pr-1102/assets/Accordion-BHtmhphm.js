import{j as e,M as r,T as s,C as a}from"./blocks-B6y53uqq.js";import{useMDXComponents as i}from"./index-Iq9ILhej.js";import{C as l}from"./CustomArgTypes-DEqu4UWS.js";import{A as p,D as c}from"./Accordion.stories-VGQRoeLp.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-HlIX8nsI.js";import"./utils-DhPatzMP.js";import"./decorators-D7VHZGxl.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-CBMW7RFg.js";import"./base-component-VHVExFFl.js";import"./dom-utils-DrFTp_YE.js";import"./base-adapter-Bv1ZGQ1S.js";import"./expansion-panel-DExwsoGT.js";import"./open-icon-C_jTwCsD.js";import"./tyler-icons-B1nAV5VC.js";import"./index-DTwfV0k0.js";import"./constants-d60dfpEV.js";import"./feature-detection-DlorGArm.js";import"./base-lit-element-_81_THYZ.js";import"./directive-jorct-Oe.js";import"./class-map-knFPscsf.js";import"./utils-DU-9AqTO.js";import"./divider-DhuFTWtL.js";function t(o){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:p}),`
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
`]})]})}function L(o={}){const{wrapper:n}={...i(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{L as default};
