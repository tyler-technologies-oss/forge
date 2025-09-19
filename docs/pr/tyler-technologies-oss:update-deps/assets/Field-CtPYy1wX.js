import{j as e,M as l,T as a,C as o}from"./blocks-C3gDyZIu.js";import{useMDXComponents as s}from"./index-CqaAC5S2.js";import{C as r}from"./CustomArgTypes-CNLaeSI0.js";import{C as d}from"./CssOnlyInformation-CCg5j7el.js";import{F as c,D as h,S as p,C as f}from"./Field.stories-CkcslDYj.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BciiVb0K.js";import"./utils-D7XrLKwY.js";import"./style-map-Djxu7jNR.js";import"./directive-CJw_OlP2.js";import"./class-map-BifhVgB1.js";import"./ref-D3ww8A08.js";import"./decorators-Bjcxn9ch.js";import"./feature-detection-BwPJgXni.js";import"./base-field-DVdLvhJA.js";import"./constants-y3-o2nLB.js";import"./base-adapter-BB1UtCX3.js";import"./index-5CPwzmQS.js";import"./focus-indicator-B9KMEBVK.js";import"./utils-BtvMddIW.js";import"./label-73doN4RE.js";import"./button-Bjtey6FZ.js";import"./icon-FzRol6Tl.js";import"./state-layer-CLjAHnoF.js";import"./base-button-adapter-tGikGtMQ.js";import"./with-label-aware-DXzk0r0A.js";import"./with-default-aria-BtzFnMjW.js";import"./a11y-utils-Dbhjrk0x.js";import"./button-toggle-group-C96H3ppB.js";import"./with-form-associated-pDihgILf.js";import"./checkbox-DYAJ7rMi.js";import"./icon-button-DpLi6_yQ.js";import"./switch-WjqoziFM.js";function i(n){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:c}),`
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
`,e.jsx(o,{of:h}),`
`,e.jsx(t.h2,{id:"static",children:"Static"}),`
`,e.jsx(t.p,{children:`While fields are typically building blocks as part of larger components, the following example shows that fields do not require a focusable element to operate properly.
This example is just some static HTML that is not focusable, but still uses the field component to provide consistent styling.`}),`
`,e.jsx(o,{of:p}),`
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
`,e.jsx(o,{of:f}),`
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
`,e.jsx(d,{})]})}function K(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{K as default};
