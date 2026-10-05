import{u as n,j as e,M as s,T as r,C as a}from"./blocks-DyG_R4cd.js";import{C as p}from"./CustomArgTypes-B74mDj-q.js";import{S as l,D as c}from"./SkipLink.stories-eu76cG9W.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DL6KFQ_f.js";import"./iframe-DuTL4nLl.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-CwE7tZFf.js";import"./style-map-WHZOtuyF.js";import"./directive-CwRn8Fwj.js";import"./service-adapter-8tADcN_b.js";import"./skip-link-VFniT5GO.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./class-map-C0XngG5m.js";import"./property-BGhPRx62.js";import"./base-lit-element-BVpLHOdt.js";import"./async-directive-BKNhKO1r.js";import"./focus-indicator-DnG7A_bn.js";import"./floating-ui.dom-DaMtbvS2.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./utils-C31il88P.js";import"./state-layer-gtlkuVuf.js";import"./custom-element-DR9AFpIK.js";import"./core-property-Co8uF8PW.js";import"./base-adapter-DOky_or5.js";import"./dom-utils-BDbRr6KM.js";import"./constants-ffvdo6x3.js";import"./create-context-BxR5I8pu.js";import"./base-component-BFu9bkgC.js";function o(i){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",p:"p",...n(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:l}),`
`,e.jsx(r,{}),`
`,e.jsx(t.p,{children:"Skip links are used at the beginning of a page to allow users to skip over repetitive content."}),`
`,e.jsx(a,{of:c}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.p,{children:["Always include a skip link as the first child of the ",e.jsx(t.code,{children:"<body>"}),` element that targets the main content of the page. Any page with
content, navigation or otherwise, that repeats across the start of multiple pages should include a skip link. You may use more
than one to link to multiple areas of the page, but be judicious because too many skip links can themselves become frustrating
to navigate. Remember, users of assistive technology have their own methods to navigate between landmarks on a page and may not
appreciate the extra "help."`]}),`
`,e.jsx(t.p,{children:`You may also include an inline skip link within a page to skip to relevant content. For example, a skip link could be used to
bypass search filters and go directly to the list of results. Ensure that the text of the skip link clearly indicates what it
navigates to.`}),`
`,e.jsxs(t.p,{children:["The target element should always have ",e.jsx(t.code,{children:'tabindex="-1"'}),` set as an attribute if it is not otherwise focusable. This allows the
browser to focus it after navigation without including it in the tab order.`]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsx(t.p,{children:`In Safari, the skip link component does not behave the same as in other browsers because anchor links are never included in the
tab order. Screen reader users can still perceive the skip link and use it to navigate the page.`}),`
`]}),`
`,e.jsx(t.p,{children:e.jsx(t.a,{href:"https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html",rel:"nofollow",children:"See WCAG Success Criterion 2.4.1 for more information."})}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(p,{})]})}function U(i={}){const{wrapper:t}={...n(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(o,{...i})}):o(i)}export{U as default};
