import{j as e,M as a,T as o,C as s}from"./index-B_wXwpur.js";import{useMDXComponents as i}from"./index-DXn-3eKA.js";import{U as l,C as h}from"./CustomArgTypes-Biq5BHH5.js";import{M as c,D as d,T as m,S as p,G as u}from"./Meter.stories-LJJsPPiP.js";import"./iframe-CoEFcktY.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CfOrKyLd.js";import"./index-DrFu-skq.js";import"./utils-C9ubTmun.js";import"./lit-element-BuSzPo2N.js";import"./lit-html-Ox1a2bD1.js";import"./feature-detection-CY6TVbRZ.js";import"./meter-group-Bwzct4Py.js";import"./base-lit-element-D99bbIxp.js";import"./state-DSZFFvr5.js";import"./key-item-fm9Fe_DR.js";import"./a11y-utils-DGb1vALN.js";import"./class-map-D3FxRsP9.js";import"./directive-CJw_OlP2.js";import"./style-map-CeIg-cuG.js";import"./utils-CRxrUqQD.js";function r(n){const t={blockquote:"blockquote",code:"code",em:"em",h2:"h2",h3:"h3",p:"p",...i(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:c}),`
`,e.jsx(o,{}),`
`,e.jsx(t.p,{children:"Meters are used to represent scalar values within a known range."}),`
`,e.jsx(s,{of:d}),`
`,e.jsx(t.h3,{id:"tickmarks",children:"Tickmarks"}),`
`,e.jsxs(t.p,{children:["Meters can be configured to display tickmarks at regular intervals along the track. The ",e.jsx(t.code,{children:"tickmarks"}),`
property toggles whether or not tickmarks are present and the number of tickmarks is set via the
`,e.jsx(t.code,{children:"--forge-meter-tickmarks"})," token."]}),`
`,e.jsx(s,{of:m}),`
`,e.jsx(t.h3,{id:"segmented",children:"Segmented"}),`
`,e.jsxs(t.p,{children:["Setting a meter's ",e.jsx(t.code,{children:"low"})," or ",e.jsx(t.code,{children:"high"}),` value turns it into a segemented meter. A segmented meter's is
divided into three regions — below the low value, above the high value, and between the two. Its
color changes based on the value of the meter in relation to its `,e.jsx(t.code,{children:"optimum"}),` property. When the value
is in the same region as the optimum, the value is `,e.jsx(t.em,{children:"optimal"}),` and colored green. When it's in an
adjecent region it's `,e.jsx(t.em,{children:"suboptimal"})," and colored yellow. Otherwise, its ",e.jsx(t.em,{children:"least optimal"}),` and colored
red.`]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:["When set, ",e.jsx(t.code,{children:"low"})," must be greater than or equal to ",e.jsx(t.code,{children:"min"})," and less than ",e.jsx(t.code,{children:"high"}),". Likewise, ",e.jsx(t.code,{children:"high"}),`
must be less than or equal to `,e.jsx(t.code,{children:"max"})," and greater than ",e.jsx(t.code,{children:"low"}),"."]}),`
`]}),`
`,e.jsx(s,{of:p}),`
`,e.jsx(t.h3,{id:"grouped",children:"Grouped"}),`
`,e.jsxs(t.p,{children:[`Multiple related meters representing parts of a whole can be grouped together to display on the
same track. Each meter in the group must have the same min and max values, which are managed by
the `,e.jsx(t.code,{children:"<forge-meter-group>"})," element, and can't be segmented."]}),`
`,e.jsxs(t.p,{children:[`Grouped meters are typically accompanied by keys that label each meter with its color and
optionally its value. Each key can be semantically associated with its meter by using a `,e.jsx(t.code,{children:"<label>"}),`
element with a `,e.jsx(t.code,{children:"for"})," attribute that matches the meter's ",e.jsx(t.code,{children:"id"}),"."]}),`
`,e.jsx(l,{text:"the key component",href:"?path=/docs/components-key--docs"}),`
`,e.jsx(s,{of:u}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(h,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.p,{children:["Meters must always be labeled. This can be achieved through association with a ",e.jsx(t.code,{children:"<label>"}),` element or
by setting the `,e.jsx(t.code,{children:"aria-label"})," or ",e.jsx(t.code,{children:"aria-labelledby"}),` attribute. Text within the label slot is not
accessible on its own and must be explicitly linked to the meter if used as the label. When using
grouped meters make sure to also include a key that includes the name, color, and optionally value
of each meter.`]}),`
`,e.jsxs(t.p,{children:[`The meter automatically applies ARIA attributes reflecting its value, min, and max values. If the
value shouldn't be expressed as a percentage (for example, if you are measuring discrete values or
textual quantifiers like "low", "medium", and "high"), the `,e.jsx(t.code,{children:"aria-valuetext"}),` attribute should be set
to a string representing how the meter should be read.`]}),`
`,e.jsx(t.h3,{id:"meter-vs-linear-progress",children:"Meter vs. Linear Progress"}),`
`,e.jsxs(t.p,{children:[`Though superficially similar, meters and linear progress indicators have different use cases. The
linear progress component is used to indicate the state of an application — whether or not it is
currently busy with a task — and its design reinforces this association. Meters, on the other hand,
represent a relatively static data point within a known range. They may be used to represent the
progress of a longer term task in certain situations, but usually not something that a user would
expect to change while using your app. It may make sense to add `,e.jsx(t.code,{children:'role="progressbar"'}),` to a meter if
that helps clarify its purpose for users of assistive technology.`]})]})}function X(n={}){const{wrapper:t}={...i(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(r,{...n})}):r(n)}export{X as default};
