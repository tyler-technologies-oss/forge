import{j as e,M as r,T as s,C as a}from"./blocks-BW6tMW00.js";import{useMDXComponents as n}from"./index-CdZgOk8d.js";import{C as l}from"./CustomArgTypes-DzMvS4ML.js";import{F as p,D as h}from"./FilePicker.stories-CbxLArQY.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-1amZ02A4.js";import"./utils-s6uih_-r.js";import"./service-adapter-CoGDs2_3.js";import"./file-picker-06FB0o8M.js";import"./base-component-JqFhTqNN.js";import"./feature-detection-C7YyUy0w.js";import"./base-adapter-BuRgNRgk.js";import"./button-YbSFJWqY.js";import"./tyler-icons-CzoCbVaa.js";import"./index-DTwfV0k0.js";import"./focus-indicator-C5TEsO7E.js";import"./property-B9voTIv9.js";import"./base-lit-element-Ck1SVZB_.js";import"./utils-DU-9AqTO.js";import"./state-layer-DFBFTfpT.js";import"./base-button-core-Gs8VA1ot.js";import"./with-label-aware-BNPNo6Ms.js";import"./with-default-aria-CktUg9lz.js";import"./a11y-utils-Cisf0Kqm.js";import"./style-map-DhE_eh_-.js";import"./directive-jorct-Oe.js";function i(o){const t={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:p}),`
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
