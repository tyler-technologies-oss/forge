import{j as e,M as c,a,C as n}from"./blocks-C6Jrb_II.js";import{useMDXComponents as r}from"./index-BNSwP12w.js";import{ClippingExample as i,NoClippingExample as d,NoClippingFixExample as l}from"./FocusIndicatorClipping.stories-BXSitL9U.js";import"./iframe-DR51lazJ.js";import"./_commonjsHelpers-CqkleIqs.js";import"./feature-detection-uS6p5jc8.js";import"./card-Hoc-29Ft.js";import"./base-lit-element-CwV61BG7.js";import"./utils-CRxrUqQD.js";import"./scaffold-CGyusmPL.js";import"./constants-wOq9K3uV.js";import"./button-r2EMLpWm.js";import"./base-adapter-Mla2Q9YN.js";import"./icon-B8CdcxqJ.js";import"./index-CiLSBptl.js";import"./focus-indicator-IWpzSXYP.js";import"./state-layer-BFwsAUDA.js";import"./base-button-adapter-D0zqnDMQ.js";import"./with-label-aware-D31hYnqk.js";import"./with-default-aria-CUUWGrPB.js";import"./a11y-utils-fzPGYZJ6.js";import"./text-field-su1dEfif.js";import"./base-field-WJtNENB5.js";import"./label-BSASIOtP.js";import"./button-toggle-group-D5jBldBo.js";import"./with-form-associated-BeE6NBc1.js";import"./checkbox-DOmkbh7U.js";import"./icon-button-DkluvO-9.js";import"./switch-Bt2bdQXJ.js";import"./tooltip-CcxiN_AO.js";import"./overlay-D-bkGTD9.js";import"./with-longpress-listener-CGXzI-TM.js";import"./dismissible-stack-BdWcv7_4.js";import"./decorators-BqHlIeRn.js";function s(t){const o={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(c,{title:"FAQ/Focus Indicator Clipping"}),`
`,e.jsx(o.h1,{id:"focus-indicator-clipping",children:"Focus Indicator Clipping"}),`
`,e.jsxs(o.p,{children:['Focus indicators (or "focus rings") are a ',e.jsx(o.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible",rel:"nofollow",children:"crucial part of web accessibility"}),". They help users who navigate with a keyboard to understand where they are on the page."]}),`
`,e.jsx(o.p,{children:"However, sometimes focus indicators can be clipped or hidden by various CSS styles:"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:[e.jsx(o.strong,{children:"Overflow"}),": The parent element has ",e.jsx(o.code,{children:"overflow: hidden"})," or ",e.jsx(o.code,{children:"overflow: auto"})," set, which clips the focus indicators at the padding box level if they are touching the edge of the parent element."]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.strong,{children:"Containment"}),": The parent element has ",e.jsx(o.code,{children:"contain: content"})," set, which clips the focus indicators at the content box level."]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.strong,{children:"z-index"}),": Other elements using ",e.jsx(o.code,{children:"z-index"})," to position themselves above the focus indicator, causing it to be clipped."]}),`
`]}),`
`,e.jsxs(o.p,{children:["While there are many other scenarios, the most common reason for focus indicators being clipped is due to the ",e.jsx(o.code,{children:"overflow"})," property."]}),`
`,e.jsx(o.p,{children:"This can happen when the focus indicator is drawn outside the element's box dimensions, and the parent element has styles that clip the focus indicator at its edges."}),`
`,e.jsx(a,{of:i}),`
`,e.jsxs(o.blockquote,{children:[`
`,e.jsxs(o.p,{children:["In this example, the focus indicator for the button and text-field will be clipped by the ",e.jsx(o.code,{children:"overflow: auto"})," set on the ",e.jsx(o.code,{children:"<forge-scaffold>"})," component. Try tabbing through the elements to see the issue."]}),`
`]}),`
`,e.jsx("br",{}),`
`,e.jsx(o.h2,{id:"focus-indicator-types",children:"Focus indicator types"}),`
`,e.jsx(o.p,{children:"There are two types of focus indicators:"}),`
`,e.jsxs(o.ol,{children:[`
`,e.jsxs(o.li,{children:[e.jsx(o.strong,{children:"Outward"}),": These are the default focus indicators that are drawn around the element. They are a solid color and are drawn outside the element's box dimensions using the CSS ",e.jsx(o.code,{children:"outline"})," property."]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.strong,{children:"Inward"}),": These are focus indicators that are drawn inside the element. They are also a solid color, but are drawn inside the element's box dimensions."]}),`
`]}),`
`,e.jsxs(o.p,{children:["The issue with focus indicators being clipped typically occurs with the ",e.jsx(o.strong,{children:"outward"})," type due to the component not reserving enough space for the focus indicator outside of its own box dimensions."]}),`
`,e.jsxs(o.p,{children:["To learn more about focus indicators, check out the ",e.jsx(o.a,{href:"?path=/docs/components-focus-indicator--docs",children:"focus indicator component documentation"}),"."]}),`
`,e.jsx(o.h2,{id:"forge-components",children:"Forge components"}),`
`,e.jsx(o.p,{children:`Tyler Forge™ components are designed to be accessible by default, but there are some common issues that can cause focus indicators to be clipped based on how they are used and
composed together.`}),`
`,e.jsxs(o.p,{children:["Most commonly the ",e.jsx(o.code,{children:"<forge-scaffold>"})," component can cause focus indicators to be clipped due to its usage of ",e.jsx(o.code,{children:"overflow: auto"})," around its content areas if no ",e.jsx(o.code,{children:"padding"}),` is present.
It can be common to nest form elements and buttons inside of the scaffold body content, which creates an invisible "edge" that clips outward focus indicators.`]}),`
`,e.jsxs(o.blockquote,{children:[`
`,e.jsxs(o.p,{children:["This is not necessarily a bug, or even specific to the ",e.jsx(o.code,{children:"<forge-scaffold>"}),", as it can happen on any element that has ",e.jsx(o.code,{children:"overflow: hidden"})," or ",e.jsx(o.code,{children:"overflow: auto"}),"."]}),`
`]}),`
`,e.jsxs(o.p,{children:["To handle this situation, you can either set ",e.jsx(o.code,{children:"overflow: visible"})," on the element with the ",e.jsx(o.code,{children:'slot="body"'}),` attribute (which means you'd need to handle scrolling yourself), or add padding
to the element to ensure the focus indicator has enough space to be drawn (which means you may run into alignment issues with other related content on your page).`]}),`
`,e.jsx(o.p,{children:"See the below examples for a demonstration of how to fix this issue in common layouts."}),`
`,e.jsx(o.h2,{id:"examples",children:"Examples"}),`
`,e.jsxs(o.p,{children:["Here is an example of a focus indicator being clipped due to the parent element having ",e.jsx(o.code,{children:"overflow: auto"})," set:"]}),`
`,e.jsx(n,{of:i}),`
`,e.jsxs(o.p,{children:["In this example, the focus indicator for the button will be clipped by the ",e.jsx(o.code,{children:"overflow: auto"})," set on the ",e.jsx(o.code,{children:"<forge-scaffold>"}),"'s ",e.jsx(o.code,{children:'<div slot="body">'}),` element. To fix this, you can
add padding to the element with the `,e.jsx(o.code,{children:'slot="body"'})," attribute:"]}),`
`,e.jsx(n,{of:d}),`
`,e.jsxs(o.p,{children:["While this does work, it presents a new problem due to the outer ",e.jsx(o.code,{children:"<forge-card>"})," also having its own built-in padding resulting in misalignment of the content and duplicate spacing."]}),`
`,e.jsx(o.p,{children:"To avoid this, you can remove the default card padding and add it to the body content instead:"}),`
`,e.jsx(n,{of:l}),`
`,e.jsx(o.p,{children:"This essentially just changes where the padding is applied, but it's important to preserve space around your interactive elements for focus indicators to be drawn correctly."}),`
`,e.jsx(o.h2,{id:"takeaways",children:"Takeaways"}),`
`,e.jsx(o.p,{children:`The main takeaway is that focus indicators can be clipped by various CSS styles, and this is not necessarily specific to Tyler Forge™. However, it is important to be aware of this issue
when using the Forge components in your own projects, and make sure you are accounting for the space required for focus indicators outside of interactive elements.`}),`
`,e.jsx(o.p,{children:`The examples above will likely be the most common, but if you run into problems that you can't solve or if you have any questions about focus indicators, feel free to reach out to us
for assistance and we'll be glad to help!`})]})}function B(t={}){const{wrapper:o}={...r(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(s,{...t})}):s(t)}export{B as default};
