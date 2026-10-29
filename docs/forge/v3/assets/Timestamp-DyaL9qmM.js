import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnLnh7by.js";import{a as c,n as l,o as u,t as d}from"./CustomArgTypes-DS7Rl0eI.js";import{i as f,n as p,r as m,t as h}from"./Timestamp.stories-CQ8I72Tc.js";function g(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,p:`p`,pre:`pre`,strong:`strong`,...t(),...e.components};return(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(s,{of:p}),`
`,(0,v.jsx)(o,{}),`
`,(0,v.jsx)(n.p,{children:`Timestamps display formatted, localized date and time values. They can be used to represent dates,
times, timezone offsets, and durations.`}),`
`,(0,v.jsx)(a,{of:h}),`
`,(0,v.jsx)(n.h2,{id:`datetime-value`,children:`Datetime value`}),`
`,(0,v.jsxs)(n.p,{children:[`The timestamp component's `,(0,v.jsx)(n.code,{children:`datetime`}),` property acceepts a `,(0,v.jsx)(n.code,{children:`Date`}),` object, date-convertible string, or
any string value accepted by the HTML `,(0,v.jsx)(n.code,{children:`<time>`}),` element's `,(0,v.jsx)(n.code,{children:`datetime`}),` attribute. The value is used for
accessibility and formatted for display within the timestamp.`]}),`
`,(0,v.jsxs)(n.blockquote,{children:[`
`,(0,v.jsxs)(n.p,{children:[(0,v.jsx)(n.strong,{children:`Note:`}),` Dateless time, timezone offset, and duration values are accepted and used as-is for
accessibility purposes, but only full dates will be automatically formatted. If a value cannot be
converted to a date it will display as-is. Custom content may be provided in the timestamp's
default slot to bypass this limitation.`]}),`
`,(0,v.jsx)(n.p,{children:(0,v.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/time#valid_datetime_values`,rel:`nofollow`,children:`See here for a list of valid datetime string
values`})}),`
`]}),`
`,(0,v.jsx)(n.h2,{id:`formatting`,children:`Formatting`}),`
`,(0,v.jsxs)(n.p,{children:[`The `,(0,v.jsx)(n.code,{children:`format`}),` property accepts any valid CLDR date/time format string to customize the display of the
timestamp.`]}),`
`,(0,v.jsx)(c,{text:`CLDR date/time symbols`,href:`https://cldr.unicode.org/translation/date-time/date-time-symbols`}),`
`,(0,v.jsx)(n.pre,{children:(0,v.jsx)(n.code,{className:`language-html`,children:`<!-- Hour and minute -->
<forge-timestamp datetime="2024-03-15T14:30:00" format="HH:mm"></forge-timestamp>

<!-- Day and month -->
<forge-timestamp datetime="2024-03-15T14:30:00" format="MMMM dd"></forge-timestamp>

<!-- With additional text -->
<forge-timestamp datetime="2024-03-15T14:30:00" format="'Today' • MMMM dd, yyyy"></forge-timestamp>
`})}),`
`,(0,v.jsx)(n.h2,{id:`separators`,children:`Separators`}),`
`,(0,v.jsxs)(n.p,{children:[`The `,(0,v.jsx)(n.code,{children:`separator`}),` property places a dot before or after a timestamp to visually separate it from other
inline content.`]}),`
`,(0,v.jsxs)(n.p,{children:[`Valid values are `,(0,v.jsx)(n.code,{children:`none`}),`, `,(0,v.jsx)(n.code,{children:`before`}),`, and `,(0,v.jsx)(n.code,{children:`after`}),`. The default value is `,(0,v.jsx)(n.code,{children:`none`}),`.`]}),`
`,(0,v.jsx)(a,{of:m}),`
`,(0,v.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,v.jsx)(d,{}),`
`,(0,v.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,v.jsxs)(n.p,{children:[`The timestamp component uses the HTML `,(0,v.jsx)(n.code,{children:`<time>`}),` element, which provides semantic meaning and
accessibility for date and time content. Ensure that the `,(0,v.jsx)(n.code,{children:`datetime`}),` property is set correctly to
represent the underlying date and time value. Screen readers and other assistive technologies will
use this value to convey the timestamp's information accurately.`]})]})}function _(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,v.jsx)(n,{...e,children:(0,v.jsx)(g,{...e})}):g(e)}var v;function y(){return(y=e((()=>{v=r(),n(),i(),l(),f(),u()})))()}y();export{_ as default};