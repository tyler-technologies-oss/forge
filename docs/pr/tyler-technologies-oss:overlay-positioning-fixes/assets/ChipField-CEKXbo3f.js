import{j as e,M as s,T as a,C as o}from"./index-6j5Q1nnn.js";import{useMDXComponents as n}from"./index-CeX0Z55m.js";import{C as l}from"./CustomArgTypes-TkLEkXiU.js";import{C as p,D as d,W as c}from"./ChipField.stories-CcqT3ubk.js";import"./iframe-Dfg8lbqD.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CfOrKyLd.js";import"./index-DrFu-skq.js";import"./utils-BoQ7h7ND.js";import"./lit-element-B3QVTycr.js";import"./lit-html-CuBe1DX_.js";import"./style-map-CeP1Mntv.js";import"./directive-CJw_OlP2.js";import"./index-B-lxVbXh.js";import"./v4-CtRu48qb.js";import"./ref-BHdy32Cl.js";import"./directive-helpers-CJ-qmK0k.js";import"./feature-detection-C61kIZu7.js";import"./autocomplete-B55Sh8Az.js";import"./constants-DHnR0122.js";import"./base-adapter-B_B1W7NX.js";import"./index-RsKXMDm2.js";import"./divider-B48YHESn.js";import"./icon-DNSPAaK0.js";import"./index-CiLSBptl.js";import"./linear-progress-Brg7kVg_.js";import"./with-default-aria-COlelyab.js";import"./a11y-utils-CCSbmmS7.js";import"./list-Bo9PHw-V.js";import"./state-layer-DA2sYK0k.js";import"./utils-DXGAA5XK.js";import"./focus-indicator-B_9E-jM6.js";import"./list-dropdown-aware-core-B_aDZT3d.js";import"./list-dropdown-BFUPvYLS.js";import"./event-utils-C1SDeUaq.js";import"./popover-Dh1-Do6h.js";import"./overlay-B56HkyOr.js";import"./with-longpress-listener-D4mCqU-o.js";import"./dismissible-stack-2hc7GWs9.js";import"./skeleton-Cfb12itF.js";import"./a11y-BxM9_46k.js";import"./text-field-BaC_G5Rf.js";import"./base-field-CbTrav_1.js";import"./label-BftBTwPr.js";import"./button-DOA_SM9C.js";import"./base-button-adapter-Diqkx89j.js";import"./with-label-aware-CbEUrhML.js";import"./button-toggle-group-JMDAjILZ.js";import"./with-form-associated-BgRoomBE.js";import"./checkbox-BwLNDz7l.js";import"./icon-button-BgvK8Gih.js";import"./switch-B2m0S8OE.js";import"./tooltip-C3leIcs0.js";import"./chip-set-BBO0Yo0Z.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
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
`]})]})}function me(t={}){const{wrapper:i}={...n(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{me as default};
