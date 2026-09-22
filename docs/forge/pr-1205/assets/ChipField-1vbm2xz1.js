import{u as s,j as e,M as n,T as p,C as o}from"./blocks-ZCF8jAuh.js";import{C as a}from"./CustomArgTypes-BrNnIXPT.js";import{C as l,D as m,W as d}from"./ChipField.stories-CrS3tiVV.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DAoAvB82.js";import"./iframe-CGF9490j.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-cbnKSSEt.js";import"./style-map-cEBdjqsX.js";import"./directive-CwRn8Fwj.js";import"./ref-9RqS8T1P.js";import"./base-lit-element-BzArp5lX.js";import"./service-adapter-DlT-lJx7.js";import"./autocomplete-f3l_Be1N.js";import"./base-component-DokdPcmx.js";import"./base-adapter-C2s8cO2K.js";import"./dom-utils-D38acdAW.js";import"./tyler-icons-CM84cyec.js";import"./property-h_NQN_ax.js";import"./constants-Ds-UekRh.js";import"./feature-detection-Cxj81Y1H.js";import"./divider-BzjCc6TM.js";import"./utils-DU-9AqTO.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./linear-progress-Du-Ntegu.js";import"./with-element-internals-CJt7fDtX.js";import"./a11y-utils-a04gn1ZN.js";import"./list-EiOoI77I.js";import"./list-item-BwYEQ33V.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-BcVD1OXH.js";import"./focus-indicator-BuzCXwAm.js";import"./list-dropdown-aware-core-DOTfNE_F.js";import"./list-dropdown-9b52ax4_.js";import"./event-utils-C1SDeUaq.js";import"./popover-CBkkBxnw.js";import"./overlay-iu-_ABPF.js";import"./with-longpress-listener-D-W76F-r.js";import"./dismissible-stack-xq-0Rg1q.js";import"./skeleton-ZvFpE85R.js";import"./a11y-BxM9_46k.js";import"./text-field-V39Mt-6S.js";import"./base-field-D8CxI0Jj.js";import"./label-CtoUkODo.js";import"./button-constants-D5k34xES.js";import"./button-toggle-group-constants-lDTvG_dF.js";import"./checkbox-constants-BbWb-R-a.js";import"./icon-button-constants-BJvh1yHL.js";import"./switch-constants-DiyC_PIB.js";import"./with-label-aware-BP3asw-P.js";import"./icon-button-D1wmfd79.js";import"./class-map-C-Xl3VxB.js";import"./base-button-BJYE3STx.js";import"./state-CvgusLtP.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./tooltip-u84XDAZH.js";import"./chip-set-DRKXmCcP.js";function r(t){const i={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(n,{of:l}),`
`,e.jsx(p,{}),`
`,e.jsx(i.p,{children:"Chip fields are a specialized variant of text field that allows users to input multiple values in a single field and represent them as chips."}),`
`,e.jsx(o,{of:m}),`
`,e.jsx(i.h2,{id:"deprecation-notice",children:"Deprecation Notice"}),`
`,e.jsxs(i.p,{children:["The ",e.jsx(i.code,{children:"<forge-chip-field>"})," component is deprecated and will be removed in a future release. Existing components such as ",e.jsx(i.code,{children:"<forge-text-field>"}),` and
`,e.jsx(i.code,{children:"<forge-select>"})," will be able to be used to create similar functionality which removes the current need for this specialized component."]}),`
`,e.jsx(i.h2,{id:"with-autocomplete",children:"With Autocomplete"}),`
`,e.jsx(i.p,{children:"It is common to use an autocomplete component with a chip field to provide suggestions to the user as they type."}),`
`,e.jsx(o,{of:d}),`
`,e.jsx(i.h2,{id:"api",children:"API"}),`
`,e.jsx(a,{}),`
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
`]})]})}function be(t={}){const{wrapper:i}={...s(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(r,{...t})}):r(t)}export{be as default};
