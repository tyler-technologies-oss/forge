import{u as s,j as e,M as o,T as c,C as t}from"./blocks-o6gg6xLa.js";import{C as a}from"./CustomArgTypes-C1A_vBiA.js";import{T as l,D as d,W as h,R as m,a as p,b as u}from"./Timeline.stories-DojqdGFh.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BhK0cOWW.js";import"./utils-CCSzXMC0.js";import"./service-adapter-8tADcN_b.js";import"./timeline-break-Dw9Bwf2E.js";import"./base-lit-element-Cdfwlk1K.js";import"./directive-CwRn8Fwj.js";import"./a11y-utils-DQoauvDo.js";import"./dom-utils-D0uG6d5z.js";import"./utils-CjYv_z18.js";import"./feature-detection-3Hxzrcpn.js";import"./class-map-CVOXVhjV.js";import"./tyler-icons-D2d9_cUK.js";import"./constants-NJSwOtlj.js";import"./badge-C8MtQ_NJ.js";import"./utils-DU-9AqTO.js";function r(i){const n={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:l}),`
`,e.jsx(c,{}),`
`,e.jsx(n.p,{children:`Timelines display a list of events in chronological order, showing the sequence and relationship
between events over time.`}),`
`,e.jsx(t,{of:d}),`
`,e.jsx(n.h2,{id:"timeline-items",children:"Timeline Items"}),`
`,e.jsx(n.p,{children:`Timeline items represent individual events or milestones in the timeline. Each item consists of a
marker and content area. By default, items are connected by a vertical line that runs through their
markers.`}),`
`,e.jsx(n.h3,{id:"markers",children:"Markers"}),`
`,e.jsxs(n.p,{children:[`Timeline items display a default circular marker when no custom marker is provided. The marker can
be customized by providing content in the `,e.jsx(n.code,{children:"marker"})," slot, such as icons or badges."]}),`
`,e.jsx(t,{of:h}),`
`,e.jsx(n.h3,{id:"content",children:"Content"}),`
`,e.jsx(n.p,{children:`The content area of a timeline item can contain any markup, including text, badges, cards, or other
components.`}),`
`,e.jsx(t,{of:m}),`
`,e.jsx(n.h2,{id:"timeline-break",children:"Timeline Break"}),`
`,e.jsxs(n.p,{children:["Use the ",e.jsx(n.code,{children:"<forge-timeline-break>"}),` component to provide visual separation between non-sequential
groups of timeline items.`]}),`
`,e.jsx(t,{of:p}),`
`,e.jsx(n.h2,{id:"theming",children:"Theming"}),`
`,e.jsx(n.p,{children:"Set the theme of a timeline item to control the color of the marker."}),`
`,e.jsx(t,{of:u}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(a,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.p,{children:["Timelines are rendered as semantic lists with ",e.jsx(n.code,{children:'role="list"'})," on the container and ",e.jsx(n.code,{children:'role="listitem"'}),`
on each timeline item. This provides proper structure for assistive technology users.`]}),`
`,e.jsx(n.h3,{id:"best-practices",children:"Best Practices"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Include time information when the timing of events is important"}),`
`,e.jsx(n.li,{children:"Ensure marker colors meet WCAG contrast requirements against the background"}),`
`,e.jsx(n.li,{children:`When using icons as markers, they should be decorative since the content should provide the
necessary context`}),`
`,e.jsxs(n.li,{children:["Timeline breaks are marked with ",e.jsx(n.code,{children:'aria-hidden="true"'})," as they are purely decorative"]}),`
`]}),`
`,e.jsx(n.h3,{id:"content-structure",children:"Content Structure"}),`
`,e.jsx(n.p,{children:"Timeline items should include enough context to be understood independently. Consider including:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"A brief title or summary of the event"}),`
`,e.jsx(n.li,{children:"Any relevant details or description"}),`
`,e.jsx(n.li,{children:"Visual indicators (badges, themes) to communicate status or category"}),`
`]})]})}function S(i={}){const{wrapper:n}={...s(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{S as default};
