import{j as t,M as a,T as s,C as e}from"./blocks-jBeb--Zy.js";import{useMDXComponents as r}from"./index-BiIhZB5g.js";import{C as c}from"./CustomArgTypes-B68Lw4E-.js";import{C as l}from"./CssOnlyInformation-DSxEpQgs.js";import{A as h,D as p,W as m,a as d,b as u,C as x}from"./Avatar.stories-CDCKqy6T.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-C2OLFiEs.js";import"./utils-Cqbxq2Mi.js";import"./icon-kuXwuZAY.js";import"./constants-DzQy6WDX.js";import"./service-adapter-CffG5Lhq.js";import"./feature-detection-B-sRDmdg.js";import"./base-adapter-C8aSF3nG.js";import"./index-5CPwzmQS.js";import"./style-map-B0Mvy1fp.js";import"./directive-CJw_OlP2.js";import"./avatar-C3ZLWfRG.js";import"./base-lit-element-C9ug6T_L.js";import"./state-B-PYvksA.js";import"./class-map-iWrBTVHa.js";import"./avatar-constants-B5Xsdbpi.js";import"./icon-button-uist0Hlh.js";import"./base-button-adapter-CdR3VJ_u.js";import"./with-label-aware-C7up74QW.js";import"./with-default-aria-6GN_uk1I.js";import"./a11y-utils-Dj08p-2z.js";import"./utils-Bd6MGx91.js";import"./focus-indicator-BfYyibdg.js";import"./state-layer-gAgMwMHF.js";function i(o){const n={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...o.components};return t.jsxs(t.Fragment,{children:[t.jsx(a,{of:h}),`
`,t.jsx(s,{}),`
`,t.jsx(n.p,{children:`Avatars allow you to provide text or images to display that represent an entity. By default, the avatar will
display text content as single characters (character count is configurable), or display an icon or image
based on the URL provided to it.`}),`
`,t.jsx(e,{of:p}),`
`,t.jsx(n.h2,{id:"with-icon",children:"With Icon"}),`
`,t.jsxs(n.p,{children:["You can compose avatars together with icons using the ",t.jsx(n.code,{children:"<forge-icon>"}),` component. The avatar will automatically
apply the proper dimensions to the icon.`]}),`
`,t.jsx(e,{of:m}),`
`,t.jsx(n.h2,{id:"with-image",children:"With Image"}),`
`,t.jsx(n.p,{children:`When using with an image, the avatar will apply your image as that background of the avatar (replacing the
background color). The image will be sized to fit the avatar dimensions.`}),`
`,t.jsx(e,{of:d}),`
`,t.jsx(n.h2,{id:"with-icon-button",children:"With Icon Button"}),`
`,t.jsx(n.p,{children:"Avatars can be composed within other components, such as icon buttons."}),`
`,t.jsx(e,{of:u}),`
`,t.jsxs(n.blockquote,{children:[`
`,t.jsxs(n.p,{children:[t.jsx(n.strong,{children:"Important:"})," Be sure to provide an accessible label for the icon button."]}),`
`]}),`
`,t.jsx(n.h2,{id:"api",children:"API"}),`
`,t.jsx(c,{}),`
`,t.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,t.jsxs(n.ul,{children:[`
`,t.jsxs(n.li,{children:["Note that the avatar component may not be visible to screen readers.",`
`,t.jsxs(n.ul,{children:[`
`,t.jsxs(n.li,{children:["Use ",t.jsx(n.code,{children:"aria-hidden"})," to ensure that the avatar content is ignored by a screen reader."]}),`
`]}),`
`]}),`
`,t.jsx(n.li,{children:"Avoid using the avatar component for any essential navigation."}),`
`,t.jsx(n.li,{children:"If color conveys important information, provide additional cues for users with color perception deficiencies."}),`
`,t.jsx(n.li,{children:"Verify that there is sufficient contrast between the foreground text and background to meet WCAG 2.2 requirements."}),`
`]}),`
`,t.jsx(n.h2,{id:"css-only",children:"CSS-Only"}),`
`,t.jsx(n.p,{children:"The avatar component is also available as a CSS-only component without the need for JavaScript."}),`
`,t.jsx(e,{of:x}),`
`,t.jsx(l,{})]})}function P(o={}){const{wrapper:n}={...r(),...o.components};return n?t.jsx(n,{...o,children:t.jsx(i,{...o})}):i(o)}export{P as default};
