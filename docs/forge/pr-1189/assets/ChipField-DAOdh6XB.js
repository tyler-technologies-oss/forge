import{u as s,j as e,M as n,T as a,C as o}from"./blocks-sp9-iCm8.js";import{C as l}from"./CustomArgTypes-BHl2KbKq.js";import{C as p,D as d,W as c}from"./ChipField.stories-BT1Vmf4J.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-D3Oii2TL.js";import"./utils-B3jYbaiS.js";import"./style-map-CFX20BJT.js";import"./directive-CwRn8Fwj.js";import"./ref-DaR0hzE-.js";import"./base-lit-element-BK03A-go.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-Dg-mRnz_.js";import"./base-component-CYrqcnEP.js";import"./dom-utils-D0uG6d5z.js";import"./utils-CjYv_z18.js";import"./base-adapter-Dc6xHI12.js";import"./tyler-icons-CWFKOemj.js";import"./constants-NJSwOtlj.js";import"./feature-detection-3Hxzrcpn.js";import"./divider-H-88T8WR.js";import"./utils-DxVSXevv.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./linear-progress-DLb8lZjg.js";import"./with-default-aria-DCkoNhES.js";import"./a11y-utils-DQoauvDo.js";import"./list-BRTZHC4C.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-RJ83GVyt.js";import"./focus-indicator-BZl6qRLK.js";import"./list-dropdown-aware-core-CV1tbzhf.js";import"./list-dropdown-D4vE1vgw.js";import"./event-utils-C1SDeUaq.js";import"./popover-88j80EOP.js";import"./overlay-yYpcIpns.js";import"./with-longpress-listener-CBo4eBdm.js";import"./dismissible-stack-Cj5gwv2p.js";import"./skeleton-DYD8m2j0.js";import"./a11y-BxM9_46k.js";import"./text-field-CYnraT90.js";import"./base-field-CR_hTikp.js";import"./label-DTIviHOl.js";import"./button-CSCDv7wg.js";import"./base-button-core-CxgPNbXx.js";import"./with-label-aware-BNvgDdSc.js";import"./button-toggle-group-CZruN2gd.js";import"./with-form-associated-BgOjsLAv.js";import"./checkbox-DU0EpUEb.js";import"./icon-button-C1Zmz9J7.js";import"./switch-Cw2nKkSw.js";import"./tooltip-DeV8GtrX.js";import"./chip-set-NK8Ojnhm.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:p}),`
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
`]})]})}function ce(t={}){const{wrapper:i}={...s(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{ce as default};
