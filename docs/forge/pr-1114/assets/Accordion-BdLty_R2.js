import{j as e,M as r,T as s,C as a}from"./blocks-B1S_8nc5.js";import{useMDXComponents as i}from"./index-CgLtPx-e.js";import{C as p}from"./CustomArgTypes-CikjLmxf.js";import{A as l,D as c}from"./Accordion.stories-Bx1bKsHh.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-DUO6sR7Q.js";import"./utils-JlLG_A5T.js";import"./decorators-0SJ1E2wu.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CmOnosOb.js";import"./dom-utils-B5Tbf4eK.js";import"./base-lit-element-BVSOkl5M.js";import"./directive-jorct-Oe.js";import"./expansion-panel-Bav1DQTs.js";import"./class-map-CaIjk2ba.js";import"./state-ChFRymCd.js";import"./query-assigned-elements-43hYArgI.js";import"./base-DVmwUFg0.js";import"./utils-DU-9AqTO.js";import"./index-DTwfV0k0.js";import"./open-icon-BRYaepyM.js";import"./tyler-icons-iDvhFOMC.js";import"./base-component-D7FTQsYl.js";import"./base-adapter-D-ThygVj.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./divider-YmzlOr01.js";function t(o){const n={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:l}),`
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
