import{j as e,M as l,T as a,C as o}from"./blocks-BInB3pzw.js";import{useMDXComponents as s}from"./index-C5Jr0B1O.js";import{C as r}from"./CustomArgTypes-C0OhTjJE.js";import{C as d}from"./CssOnlyInformation-Cn8Mdsmu.js";import{F as c,D as h,S as p,C as f}from"./Field.stories-D7xcoXFV.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BlOFKJDS.js";import"./utils-DUpaJ7b_.js";import"./style-map-CoXBBqwT.js";import"./directive-jorct-Oe.js";import"./class-map-CB8bWQ6X.js";import"./ref-DXTbTzis.js";import"./decorators-CToESfsl.js";import"./service-adapter-8tADcN_b.js";import"./base-field-ByG2tr7F.js";import"./base-component-CgTc0tMd.js";import"./feature-detection-CiXpQaRQ.js";import"./base-adapter-Dd2Rwp6N.js";import"./index-DTwfV0k0.js";import"./focus-indicator-DF2HrkuM.js";import"./property-ntTuo9C3.js";import"./base-lit-element-Domadsr2.js";import"./utils-DU-9AqTO.js";import"./label-PBJgWwVx.js";import"./button-CrEyna-l.js";import"./tyler-icons-DG1d6qey.js";import"./state-layer-D_bEeiyc.js";import"./base-button-core-B2TvOgT4.js";import"./with-label-aware-UxVhxMHx.js";import"./with-default-aria-BEow76us.js";import"./a11y-utils-Byu3IW8S.js";import"./button-toggle-group-CSYMjEX6.js";import"./with-form-associated-BeCnrgxY.js";import"./checkbox-D6KNXaeb.js";import"./icon-button-CBB1Wyv0.js";import"./switch-DfOCriK_.js";function i(n){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...s(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:c}),`
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
`,e.jsx(d,{})]})}function Y(n={}){const{wrapper:t}={...s(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{Y as default};
