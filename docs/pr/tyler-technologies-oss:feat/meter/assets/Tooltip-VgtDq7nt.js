import{j as e,M as r,T as s,C as l}from"./index-Bb4EV0e_.js";import{useMDXComponents as n}from"./index-BEU7SDIl.js";import{C as c}from"./CustomArgTypes-B2gHCfnj.js";import{T as a,D as h}from"./Tooltip.stories-DWmzfOjb.js";import"./iframe-rBv31dz4.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-Dyrg1f3v.js";import"./lit-html-paDGiEfB.js";import"./style-map-C9nPWcxA.js";import"./directive-CF8sV3Lr.js";import"./feature-detection-ONR9WHvu.js";import"./tooltip-D0ywHBAv.js";import"./constants-BjnHqKgS.js";import"./base-adapter-CQdYccXX.js";import"./focus-indicator-R2otSvsR.js";import"./index-BmocOEUj.js";import"./overlay-DAcircNE.js";import"./with-longpress-listener-S3ft74cg.js";import"./dismissible-stack-9mJiid_W.js";import"./with-default-aria-BcIvJ7-x.js";import"./a11y-utils-BOPvdiVn.js";import"./button-vPgaRyW5.js";import"./icon-B5S0VGIT.js";import"./state-layer-B7GOb8iB.js";import"./base-button-adapter-OmzAW3c3.js";import"./index-ByifSpfC.js";import"./with-label-aware-DAaZnhel.js";function i(o){const t={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:a}),`
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
`]})]})}function P(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(i,{...o})}):i(o)}export{P as default};
