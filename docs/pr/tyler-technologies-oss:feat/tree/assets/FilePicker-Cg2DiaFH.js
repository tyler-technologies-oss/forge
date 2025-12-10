import{j as e,M as r,T as s,C as a}from"./blocks-CUSrJfu5.js";import{useMDXComponents as n}from"./index-BZWDZ_KV.js";import{C as l}from"./CustomArgTypes-Jzjv3_Wr.js";import{F as p,D as h}from"./FilePicker.stories-BIidVe-Z.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CjpqGdC5.js";import"./utils-CWNZ6DqN.js";import"./service-adapter-CffG5Lhq.js";import"./file-picker-D1WFVFs_.js";import"./constants-DzQy6WDX.js";import"./feature-detection-B-sRDmdg.js";import"./base-adapter-C8aSF3nG.js";import"./button-BFumHOeW.js";import"./icon-Uwxy940_.js";import"./index-DTwfV0k0.js";import"./focus-indicator-C-FEG_J-.js";import"./property-BJWG2kRQ.js";import"./base-lit-element-wso3EsTw.js";import"./utils-Bd6MGx91.js";import"./state-layer-BEEsPoZf.js";import"./base-button-adapter-BD5TNa26.js";import"./with-label-aware-C7up74QW.js";import"./with-default-aria-6GN_uk1I.js";import"./a11y-utils-Dj08p-2z.js";import"./style-map-DOPI4WMf.js";import"./directive-CJw_OlP2.js";function i(o){const t={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:p}),`
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
