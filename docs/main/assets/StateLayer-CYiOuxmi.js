import{j as e}from"./jsx-runtime-CECdSpK1.js";import{u as s}from"./index-DzB0YkKC.js";import{ae as a,af as r,ag as o}from"./index-DynqmCrT.js";import{C as c}from"./CustomArgTypes-iieUp3PU.js";import{C as h}from"./CssOnlyInformation-B4ddY4fL.js";import{S as d,D as l,W as p,C as m}from"./StateLayer.stories-CjT5exAv.js";import"./iframe-C5vhoQLX.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-DxKRhftL.js";import"./index-DrFu-skq.js";import"./utils-DY7h9u6A.js";import"./lit-html-DZH-Jm0H.js";import"./style-map-DxfbqtuX.js";import"./directive-Ctav8iJK.js";import"./constants-DjE6emXm.js";import"./state-layer-DTKAXCUq.js";import"./base-adapter-F7QHxK2H.js";import"./focus-indicator-_fDu4ZqT.js";import"./index-Dh0vMUMR.js";import"./card-DdiAyW6J.js";function i(n){const t={blockquote:"blockquote",code:"code",h2:"h2",p:"p",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:d}),`
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
`,e.jsx(h,{})]})}function R(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{R as default};
