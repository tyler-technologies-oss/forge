import{j as e,M as a,T as r,C as o}from"./index-_rEa7b7e.js";import{useMDXComponents as s}from"./index-B-BfIMxA.js";import{C as c}from"./CustomArgTypes-B8DAnPEN.js";import{C as h}from"./CssOnlyInformation-BrkvDjqX.js";import{S as d,D as l,W as p,C as m}from"./StateLayer.stories-MeCM-GmB.js";import"./iframe-Czd1Z2DY.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CfOrKyLd.js";import"./index-DrFu-skq.js";import"./utils-BeTmMhVX.js";import"./lit-html-CuBe1DX_.js";import"./style-map-CeP1Mntv.js";import"./directive-CJw_OlP2.js";import"./feature-detection-C61kIZu7.js";import"./state-layer-DA2sYK0k.js";import"./constants-DHnR0122.js";import"./base-adapter-B_B1W7NX.js";import"./utils-DXGAA5XK.js";import"./focus-indicator-B_9E-jM6.js";import"./index-CiLSBptl.js";import"./card-DBphJo-Y.js";import"./lit-element-B3QVTycr.js";import"./property-2VT-dgmE.js";function i(n){const t={blockquote:"blockquote",code:"code",h2:"h2",p:"p",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:d}),`
`,e.jsx(r,{}),`
`,e.jsx(t.p,{children:`State layers are used to indicate interaction states for an element, such as hover and pressed. These states provide visual feedback to the user when
they interact with an element, and are especially useful for interactive elements like buttons. They are typically used in conjunction with focus
indicators to provide a complete set of visual feedback for interactive elements. These are building block components that are typically used internally
within other components such as buttons.`}),`
`,e.jsx(t.p,{children:`Additionally, state layers provide a "ripple" effect that animates from the point of interaction to the bounds of the element. This effect is used to
indicate that the user's interaction has been received and is being processed.`}),`
`,e.jsxs(t.p,{children:["When using a state layer, it's important to note that they are absolutely positioned and should be used with a parent element that has ",e.jsx(t.code,{children:"position: relative"}),`
set to ensure that the bounds of interaction state are contained within the parent element.`]}),`
`,e.jsx(o,{of:l}),`
`,e.jsx(t.h2,{id:"with-cards",children:"With Cards"}),`
`,e.jsx(t.p,{children:"A common design pattern is an interactive card with a state layer and focus indicator that describes to the user that the card is interactive."}),`
`,e.jsx(o,{of:p}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:"Remember to always provide a focus indicator for interactive elements to ensure that users can navigate your site using a keyboard."}),`
`]}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(c,{}),`
`,e.jsx(t.h2,{id:"css-only",children:"CSS-Only"}),`
`,e.jsx(t.p,{children:"The state-layer component is also available as a CSS-only component without the need for JavaScript."}),`
`,e.jsx(o,{of:m}),`
`,e.jsx(h,{})]})}function _(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{_ as default};
