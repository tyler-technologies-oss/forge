import{u as o,j as e,M as s,T as a,C as i}from"./blocks-9gL3k0KB.js";import{C as m}from"./CustomArgTypes-CU6BJpEM.js";import{B as c,D as l,O as d}from"./Breadcrumb.stories-FbpGZDSY.js";import"./preload-helper-PPVm8Dsz.js";import"./index-aDc3MXPq.js";import"./iframe-BgRf1TIz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-C-EU7_QI.js";import"./service-adapter-8tADcN_b.js";import"./breadcrumb-overflow-menu-BPPisnZR.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./property-C1Jv4i9D.js";import"./class-map-CWpavWNe.js";import"./directive-CwRn8Fwj.js";import"./base-lit-element-DWYxl6g4.js";import"./async-directive-DTv5npVy.js";import"./a11y-utils-DssnAab5.js";import"./dom-utils-BDbRr6KM.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./if-defined-DnLQabZa.js";import"./focus-indicator-Ddo_7foI.js";import"./floating-ui.dom-DaMtbvS2.js";import"./utils-C31il88P.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./popover-CGb2usu3.js";import"./custom-element-DR9AFpIK.js";import"./core-property-Co8uF8PW.js";import"./overlay-COLivfx5.js";import"./base-adapter-DOky_or5.js";import"./constants-ffvdo6x3.js";import"./create-context-BxR5I8pu.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./base-component-BFu9bkgC.js";import"./with-longpress-listener-D4ROnnkg.js";import"./dismissible-stack-DyoP5jNB.js";import"./tooltip-BDLKK-c_.js";import"./with-element-internals-CFYP_epH.js";function n(t){const r={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:c}),`
`,e.jsx(a,{}),`
`,e.jsx(r.p,{children:"Breadcrumbs show the user's location within a hierarchy and provide links back to parent pages."}),`
`,e.jsx(i,{of:l}),`
`,e.jsx(r.h2,{id:"overflow-menu",children:"Overflow menu"}),`
`,e.jsxs(r.p,{children:["Use ",e.jsx(r.code,{children:"forge-breadcrumb-overflow-menu"}),` to collapse middle items into a popover opened by an overflow
button. Slot `,e.jsx(r.code,{children:"forge-breadcrumb-item"})," elements into it."]}),`
`,e.jsx(r.p,{children:`Use an overflow menu when there are more than five breadcrumb items or too many to display in a
single line. Place the overflow menu after the first breadcrumb item and include one or two
breadcrumb items after it.`}),`
`,e.jsx(i,{of:d}),`
`,e.jsx(r.h2,{id:"current-item",children:"Current item"}),`
`,e.jsxs(r.p,{children:[`The current item represents the page the user is currently on. It should be marked with the
`,e.jsx(r.code,{children:"current"})," attribute and will render as a non-interactive element with ",e.jsx(r.code,{children:'aria-current="page"'}),"."]}),`
`,e.jsx(r.p,{children:`Only include the current page in the breadcrumb when the page doesn't already have a title displayed
or is unclear. When the current page is included, it must be the last item in the breadcrumb.`}),`
`,e.jsx(r.h2,{id:"api",children:"API"}),`
`,e.jsx(m,{}),`
`,e.jsx(r.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(r.ul,{children:[`
`,e.jsxs(r.li,{children:[e.jsx(r.code,{children:"forge-breadcrumb"})," has the ",e.jsx(r.code,{children:"navigation"})," role. Provide an ",e.jsx(r.code,{children:"aria-label"}),` (such as "Breadcrumb") so it is
distinguishable from other navigation landmarks.`]}),`
`,e.jsxs(r.li,{children:["Set ",e.jsx(r.code,{children:"current"}),` on the item that represents the current page. It renders a non-interactive element with
`,e.jsx(r.code,{children:'aria-current="page"'})," in place of the link."]}),`
`,e.jsxs(r.li,{children:["Place content in the overflow menu's ",e.jsx(r.code,{children:"tooltip"})," slot to provide an accessible name for the overflow button."]}),`
`]})]})}function $(t={}){const{wrapper:r}={...o(),...t.components};return r?e.jsx(r,{...t,children:e.jsx(n,{...t})}):n(t)}export{$ as default};
