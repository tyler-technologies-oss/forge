import{ae as t,af as r,ag as a,ah as n}from"./index-BoCG7zoI.js";import{u as s}from"./index-C-8hBKWm.js";import{C as c}from"./CustomArgTypes-Dd00lBQm.js";import{C as l}from"./CssOnlyInformation-cdDkJ2Rs.js";import{I as h,D as d,V as p,T as m,a as u,A as f,W as x,b as j,c as b,C as g}from"./IconButton.stories-Cfa5EBsX.js";import"./iframe-BG0ijkPf.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-Cisx8TMn.js";import"./lit-element-JplMEnZc.js";import"./lit-html-paDGiEfB.js";import"./chunk-D5ZWXAHU-CGElDDNX.js";import"./v4-CQkTLCs1.js";import"./index-fxMNKkgx.js";import"./icon-PniqSQTM.js";import"./constants-DVLGQE2r.js";import"./feature-detection-DRCh51Sa.js";import"./base-adapter-C-lOm-JO.js";import"./index-BmocOEUj.js";import"./index-ByifSpfC.js";import"./class-map-D55lQyt8.js";import"./directive-CF8sV3Lr.js";import"./icon-button-Byrj13fN.js";import"./base-button-adapter-DxgXZ3Bs.js";import"./with-label-aware-Cjy84eJN.js";import"./with-default-aria-BwsTg2ZV.js";import"./a11y-utils-DJ_tX8xT.js";import"./focus-indicator-BvNL19jq.js";import"./state-layer-CG0HAXrj.js";import"./circular-progress-BVNHL-TQ.js";import"./badge-LAte7Gqu.js";import"./label-DD6WOkIX.js";import"./button-Cc7D3D0l.js";import"./button-toggle-group-BMTqgYYW.js";import"./with-form-associated-DXFQToO5.js";import"./checkbox-D8XHfmDb.js";import"./switch-B8UkJq6I.js";function o(i){const e={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...i.components};return t.jsxs(t.Fragment,{children:[t.jsx(r,{of:h}),`
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
`,t.jsx(n,{of:f}),`
`,t.jsx(e.h2,{id:"with-badge",children:"With Badge"}),`
`,t.jsx(e.p,{children:"Icon buttons can display a badge to indicate the number of items in a list or the number of notifications."}),`
`,t.jsx(n,{of:x}),`
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
`,t.jsx(n,{of:g}),`
`,t.jsx(l,{})]})}function rt(i={}){const{wrapper:e}={...s(),...i.components};return e?t.jsx(e,{...i,children:t.jsx(o,{...i})}):o(i)}export{rt as default};
