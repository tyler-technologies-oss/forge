import{j as e,M as s,T as a,C as o}from"./blocks-nyaWQ-RQ.js";import{useMDXComponents as n}from"./index-C_55wpGi.js";import{C as l}from"./CustomArgTypes-C6R8pJn9.js";import{C as p,D as d,W as c}from"./ChipField.stories-bmqTw4L-.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-D2F8ddPp.js";import"./utils-CaFArwHh.js";import"./style-map-BHBHrmZj.js";import"./directive-jorct-Oe.js";import"./ref-ByAXB3ad.js";import"./base-lit-element-DDoWFVVc.js";import"./service-adapter-CoGDs2_3.js";import"./autocomplete-77pTBP6Z.js";import"./base-component-DtuZ_bHQ.js";import"./dom-utils-DBb1ZGPZ.js";import"./base-adapter-CrwPj14V.js";import"./tyler-icons-DJO2-615.js";import"./index-DTwfV0k0.js";import"./constants-d60dfpEV.js";import"./feature-detection-DlorGArm.js";import"./divider-BOT00mm5.js";import"./property-CpeuzGQ1.js";import"./utils-DU-9AqTO.js";import"./linear-progress-CdLostcG.js";import"./with-default-aria-BAoBQKAE.js";import"./a11y-utils-BcRiVt5E.js";import"./list-DVfDXOhi.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-n7PzpGlA.js";import"./focus-indicator-DNMqWSN9.js";import"./list-dropdown-aware-core-Wy49Fecp.js";import"./list-dropdown-B8nWrE9G.js";import"./event-utils-C1SDeUaq.js";import"./popover-Duzv0w_S.js";import"./overlay-CCoxAUi3.js";import"./with-longpress-listener-v9rKrqen.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-pRzfknAa.js";import"./a11y-BxM9_46k.js";import"./text-field-CZfSXzlS.js";import"./base-field-CH6M7Lgn.js";import"./label-_xs-7jyt.js";import"./button-ScZHNhmd.js";import"./base-button-core-Cf1tVMyV.js";import"./with-label-aware-DpjVJhjv.js";import"./button-toggle-group-UnijSpLZ.js";import"./with-form-associated-CILBPDg5.js";import"./checkbox-ih6Xuka0.js";import"./icon-button-ANdY-9Dh.js";import"./switch-C4s55zFO.js";import"./tooltip-YGYKYR3E.js";import"./chip-set-CkEHpP0q.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...n(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:p}),`
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
`]})]})}function ce(t={}){const{wrapper:i}={...n(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{ce as default};
