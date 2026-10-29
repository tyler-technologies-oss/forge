import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnLnh7by.js";import{n as c,t as l}from"./CustomArgTypes-DS7Rl0eI.js";import{i as u,n as d,r as f,t as p}from"./ChipField.stories-HwVkIRpY.js";function m(e){let n={code:`code`,h2:`h2`,li:`li`,p:`p`,ul:`ul`,...t(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(s,{of:p}),`
`,(0,g.jsx)(o,{}),`
`,(0,g.jsx)(n.p,{children:`Chip fields are a specialized variant of text field that allows users to input multiple values in a single field and represent them as chips.`}),`
`,(0,g.jsx)(a,{of:d}),`
`,(0,g.jsx)(n.h2,{id:`deprecation-notice`,children:`Deprecation Notice`}),`
`,(0,g.jsxs)(n.p,{children:[`The `,(0,g.jsx)(n.code,{children:`<forge-chip-field>`}),` component is deprecated and will be removed in a future release. Existing components such as `,(0,g.jsx)(n.code,{children:`<forge-text-field>`}),` and
`,(0,g.jsx)(n.code,{children:`<forge-select>`}),` will be able to be used to create similar functionality which removes the current need for this specialized component.`]}),`
`,(0,g.jsx)(n.h2,{id:`with-autocomplete`,children:`With Autocomplete`}),`
`,(0,g.jsx)(n.p,{children:`It is common to use an autocomplete component with a chip field to provide suggestions to the user as they type.`}),`
`,(0,g.jsx)(a,{of:f}),`
`,(0,g.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,g.jsx)(l,{}),`
`,(0,g.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,g.jsxs)(n.ul,{children:[`
`,(0,g.jsxs)(n.li,{children:[`Add an `,(0,g.jsx)(n.code,{children:`id`}),` to your `,(0,g.jsx)(n.code,{children:`<input>`}),` element and bind it to your `,(0,g.jsx)(n.code,{children:`<label>`}),` element using the for attribute on the `,(0,g.jsx)(n.code,{children:`<label>`}),`.`]}),`
`,(0,g.jsxs)(n.li,{children:[`Ensure that the chips that are added to the field have descriptive `,(0,g.jsx)(n.code,{children:`aria-label`}),` or `,(0,g.jsx)(n.code,{children:`aria-labelledby`}),` attributes.`]}),`
`,(0,g.jsxs)(n.li,{children:[`Make sure that the member chips that are added can be accessed via the keyboard left and right arrows.`,`
`,(0,g.jsxs)(n.ul,{children:[`
`,(0,g.jsx)(n.li,{children:`There should be a distinct visual cue that indicates which chip is focused`}),`
`]}),`
`]}),`
`,(0,g.jsx)(n.li,{children:`Similarly, make sure that when a chip is focused using the arrow keys, that the backspace and delete keys do remove them.`}),`
`,(0,g.jsx)(n.li,{children:`Ensure that when disabled, the entire field as well as the member chips all appear visually and interactively disabled.`}),`
`]})]})}function h(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,g.jsx)(n,{...e,children:(0,g.jsx)(m,{...e})}):m(e)}var g;function _(){return(_=e((()=>{g=r(),n(),i(),c(),u()})))()}_();export{h as default};