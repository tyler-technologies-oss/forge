import{j as e,M as s,T as a,C as r}from"./blocks-C3gDyZIu.js";import{useMDXComponents as o}from"./index-CqaAC5S2.js";import{C as l}from"./CustomArgTypes-CNLaeSI0.js";import{S as c,D as h}from"./SkipLink.stories-kio1rp84.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BciiVb0K.js";import"./utils-D7XrLKwY.js";import"./style-map-Djxu7jNR.js";import"./directive-CJw_OlP2.js";import"./feature-detection-BwPJgXni.js";import"./skip-link-k1_M2gBN.js";import"./constants-y3-o2nLB.js";import"./index-5CPwzmQS.js";import"./focus-indicator-B9KMEBVK.js";import"./base-adapter-BB1UtCX3.js";import"./utils-BtvMddIW.js";import"./state-layer-CLjAHnoF.js";function i(n){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",p:"p",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:c}),`
`,e.jsx(a,{}),`
`,e.jsx(t.p,{children:"Skip links are used at the beginning of a page to allow users to skip over repetitive content."}),`
`,e.jsx(r,{of:h}),`
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
`,e.jsx(l,{})]})}function T(n={}){const{wrapper:t}={...o(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{T as default};
