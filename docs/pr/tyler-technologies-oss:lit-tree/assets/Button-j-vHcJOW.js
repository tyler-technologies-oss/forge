import{j as t,M as s,T as a,C as n}from"./index-Cla0pnLX.js";import{useMDXComponents as r}from"./index-eCHMAMlT.js";import{C as c}from"./CustomArgTypes-Dw_YZ2Mn.js";import{C as l}from"./CssOnlyInformation-YV1BV2pK.js";import{B as h,D as d,V as u,T as p,A as x,W as m,a as b,C as j}from"./Button.stories-NkR7efwP.js";import"./iframe-CzFWL4Qr.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-u_l7GRPl.js";import"./lit-element-JplMEnZc.js";import"./lit-html-paDGiEfB.js";import"./class-map-D55lQyt8.js";import"./directive-CF8sV3Lr.js";import"./index-fxMNKkgx.js";import"./icon-B5R9pr_c.js";import"./constants-9n5_0r7k.js";import"./feature-detection-DRCh51Sa.js";import"./base-adapter-B6TJxM93.js";import"./index-BgGCUUFB.js";import"./index-CbZAylpk.js";import"./button-C8Y3s8GC.js";import"./focus-indicator-N8y3p24x.js";import"./state-layer-BM79vS2j.js";import"./base-button-adapter-L8S_LI8j.js";import"./with-label-aware-OEbK3wHg.js";import"./with-default-aria-B0dk5gj8.js";import"./a11y-utils-DJ_tX8xT.js";import"./circular-progress-qTjvyVPT.js";function i(o){const e={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...o.components};return t.jsxs(t.Fragment,{children:[t.jsx(s,{of:h}),`
`,t.jsx(a,{}),`
`,t.jsx(e.p,{children:"Buttons are used to trigger actions or events in an application. Forge provides a set of button styles that can be used to create a consistent user experience."}),`
`,t.jsx(n,{of:d}),`
`,t.jsx(e.h2,{id:"variants",children:"Variants"}),`
`,t.jsx(e.p,{children:"Forge buttons come in several variants to match the style of your application, and can be used in a variety of contexts based on emphasis and hierarchy."}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsxs(e.li,{children:[t.jsx(e.strong,{children:"Text:"})," A button with no background or border, and only text content."]}),`
`,t.jsxs(e.li,{children:[t.jsx(e.strong,{children:"Outlined:"})," A button with a transparent background and a border."]}),`
`,t.jsxs(e.li,{children:[t.jsx(e.strong,{children:"Filled:"})," A button with a solid background color."]}),`
`,t.jsxs(e.li,{children:[t.jsx(e.strong,{children:"Raised:"})," A button with a raised appearance."]}),`
`,t.jsxs(e.li,{children:[t.jsx(e.strong,{children:"Link:"})," A button with no background or border, and only text content that appears as a link."]}),`
`]}),`
`,t.jsx(n,{of:u}),`
`,t.jsx(e.h2,{id:"themed",children:"Themed"}),`
`,t.jsxs(e.p,{children:["Forge buttons can be themed using the built-in ",t.jsx(e.code,{children:"theme"})," attribute, which will apply the appropriate color scheme based on the current theme."]}),`
`,t.jsx(n,{of:p}),`
`,t.jsxs(e.blockquote,{children:[`
`,t.jsx(e.p,{children:"Additionally, you can always provide your own theme via the CSS custom properties noted below."}),`
`]}),`
`,t.jsx(e.h2,{id:"anchor",children:"Anchor"}),`
`,t.jsxs(e.p,{children:["Forge buttons support providing a slotted ",t.jsx(e.code,{children:"<a>"})," element that allows for you to visually style an anchor tag as a button."]}),`
`,t.jsx(n,{of:x}),`
`,t.jsxs(e.blockquote,{children:[`
`,t.jsxs(e.p,{children:[t.jsx(e.strong,{children:"Note:"})," you should not use slots with anchor buttons because the ",t.jsx(e.code,{children:"<a>"})," element itself becomes the full content of the button."]}),`
`]}),`
`,t.jsx(e.h2,{id:"with-icon",children:"With Icon"}),`
`,t.jsx(e.p,{children:"Forge buttons can include an icon to provide additional context or visual interest."}),`
`,t.jsx(n,{of:m}),`
`,t.jsx(e.h2,{id:"with-circular-progress",children:"With Circular Progress"}),`
`,t.jsx(e.p,{children:"Forge buttons can include a circular progress indicator to provide feedback to the user when an action is in progress."}),`
`,t.jsx(n,{of:b}),`
`,t.jsx(e.h2,{id:"api",children:"API"}),`
`,t.jsx(c,{}),`
`,t.jsx(e.h2,{id:"accessibility",children:"Accessibility"}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsxs(e.li,{children:["Verify that you can reach every button by keyboard navigation.",`
`,t.jsxs(e.ul,{children:[`
`,t.jsx(e.li,{children:"Ensure that there is a visual cue that the button is currently in focus."}),`
`]}),`
`]}),`
`,t.jsxs(e.li,{children:["Verify that the button has a visible label that describes the action that will be taken when the button is clicked.",`
`,t.jsxs(e.ul,{children:[`
`,t.jsxs(e.li,{children:["Alternatively, use an ",t.jsx(e.code,{children:"aria-label"})," attribute to provide a descriptive label for the button."]}),`
`]}),`
`]}),`
`,t.jsx(e.li,{children:"Verify that pressing the space bar or enter key while focused on a button will activate the button in the same manner as if it had been clicked with a mouse."}),`
`,t.jsx(e.li,{children:"Verify that there is sufficient contrast between the foreground text and background to meet WCAG requirements."}),`
`]}),`
`,t.jsx(e.h2,{id:"css-only",children:"CSS-Only"}),`
`,t.jsx(e.p,{children:"The button component is also available as a CSS-only component without the need for JavaScript."}),`
`,t.jsx(n,{of:j}),`
`,t.jsx(l,{})]})}function H(o={}){const{wrapper:e}={...r(),...o.components};return e?t.jsx(e,{...o,children:t.jsx(i,{...o})}):i(o)}export{H as default};
