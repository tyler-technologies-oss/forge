import{j as e,M as r,T as s,C as a}from"./blocks-DJhcUqBb.js";import{useMDXComponents as n}from"./index-DI7fLbbT.js";import{C as l}from"./CustomArgTypes-Y3-IPb0G.js";import{F as p,D as h}from"./FilePicker.stories-EoBvy-SO.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-AKpA6l3R.js";import"./utils-B1jcnhxN.js";import"./service-adapter-CoGDs2_3.js";import"./file-picker-Bnd-9c63.js";import"./base-component-BWatm2PB.js";import"./feature-detection-D1CqJtyS.js";import"./base-adapter-BuHpYl3d.js";import"./button-BzjmK-iE.js";import"./tyler-icons-DRTyRvfU.js";import"./index-DTwfV0k0.js";import"./focus-indicator-BE83ekqh.js";import"./property-lMzNpFjy.js";import"./base-lit-element-C8HRdlMB.js";import"./directive-jorct-Oe.js";import"./utils-DU-9AqTO.js";import"./state-layer-D7Damx7l.js";import"./base-button-core-n0x3NBkG.js";import"./with-label-aware-BdHJcOJ4.js";import"./with-default-aria-BwzGA5R6.js";import"./a11y-utils-uud85_zm.js";import"./style-map-8KPUwjOn.js";function i(o){const t={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:p}),`
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
