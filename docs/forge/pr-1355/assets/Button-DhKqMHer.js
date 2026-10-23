import{u as r,j as t,M as s,T as a,C as n}from"./blocks-o3aE32Cc.js";import{C as c}from"./CustomArgTypes-Dh-zw8TI.js";import{C as l}from"./CssOnlyInformation-DQlq0y5m.js";import{B as h,D as d,V as p,T as u,A as m,W as x,a as b,C as j}from"./Button.stories-AJDNLN7j.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DCOfJTyw.js";import"./iframe-BJl9WzyY.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-BIy79ypG.js";import"./class-map-Bqw-tANk.js";import"./directive-CwRn8Fwj.js";import"./tyler-icons-6f2n3B-C.js";import"./service-adapter-8tADcN_b.js";import"./icon-4j55E3iS.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./property-cnzUGw6c.js";import"./base-lit-element-PWcytbnJ.js";import"./async-directive-B9HypnBE.js";import"./constants-ffvdo6x3.js";import"./create-context-BxR5I8pu.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./button-CDo-p3Lo.js";import"./utils-srtmqB2N.js";import"./focus-indicator-spyGQm32.js";import"./floating-ui.dom-DaMtbvS2.js";import"./state-layer-oVncPkRT.js";import"./custom-element-DR9AFpIK.js";import"./core-property-Co8uF8PW.js";import"./base-adapter-CG4WlmkL.js";import"./dom-utils-DExKgbbf.js";import"./base-component-BFu9bkgC.js";import"./base-button-CGcQbB-W.js";import"./state-DPSRFZRB.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-D_hXjxHZ.js";import"./button-constants-DRqTH6Pv.js";import"./circular-progress-BAYLkjmK.js";import"./with-element-internals-DChZslLI.js";function i(o){const e={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...o.components};return t.jsxs(t.Fragment,{children:[t.jsx(s,{of:h}),`
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
`,t.jsx(n,{of:p}),`
`,t.jsx(e.h2,{id:"themed",children:"Themed"}),`
`,t.jsxs(e.p,{children:["Forge buttons can be themed using the built-in ",t.jsx(e.code,{children:"theme"})," attribute, which will apply the appropriate color scheme based on the current theme."]}),`
`,t.jsx(n,{of:u}),`
`,t.jsxs(e.blockquote,{children:[`
`,t.jsx(e.p,{children:"Additionally, you can always provide your own theme via the CSS custom properties noted below."}),`
`]}),`
`,t.jsx(e.h2,{id:"anchor",children:"Anchor"}),`
`,t.jsxs(e.p,{children:["Forge buttons support providing a slotted ",t.jsx(e.code,{children:"<a>"})," element that allows for you to visually style an anchor tag as a button."]}),`
`,t.jsx(n,{of:m}),`
`,t.jsxs(e.blockquote,{children:[`
`,t.jsxs(e.p,{children:[t.jsx(e.strong,{children:"Note:"})," you should not use slots with anchor buttons because the ",t.jsx(e.code,{children:"<a>"})," element itself becomes the full content of the button."]}),`
`]}),`
`,t.jsx(e.h2,{id:"with-icon",children:"With Icon"}),`
`,t.jsx(e.p,{children:"Forge buttons can include an icon to provide additional context or visual interest."}),`
`,t.jsx(n,{of:x}),`
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
`,t.jsx(l,{})]})}function st(o={}){const{wrapper:e}={...r(),...o.components};return e?t.jsx(e,{...o,children:t.jsx(i,{...o})}):i(o)}export{st as default};
