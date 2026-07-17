import{u as a,j as e,M as o,T as r,C as i}from"./blocks-DCUHegwd.js";import{U as d,C as m}from"./CustomArgTypes-DsIRinZW.js";import{T as l,D as c,W as p}from"./Timestamp.stories-y0v9cTHd.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-Zk1SR4Vq.js";import"./utils-TiAJY-9P.js";import"./service-adapter-8tADcN_b.js";import"./timestamp-Dt_mX99-.js";import"./base-lit-element-BUhMuPxo.js";import"./directive-CwRn8Fwj.js";import"./class-map-CD1TCKq3.js";import"./a11y-utils-DQoauvDo.js";import"./dom-utils-D0uG6d5z.js";import"./utils-CjYv_z18.js";import"./feature-detection-3Hxzrcpn.js";import"./state-DnXpJw8q.js";import"./if-defined-8eXBNF-0.js";function n(s){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",p:"p",pre:"pre",strong:"strong",...a(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:l}),`
`,e.jsx(r,{}),`
`,e.jsx(t.p,{children:`Timestamps display formatted, localized date and time values. They can be used to represent dates,
times, timezone offsets, and durations.`}),`
`,e.jsx(i,{of:c}),`
`,e.jsx(t.h2,{id:"datetime-value",children:"Datetime value"}),`
`,e.jsxs(t.p,{children:["The timestamp component's ",e.jsx(t.code,{children:"datetime"})," property acceepts a ",e.jsx(t.code,{children:"Date"}),` object, date-convertible string, or
any string value accepted by the HTML `,e.jsx(t.code,{children:"<time>"})," element's ",e.jsx(t.code,{children:"datetime"}),` attribute. The value is used for
accessibility and formatted for display within the timestamp.`]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note:"}),` Dateless time, timezone offset, and duration values are accepted and used as-is for
accessibility purposes, but only full dates will be automatically formatted. If a value cannot be
converted to a date it will display as-is. Custom content may be provided in the timestamp's
default slot to bypass this limitation.`]}),`
`,e.jsx(t.p,{children:e.jsx(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/time#valid_datetime_values",rel:"nofollow",children:`See here for a list of valid datetime string
values`})}),`
`]}),`
`,e.jsx(t.h2,{id:"formatting",children:"Formatting"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"format"}),` property accepts any valid CLDR date/time format string to customize the display of the
timestamp.`]}),`
`,e.jsx(d,{text:"CLDR date/time symbols",href:"https://cldr.unicode.org/translation/date-time/date-time-symbols"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<!-- Hour and minute -->
<forge-timestamp datetime="2024-03-15T14:30:00" format="HH:mm"></forge-timestamp>

<!-- Day and month -->
<forge-timestamp datetime="2024-03-15T14:30:00" format="MMMM dd"></forge-timestamp>

<!-- With additional text -->
<forge-timestamp datetime="2024-03-15T14:30:00" format="'Today' • MMMM dd, yyyy"></forge-timestamp>
`})}),`
`,e.jsx(t.h2,{id:"separators",children:"Separators"}),`
`,e.jsxs(t.p,{children:["The ",e.jsx(t.code,{children:"separator"}),` property places a dot before or after a timestamp to visually separate it from other
inline content.`]}),`
`,e.jsxs(t.p,{children:["Valid values are ",e.jsx(t.code,{children:"none"}),", ",e.jsx(t.code,{children:"before"}),", and ",e.jsx(t.code,{children:"after"}),". The default value is ",e.jsx(t.code,{children:"none"}),"."]}),`
`,e.jsx(i,{of:p}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(m,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.p,{children:["The timestamp component uses the HTML ",e.jsx(t.code,{children:"<time>"}),` element, which provides semantic meaning and
accessibility for date and time content. Ensure that the `,e.jsx(t.code,{children:"datetime"}),` property is set correctly to
represent the underlying date and time value. Screen readers and other assistive technologies will
use this value to convey the timestamp's information accurately.`]})]})}function k(s={}){const{wrapper:t}={...a(),...s.components};return t?e.jsx(t,{...s,children:e.jsx(n,{...s})}):n(s)}export{k as default};
