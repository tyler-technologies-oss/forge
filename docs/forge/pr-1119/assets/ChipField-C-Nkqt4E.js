import{j as e,M as s,T as a,C as o}from"./blocks-BNH9X2U8.js";import{useMDXComponents as n}from"./index-Dl0uxpiD.js";import{C as l}from"./CustomArgTypes-B4a5MbgY.js";import{C as p,D as d,W as c}from"./ChipField.stories-ekKVM8u5.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-E0MPjD_W.js";import"./utils-Ckg8JNDy.js";import"./style-map-BrTEt72J.js";import"./directive-jorct-Oe.js";import"./ref-BjtXvWqs.js";import"./base-lit-element-CWFcJNg5.js";import"./service-adapter-8tADcN_b.js";import"./autocomplete-C78MoyRJ.js";import"./base-component-CO2WY6zR.js";import"./dom-utils-DwwuHIHk.js";import"./utils-BAu2K3HG.js";import"./base-adapter-D5-g7qkF.js";import"./tyler-icons-hEV9SdRe.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./divider-DKHUvd_w.js";import"./utils-DU-9AqTO.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./linear-progress-C9rKJPwB.js";import"./with-default-aria-DAVgwKPN.js";import"./a11y-utils-DMBxzGbw.js";import"./list-Dokiv61p.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-D0SSeJ16.js";import"./focus-indicator-DAaQEzxM.js";import"./list-dropdown-aware-core-CHPLPV7r.js";import"./list-dropdown-B8WTLUmr.js";import"./event-utils-C1SDeUaq.js";import"./popover-BCVIx3D1.js";import"./overlay-Cgb5IAlb.js";import"./with-longpress-listener-DAWyVdEW.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-7bCDpj6R.js";import"./a11y-BxM9_46k.js";import"./text-field-BiRJUbiq.js";import"./base-field-OixKx3fo.js";import"./label-6rc0QyL9.js";import"./button-BZE1KUUl.js";import"./base-button-core-C3U0EfST.js";import"./with-label-aware-BQywrHZk.js";import"./button-toggle-group-DKUgvTLL.js";import"./with-form-associated-CEg80Bzz.js";import"./checkbox-GJD21Guw.js";import"./icon-button-Bc6oVsA8.js";import"./switch-ByEDesx_.js";import"./tooltip-P-CrpSEv.js";import"./chip-set-Bv8rx2wD.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
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
