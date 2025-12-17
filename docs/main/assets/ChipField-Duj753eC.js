import{j as e,M as s,T as a,C as o}from"./blocks-BRjydz1v.js";import{useMDXComponents as n}from"./index-DOQp6nz7.js";import{C as l}from"./CustomArgTypes-pEqklIRP.js";import{C as d,D as p,W as c}from"./ChipField.stories-DE4ZKxEC.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-TK8e1Aaz.js";import"./utils-f-9lfKsg.js";import"./style-map-Dgjp8MB5.js";import"./directive-CJw_OlP2.js";import"./ref-Ca_X5JZn.js";import"./service-adapter-CffG5Lhq.js";import"./autocomplete-4XhemIT9.js";import"./constants-DzQy6WDX.js";import"./feature-detection-B-sRDmdg.js";import"./base-adapter-C8aSF3nG.js";import"./icon-Uwxy940_.js";import"./index-DTwfV0k0.js";import"./divider-NNdF1g4c.js";import"./linear-progress-r0Hzg69v.js";import"./with-default-aria-6GN_uk1I.js";import"./a11y-utils-Dj08p-2z.js";import"./list-Ch6gYAwG.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-BEEsPoZf.js";import"./utils-Bd6MGx91.js";import"./focus-indicator-r6jPcSl0.js";import"./property-CA2ZGEDx.js";import"./base-lit-element-Dv4wfv4F.js";import"./list-dropdown-aware-core-DV5zJ_A0.js";import"./list-dropdown-BFaAihnM.js";import"./event-utils-C1SDeUaq.js";import"./popover-DE3KaoDh.js";import"./overlay-DbqVLn-W.js";import"./with-longpress-listener-DtGZwA0v.js";import"./dismissible-stack-TpzCxM2R.js";import"./skeleton-BSiuL_ME.js";import"./a11y-BxM9_46k.js";import"./text-field-PgyPT3Gh.js";import"./base-field-dZZd44V_.js";import"./label-BXAMiPO0.js";import"./button-D-_pvVZT.js";import"./base-button-adapter-BFdoOx4K.js";import"./with-label-aware-C7up74QW.js";import"./button-toggle-group-CG-Wgbj8.js";import"./with-form-associated-DNJXxTFO.js";import"./checkbox-eJQKgkD_.js";import"./icon-button-C7XbQQVi.js";import"./switch-DiIwmj43.js";import"./tooltip-KOXasit9.js";import"./chip-set-CRWUNY7s.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:d}),`
`,e.jsx(a,{}),`
`,e.jsx(i.p,{children:"Chip fields are a specialized variant of text field that allows users to input multiple values in a single field and represent them as chips."}),`
`,e.jsx(o,{of:p}),`
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
`]})]})}function de(t={}){const{wrapper:i}={...n(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{de as default};
