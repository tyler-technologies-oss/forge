import{u as r,j as t,M as s,T as a,C as i}from"./blocks-BMN-G5rA.js";import{C as c}from"./CustomArgTypes-4n6L5U3S.js";import{C as l}from"./CssOnlyInformation-BsSgg1iW.js";import{F as p,D as m,E as d,W as h,C as x}from"./FloatingActionButton.stories-lboRTQ7r.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DH_-Ozvr.js";import"./iframe-CSIdYrZJ.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-CL5ue9IV.js";import"./style-map-BfSygJjt.js";import"./directive-CwRn8Fwj.js";import"./class-map-D6T1Y6D0.js";import"./tyler-icons-BSgf1RSL.js";import"./service-adapter-8tADcN_b.js";import"./icon-D0ZxlEvQ.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./property-BzN4oVOa.js";import"./base-lit-element-wgpG68w_.js";import"./async-directive-C1FsiUh0.js";import"./constants-Bm8g2CKk.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./floating-action-button-BmG51IN7.js";import"./state-DFocWrqe.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./base-DVmwUFg0.js";import"./base-button-B6OkG301.js";import"./query-CtiAP21w.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-DssnAab5.js";import"./dom-utils-BDbRr6KM.js";import"./utils-C31il88P.js";import"./focus-indicator-Da-r1W3d.js";import"./floating-ui.dom-DaMtbvS2.js";import"./state-layer-CZIH5add.js";import"./custom-element-DR9AFpIK.js";import"./core-property-Co8uF8PW.js";import"./base-adapter-DOky_or5.js";import"./base-component-BFu9bkgC.js";import"./button-DCvaMBF6.js";import"./button-constants-B9P9oolT.js";function o(e){const n={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...e.components};return t.jsxs(t.Fragment,{children:[t.jsx(s,{of:p}),`
`,t.jsx(a,{}),`
`,t.jsx(n.p,{children:"Use floating action buttons to represent the primary action on a screen within an application. It's recommended to only use one floating action button per screen."}),`
`,t.jsx(i,{of:m}),`
`,t.jsx(n.h2,{id:"positioning",children:"Positioning"}),`
`,t.jsx(n.p,{children:"Typically you will position floating action buttons manually on the screen, for example to apply a fixed position in the bottom-right you could use this CSS:"}),`
`,t.jsx(n.pre,{children:t.jsx(n.code,{className:"language-css",children:`.bottom-right {
  position: fixed;
  bottom: var(--forge-spacing-medium);
  right: var(--forge-spacing-medium);
}
`})}),`
`,t.jsx(n.h2,{id:"extended",children:"Extended"}),`
`,t.jsx(n.p,{children:"Extended floating action buttons are larger and have a text label."}),`
`,t.jsx(i,{of:d}),`
`,t.jsx(n.h2,{id:"with-anchor",children:"With Anchor"}),`
`,t.jsxs(n.p,{children:["You can nest an ",t.jsx(n.code,{children:"<a>"})," element inside the floating action button to create a link."]}),`
`,t.jsx(i,{of:h}),`
`,t.jsx(n.h2,{id:"api",children:"API"}),`
`,t.jsx(c,{}),`
`,t.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,t.jsxs(n.ul,{children:[`
`,t.jsxs(n.li,{children:["Buttons containing only icons should be given a meaningful label via ",t.jsx(n.code,{children:"aria-label"})," or ",t.jsx(n.code,{children:"aria-labelledby"}),"."]}),`
`,t.jsxs(n.li,{children:["Avoid using capitalized text because screen readers will read the text character-by-character. Instead use ",t.jsx(n.code,{children:"text-transform: uppercase"}),"."]}),`
`,t.jsx(n.li,{children:"Ensure the FAB can be reached by keyboard navigation."}),`
`,t.jsx(n.li,{children:"Ensure that there is a distinct visual cue when the FAB is in focus."}),`
`,t.jsx(n.li,{children:"Verify that there is sufficient contrast between the foreground text and background to meet WCAG requirements."}),`
`,t.jsx(n.li,{children:"Ensure that buttons placed above other content on the page have proper contrast ratio."}),`
`]}),`
`,t.jsx(n.h2,{id:"css-only",children:"CSS-Only"}),`
`,t.jsx(n.p,{children:"The floating action button component is also available as a CSS-only component without the need for JavaScript."}),`
`,t.jsx(i,{of:x}),`
`,t.jsx(l,{})]})}function it(e={}){const{wrapper:n}={...r(),...e.components};return n?t.jsx(n,{...e,children:t.jsx(o,{...e})}):o(e)}export{it as default};
