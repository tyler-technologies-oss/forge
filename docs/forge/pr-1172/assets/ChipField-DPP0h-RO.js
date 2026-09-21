import{u as s,j as e,M as n,T as a,C as o}from"./blocks-89P17n4a.js";import{C as p}from"./CustomArgTypes-COskihfg.js";import{C as l,D as m,W as d}from"./ChipField.stories-D5wU6jKn.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CnakqzYw.js";import"./iframe-BaLQ_A2d.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-CElmhe9Y.js";import"./style-map-CyLVt2T4.js";import"./directive-CwRn8Fwj.js";import"./ref-CFuq6EkO.js";import"./base-lit-element-BOc1ljlO.js";import"./service-adapter-DlT-lJx7.js";import"./autocomplete-CWp43el_.js";import"./base-component-DokdPcmx.js";import"./base-adapter-C2s8cO2K.js";import"./dom-utils-D38acdAW.js";import"./tyler-icons-DfIaYIv7.js";import"./property-BBtIP4Dp.js";import"./constants-DVKvft47.js";import"./feature-detection-Cdqsoz5C.js";import"./divider-DGwf0Vud.js";import"./utils-DU-9AqTO.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./linear-progress-VpC6qUWa.js";import"./with-element-internals-BVdcaC_W.js";import"./a11y-utils-CUlOUJ7O.js";import"./list-CtFWDf9k.js";import"./list-item-Bra_7jX-.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-Y1FZSPuC.js";import"./focus-indicator-BeZvj0X5.js";import"./list-dropdown-aware-core-BezJRemX.js";import"./list-dropdown-DS4nWXyq.js";import"./event-utils-C1SDeUaq.js";import"./popover-BqWv_wJF.js";import"./overlay-DFZfpbSi.js";import"./with-longpress-listener--49psJKK.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-BnMa3F30.js";import"./a11y-BxM9_46k.js";import"./text-field-DpRJB-zB.js";import"./base-field-B2hMeS19.js";import"./label-BIsRcMc6.js";import"./button-constants-Dh8wxsDb.js";import"./button-toggle-group-constants-D7W2mml0.js";import"./checkbox-constants-BwznIeqL.js";import"./icon-button-constants-wbi3a2tN.js";import"./switch-constants-CzmANmsv.js";import"./with-label-aware-BdoJiGXC.js";import"./icon-button-IKvoqhNZ.js";import"./class-map-Bpya0c63.js";import"./base-button-D-ov5xND.js";import"./state-BHyQhtXL.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./tooltip-C0ic2qYj.js";import"./chip-set-C3aByb5u.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:l}),`
`,e.jsx(a,{}),`
`,e.jsx(i.p,{children:"Chip fields are a specialized variant of text field that allows users to input multiple values in a single field and represent them as chips."}),`
`,e.jsx(o,{of:m}),`
`,e.jsx(i.h2,{id:"deprecation-notice",children:"Deprecation Notice"}),`
`,e.jsxs(i.p,{children:["The ",e.jsx(i.code,{children:"<forge-chip-field>"})," component is deprecated and will be removed in a future release. Existing components such as ",e.jsx(i.code,{children:"<forge-text-field>"}),` and
`,e.jsx(i.code,{children:"<forge-select>"})," will be able to be used to create similar functionality which removes the current need for this specialized component."]}),`
`,e.jsx(i.h2,{id:"with-autocomplete",children:"With Autocomplete"}),`
`,e.jsx(i.p,{children:"It is common to use an autocomplete component with a chip field to provide suggestions to the user as they type."}),`
`,e.jsx(o,{of:d}),`
`,e.jsx(i.h2,{id:"api",children:"API"}),`
`,e.jsx(p,{}),`
`,e.jsx(i.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Add an ",e.jsx(i.code,{children:"id"})," to your ",e.jsx(i.code,{children:"<input>"})," element and bind it to your ",e.jsx(i.code,{children:"<label>"})," element using the for attribute on the ",e.jsx(i.code,{children:"<label>"}),"."]}),`
`,e.jsxs(i.li,{children:["Ensure that the chips that are added to the field have descriptive ",e.jsx(i.code,{children:"aria-label"})," or ",e.jsx(i.code,{children:"aria-labelledby"})," attributes."]}),`
`,e.jsxs(i.li,{children:["Make sure that the member chips that are added can be accessed via the keyboard left and right arrows.",`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"There should be a distinct visual cue that indicates which chip is focused"}),`
`]}),`
`]}),`
`,e.jsx(i.li,{children:"Similarly, make sure that when a chip is focused using the arrow keys, that the backspace and delete keys do remove them."}),`
`,e.jsx(i.li,{children:"Ensure that when disabled, the entire field as well as the member chips all appear visually and interactively disabled."}),`
`]})]})}function fe(t={}){const{wrapper:i}={...s(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{fe as default};
