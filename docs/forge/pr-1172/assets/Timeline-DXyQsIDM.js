import{u as r,j as e,M as o,T as a,C as n}from"./blocks-CAk1fwBh.js";import{U as l,C as d}from"./CustomArgTypes-DcEx43eH.js";import{T as m,D as c,W as h,a as p,b as x,S as u,c as j,d as f}from"./Timeline.stories--5Om8GA7.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-IbY4Oy7g.js";import"./utils-D5x2rMta.js";import"./service-adapter-8tADcN_b.js";import"./badge-DEeA44tk.js";import"./base-lit-element-72BcCZ33.js";import"./directive-CwRn8Fwj.js";import"./utils-DU-9AqTO.js";import"./card-BPj2HYBm.js";import"./tyler-icons-D3PVExpf.js";import"./utils-CjYv_z18.js";import"./constants-scFqwPpP.js";import"./feature-detection-CvbR5w2Z.js";import"./timestamp-0XaEqbaI.js";import"./class-map-3CuaVSER.js";import"./a11y-utils-BtLz16ul.js";import"./dom-utils-D0uG6d5z.js";import"./state-CDDB_06w.js";import"./if-defined-Do8MTjiG.js";function s(t){const i={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:m}),`
`,e.jsx(a,{}),`
`,e.jsx(i.p,{children:`Timelines display a list of events in chronological order, showing the sequence and relationship
between events over time.`}),`
`,e.jsx(n,{of:c}),`
`,e.jsx(i.h2,{id:"timeline-items",children:"Timeline Items"}),`
`,e.jsx(i.p,{children:`Timeline items represent individual events or milestones in the timeline. Each item consists of a
marker and content area. By default, items are connected by a vertical line that runs through their
markers.`}),`
`,e.jsx(i.h3,{id:"markers",children:"Markers"}),`
`,e.jsxs(i.p,{children:[`Timeline items display a default circular marker when no custom marker is provided. The marker can
be customized by providing content in the `,e.jsx(i.code,{children:"marker"})," slot, such as icons or badges."]}),`
`,e.jsx(n,{of:h}),`
`,e.jsx(i.h3,{id:"details",children:"Details"}),`
`,e.jsx(i.p,{children:`Use the detail slot of a timeline item to provide additional information or context for the event.
Consider using card component to visually group and separate detail content from the item's summary.`}),`
`,e.jsx(n,{of:p}),`
`,e.jsx(i.h2,{id:"timeline-break",children:"Timeline Break"}),`
`,e.jsxs(i.p,{children:["Use the ",e.jsx(i.code,{children:"<forge-timeline-break>"}),` component to provide visual separation between non-sequential
groups of timeline items.`]}),`
`,e.jsx(n,{of:x}),`
`,e.jsx(i.h2,{id:"sidebar-options",children:"Sidebar Options"}),`
`,e.jsxs(i.p,{children:[`By default side bar lines are drawn above and below a timeline item's marker unless the item is the
first or last element in the timeline, in which case either the top or bottom line is omitted. Use
the `,e.jsx(i.code,{children:"sidebar"}),` property to manually set which lines are drawn for an item. This can be used to imply
the presence of items before or after what's rendered by continuing lines past the first or last
marker.`]}),`
`,e.jsxs(i.p,{children:["Possible values are ",e.jsx(i.code,{children:"auto"}),", ",e.jsx(i.code,{children:"start"}),", ",e.jsx(i.code,{children:"end"}),", and ",e.jsx(i.code,{children:"none"}),". The default value is ",e.jsx(i.code,{children:"auto"}),"."]}),`
`,e.jsx(n,{of:u}),`
`,e.jsx(i.h2,{id:"theming",children:"Theming"}),`
`,e.jsx(i.p,{children:"Set the theme of a timeline item to control the color of the marker."}),`
`,e.jsx(n,{of:j}),`
`,e.jsx(i.h2,{id:"timestamps",children:"Timestamps"}),`
`,e.jsxs(i.p,{children:["The ",e.jsx(i.code,{children:"<forge-timestamp>"}),` component can be used to display a timestamp in a timeline. Timestamps
placed as a direct child of a timeline display as a heading alongside the timeline items. Placing a
timestamp within a timeline item renders it as body text.`]}),`
`,e.jsx(l,{text:"the timestamp component",href:"?path=/docs/components-timestamp--docs"}),`
`,e.jsx(n,{of:f}),`
`,e.jsx(i.h2,{id:"api",children:"API"}),`
`,e.jsx(d,{}),`
`,e.jsx(i.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(i.p,{children:["Timelines are rendered as semantic lists with ",e.jsx(i.code,{children:'role="list"'})," on the timeline and ",e.jsx(i.code,{children:'role="listitem"'}),`
on each timeline item.`]}),`
`,e.jsx(i.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"Include time information when the timing of events is important"}),`
`,e.jsx(i.li,{children:"Ensure marker colors meet WCAG contrast requirements against the background"}),`
`,e.jsx(i.li,{children:`When using icons as markers, they should be decorative since the content should provide the
necessary context`}),`
`,e.jsxs(i.li,{children:["Timeline breaks are marked with ",e.jsx(i.code,{children:'aria-hidden="true"'})," as they are purely decorative"]}),`
`]}),`
`,e.jsx(i.h3,{id:"content-structure",children:"Content Structure"}),`
`,e.jsx(i.p,{children:"Timeline items should include enough context to be understood independently. Consider including:"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"A brief title or summary of the event"}),`
`,e.jsx(i.li,{children:"Any relevant details or description"}),`
`,e.jsx(i.li,{children:"Visual indicators (badges, themes) to communicate status or category"}),`
`]})]})}function z(t={}){const{wrapper:i}={...r(),...t.components};return i?e.jsx(i,{...t,children:e.jsx(s,{...t})}):s(t)}export{z as default};
