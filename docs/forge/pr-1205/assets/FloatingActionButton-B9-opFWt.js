import{u as r,j as t,M as s,T as a,C as i}from"./blocks-Ck8GEe5N.js";import{C as c}from"./CustomArgTypes-BL556TU4.js";import{C as l}from"./CssOnlyInformation-fxWSKNsQ.js";import{F as p,D as m,E as d,W as h,C as x}from"./FloatingActionButton.stories-jJIt69BZ.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BieQ8965.js";import"./iframe-BJxToyET.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-UHZ10xki.js";import"./style-map-DdyOA5fx.js";import"./directive-CwRn8Fwj.js";import"./class-map-BnEDXcyy.js";import"./tyler-icons-BAsQ94Lf.js";import"./service-adapter-8tADcN_b.js";import"./icon-CxJqbZxZ.js";import"./component-utils-DXwuBG7n.js";import"./property-DFrfpKpf.js";import"./base-lit-element-CpHFhxvO.js";import"./async-directive-jA1Mz7ci.js";import"./constants-C55SM-CY.js";import"./create-context-BxR5I8pu.js";import"./feature-detection-iQu3yOww.js";import"./platform-EVTRdOou.js";import"./floating-action-button-Cpo4Aipj.js";import"./state-Chsbeeao.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./base-DVmwUFg0.js";import"./base-button-TqALiGM0.js";import"./query-CtiAP21w.js";import"./query-assigned-elements-43hYArgI.js";import"./a11y-utils-DMYgbTDM.js";import"./dom-utils-BrrHV3zE.js";import"./utils-C31il88P.js";import"./focus-indicator-DrGqahUv.js";import"./floating-ui.dom-DaMtbvS2.js";import"./state-layer-C_jpB3Dn.js";import"./custom-element-DBARb8MV.js";import"./core-property-Co8uF8PW.js";import"./base-adapter-DoIKtOh1.js";import"./base-component-Fg022xRz.js";import"./button-BFMR-gG-.js";import"./button-constants-CBCPGxiy.js";function o(e){const n={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...e.components};return t.jsxs(t.Fragment,{children:[t.jsx(s,{of:p}),`
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
