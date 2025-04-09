import{j as e,M as s,T as a,C as o}from"./index-OukP47iL.js";import{useMDXComponents as n}from"./index-Ck7gG3J8.js";import{C as l}from"./CustomArgTypes-D-ao3rJS.js";import{C as p,D as d,W as c}from"./ChipField.stories-naOLdNwz.js";import"./iframe-BPbU5xgl.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CfOrKyLd.js";import"./index-DrFu-skq.js";import"./utils-wd6cBJ9K.js";import"./lit-element-CYrSCkDY.js";import"./lit-html-CuBe1DX_.js";import"./style-map-CeP1Mntv.js";import"./directive-CJw_OlP2.js";import"./index-B-lxVbXh.js";import"./v4-CtRu48qb.js";import"./ref-BHdy32Cl.js";import"./directive-helpers-CJ-qmK0k.js";import"./feature-detection-CY6TVbRZ.js";import"./autocomplete-C5konVRW.js";import"./constants-D2tqnpVB.js";import"./base-adapter-BD6-QDkX.js";import"./index-RsKXMDm2.js";import"./divider-Cb0KSfcl.js";import"./icon-D5yjdXv8.js";import"./index-CiLSBptl.js";import"./linear-progress-BTmLtQyy.js";import"./with-default-aria-DEjfFCHL.js";import"./a11y-utils-DGb1vALN.js";import"./list-iazF_xUO.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-sxQMIn2c.js";import"./utils-CRxrUqQD.js";import"./focus-indicator-NbLDNrYT.js";import"./list-dropdown-aware-core-ks7JdSLA.js";import"./list-dropdown-D8DM3eri.js";import"./event-utils-C1SDeUaq.js";import"./popover-CwjND5aw.js";import"./overlay-8j8D8Fh1.js";import"./with-longpress-listener-DC7alanv.js";import"./dismissible-stack-BOibH_v8.js";import"./skeleton-DtUhqb6H.js";import"./a11y-BxM9_46k.js";import"./text-field-BwqsFKuZ.js";import"./base-field-clkE_wGg.js";import"./label-BYO0DIp3.js";import"./button-CutPPNni.js";import"./base-button-adapter-cyf2Ayfh.js";import"./with-label-aware-DMDMR_5T.js";import"./button-toggle-group-C9JpSiFv.js";import"./with-form-associated-6r37SwZj.js";import"./checkbox-DwEe44-q.js";import"./icon-button-4fx-LScl.js";import"./switch-Clw9p9oC.js";import"./tooltip-BgQLBWUo.js";import"./chip-set-DKdHKrJ0.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
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
`]})]})}function he(t={}){const{wrapper:i}={...n(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{he as default};
