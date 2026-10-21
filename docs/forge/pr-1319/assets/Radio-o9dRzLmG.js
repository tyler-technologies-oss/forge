import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-92lRto7J.js";import{n as c,t as l}from"./CustomArgTypes-sQOLn0vT.js";import{n as u,t as d}from"./CssOnlyInformation-CIOb2lIJ.js";import{i as f,n as p,r as m,t as h}from"./Radio.stories-B_tOk3Z5.js";function g(e){let n={blockquote:`blockquote`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(s,{of:m}),`
`,(0,v.jsx)(o,{}),`
`,(0,v.jsx)(n.p,{children:`Radios are used when a user must select one option from a set of options. They are used when there are two or more options that are mutually exclusive and the user must select exactly one.`}),`
`,(0,v.jsx)(a,{of:p}),`
`,(0,v.jsx)(n.h2,{id:`grouping`,children:`Grouping`}),`
`,(0,v.jsxs)(n.p,{children:[`Radio buttons should be part of a radio group and interpreted as such by assistive technologies such as screen readers. By default, radios will form an implicit group
based on their `,(0,v.jsx)(n.code,{children:`name`}),` attribute. If you want to group radios explicitly you can either provide a `,(0,v.jsx)(n.code,{children:`role="radiogroup"`}),` attribute to an ancestor element, or use the
`,(0,v.jsx)(n.code,{children:`<forge-radio-group>`}),` element.`]}),`
`,(0,v.jsx)(n.h3,{id:`name`,children:`Name`}),`
`,(0,v.jsxs)(n.p,{children:[`This example shows how radios are grouped implicitly by their `,(0,v.jsx)(n.code,{children:`name`}),` attribute.`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-html`,children:`<forge-radio name="default">Option 1</forge-radio>
<forge-radio name="default">Option 2</forge-radio>
<forge-radio name="default">Option 3</forge-radio>
`})}),`
`,(0,v.jsx)(n.h3,{id:`role`,children:`Role`}),`
`,(0,v.jsxs)(n.p,{children:[`This example shows how radios are grouped explicitly by their `,(0,v.jsx)(n.code,{children:`name`}),` and the ancestor element's `,(0,v.jsx)(n.code,{children:`role="radiogroup"`}),` attribute to provide a label for the group.`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-html`,children:`<div role="radiogroup" aria-label="Choose a radio option">
  <forge-radio name="default">Option 1</forge-radio>
  <forge-radio name="default">Option 2</forge-radio>
  <forge-radio name="default">Option 3</forge-radio>
</div>
`})}),`
`,(0,v.jsx)(n.h3,{id:`radio-group`,children:`Radio Group`}),`
`,(0,v.jsxs)(n.p,{children:[`This example shows how radios are grouped explicitly by the `,(0,v.jsx)(n.code,{children:`<forge-radio-group>`}),` element.`]}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-html`,children:`<forge-radio-group>
  <forge-label legend>Choose an option</forge-label>
  <forge-radio value="option1">Option 1</forge-radio>
  <forge-radio value="option2">Option 2</forge-radio>
  <forge-radio value="option3">Option 3</forge-radio>
</forge-radio-group>
`})}),`
`,(0,v.jsxs)(n.blockquote,{children:[`
`,(0,v.jsxs)(n.p,{children:[(0,v.jsx)(n.strong,{children:`Note:`}),` Take note of the `,(0,v.jsx)(n.code,{children:`<forge-label>`}),` element with the `,(0,v.jsx)(n.code,{children:`legend`}),` attribute. This is used to provide an accessible label for the radio group.`]}),`
`]}),`
`,(0,v.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,v.jsx)(l,{}),`
`,(0,v.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,v.jsxs)(n.ul,{children:[`
`,(0,v.jsxs)(n.li,{children:[`Ensure that all of the controls that are accessible by a mouse are also accessible by keyboard.`,`
`,(0,v.jsxs)(n.ul,{children:[`
`,(0,v.jsx)(n.li,{children:`Ensure the controls are reachable by the tab key.`}),`
`,(0,v.jsx)(n.li,{children:`Ensure each control can be updated or activated by the keyboard.`}),`
`]}),`
`]}),`
`,(0,v.jsxs)(n.li,{children:[`Radio buttons should be part of a radio group and interpreted as such by assistive technologies such as screen readers.`,`
`,(0,v.jsxs)(n.ul,{children:[`
`,(0,v.jsxs)(n.li,{children:[`Ensure that your radio group also has an `,(0,v.jsx)(n.code,{children:`aria-label`}),` attribute describing its purpose.`]}),`
`]}),`
`]}),`
`]}),`
`,(0,v.jsx)(n.h2,{id:`css-only`,children:`CSS-Only`}),`
`,(0,v.jsx)(n.p,{children:`The radio component is also available as a CSS-only component without the need for JavaScript.`}),`
`,(0,v.jsx)(a,{of:h}),`
`,(0,v.jsx)(d,{})]})}function _(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,v.jsx)(n,{...e,children:(0,v.jsx)(g,{...e})}):g(e)}var v;function y(){return(y=e((()=>{v=r(),n(),i(),u(),c(),f()})))()}y();export{_ as default};