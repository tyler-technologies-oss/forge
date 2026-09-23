import{u as r,j as e,M as i,T as s,C as a}from"./blocks-DZM-wJB8.js";import{C as l}from"./CustomArgTypes-B5wIhqi-.js";import{F as c,D as d}from"./Footer.stories-CyrpBzyc.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Hi_y4FYo.js";import"./iframe-B7LxWkL4.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-BgSSl4hg.js";import"./service-adapter-DlT-lJx7.js";import"./property-CcTHpYbU.js";import"./base-lit-element-DD9dOWH-.js";import"./directive-CwRn8Fwj.js";import"./a11y-utils-a04gn1ZN.js";import"./dom-utils-D38acdAW.js";import"./feature-detection-Cxj81Y1H.js";import"./utils-DU-9AqTO.js";function n(t){const o={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:c}),`
`,e.jsx(s,{}),`
`,e.jsxs(o.p,{children:["The ",e.jsx(o.code,{children:"<forge-footer>"})," component provides a flexible page footer pattern for site navigation, policy links, and secondary information. It supports different layout modes and adapts responsively when ",e.jsx(o.code,{children:'layout="auto"'})," is used."]}),`
`,e.jsx(a,{of:d}),`
`,e.jsx(o.h2,{id:"usage",children:"Usage"}),`
`,e.jsxs(o.p,{children:["The footer is intended to wrap one or more ",e.jsx(o.code,{children:"<forge-footer-item>"})," children. Each footer item can contain links, text, or other simple inline content."]}),`
`,e.jsx(o.pre,{children:e.jsx(o.code,{className:"language-html",children:`<forge-footer>
  <forge-footer-item>
    <a href="#">About</a>
  </forge-footer-item>
  <forge-footer-item>
    <a href="#">Contact</a>
  </forge-footer-item>
  <forge-footer-item>
    <a href="#">Privacy</a>
  </forge-footer-item>
  <forge-footer-item>
    <span>© 2026 Tyler Technologies</span>
  </forge-footer-item>

  <!-- Custom brand logo via the "graphic" slot -->
  <a slot="graphic" href="https://my.brand.com" target="_blank">
    <img src="https://path.to/your/logo.svg" alt="Your custom logo" />
  </a>
</forge-footer>
`})}),`
`,e.jsx(o.h3,{id:"layout-modes",children:"Layout modes"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"standard"}),": Always render the standard footer layout."]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"alternative"}),": Always render the alternative footer layout."]}),`
`,e.jsxs(o.li,{children:[e.jsx(o.code,{children:"auto"}),": Responsively switch between ",e.jsx(o.code,{children:"standard"})," and ",e.jsx(o.code,{children:"alternative"})," based on the ",e.jsx(o.code,{children:"layoutBreakpoint"})," width."]}),`
`]}),`
`,e.jsx(o.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(o.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(o.ul,{children:[`
`,e.jsxs(o.li,{children:["The footer uses ",e.jsx(o.code,{children:'role="contentinfo"'})," to ensure screen reader users can identify and navigate to the footer section."]}),`
`,e.jsxs(o.li,{children:["Footer items are rendered as list items with ",e.jsx(o.code,{children:'role="listitem"'})," within a list structure for proper semantic navigation."]}),`
`,e.jsx(o.li,{children:"All links within footer items should have descriptive text to indicate their purpose to assistive technology users."}),`
`,e.jsx(o.li,{children:"The footer maintains keyboard navigation accessibility, allowing users to tab through footer links in logical order."}),`
`,e.jsx(o.li,{children:"Custom content within footer items should follow WCAG guidelines for color contrast, text sizing, and interactive elements."}),`
`]})]})}function M(t={}){const{wrapper:o}={...r(),...t.components};return o?e.jsx(o,{...t,children:e.jsx(n,{...t})}):n(t)}export{M as default};
