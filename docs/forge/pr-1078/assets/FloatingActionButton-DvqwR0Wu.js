import{j as n,M as s,T as a,C as i}from"./blocks-BGXNjPUL.js";import{useMDXComponents as r}from"./index-C9aBCO2c.js";import{C as c}from"./CustomArgTypes-DKQaY4X4.js";import{C as l}from"./CssOnlyInformation-CBzd1zP3.js";import{F as d,D as h,E as p,W as m,C as x}from"./FloatingActionButton.stories-CzKOUJtV.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-6jvvl83j.js";import"./utils-BQsOXphk.js";import"./style-map-OsH3dYIv.js";import"./directive-jorct-Oe.js";import"./class-map-BA1pFziw.js";import"./tyler-icons-_ZRRE207.js";import"./feature-detection-DBnB2p_f.js";import"./service-adapter-CoGDs2_3.js";import"./base-lit-element-DuNePglZ.js";import"./constants-uy-3DCWv.js";import"./floating-action-button-tn6KaCjz.js";import"./base-component-B5xZY7DP.js";import"./dom-utils-CBD4z_3d.js";import"./base-adapter-DZ7lVcI0.js";import"./base-button-core-l79ZJf1a.js";import"./with-label-aware-rB4nYfN7.js";import"./with-default-aria-qCwd8R18.js";import"./a11y-utils-OON17uxD.js";import"./focus-indicator-uWMef9QC.js";import"./utils-DU-9AqTO.js";import"./state-layer-CDycYdPe.js";import"./button-gG20MWYF.js";function o(t){const e={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...t.components};return n.jsxs(n.Fragment,{children:[n.jsx(s,{of:d}),`
`,n.jsx(a,{}),`
`,n.jsx(e.p,{children:"Use floating action buttons to represent the primary action on a screen within an application. It's recommended to only use one floating action button per screen."}),`
`,n.jsx(i,{of:h}),`
`,n.jsx(e.h2,{id:"positioning",children:"Positioning"}),`
`,n.jsx(e.p,{children:"Typically you will position floating action buttons manually on the screen, for example to apply a fixed position in the bottom-right you could use this CSS:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-css",children:`.bottom-right {
  position: fixed;
  bottom: var(--forge-spacing-medium);
  right: var(--forge-spacing-medium);
}
`})}),`
`,n.jsx(e.h2,{id:"extended",children:"Extended"}),`
`,n.jsx(e.p,{children:"Extended floating action buttons are larger and have a text label."}),`
`,n.jsx(i,{of:p}),`
`,n.jsx(e.h2,{id:"with-anchor",children:"With Anchor"}),`
`,n.jsxs(e.p,{children:["You can nest an ",n.jsx(e.code,{children:"<a>"})," element inside the floating action button to create a link."]}),`
`,n.jsx(i,{of:m}),`
`,n.jsx(e.h2,{id:"api",children:"API"}),`
`,n.jsx(c,{}),`
`,n.jsx(e.h2,{id:"accessibility",children:"Accessibility"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Buttons containing only icons should be given a meaningful label via ",n.jsx(e.code,{children:"aria-label"})," or ",n.jsx(e.code,{children:"aria-labelledby"}),"."]}),`
`,n.jsxs(e.li,{children:["Avoid using capitalized text because screen readers will read the text character-by-character. Instead use ",n.jsx(e.code,{children:"text-transform: uppercase"}),"."]}),`
`,n.jsx(e.li,{children:"Ensure the FAB can be reached by keyboard navigation."}),`
`,n.jsx(e.li,{children:"Ensure that there is a distinct visual cue when the FAB is in focus."}),`
`,n.jsx(e.li,{children:"Verify that there is sufficient contrast between the foreground text and background to meet WCAG requirements."}),`
`,n.jsx(e.li,{children:"Ensure that buttons placed above other content on the page have proper contrast ratio."}),`
`]}),`
`,n.jsx(e.h2,{id:"css-only",children:"CSS-Only"}),`
`,n.jsx(e.p,{children:"The floating action button component is also available as a CSS-only component without the need for JavaScript."}),`
`,n.jsx(i,{of:x}),`
`,n.jsx(l,{})]})}function N(t={}){const{wrapper:e}={...r(),...t.components};return e?n.jsx(e,{...t,children:n.jsx(o,{...t})}):o(t)}export{N as default};
