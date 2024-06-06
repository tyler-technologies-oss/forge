import{j as e}from"./jsx-runtime-DLKj12b8.js";import{u as s}from"./index-C5iMOghs.js";import{M as r,T as l,C as i}from"./index-oI8cfa7R.js";import{C as a}from"./CustomArgTypes-DmNi1XaC.js";import{F as d,D as p,S as c}from"./Field.stories-r5wmrn3Y.js";import"./iframe-BmWlDcXA.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./utils-CpphmWLJ.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./style-map-D0ILlpbs.js";import"./directive-CF8sV3Lr.js";import"./ref-BorTy8X1.js";import"./directive-helpers-DYUueT8w.js";import"./constants-BMnwgo1j.js";import"./base-field-Db0ByNro.js";import"./base-adapter-CfNZnrSk.js";import"./index-Dh0vMUMR.js";import"./focus-indicator-WHVXAnYX.js";import"./label-Ba8gSJXo.js";import"./button-DKp5JmaL.js";import"./icon-Sxf3JEPH.js";import"./state-layer-DfBT0h4a.js";import"./base-button-adapter-B2nnRd5H.js";import"./index-BhA1MhXR.js";import"./with-label-aware-DCBgJY4W.js";import"./with-default-aria-ll7Wjkii.js";import"./event-utils-DC3JW7a-.js";import"./button-toggle-group-CUV8xQR0.js";import"./with-form-associated-D8xT5_00.js";import"./checkbox-BnMMH_z2.js";import"./icon-button-VlM_yzEM.js";import"./switch-CvJdSirX.js";import"./decorators-B79PnA5z.js";function n(o){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...s(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
`,e.jsx(l,{}),`
`,e.jsx(t.p,{children:`The field component is a low-level building block component that provides a consistent way to render form fields. It handles the visual design of the field, but makes
no assumptions about the type of field being rendered. This allows the field component to be used for a wide variety of form fields that need to inherit from the same
base-level styles and functionality.`}),`
`,e.jsx(t.p,{children:`The field component does not require that there be a focusable element inside of it. This allows the field component to be used for fields that do not require user input,
or for fields that are part of a larger component that handles user input. This makes the field component a flexible building block that can be used in a wide variety of
situations.`}),`
`,e.jsxs(t.p,{children:["The following components use the ",e.jsx(t.code,{children:"<forge-field>"})," internally:"]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"?path=/docs/components-text-field--docs",children:"Text Field"})}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"?path=/docs/components-select--docs",children:"Select"})}),`
`]}),`
`,e.jsxs(t.p,{children:["These components expose similar APIs that are passed down to the ",e.jsx(t.code,{children:"<forge-field>"})," component."]}),`
`,e.jsx(i,{of:p}),`
`,e.jsx(t.h2,{id:"static",children:"Static"}),`
`,e.jsx(t.p,{children:`While fields are typically building blocks as part of larger components, the following example shows that fields do not require a focusable element to operate properly.
This example is just some static HTML that is not focusable, but still uses the field component to provide consistent styling.`}),`
`,e.jsx(i,{of:c}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:["When not using an ",e.jsx(t.code,{children:"<input>"})," or ",e.jsx(t.code,{children:"<textarea>"})," element, you will need to provide an ",e.jsx(t.code,{children:"data-forge-field-input"}),' attribute on the element that is intended to be the "input" element.']}),`
`]}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(a,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(t.p,{children:`The field does not provide any semantics for assistive technologies. If you are using the field component for a form field that requires user input, you should ensure
that the field has the appropriate ARIA attributes to provide context to screen readers and other assistive technologies.`})]})}function Y(o={}){const{wrapper:t}={...s(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{Y as default};
