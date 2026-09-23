import{u as s,j as e,M as n,T as a,C as o}from"./blocks-fUy4QAFv.js";import{C as p}from"./CustomArgTypes-CagqRkLp.js";import{C as l,D as m,W as d}from"./ChipField.stories-DGNx3kA1.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CtUy9-VI.js";import"./iframe-DhPPATOI.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-BUEgyQuR.js";import"./style-map-CcP_kdqL.js";import"./directive-CwRn8Fwj.js";import"./ref-BhDBbNSW.js";import"./base-lit-element-HaqO9pkv.js";import"./service-adapter-gy1PbA1l.js";import"./autocomplete-DKzqKby3.js";import"./base-component-RfQ5fKAq.js";import"./base-adapter-CdkfKU0P.js";import"./dom-utils-Dwl6Rho5.js";import"./icon-DaCKLlYs.js";import"./property-Dg1Vmfps.js";import"./constants-BPFI0b36.js";import"./feature-detection-Q4q-Y4Ic.js";import"./divider-DrBQytg-.js";import"./utils-DrKqfkBZ.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./linear-progress-BGu4ylYb.js";import"./with-element-internals-CFSngiIf.js";import"./a11y-utils-CbIWIoQU.js";import"./list-BQeID-EI.js";import"./list-item-Czcdb5bP.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-D75fz-rw.js";import"./focus-indicator-Cy6URCXv.js";import"./list-dropdown-aware-core-DFEHM-H2.js";import"./list-dropdown-D_9KJkm_.js";import"./event-utils-C1SDeUaq.js";import"./popover-B6Lyp91L.js";import"./overlay-DnA59UKB.js";import"./with-longpress-listener-D8NLSSJF.js";import"./dismissible-stack-Hc6LlN2C.js";import"./skeleton-D0Kw-TGm.js";import"./a11y-BxM9_46k.js";import"./text-field-BWtqe7xr.js";import"./base-field-Mwf4T1kF.js";import"./label-D4E_mm-6.js";import"./button-constants-G4LMDyUn.js";import"./button-toggle-group-constants-Dk2L7VtD.js";import"./checkbox-constants-CDXOwsBo.js";import"./icon-button-constants-CAk_t8Bl.js";import"./switch-constants-GNrCf0tQ.js";import"./with-label-aware-Bp1VGc65.js";import"./icon-button-C2v-Sinx.js";import"./class-map-CEQgffN4.js";import"./base-button-DXDc4OJ8.js";import"./state-Co1I3z7K.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./tooltip-BJ-I3FD9.js";import"./chip-set-DW8HxT5C.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:l}),`
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
