import{ae as t,af as r,ag as s,ah as a}from"./index-C6-yZvpR.js";import{u as o}from"./index-BDKmbmf8.js";import{C as c}from"./CustomArgTypes-D6w6yXlS.js";import{B as l,D as h}from"./ButtonArea.stories-KTpTYtOx.js";import"./iframe-BZB2O7rz.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-CbH-gv82.js";import"./lit-element-CgJqSpuc.js";import"./lit-html-paDGiEfB.js";import"./style-map-C9nPWcxA.js";import"./directive-CF8sV3Lr.js";import"./chunk-D5ZWXAHU-CGElDDNX.js";import"./v4-CQkTLCs1.js";import"./constants-CFf81ck9.js";import"./icon-FszQmWVN.js";import"./base-adapter-Dh44vCkH.js";import"./index-BmocOEUj.js";import"./index-ByifSpfC.js";import"./card-CgGa1_Bt.js";import"./button-area-ecqaBINn.js";import"./focus-indicator-DesOnyyZ.js";import"./state-layer-COSQHCpS.js";import"./event-utils-C1SDeUaq.js";import"./icon-button-CSqhF-TJ.js";import"./base-button-adapter-BS886vuU.js";import"./with-label-aware-CjYHyB6d.js";import"./with-default-aria-CAIVLMQ_.js";import"./tooltip-ClBWJcYu.js";import"./overlay-DUpFUxF7.js";import"./with-longpress-listener-B4oujpK4.js";import"./dismissible-stack-DVth9mRg.js";import"./decorators-DJTA_amK.js";function i(n){const e={code:"code",h2:"h2",li:"li",ul:"ul",...o(),...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(r,{of:l}),`
`,t.jsx(s,{}),`
`,t.jsx(a,{of:h}),`
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
`]})]})}function N(n={}){const{wrapper:e}={...o(),...n.components};return e?t.jsx(e,{...n,children:t.jsx(i,{...n})}):i(n)}export{N as default};
