import{u as r,j as n,M as s,T as a,C as i}from"./blocks-BaaFsLmi.js";import{C as c}from"./CustomArgTypes-DpZEridC.js";import{C as l}from"./CssOnlyInformation-X-qdpMkf.js";import{F as d,D as p,E as h,W as m,C as x}from"./FloatingActionButton.stories-BK-LrMgu.js";import"./preload-helper-PPVm8Dsz.js";import"./index-C0CPHb63.js";import"./iframe-CCQPwMqK.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-71auwco3.js";import"./style-map-DcvoGNcx.js";import"./directive-CwRn8Fwj.js";import"./class-map-BspdE2wQ.js";import"./tyler-icons-D_P4inVM.js";import"./service-adapter-DlT-lJx7.js";import"./property-Dw5w9m4o.js";import"./base-lit-element-Rp30TdPi.js";import"./constants-Ds-UekRh.js";import"./feature-detection-Cxj81Y1H.js";import"./floating-action-button-BTfaMa44.js";import"./state-DcDYGaya.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./base-DVmwUFg0.js";import"./base-button-DlqY0Zum.js";import"./query-CtiAP21w.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-a04gn1ZN.js";import"./dom-utils-D38acdAW.js";import"./utils-DU-9AqTO.js";import"./focus-indicator-CoBrh689.js";import"./state-layer-BcVD1OXH.js";import"./base-component-DokdPcmx.js";import"./base-adapter-C2s8cO2K.js";import"./button-CArgg2AW.js";import"./button-constants-D5k34xES.js";function o(e){const t={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...e.components};return n.jsxs(n.Fragment,{children:[n.jsx(s,{of:d}),`
`,n.jsx(a,{}),`
`,n.jsx(t.p,{children:"Use floating action buttons to represent the primary action on a screen within an application. It's recommended to only use one floating action button per screen."}),`
`,n.jsx(i,{of:p}),`
`,n.jsx(t.h2,{id:"positioning",children:"Positioning"}),`
`,n.jsx(t.p,{children:"Typically you will position floating action buttons manually on the screen, for example to apply a fixed position in the bottom-right you could use this CSS:"}),`
`,n.jsx(t.pre,{children:n.jsx(t.code,{className:"language-css",children:`.bottom-right {
  position: fixed;
  bottom: var(--forge-spacing-medium);
  right: var(--forge-spacing-medium);
}
`})}),`
`,n.jsx(t.h2,{id:"extended",children:"Extended"}),`
`,n.jsx(t.p,{children:"Extended floating action buttons are larger and have a text label."}),`
`,n.jsx(i,{of:h}),`
`,n.jsx(t.h2,{id:"with-anchor",children:"With Anchor"}),`
`,n.jsxs(t.p,{children:["You can nest an ",n.jsx(t.code,{children:"<a>"})," element inside the floating action button to create a link."]}),`
`,n.jsx(i,{of:m}),`
`,n.jsx(t.h2,{id:"api",children:"API"}),`
`,n.jsx(c,{}),`
`,n.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,n.jsxs(t.ul,{children:[`
`,n.jsxs(t.li,{children:["Buttons containing only icons should be given a meaningful label via ",n.jsx(t.code,{children:"aria-label"})," or ",n.jsx(t.code,{children:"aria-labelledby"}),"."]}),`
`,n.jsxs(t.li,{children:["Avoid using capitalized text because screen readers will read the text character-by-character. Instead use ",n.jsx(t.code,{children:"text-transform: uppercase"}),"."]}),`
`,n.jsx(t.li,{children:"Ensure the FAB can be reached by keyboard navigation."}),`
`,n.jsx(t.li,{children:"Ensure that there is a distinct visual cue when the FAB is in focus."}),`
`,n.jsx(t.li,{children:"Verify that there is sufficient contrast between the foreground text and background to meet WCAG requirements."}),`
`,n.jsx(t.li,{children:"Ensure that buttons placed above other content on the page have proper contrast ratio."}),`
`]}),`
`,n.jsx(t.h2,{id:"css-only",children:"CSS-Only"}),`
`,n.jsx(t.p,{children:"The floating action button component is also available as a CSS-only component without the need for JavaScript."}),`
`,n.jsx(i,{of:x}),`
`,n.jsx(l,{})]})}function H(e={}){const{wrapper:t}={...r(),...e.components};return t?n.jsx(t,{...e,children:n.jsx(o,{...e})}):o(e)}export{H as default};
