import{u as s,j as e,M as n,T as a,C as o}from"./blocks-E4gpEJfL.js";import{C as p}from"./CustomArgTypes-DgUz6Ldw.js";import{C as l,D as m,W as d}from"./ChipField.stories-BAgbrdv0.js";import"./preload-helper-PPVm8Dsz.js";import"./index-IrKx-O5b.js";import"./iframe-DwkZy6ch.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-CElmhe9Y.js";import"./style-map-dMaxBFya.js";import"./directive-CwRn8Fwj.js";import"./ref-DsgzdCps.js";import"./base-lit-element-BSRdSawL.js";import"./service-adapter-DlT-lJx7.js";import"./autocomplete-Xjgqcxaa.js";import"./base-component-DokdPcmx.js";import"./base-adapter-C2s8cO2K.js";import"./dom-utils-D38acdAW.js";import"./tyler-icons-9EkLoMUE.js";import"./property-CyiWKBF8.js";import"./constants-DVKvft47.js";import"./feature-detection-Cdqsoz5C.js";import"./divider-71N8vs5P.js";import"./utils-DU-9AqTO.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./linear-progress-VpC6qUWa.js";import"./with-element-internals-BVdcaC_W.js";import"./a11y-utils-CUlOUJ7O.js";import"./list-Bduf0Zil.js";import"./list-item-CIx9kMCC.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-Y1FZSPuC.js";import"./focus-indicator-BtaUH7my.js";import"./list-dropdown-aware-core-D5nJckkR.js";import"./list-dropdown-BX8ibYcR.js";import"./event-utils-C1SDeUaq.js";import"./popover-C4YB0wev.js";import"./overlay-B-1J0zGL.js";import"./with-longpress-listener--49psJKK.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-Bcd9Y6-A.js";import"./a11y-BxM9_46k.js";import"./text-field-CV-bF5Ih.js";import"./base-field-5Se0asf2.js";import"./label-70FYznpm.js";import"./button-constants-Dh8wxsDb.js";import"./button-toggle-group-constants-D7W2mml0.js";import"./checkbox-constants-BwznIeqL.js";import"./icon-button-constants-wbi3a2tN.js";import"./switch-constants-CzmANmsv.js";import"./with-label-aware-BdoJiGXC.js";import"./icon-button-DXyGa-P5.js";import"./class-map-D8QunlD9.js";import"./base-button-C2o0mhk4.js";import"./state-GGzIQG5X.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./tooltip-DOmotIMW.js";import"./chip-set-CEQkdvSk.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:l}),`
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
