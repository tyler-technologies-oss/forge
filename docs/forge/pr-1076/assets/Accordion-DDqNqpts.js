import{j as e,M as r,T as s,C as a}from"./blocks-3ZAWI3v_.js";import{useMDXComponents as i}from"./index-Bjmsm87n.js";import{C as p}from"./CustomArgTypes-CCiIVhDX.js";import{A as l,D as c}from"./Accordion.stories-DqefiSCM.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BJoIjGP7.js";import"./utils-DlRR_6up.js";import"./decorators-CPg_UGEI.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-CMVcOjIr.js";import"./base-component-C90hx4_s.js";import"./feature-detection-Dexxu8GM.js";import"./base-adapter-BG6Ht_Mg.js";import"./expansion-panel-PLmKZqMG.js";import"./class-map-CNeOa_ju.js";import"./directive-jorct-Oe.js";import"./property-Ik0D1Y13.js";import"./state-D_15bZAK.js";import"./query-assigned-elements-43hYArgI.js";import"./base-DVmwUFg0.js";import"./base-lit-element-BFT9EkIZ.js";import"./utils-DU-9AqTO.js";import"./index-DTwfV0k0.js";import"./open-icon-C85rqQKN.js";import"./tyler-icons-Dn_DGO8W.js";import"./divider-C8Z9knLF.js";function t(o){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:l}),`
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
`]})]})}function R(o={}){const{wrapper:n}={...i(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{R as default};
