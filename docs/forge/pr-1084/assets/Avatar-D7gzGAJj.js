import{j as t,M as a,T as s,C as e}from"./blocks-CtKK8XdG.js";import{useMDXComponents as r}from"./index-DNo25mez.js";import{C as c}from"./CustomArgTypes-JciXZ5xa.js";import{C as l}from"./CssOnlyInformation-DWBvHimR.js";import{A as h,D as p,W as m,a as d,b as u,C as x}from"./Avatar.stories-t_lck6Td.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-dAtU2vvt.js";import"./utils-B1jcnhxN.js";import"./tyler-icons-DRTyRvfU.js";import"./base-component-BWatm2PB.js";import"./service-adapter-CoGDs2_3.js";import"./feature-detection-D1CqJtyS.js";import"./base-adapter-BuHpYl3d.js";import"./index-DTwfV0k0.js";import"./style-map-DLMLRi3_.js";import"./directive-jorct-Oe.js";import"./avatar-DeVvw1Bv.js";import"./property-rsUy5yT0.js";import"./state-DF1PmXVN.js";import"./class-map-Ba43Z9mR.js";import"./base-lit-element-BM28i0q5.js";import"./avatar-constants-CcFyEVwL.js";import"./icon-button-40-NqBQw.js";import"./base-button-core-DKuGfZcp.js";import"./with-label-aware-BdHJcOJ4.js";import"./with-default-aria-BwzGA5R6.js";import"./a11y-utils-uud85_zm.js";import"./focus-indicator-BC2qbUuq.js";import"./utils-DU-9AqTO.js";import"./state-layer-D7Damx7l.js";function i(o){const n={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...o.components};return t.jsxs(t.Fragment,{children:[t.jsx(a,{of:h}),`
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
