import{u as s,j as e,M as n,T as a,C as o}from"./blocks-CAk1fwBh.js";import{C as l}from"./CustomArgTypes-DcEx43eH.js";import{C as p,D as d,W as c}from"./ChipField.stories-9AK6_zpX.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-IbY4Oy7g.js";import"./utils-D5x2rMta.js";import"./style-map-CgF03eRt.js";import"./directive-CwRn8Fwj.js";import"./ref-BXzTffM2.js";import"./base-lit-element-72BcCZ33.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-13zwuh6n.js";import"./base-component-DdGiO9ZD.js";import"./utils-CjYv_z18.js";import"./dom-utils-D0uG6d5z.js";import"./base-adapter-CbRstNNQ.js";import"./tyler-icons-D3PVExpf.js";import"./constants-scFqwPpP.js";import"./feature-detection-CvbR5w2Z.js";import"./divider-DU8cgQqr.js";import"./utils-DU-9AqTO.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./linear-progress-Bb0VsHdX.js";import"./with-default-aria-Bs3XhyPE.js";import"./a11y-utils-BtLz16ul.js";import"./list-BEvrgVXU.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-BjPyszbg.js";import"./focus-indicator-em7j0z3w.js";import"./list-dropdown-aware-core-CoohvUa9.js";import"./list-dropdown-Dpjmnj52.js";import"./event-utils-C1SDeUaq.js";import"./popover-BG4-Pyu8.js";import"./overlay-BRsNG1-Q.js";import"./with-longpress-listener-5SwIGzn_.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-Bv38rDCU.js";import"./a11y-BxM9_46k.js";import"./text-field-DjKMWryZ.js";import"./base-field-B8M5Rbwm.js";import"./label-CFO2X73D.js";import"./button-BUCVRh9N.js";import"./base-button-D9exLd2Y.js";import"./state-CDDB_06w.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./class-map-3CuaVSER.js";import"./button-toggle-group-BdfvY4f-.js";import"./with-label-aware-Cv_TQB0N.js";import"./checkbox-BWQKNjit.js";import"./icon-button-CW3AgSAX.js";import"./switch-BHLx_rJf.js";import"./tooltip-BIhv8P-N.js";import"./chip-set-B0aWveDe.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:p}),`
`,e.jsx(a,{}),`
`,e.jsx(i.p,{children:"Chip fields are a specialized variant of text field that allows users to input multiple values in a single field and represent them as chips."}),`
`,e.jsx(o,{of:d}),`
`,e.jsx(i.h2,{id:"deprecation-notice",children:"Deprecation Notice"}),`
`,e.jsxs(i.p,{children:["The ",e.jsx(i.code,{children:"<forge-chip-field>"})," component is deprecated and will be removed in a future release. Existing components such as ",e.jsx(i.code,{children:"<forge-text-field>"}),` and
`,e.jsx(i.code,{children:"<forge-select>"})," will be able to be used to create similar functionality which removes the current need for this specialized component."]}),`
`,e.jsx(i.h2,{id:"with-autocomplete",children:"With Autocomplete"}),`
`,e.jsx(i.p,{children:"It is common to use an autocomplete component with a chip field to provide suggestions to the user as they type."}),`
`,e.jsx(o,{of:c}),`
`,e.jsx(i.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
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
`]})]})}function ue(t={}){const{wrapper:i}={...s(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{ue as default};
