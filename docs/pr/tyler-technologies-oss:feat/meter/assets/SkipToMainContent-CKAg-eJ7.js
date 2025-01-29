import{j as t,M as r,C as s}from"./index-C6Hdcxq5.js";import{useMDXComponents as n}from"./index-CsBpHjjB.js";import{S as p,D as m}from"./SkipToMainContent.stories-tY1DqMVo.js";import"./iframe-DI60IBBq.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./lit-element-JplMEnZc.js";import"./lit-html-paDGiEfB.js";import"./index-fxMNKkgx.js";import"./decorators-DOnQS6BC.js";import"./icon-B5S0VGIT.js";import"./constants-BjnHqKgS.js";import"./feature-detection-ONR9WHvu.js";import"./base-adapter-CQdYccXX.js";import"./index-BmocOEUj.js";import"./scaffold-BAruaYLU.js";import"./app-bar-profile-button-CSm9dK8_.js";import"./focus-indicator-R2otSvsR.js";import"./state-layer-B7GOb8iB.js";import"./index-ByifSpfC.js";import"./icon-button-DipNuXsM.js";import"./base-button-adapter-OmzAW3c3.js";import"./with-label-aware-DAaZnhel.js";import"./with-default-aria-BcIvJ7-x.js";import"./a11y-utils-BOPvdiVn.js";import"./tooltip-D0ywHBAv.js";import"./overlay-DAcircNE.js";import"./with-longpress-listener-S3ft74cg.js";import"./dismissible-stack-9mJiid_W.js";import"./badge-CzgFSHGZ.js";import"./menu-C_FdmaDG.js";import"./list-CfkU0djA.js";import"./list-dropdown-aware-core-CaA2Y1xF.js";import"./list-dropdown-DebMMgrE.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-DPUjJFYN.js";import"./popover-Dq2OmXS_.js";import"./skeleton-Dfdgg-pt.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-D9tVS5jC.js";import"./avatar-Du1LPt_G.js";import"./button-vPgaRyW5.js";import"./toolbar-Lhya2ayG.js";import"./card-WC0g-TsN.js";function i(o){const e={a:"a",blockquote:"blockquote",code:"code",h1:"h1",li:"li",p:"p",ul:"ul",...n(),...o.components};return t.jsxs(t.Fragment,{children:[t.jsx(r,{of:p}),`
`,t.jsx(e.h1,{id:"recipe-skip-to-main-content",children:"Recipe: Skip To Main Content"}),`
`,t.jsxs(e.p,{children:['Use a "skip to main content" element to meet ',t.jsx(e.a,{href:"https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks.html",rel:"nofollow",children:"WCAG 2 Criteria 2.4.1: Bypass Blocks"}),`.
This allows users to skip repeated content blocks in order to get more direct access to the primary content of a web page.`]}),`
`,t.jsxs(e.blockquote,{children:[`
`,t.jsx(e.p,{children:"Recommended for public facing (community) applications."}),`
`]}),`
`,t.jsx(e.p,{children:"Meets needs for:"}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsx(e.li,{children:"Sighted keyboard users"}),`
`,t.jsx(e.li,{children:"Users with visual impairments"}),`
`]}),`
`,t.jsx(s,{of:m}),`
`,t.jsx(e.p,{children:`The important aspect of this recipe is to ensure that the skip link is visible when focused, and that it is the first focusable element on the page.
This allows users to quickly navigate to the main content of the page without having to tab through all of the other interactive elements.`}),`
`,t.jsxs(e.p,{children:["You should always use an ",t.jsx(e.code,{children:"<a>"}),` element, and ensure that you prevent the default action when the link is clicked to avoid reloading the page. Use a
hash link to the `,t.jsx(e.code,{children:"id"})," of the main content element to ensure that the user is taken directly to the main content."]})]})}function et(o={}){const{wrapper:e}={...n(),...o.components};return e?t.jsx(e,{...o,children:t.jsx(i,{...o})}):i(o)}export{et as default};
