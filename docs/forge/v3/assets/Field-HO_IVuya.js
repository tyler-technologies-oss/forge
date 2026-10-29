import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnLnh7by.js";import{n as c,t as l}from"./CustomArgTypes-DS7Rl0eI.js";import{n as u,t as d}from"./CssOnlyInformation-LNVWbV40.js";import{a as f,i as p,n as m,r as h,t as g}from"./Field.stories-DtoiAFcg.js";function _(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(s,{of:h}),`
`,(0,y.jsx)(o,{}),`
`,(0,y.jsx)(n.p,{children:`The field component is a low-level building block component that provides a consistent way to render form fields. It handles the visual design of the field, but makes
no assumptions about the type of field being rendered. This allows the field component to be used for a wide variety of form fields that need to inherit from the same
base-level styles and functionality.`}),`
`,(0,y.jsx)(n.p,{children:`The field component does not require that there be a focusable element inside of it. This allows the field component to be used for fields that do not require user input,
or for fields that are part of a larger component that handles user input. This makes the field component a flexible building block that can be used in a wide variety of
situations.`}),`
`,(0,y.jsxs)(n.p,{children:[`The following components use the `,(0,y.jsx)(n.code,{children:`<forge-field>`}),` internally:`]}),`
`,(0,y.jsxs)(n.ul,{children:[`
`,(0,y.jsx)(n.li,{children:(0,y.jsx)(n.a,{href:`?path=/docs/components-text-field--docs`,children:`Text Field`})}),`
`,(0,y.jsx)(n.li,{children:(0,y.jsx)(n.a,{href:`?path=/docs/components-select--docs`,children:`Select`})}),`
`]}),`
`,(0,y.jsxs)(n.p,{children:[`These components expose similar APIs that are passed down to the `,(0,y.jsx)(n.code,{children:`<forge-field>`}),` component.`]}),`
`,(0,y.jsx)(a,{of:m}),`
`,(0,y.jsx)(n.h2,{id:`static`,children:`Static`}),`
`,(0,y.jsx)(n.p,{children:`While fields are typically building blocks as part of larger components, the following example shows that fields do not require a focusable element to operate properly.
This example is just some static HTML that is not focusable, but still uses the field component to provide consistent styling.`}),`
`,(0,y.jsx)(a,{of:p}),`
`,(0,y.jsxs)(n.blockquote,{children:[`
`,(0,y.jsxs)(n.p,{children:[`When not using an `,(0,y.jsx)(n.code,{children:`<input>`}),` or `,(0,y.jsx)(n.code,{children:`<textarea>`}),` element, you will need to provide an `,(0,y.jsx)(n.code,{children:`data-forge-field-input`}),` attribute on the element that is intended to be the "input" element.`]}),`
`]}),`
`,(0,y.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,y.jsx)(l,{}),`
`,(0,y.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,y.jsx)(n.p,{children:`The field does not provide any semantics for assistive technologies. If you are using the field component for a form field that requires user input, you should ensure
that the field has the appropriate ARIA attributes to provide context to screen readers and other assistive technologies.`}),`
`,(0,y.jsx)(n.h2,{id:`css-only`,children:`CSS-Only`}),`
`,(0,y.jsx)(n.p,{children:`The field component is also available as a CSS-only component without the need for JavaScript.`}),`
`,(0,y.jsx)(a,{of:g}),`
`,(0,y.jsx)(n.h3,{id:`inset-label`,children:`Inset Label`}),`
`,(0,y.jsxs)(n.p,{children:[`If you're using the "inset" variant of the field (nesting a `,(0,y.jsx)(n.code,{children:`<label>`}),` within), you will need to use JavaScript to control when the label floats and if you want it to animate,
there are a few classes that you can toggle to achieve this effect properly.`]}),`
`,(0,y.jsx)(n.pre,{children:(0,y.jsx)(n.code,{className:`language-js`,children:`const field = document.querySelector('.forge-field');

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
`,(0,y.jsx)(d,{})]})}function v(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,y.jsx)(n,{...e,children:(0,y.jsx)(_,{...e})}):_(e)}var y;function b(){return(b=e((()=>{y=r(),n(),i(),c(),u(),f()})))()}b();export{v as default};