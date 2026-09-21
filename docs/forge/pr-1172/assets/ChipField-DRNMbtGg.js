import{u as s,j as e,M as n,T as a,C as o}from"./blocks-qYGqEfe4.js";import{C as p}from"./CustomArgTypes-DPtrc7ix.js";import{C as l,D as m,W as d}from"./ChipField.stories-FQ7cqegM.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DBk9oFP9.js";import"./iframe-BQuUdi9A.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-CElmhe9Y.js";import"./style-map-DZMzP31B.js";import"./directive-CwRn8Fwj.js";import"./ref-Bchl8AcG.js";import"./base-lit-element-CB0pz4XF.js";import"./service-adapter-DlT-lJx7.js";import"./autocomplete-BJ_VtbTx.js";import"./base-component-DokdPcmx.js";import"./base-adapter-C2s8cO2K.js";import"./dom-utils-D38acdAW.js";import"./tyler-icons--haAADqW.js";import"./property-DJvCC0I6.js";import"./constants-DVKvft47.js";import"./feature-detection-Cdqsoz5C.js";import"./divider-BoT5wEQw.js";import"./utils-DU-9AqTO.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./linear-progress-VpC6qUWa.js";import"./with-element-internals-BVdcaC_W.js";import"./a11y-utils-CUlOUJ7O.js";import"./list-DJY0Qsvo.js";import"./list-item-ByLOjRzX.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-Y1FZSPuC.js";import"./focus-indicator--VpOaZ6F.js";import"./list-dropdown-aware-core-Sa8fC1Pu.js";import"./list-dropdown-ByAkRjvi.js";import"./event-utils-C1SDeUaq.js";import"./popover-C49q6_k0.js";import"./overlay-DlXgJPae.js";import"./with-longpress-listener--49psJKK.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-BnhVRD4Y.js";import"./a11y-BxM9_46k.js";import"./text-field-CZ4Y4cDf.js";import"./base-field-U1vI4X4O.js";import"./label-BnmMXl01.js";import"./button-constants-Dh8wxsDb.js";import"./button-toggle-group-constants-D7W2mml0.js";import"./checkbox-constants-BwznIeqL.js";import"./icon-button-constants-wbi3a2tN.js";import"./switch-constants-CzmANmsv.js";import"./with-label-aware-BdoJiGXC.js";import"./icon-button-CqF7oM9r.js";import"./class-map-DAzR423m.js";import"./base-button-D04UaXVg.js";import"./state-CFsUyUp-.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./tooltip-Dq2Q0xN1.js";import"./chip-set-SskbQuYZ.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:l}),`
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
