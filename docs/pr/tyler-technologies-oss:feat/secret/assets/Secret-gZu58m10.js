import{j as e,M as o,T as l,C as i}from"./blocks-CzBgapfP.js";import{useMDXComponents as r}from"./index-BiboUukZ.js";import{C as c}from"./CustomArgTypes-CBHcatGL.js";import{S as d,D as a,B as h,a as p,W as x,b as j,L as m,I as u,P as b}from"./Secret.stories-BQPUb4Ky.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CTlBxetq.js";import"./utils-CW5S_tZJ.js";import"./service-adapter-CffG5Lhq.js";import"./secret-Cdza3oU8.js";import"./base-lit-element-CQF9iV0S.js";import"./query-assigned-nodes-DwurYzgD.js";import"./class-map-CSW7lCGB.js";import"./directive-CJw_OlP2.js";import"./a11y-utils-Dj08p-2z.js";import"./feature-detection-B-sRDmdg.js";import"./utils-Bd6MGx91.js";import"./focus-indicator-DqecK8AZ.js";import"./icon-8E01u_jy.js";import"./constants-DzQy6WDX.js";import"./base-adapter-C8aSF3nG.js";import"./index-5CPwzmQS.js";import"./state-layer-BEEsPoZf.js";import"./tooltip-B59ljHGY.js";import"./overlay-B5pGv-rV.js";import"./with-longpress-listener-DtGZwA0v.js";import"./dismissible-stack-TpzCxM2R.js";import"./with-default-aria-6GN_uk1I.js";function t(s){const n={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r(),...s.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:d}),`
`,e.jsx(l,{}),`
`,e.jsx(n.p,{children:"The secret component conceals inline content with a visual effect (blur or dots), revealing it on user interaction."}),`
`,e.jsx(i,{of:a}),`
`,e.jsx(n.h2,{id:"variants",children:"Variants"}),`
`,e.jsx(n.p,{children:"The secret component offers two visual effects for concealing content: blur and dots."}),`
`,e.jsx(n.h3,{id:"blur",children:"Blur"}),`
`,e.jsx(n.p,{children:"The default variant applies a blur effect to conceal the content while maintaining its shape."}),`
`,e.jsx(i,{of:h}),`
`,e.jsx(n.h3,{id:"dots",children:"Dots"}),`
`,e.jsx(n.p,{children:"The dots variant replaces the content with a dot pattern when hidden."}),`
`,e.jsx(i,{of:p}),`
`,e.jsx(n.h2,{id:"with-label",children:"With Label"}),`
`,e.jsxs(n.p,{children:["Use the ",e.jsx(n.code,{children:"label"})," slot to add descriptive text to the secret's button."]}),`
`,e.jsx(i,{of:x}),`
`,e.jsx(n.h2,{id:"show-on-hover",children:"Show on Hover"}),`
`,e.jsxs(n.p,{children:["Enable ",e.jsx(n.code,{children:"show-on-hover"})," to reveal content on hover or focus in addition to click. This is useful for quick previews while still requiring an intentional click for mobile users."]}),`
`,e.jsx(i,{of:j}),`
`,e.jsx(n.h2,{id:"linked-group",children:"Linked Group"}),`
`,e.jsxs(n.p,{children:["Multiple secrets with the same ",e.jsx(n.code,{children:"name"})," act as a linked group — only one can be visible at a time. This prevents multiple sensitive items from being exposed simultaneously."]}),`
`,e.jsx(i,{of:m}),`
`,e.jsx(n.h2,{id:"inline-usage",children:"Inline Usage"}),`
`,e.jsx(n.p,{children:"The component is designed to work inline with surrounding text."}),`
`,e.jsx(i,{of:u}),`
`,e.jsx(n.h2,{id:"programmatic-control",children:"Programmatic Control"}),`
`,e.jsxs(n.p,{children:["Control visibility programmatically using the ",e.jsx(n.code,{children:"visible"})," property and listen for visibility changes via the ",e.jsx(n.code,{children:"forge-secret-change"})," event."]}),`
`,e.jsx(i,{of:b}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(c,{}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsx(n.p,{children:"The secret component follows accessibility best practices:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Uses a ",e.jsx(n.code,{children:"<button>"})," overlay with proper ARIA attributes (",e.jsx(n.code,{children:'role="group"'}),", ",e.jsx(n.code,{children:'aria-label="secret"'}),", ",e.jsx(n.code,{children:"aria-expanded"}),")"]}),`
`,e.jsxs(n.li,{children:["Content is marked ",e.jsx(n.code,{children:"inert"})," when hidden to prevent interaction and focus"]}),`
`,e.jsxs(n.li,{children:["Screen reader announcements via ",e.jsx(n.code,{children:"aria-live"})," region when content is revealed"]}),`
`,e.jsx(n.li,{children:"Full keyboard support (Enter/Space to toggle, Escape to hide)"}),`
`,e.jsxs(n.li,{children:["Uses ",e.jsx(n.code,{children:"<forge-focus-indicator>"})," for clear focus styling"]}),`
`,e.jsxs(n.li,{children:["Uses ",e.jsx(n.code,{children:"<forge-state-layer>"})," for interaction feedback"]}),`
`]}),`
`,e.jsx(n.h3,{id:"labeling",children:"Labeling"}),`
`,e.jsxs(n.p,{children:["Always provide context for secret content. Use the ",e.jsx(n.code,{children:"label"})," slot or surrounding text so users understand what's hidden. Avoid relying solely on visual cues."]}),`
`,e.jsx(n.h3,{id:"keyboard-support",children:"Keyboard Support"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Key"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsxs(n.td,{children:[e.jsx("kbd",{children:"Enter"})," or ",e.jsx("kbd",{children:"Space"})]}),e.jsx(n.td,{children:"Toggle visibility"})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx("kbd",{children:"Escape"})}),e.jsx(n.td,{children:"Hide visible content"})]})]})]}),`
`,e.jsx(n.h2,{id:"use-cases",children:"Use Cases"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Sensitive information display (passwords, API keys, tokens)"}),`
`,e.jsx(n.li,{children:"Privacy protection (email addresses, phone numbers, account numbers)"}),`
`,e.jsx(n.li,{children:"Documentation examples (credentials, test data)"}),`
`,e.jsx(n.li,{children:"Educational content (spoilers, quiz answers)"}),`
`]})]})}function O(s={}){const{wrapper:n}={...r(),...s.components};return n?e.jsx(n,{...s,children:e.jsx(t,{...s})}):t(s)}export{O as default};
