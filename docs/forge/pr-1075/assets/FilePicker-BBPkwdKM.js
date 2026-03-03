import{j as e,M as r,T as s,C as a}from"./blocks-c81nojJq.js";import{useMDXComponents as n}from"./index-srxrMyqs.js";import{C as l}from"./CustomArgTypes-CMTqcV0o.js";import{F as p,D as h}from"./FilePicker.stories-D7_ydiBa.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-Cyv46XVN.js";import"./utils-DJF5Ajxq.js";import"./service-adapter-8tADcN_b.js";import"./file-picker-CvgXvrkt.js";import"./base-component-CgTc0tMd.js";import"./feature-detection-CiXpQaRQ.js";import"./base-adapter-Dd2Rwp6N.js";import"./button-C96CRxyU.js";import"./tyler-icons-DG1d6qey.js";import"./index-DTwfV0k0.js";import"./focus-indicator-C-z2W46n.js";import"./property-wAJbOwSc.js";import"./base-lit-element-DVGqRCw7.js";import"./utils-DU-9AqTO.js";import"./state-layer-D_bEeiyc.js";import"./base-button-core-CQQw1DDx.js";import"./with-label-aware-UxVhxMHx.js";import"./with-default-aria-BEow76us.js";import"./a11y-utils-Byu3IW8S.js";import"./style-map-BchsrVH4.js";import"./directive-jorct-Oe.js";function i(o){const t={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:p}),`
`,e.jsx(s,{}),`
`,e.jsx(t.p,{children:`The file picker component allows for a user to upload files of their own to the system. The component provides a slot for a button, as well as drag-and-drop functionality to
launch the system file chooser dialog. There are visual queues to let the user know when files they are dragging can be dropped, as well as events that are relayed to the
developer to handle files that are legal and/or illegal based on the parameters set on the component.`}),`
`,e.jsx(t.p,{children:"The expectation of this component is that it will be used as a familiar element on the page that will let users upload files, while providing that visual and functional consistency."}),`
`,e.jsx(a,{of:h}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"The file-picker button should have text or a label that accurately describes the action of the button."}),`
`,e.jsx(t.li,{children:"After the system file picker dialog closes, focus should remain on the element that triggered the action."}),`
`,e.jsxs(t.li,{children:['Always use type="button" on the ',e.jsx(t.code,{children:"<button>"})," element to ensure that any parent forms are not submitted when clicking the button."]}),`
`]})]})}function S(o={}){const{wrapper:t}={...n(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(i,{...o})}):i(o)}export{S as default};
