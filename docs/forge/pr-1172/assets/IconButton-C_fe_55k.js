import{u as s,j as t,M as r,T as a,C as n}from"./blocks-89P17n4a.js";import{C as c}from"./CustomArgTypes-COskihfg.js";import{C as l}from"./CssOnlyInformation-DMI98ptY.js";import{I as h,D as d,V as p,T as m,a as u,A as x,W as f,b as j,c as b,C as y}from"./IconButton.stories-BgikwuYc.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CnakqzYw.js";import"./iframe-BaLQ_A2d.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-CElmhe9Y.js";import"./service-adapter-DlT-lJx7.js";import"./tyler-icons-DfIaYIv7.js";import"./property-BBtIP4Dp.js";import"./base-lit-element-BOc1ljlO.js";import"./directive-CwRn8Fwj.js";import"./constants-DVKvft47.js";import"./feature-detection-Cdqsoz5C.js";import"./class-map-Bpya0c63.js";import"./icon-button-IKvoqhNZ.js";import"./base-button-D-ov5xND.js";import"./state-BHyQhtXL.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-CUlOUJ7O.js";import"./dom-utils-D38acdAW.js";import"./utils-DU-9AqTO.js";import"./focus-indicator-BeZvj0X5.js";import"./state-layer-Y1FZSPuC.js";import"./base-component-DokdPcmx.js";import"./base-adapter-C2s8cO2K.js";import"./icon-button-constants-wbi3a2tN.js";import"./circular-progress-BL_OHw4o.js";import"./with-element-internals-BVdcaC_W.js";import"./badge-DymMcnze.js";import"./label-BIsRcMc6.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./button-constants-Dh8wxsDb.js";import"./button-toggle-group-constants-D7W2mml0.js";import"./checkbox-constants-BwznIeqL.js";import"./switch-constants-CzmANmsv.js";function o(i){const e={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...i.components};return t.jsxs(t.Fragment,{children:[t.jsx(r,{of:h}),`
`,t.jsx(a,{}),`
`,t.jsx(e.p,{children:"Icon buttons communicate actions that users can take."}),`
`,t.jsx(n,{of:d}),`
`,t.jsx(e.h2,{id:"variants",children:"Variants"}),`
`,t.jsx(e.p,{children:"Icon buttons can be styled in different ways to indicate their purpose and emphasis level."}),`
`,t.jsx(n,{of:p}),`
`,t.jsx(e.h2,{id:"toggle",children:"Toggle"}),`
`,t.jsx(e.p,{children:"Icon buttons can be toggled on and off to indicate a state change."}),`
`,t.jsxs(e.p,{children:['When using a toggle icon button, ensure that you have provided an "off" icon in the default slot, and a "on" icon placed in the ',t.jsx(e.code,{children:"on"}),` slot.
The "on" icon should be visually distinct from the "off" icon to indicate the current state of the button. Typically an outlined-style icon
is used for the "off" state and a filled-style icon is used for the "on" state, but any icons can be used.`]}),`
`,t.jsx(n,{of:m}),`
`,t.jsx(e.h2,{id:"themed",children:"Themed"}),`
`,t.jsxs(e.p,{children:["Icon buttons can be themed to match the color scheme of the application. The following example shows a themed icon button using the ",t.jsx(e.code,{children:"theme"})," attribute:"]}),`
`,t.jsx(n,{of:u}),`
`,t.jsx(e.h2,{id:"with-anchor",children:"With Anchor"}),`
`,t.jsxs(e.p,{children:["Icon buttons can accept a slotted ",t.jsx(e.code,{children:"<a>"})," element to create a link."]}),`
`,t.jsx(n,{of:x}),`
`,t.jsx(e.h2,{id:"with-badge",children:"With Badge"}),`
`,t.jsx(e.p,{children:"Icon buttons can display a badge to indicate the number of items in a list or the number of notifications."}),`
`,t.jsx(n,{of:f}),`
`,t.jsx(e.h2,{id:"with-circular-progress",children:"With Circular Progress"}),`
`,t.jsx(e.p,{children:"It is common to place a circular progress indicator inside an icon button to indicate that an action is in progress."}),`
`,t.jsx(n,{of:j}),`
`,t.jsx(e.h2,{id:"with-label",children:"With Label"}),`
`,t.jsxs(e.p,{children:["Icons buttons can be composed with the ",t.jsx(e.code,{children:"<forge-label>"})," element to provide an accessible label for the button, as well as the correct label typography."]}),`
`,t.jsx(n,{of:b}),`
`,t.jsx(e.h2,{id:"api",children:"API"}),`
`,t.jsx(c,{}),`
`,t.jsx(e.h2,{id:"accessibility",children:"Accessibility"}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsxs(e.li,{children:["Verify that you can reach every button by keyboard navigation.",`
`,t.jsxs(e.ul,{children:[`
`,t.jsx(e.li,{children:"Ensure that there is a visual cue that the button is currently in focus."}),`
`,t.jsxs(e.li,{children:["Ensure that there is an ",t.jsx(e.code,{children:"aria-label"})," or ",t.jsx(e.code,{children:"aria-labelledby"})," attribute indicating the purpose of the button."]}),`
`]}),`
`]}),`
`,t.jsx(e.li,{children:"Verify that pressing the space bar or enter key while focused on a button will activate the button in the same manner as if it had been clicked with a mouse."}),`
`,t.jsx(e.li,{children:"If color conveys important information, provide additional cues for users with color perception deficiencies."}),`
`]}),`
`,t.jsx(e.h2,{id:"css-only",children:"CSS-Only"}),`
`,t.jsx(e.p,{children:"The icon-button component is also available as a CSS-only component without the need for JavaScript."}),`
`,t.jsx(n,{of:y}),`
`,t.jsx(l,{})]})}function rt(i={}){const{wrapper:e}={...s(),...i.components};return e?t.jsx(e,{...i,children:t.jsx(o,{...i})}):o(i)}export{rt as default};
