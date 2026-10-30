import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-fd9Z3xSU.js";import{a as c,n as l,o as u,t as d}from"./CustomArgTypes-Cnceb5ig.js";import{a as f,i as p,n as m,o as h,r as g,t as _}from"./Meter.stories-DpFvScFd.js";function v(e){let n={blockquote:`blockquote`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,p:`p`,...t(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(s,{of:g}),`
`,(0,b.jsx)(o,{}),`
`,(0,b.jsx)(n.p,{children:`Meters are used to represent scalar values within a known range.`}),`
`,(0,b.jsx)(a,{of:_}),`
`,(0,b.jsx)(n.h3,{id:`tickmarks`,children:`Tickmarks`}),`
`,(0,b.jsxs)(n.p,{children:[`Meters can be configured to display tickmarks at regular intervals along the track. The `,(0,b.jsx)(n.code,{children:`tickmarks`}),`
property toggles whether or not tickmarks are present and the number of tickmarks is set via the
`,(0,b.jsx)(n.code,{children:`--forge-meter-tickmarks`}),` token.`]}),`
`,(0,b.jsx)(a,{of:f}),`
`,(0,b.jsx)(n.h3,{id:`segmented`,children:`Segmented`}),`
`,(0,b.jsxs)(n.p,{children:[`Setting a meter's `,(0,b.jsx)(n.code,{children:`low`}),` or `,(0,b.jsx)(n.code,{children:`high`}),` value turns it into a segemented meter. A segmented meter's is
divided into three regions — below the low value, above the high value, and between the two. Its
color changes based on the value of the meter in relation to its `,(0,b.jsx)(n.code,{children:`optimum`}),` property. When the value
is in the same region as the optimum, the value is `,(0,b.jsx)(n.em,{children:`optimal`}),` and colored green. When it's in an
adjecent region it's `,(0,b.jsx)(n.em,{children:`suboptimal`}),` and colored yellow. Otherwise, its `,(0,b.jsx)(n.em,{children:`least optimal`}),` and colored
red.`]}),`
`,(0,b.jsxs)(n.blockquote,{children:[`
`,(0,b.jsxs)(n.p,{children:[`When set, `,(0,b.jsx)(n.code,{children:`low`}),` must be greater than or equal to `,(0,b.jsx)(n.code,{children:`min`}),` and less than `,(0,b.jsx)(n.code,{children:`high`}),`. Likewise, `,(0,b.jsx)(n.code,{children:`high`}),`
must be less than or equal to `,(0,b.jsx)(n.code,{children:`max`}),` and greater than `,(0,b.jsx)(n.code,{children:`low`}),`.`]}),`
`]}),`
`,(0,b.jsx)(a,{of:p}),`
`,(0,b.jsx)(n.h3,{id:`grouped`,children:`Grouped`}),`
`,(0,b.jsxs)(n.p,{children:[`Multiple related meters representing parts of a whole can be grouped together to display on the
same track. Each meter in the group must have the same min and max values, which are managed by
the `,(0,b.jsx)(n.code,{children:`<forge-meter-group>`}),` element, and can't be segmented.`]}),`
`,(0,b.jsxs)(n.p,{children:[`Grouped meters are typically accompanied by keys that label each meter with its color and
optionally its value. Each key can be semantically associated with its meter by using a `,(0,b.jsx)(n.code,{children:`<label>`}),`
element with a `,(0,b.jsx)(n.code,{children:`for`}),` attribute that matches the meter's `,(0,b.jsx)(n.code,{children:`id`}),`.`]}),`
`,(0,b.jsx)(c,{text:`the key component`,href:`?path=/docs/components-key--docs`}),`
`,(0,b.jsx)(a,{of:m}),`
`,(0,b.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,b.jsx)(d,{}),`
`,(0,b.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,b.jsxs)(n.p,{children:[`Meters must always be labeled. This can be achieved through association with a `,(0,b.jsx)(n.code,{children:`<label>`}),` element or
by setting the `,(0,b.jsx)(n.code,{children:`aria-label`}),` or `,(0,b.jsx)(n.code,{children:`aria-labelledby`}),` attribute. Text within the label slot is not
accessible on its own and must be explicitly linked to the meter if used as the label. When using
grouped meters make sure to also include a key that includes the name, color, and optionally value
of each meter.`]}),`
`,(0,b.jsxs)(n.p,{children:[`The meter automatically applies ARIA attributes reflecting its value, min, and max values. If the
value shouldn't be expressed as a percentage (for example, if you are measuring discrete values or
textual quantifiers like "low", "medium", and "high"), the `,(0,b.jsx)(n.code,{children:`aria-valuetext`}),` attribute should be set
to a string representing how the meter should be read.`]}),`
`,(0,b.jsx)(n.h3,{id:`meter-vs-linear-progress`,children:`Meter vs. Linear Progress`}),`
`,(0,b.jsxs)(n.p,{children:[`Though superficially similar, meters and linear progress indicators have different use cases. The
linear progress component is used to indicate the state of an application — whether or not it is
currently busy with a task — and its design reinforces this association. Meters, on the other hand,
represent a relatively static data point within a known range. They may be used to represent the
progress of a longer term task in certain situations, but usually not something that a user would
expect to change while using your app. It may make sense to add `,(0,b.jsx)(n.code,{children:`role="progressbar"`}),` to a meter if
that helps clarify its purpose for users of assistive technology.`]})]})}function y(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,b.jsx)(n,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;function x(){return(x=e((()=>{b=r(),n(),i(),l(),u(),h()})))()}x();export{y as default};