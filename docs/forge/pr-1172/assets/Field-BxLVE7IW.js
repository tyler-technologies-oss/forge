import{u as s,j as e,M as l,T as a,C as n}from"./blocks-CC57vY-r.js";import{C as r}from"./CustomArgTypes-CtZbDmHN.js";import{C as d}from"./CssOnlyInformation-DhqqmqNl.js";import{F as c,D as h,S as p,C as f}from"./Field.stories-eKyrc7lW.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-DVkCwayn.js";import"./utils-DdM9-TOU.js";import"./style-map-BF6zZzkZ.js";import"./directive-CwRn8Fwj.js";import"./class-map-3YYmKfcP.js";import"./ref-s-JXIu1k.js";import"./base-lit-element-CI1FM2mI.js";import"./decorators-D3I7OoUh.js";import"./service-adapter-8tADcN_b.js";import"./base-field-KxAV97UB.js";import"./base-component-CYrqcnEP.js";import"./dom-utils-D0uG6d5z.js";import"./utils-CjYv_z18.js";import"./base-adapter-Dc6xHI12.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./focus-indicator-DhDYsd3D.js";import"./utils-DU-9AqTO.js";import"./constants-D9XaGcQ2.js";import"./feature-detection-3Hxzrcpn.js";import"./label-CiukcC95.js";import"./button-CS24bbOS.js";import"./tyler-icons-Cgf0s-mg.js";import"./state-layer-DRsbBcDh.js";import"./base-button-Dm32-Z8k.js";import"./base-D5OLj3-A.js";import"./query-assigned-elements-BiZAc0aq.js";import"./a11y-utils-DQoauvDo.js";import"./button-toggle-group-DGFvxll2.js";import"./with-label-aware-Bt91rl8D.js";import"./with-default-aria-D57-4a2v.js";import"./checkbox-DGvqAXro.js";import"./icon-button-Bo2inTOg.js";import"./switch-B389hJLx.js";function i(o){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...s(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:c}),`
`,e.jsx(a,{}),`
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
`,e.jsx(n,{of:h}),`
`,e.jsx(t.h2,{id:"static",children:"Static"}),`
`,e.jsx(t.p,{children:`While fields are typically building blocks as part of larger components, the following example shows that fields do not require a focusable element to operate properly.
This example is just some static HTML that is not focusable, but still uses the field component to provide consistent styling.`}),`
`,e.jsx(n,{of:p}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:["When not using an ",e.jsx(t.code,{children:"<input>"})," or ",e.jsx(t.code,{children:"<textarea>"})," element, you will need to provide an ",e.jsx(t.code,{children:"data-forge-field-input"}),' attribute on the element that is intended to be the "input" element.']}),`
`]}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(r,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(t.p,{children:`The field does not provide any semantics for assistive technologies. If you are using the field component for a form field that requires user input, you should ensure
that the field has the appropriate ARIA attributes to provide context to screen readers and other assistive technologies.`}),`
`,e.jsx(t.h2,{id:"css-only",children:"CSS-Only"}),`
`,e.jsx(t.p,{children:"The field component is also available as a CSS-only component without the need for JavaScript."}),`
`,e.jsx(n,{of:f}),`
`,e.jsx(t.h3,{id:"inset-label",children:"Inset Label"}),`
`,e.jsxs(t.p,{children:[`If you're using the "inset" variant of the field (nesting a `,e.jsx(t.code,{children:"<label>"}),` within), you will need to use JavaScript to control when the label floats and if you want it to animate,
there are a few classes that you can toggle to achieve this effect properly.`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-js",children:`const field = document.querySelector('.forge-field');

// Respond to user input to control the floating label state
field.addEventListener('input', () => floatLabel());

// When the page first loads, float the label if the input has a value (without animation)
floatLabel({ animate: false });

function floatLabel({ animate = true } = {}) {
  const input = field.querySelector('input');
  const hasValue = !!input.value.length;

  field.classList.toggle('forge-field--float-label', hasValue);

  if (animate) {
    field.classList.toggle('forge-field--float-label-in', hasValue);
    field.classList.toggle('forge-field--float-label-out', !hasValue);
  }
}
`})}),`
`,e.jsx(d,{})]})}function ee(o={}){const{wrapper:t}={...s(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(i,{...o})}):i(o)}export{ee as default};
