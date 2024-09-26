import{j as t}from"./jsx-runtime-CVeY8IPl.js";import{u as o}from"./index-DQUdx8F9.js";import{ae as r,af as s,ag as a}from"./index-BOFJ3-yD.js";import{C as c}from"./CustomArgTypes-CWN5i-vk.js";import{B as l,D as m}from"./ButtonArea.stories-DUw_N0BV.js";import"./iframe-BvI8IL95.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-DxKRhftL.js";import"./index-DrFu-skq.js";import"./utils-Dj42C_k3.js";import"./lit-element-Dk2-kgKT.js";import"./lit-html-DZH-Jm0H.js";import"./style-map-DxfbqtuX.js";import"./directive-Ctav8iJK.js";import"./chunk-454WOBUV-CM0pFb8Z.js";import"./v4-CQkTLCs1.js";import"./constants-DjE6emXm.js";import"./icon-DHpZ4R73.js";import"./base-adapter-F7QHxK2H.js";import"./index-Dh0vMUMR.js";import"./index-ByifSpfC.js";import"./card-DdiAyW6J.js";import"./button-area-B6hDHYsN.js";import"./focus-indicator-_fDu4ZqT.js";import"./state-layer-DTKAXCUq.js";import"./event-utils-C1SDeUaq.js";import"./icon-button-XdSjYqUR.js";import"./base-button-adapter-WOmen6Ii.js";import"./with-label-aware-CLWydNrR.js";import"./with-default-aria-DCLjqsVH.js";import"./tooltip-CoCQ3Otm.js";import"./overlay-DWm8nYOy.js";import"./with-longpress-listener-D-8wsf8o.js";import"./dismissible-stack-DoZLb9q6.js";import"./decorators-DvEJi2JG.js";function i(n){const e={code:"code",h2:"h2",li:"li",ul:"ul",...o(),...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(r,{of:l}),`
`,t.jsx(s,{}),`
`,t.jsx(a,{of:m}),`
`,t.jsx(e.h2,{id:"api",children:"API"}),`
`,t.jsx(c,{}),`
`,t.jsx(e.h2,{id:"accessibility",children:"Accessibility"}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsxs(e.li,{children:["Always include a slotted ",t.jsx(e.code,{children:"<button>"})," element."]}),`
`,t.jsxs(e.li,{children:["Add a concise, descriptive description of the button area's action as the text content of the slotted button.",`
`,t.jsxs(e.ul,{children:[`
`,t.jsx(e.li,{children:"The button's text content should preferably be the same as the visible text within the button area to reduce confusion. This can a portion of the content if long."}),`
`]}),`
`]}),`
`,t.jsxs(e.li,{children:["Set any accessible attributes on the slotted button.",`
`,t.jsxs(e.ul,{children:[`
`,t.jsxs(e.li,{children:["Set ",t.jsx(e.code,{children:"aria-controls"})," if the button controls another element on the page."]}),`
`,t.jsxs(e.li,{children:["Set ",t.jsx(e.code,{children:"aria-expanded"})," to reflect the state of the controlled element if appropriate."]}),`
`]}),`
`]}),`
`,t.jsxs(e.li,{children:["Verify that you can reach every nested button by keyboard navigation.",`
`,t.jsxs(e.ul,{children:[`
`,t.jsx(e.li,{children:"Ensure that there is a visual cue that the nested button is currently in focus."}),`
`]}),`
`]}),`
`,t.jsx(e.li,{children:"Verify that pressing the space bar or enter key while focused on a button will activate the button area in the same manner as if it had been clicked with a mouse."}),`
`,t.jsx(e.li,{children:"Verify that there is sufficient contrast between the foreground text and background to meet WCAG requirements."}),`
`]})]})}function O(n={}){const{wrapper:e}={...o(),...n.components};return e?t.jsx(e,{...n,children:t.jsx(i,{...n})}):i(n)}export{O as default};
