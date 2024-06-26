import{j as e}from"./jsx-runtime-BOxXCiH9.js";import{u as n}from"./index-DuPH5XzU.js";import{M as r,T as s,C as l}from"./index-DqH3OTA9.js";import{C as c}from"./CustomArgTypes-G8i2MET4.js";import{T as a,D as h}from"./Tooltip.stories-DbF_fRNy.js";import"./iframe-Dl2z-e7R.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./utils-Dtr3SQvK.js";import"./lit-html-Bzgct6Ob.js";import"./style-map-D0ILlpbs.js";import"./lit-html-BWgXkSvR.js";import"./directive-CF8sV3Lr.js";import"./constants-ngK8be3i.js";import"./tooltip-FbyHcKsY.js";import"./base-adapter-uOfGA2wD.js";import"./focus-indicator-C4Z5XP1c.js";import"./index-Dh0vMUMR.js";import"./overlay-D7ruZE35.js";import"./with-longpress-listener-CJlfUm7c.js";import"./dismissible-stack-jVokvGcY.js";import"./with-default-aria-Bw3nCsY-.js";import"./button-GqT3ELiS.js";import"./icon-DHVNhAh1.js";import"./state-layer-BisR_hRI.js";import"./base-button-adapter-DTaQearl.js";import"./index-CIZ3m0iD.js";import"./with-label-aware-DCBgJY4W.js";function i(o){const t={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:a}),`
`,e.jsx(s,{}),`
`,e.jsx(t.p,{children:"Tooltips display informative text when users hover over an element."}),`
`,e.jsx(l,{of:h}),`
`,e.jsx(t.h2,{id:"anchor",children:"Anchor"}),`
`,e.jsxs(t.p,{children:['Tooltips are intended to be "anchored" to another element. This is typically done by setting the ',e.jsx(t.code,{children:"anchor"})," property/attribute to the ",e.jsx(t.code,{children:"id"})," of the element that the tooltip should be anchored to."]}),`
`,`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<button id="button">Hover over me</button>
<forge-tooltip anchor="button">This is a tooltip</forge-tooltip>
`})}),`
`,e.jsx(t.h2,{id:"type",children:"Type"}),`
`,e.jsxs(t.p,{children:["You can set the ",e.jsx(t.code,{children:"type"})," property/attribute to one of the following values to control its association to the anchor element."]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"presentation"}),": A tooltip that is purely presentational and has no accessible meaning to its anchor."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"label"}),": The tooltip will be interpreted as the accessible label for the anchor element."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"description"}),": The tooltip will be interpreted as the accessible description for the anchor element."]}),`
`]}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(c,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Verify that there is sufficient contrast between the foreground text and background to meet WCAG requirements."}),`
`,e.jsxs(t.li,{children:["The target element receives the proper ARIA attributes such as ",e.jsx(t.code,{children:"aria-labelledby"})," or ",e.jsx(t.code,{children:"aria-describedby"})," where necessary."]}),`
`,e.jsx(t.li,{children:"Should not contain interactive content."}),`
`]})]})}function W(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(i,{...o})}):i(o)}export{W as default};
