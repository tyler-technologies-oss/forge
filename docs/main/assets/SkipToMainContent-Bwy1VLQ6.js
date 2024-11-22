import{ae as t,af as r,ah as s}from"./index-CEtVyEX8.js";import{u as n}from"./index-vjXF0Th_.js";import{S as p,D as m}from"./SkipToMainContent.stories-CBsIb_VM.js";import"./iframe-UIQlEX8k.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./lit-element-CgJqSpuc.js";import"./lit-html-paDGiEfB.js";import"./index-fxMNKkgx.js";import"./decorators-DJTA_amK.js";import"./icon-FszQmWVN.js";import"./constants-CFf81ck9.js";import"./base-adapter-Dh44vCkH.js";import"./index-BmocOEUj.js";import"./scaffold-CJaNXwdy.js";import"./app-bar-profile-button-TQNmMNfI.js";import"./focus-indicator-DesOnyyZ.js";import"./state-layer-COSQHCpS.js";import"./index-ByifSpfC.js";import"./icon-button-DxSYWoFH.js";import"./base-button-adapter-BS886vuU.js";import"./with-label-aware-CjYHyB6d.js";import"./with-default-aria-CAIVLMQ_.js";import"./tooltip-ClBWJcYu.js";import"./overlay-DUpFUxF7.js";import"./with-longpress-listener-B4oujpK4.js";import"./dismissible-stack-DVth9mRg.js";import"./badge-CflmfcPU.js";import"./menu-CNDrq6h_.js";import"./list-CZ9CZlmI.js";import"./list-dropdown-aware-core-CAUNISDm.js";import"./list-dropdown-BD7Ph7Qn.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-DKZR2TB_.js";import"./popover-CFhwSXnG.js";import"./skeleton-RPu_OG0b.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-rOUUL8H7.js";import"./avatar-BlmOt8Ln.js";import"./button-CVZhEkBO.js";import"./toolbar-CKT6WFUk.js";import"./card-CgGa1_Bt.js";function i(o){const e={a:"a",blockquote:"blockquote",code:"code",h1:"h1",li:"li",p:"p",ul:"ul",...n(),...o.components};return t.jsxs(t.Fragment,{children:[t.jsx(r,{of:p}),`
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
hash link to the `,t.jsx(e.code,{children:"id"})," of the main content element to ensure that the user is taken directly to the main content."]})]})}function tt(o={}){const{wrapper:e}={...n(),...o.components};return e?t.jsx(e,{...o,children:t.jsx(i,{...o})}):i(o)}export{tt as default};
