import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-Byzp6JFn.js";import{a as c,n as l,o as u,t as d}from"./CustomArgTypes-QAslgvtG.js";import{a as f,c as p,i as m,l as h,n as g,o as _,r as v,s as y,t as b}from"./Timeline.stories-CrXzycn2.js";function x(e){let n={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...t(),...e.components};return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(s,{of:m}),`
`,(0,C.jsx)(o,{}),`
`,(0,C.jsx)(n.p,{children:`Timelines display a list of events in chronological order, showing the sequence and relationship
between events over time.`}),`
`,(0,C.jsx)(a,{of:b}),`
`,(0,C.jsx)(n.h2,{id:`timeline-items`,children:`Timeline Items`}),`
`,(0,C.jsx)(n.p,{children:`Timeline items represent individual events or milestones in the timeline. Each item consists of a
marker and content area. By default, items are connected by a vertical line that runs through their
markers.`}),`
`,(0,C.jsx)(n.h3,{id:`markers`,children:`Markers`}),`
`,(0,C.jsxs)(n.p,{children:[`Timeline items display a default circular marker when no custom marker is provided. The marker can
be customized by providing content in the `,(0,C.jsx)(n.code,{children:`marker`}),` slot, such as icons or badges.`]}),`
`,(0,C.jsx)(a,{of:y}),`
`,(0,C.jsx)(n.h3,{id:`details`,children:`Details`}),`
`,(0,C.jsx)(n.p,{children:`Use the detail slot of a timeline item to provide additional information or context for the event.
Consider using card component to visually group and separate detail content from the item's summary.`}),`
`,(0,C.jsx)(a,{of:_}),`
`,(0,C.jsx)(n.h2,{id:`timeline-break`,children:`Timeline Break`}),`
`,(0,C.jsxs)(n.p,{children:[`Use the `,(0,C.jsx)(n.code,{children:`<forge-timeline-break>`}),` component to provide visual separation between non-sequential
groups of timeline items.`]}),`
`,(0,C.jsx)(a,{of:f}),`
`,(0,C.jsx)(n.h2,{id:`sidebar-options`,children:`Sidebar Options`}),`
`,(0,C.jsxs)(n.p,{children:[`By default side bar lines are drawn above and below a timeline item's marker unless the item is the
first or last element in the timeline, in which case either the top or bottom line is omitted. Use
the `,(0,C.jsx)(n.code,{children:`sidebar`}),` property to manually set which lines are drawn for an item. This can be used to imply
the presence of items before or after what's rendered by continuing lines past the first or last
marker.`]}),`
`,(0,C.jsxs)(n.p,{children:[`Possible values are `,(0,C.jsx)(n.code,{children:`auto`}),`, `,(0,C.jsx)(n.code,{children:`start`}),`, `,(0,C.jsx)(n.code,{children:`end`}),`, and `,(0,C.jsx)(n.code,{children:`none`}),`. The default value is `,(0,C.jsx)(n.code,{children:`auto`}),`.`]}),`
`,(0,C.jsx)(a,{of:g}),`
`,(0,C.jsx)(n.h2,{id:`theming`,children:`Theming`}),`
`,(0,C.jsx)(n.p,{children:`Set the theme of a timeline item to control the color of the marker.`}),`
`,(0,C.jsx)(a,{of:v}),`
`,(0,C.jsx)(n.h2,{id:`timestamps`,children:`Timestamps`}),`
`,(0,C.jsxs)(n.p,{children:[`The `,(0,C.jsx)(n.code,{children:`<forge-timestamp>`}),` component can be used to display a timestamp in a timeline. Timestamps
placed as a direct child of a timeline display as a heading alongside the timeline items. Placing a
timestamp within a timeline item renders it as body text.`]}),`
`,(0,C.jsx)(c,{text:`the timestamp component`,href:`?path=/docs/components-timestamp--docs`}),`
`,(0,C.jsx)(a,{of:p}),`
`,(0,C.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,C.jsx)(d,{}),`
`,(0,C.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,C.jsxs)(n.p,{children:[`Timelines are rendered as semantic lists with `,(0,C.jsx)(n.code,{children:`role="list"`}),` on the timeline and `,(0,C.jsx)(n.code,{children:`role="listitem"`}),`
on each timeline item.`]}),`
`,(0,C.jsx)(n.h3,{id:`best-practices`,children:`Best Practices`}),`
`,(0,C.jsxs)(n.ul,{children:[`
`,(0,C.jsx)(n.li,{children:`Include time information when the timing of events is important`}),`
`,(0,C.jsx)(n.li,{children:`Ensure marker colors meet WCAG contrast requirements against the background`}),`
`,(0,C.jsx)(n.li,{children:`When using icons as markers, they should be decorative since the content should provide the
necessary context`}),`
`,(0,C.jsxs)(n.li,{children:[`Timeline breaks are marked with `,(0,C.jsx)(n.code,{children:`aria-hidden="true"`}),` as they are purely decorative`]}),`
`]}),`
`,(0,C.jsx)(n.h3,{id:`content-structure`,children:`Content Structure`}),`
`,(0,C.jsx)(n.p,{children:`Timeline items should include enough context to be understood independently. Consider including:`}),`
`,(0,C.jsxs)(n.ul,{children:[`
`,(0,C.jsx)(n.li,{children:`A brief title or summary of the event`}),`
`,(0,C.jsx)(n.li,{children:`Any relevant details or description`}),`
`,(0,C.jsx)(n.li,{children:`Visual indicators (badges, themes) to communicate status or category`}),`
`]})]})}function S(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,C.jsx)(n,{...e,children:(0,C.jsx)(x,{...e})}):x(e)}var C;function w(){return(w=e((()=>{C=r(),n(),i(),l(),u(),h()})))()}w();export{S as default};