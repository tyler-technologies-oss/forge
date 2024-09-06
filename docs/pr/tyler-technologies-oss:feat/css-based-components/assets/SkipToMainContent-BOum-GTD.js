import{j as t}from"./jsx-runtime-gdtrzl5b.js";import{u as n}from"./index-BVBmosDd.js";import{ae as r,ag as s}from"./index-BfJ3hnjl.js";import{S as p,D as m}from"./SkipToMainContent.stories-KCGndqwO.js";import"./iframe-47unJMMI.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-DxKRhftL.js";import"./index-DrFu-skq.js";import"./lit-element-Dk2-kgKT.js";import"./lit-html-DZH-Jm0H.js";import"./index-fxMNKkgx.js";import"./decorators-DvEJi2JG.js";import"./icon-DHpZ4R73.js";import"./constants-DjE6emXm.js";import"./base-adapter-F7QHxK2H.js";import"./index-Dh0vMUMR.js";import"./scaffold-R2qvsZCm.js";import"./app-bar-profile-button-C3o1GtYT.js";import"./focus-indicator-BpCDYqsq.js";import"./state-layer-DkOkOFSZ.js";import"./index-ByifSpfC.js";import"./icon-button-DSVS47IC.js";import"./base-button-adapter-O0rbh8zo.js";import"./with-label-aware-CLWydNrR.js";import"./with-default-aria-DCLjqsVH.js";import"./tooltip-CB-SMzj2.js";import"./overlay-oQigVWsx.js";import"./with-longpress-listener-D-8wsf8o.js";import"./dismissible-stack-DUAAgggE.js";import"./badge-BtnA6UF5.js";import"./menu-CHjAGzjo.js";import"./list-tzlsEZgh.js";import"./list-dropdown-aware-core-DfUgINQ8.js";import"./list-dropdown-BVbYUUzh.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-BjLGzdmZ.js";import"./popover-DMO_rraq.js";import"./skeleton-AD7XJ-QC.js";import"./a11y-BxM9_46k.js";import"./base-component-delegate-C6iOaLFP.js";import"./avatar-9nkaewEO.js";import"./button-DJU3J9XV.js";import"./toolbar-SJpnF1yY.js";import"./card-AhK8i1VF.js";function i(o){const e={a:"a",blockquote:"blockquote",code:"code",h1:"h1",li:"li",p:"p",ul:"ul",...n(),...o.components};return t.jsxs(t.Fragment,{children:[t.jsx(r,{of:p}),`
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
