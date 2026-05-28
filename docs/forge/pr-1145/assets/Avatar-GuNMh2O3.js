import{u as r,j as t,M as a,T as s,C as e}from"./blocks-DA9dI7um.js";import{C as c}from"./CustomArgTypes-DCT0eQTW.js";import{C as l}from"./CssOnlyInformation-B20wYFF0.js";import{A as h,D as p,W as m,a as d,b as u,C as x}from"./Avatar.stories-CILU_wba.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-GQTf_D8N.js";import"./utils-GdTrqNrR.js";import"./tyler-icons-CRSlnQfT.js";import"./utils-CjYv_z18.js";import"./service-adapter-8tADcN_b.js";import"./base-lit-element-CI7OxLBH.js";import"./directive-jorct-Oe.js";import"./constants-HtjJ9Nou.js";import"./feature-detection-DaAsmZBy.js";import"./style-map-CkYYj1vj.js";import"./avatar-D9zhtE7D.js";import"./state-CfniqpXE.js";import"./class-map-D4JRUC1k.js";import"./avatar-constants-CQjzk1nU.js";import"./icon-button-BiF83EQi.js";import"./base-component-CjLGUkBU.js";import"./dom-utils-D0uG6d5z.js";import"./base-adapter-CWZvffxF.js";import"./base-button-core-DCvP-drK.js";import"./with-label-aware-BQywrHZk.js";import"./with-default-aria-CU1tsccO.js";import"./a11y-utils-Cc0M_rsz.js";import"./focus-indicator-CM6xz98y.js";import"./utils-DU-9AqTO.js";import"./state-layer-B-p_OOit.js";function i(o){const n={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...o.components};return t.jsxs(t.Fragment,{children:[t.jsx(a,{of:h}),`
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
`,t.jsx(l,{})]})}function V(o={}){const{wrapper:n}={...r(),...o.components};return n?t.jsx(n,{...o,children:t.jsx(i,{...o})}):i(o)}export{V as default};
