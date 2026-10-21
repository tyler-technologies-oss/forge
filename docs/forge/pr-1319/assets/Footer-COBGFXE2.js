import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-92lRto7J.js";import{n as c,t as l}from"./CustomArgTypes-sQOLn0vT.js";import{n as u,r as d,t as f}from"./Footer.stories-CH3q34Sa.js";function p(e){let n={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:u}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsxs)(n.p,{children:[`The `,(0,h.jsx)(n.code,{children:`<forge-footer>`}),` component provides a flexible page footer pattern for site navigation, policy links, and secondary information. It supports different layout modes and adapts responsively when `,(0,h.jsx)(n.code,{children:`layout="auto"`}),` is used.`]}),`
`,(0,h.jsx)(a,{of:f}),`
`,(0,h.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,h.jsxs)(n.p,{children:[`The footer is intended to wrap one or more `,(0,h.jsx)(n.code,{children:`<forge-footer-item>`}),` children. Each footer item can contain links, text, or other simple inline content.`]}),`
`,(0,h.jsx)(n.pre,{children:(0,h.jsx)(n.code,{className:`language-html`,children:`<forge-footer>
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
`,(0,h.jsx)(n.h3,{id:`layout-modes`,children:`Layout modes`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`standard`}),`: Always render the standard footer layout.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`alternative`}),`: Always render the alternative footer layout.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`auto`}),`: Responsively switch between `,(0,h.jsx)(n.code,{children:`standard`}),` and `,(0,h.jsx)(n.code,{children:`alternative`}),` based on the `,(0,h.jsx)(n.code,{children:`layoutBreakpoint`}),` width.`]}),`
`]}),`
`,(0,h.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,h.jsx)(l,{}),`
`,(0,h.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[`The footer uses `,(0,h.jsx)(n.code,{children:`role="contentinfo"`}),` to ensure screen reader users can identify and navigate to the footer section.`]}),`
`,(0,h.jsxs)(n.li,{children:[`Footer items are rendered as list items with `,(0,h.jsx)(n.code,{children:`role="listitem"`}),` within a list structure for proper semantic navigation.`]}),`
`,(0,h.jsx)(n.li,{children:`All links within footer items should have descriptive text to indicate their purpose to assistive technology users.`}),`
`,(0,h.jsx)(n.li,{children:`The footer maintains keyboard navigation accessibility, allowing users to tab through footer links in logical order.`}),`
`,(0,h.jsx)(n.li,{children:`Custom content within footer items should follow WCAG guidelines for color contrast, text sizing, and interactive elements.`}),`
`]})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=r(),n(),i(),c(),d()})))()}g();export{m as default};