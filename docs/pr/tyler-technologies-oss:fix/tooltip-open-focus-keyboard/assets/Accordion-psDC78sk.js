import{j as e,M as s,T as r,C as a}from"./blocks-yinXpg-T.js";import{useMDXComponents as i}from"./index-BZYE28Bh.js";import{C as l}from"./CustomArgTypes-6_mKtLhb.js";import{A as c,D as p}from"./Accordion.stories-CEsOB5lF.js";import"./iframe-uO4rUnhr.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-DlEBVKaK.js";import"./decorators-BHo2GvWW.js";import"./feature-detection-uS6p5jc8.js";import"./accordion-9V_eyO_B.js";import"./constants-wOq9K3uV.js";import"./base-adapter-Mla2Q9YN.js";import"./expansion-panel-CTn5fG9B.js";import"./icon-B8CdcxqJ.js";import"./index-CiLSBptl.js";import"./utils-BtvMddIW.js";import"./divider-DoNAUeHX.js";function t(o){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:c}),`
`,e.jsx(r,{}),`
`,e.jsxs(n.p,{children:["This component does not provide any visual appearance. It is just an orchestrator of child ",e.jsx(n.code,{children:"<forge-expansion-panel>"})," components."]}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<forge-accordion>"}),` will ensure that only one child expansion panel, at most, is open at any given time. If you need to allow for multiple panels to be opened
simultaneously, you should opt for using just multiple `,e.jsx(n.code,{children:"<forge-expansion-panel>"})," components together without an accordion wrapper."]}),`
`,e.jsx(n.p,{children:"See the expansion panel component for information on how to use that component separately."}),`
`,e.jsx(a,{of:p}),`
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
`]})]})}function T(o={}){const{wrapper:n}={...i(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{T as default};
