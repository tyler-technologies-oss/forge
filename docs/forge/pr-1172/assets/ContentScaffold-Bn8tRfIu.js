import{u as s,j as e,M as i,T as r,C as l}from"./blocks-CRtB2q9J.js";import{C as d}from"./CustomArgTypes-Ca9SwHoY.js";import{C as a,D as c}from"./ContentScaffold.stories-BRTyA5M8.js";import"./preload-helper-PPVm8Dsz.js";import"./index-B5Tn_34B.js";import"./iframe-DQLkTsj5.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-RooUwGan.js";import"./service-adapter-DlT-lJx7.js";import"./content-scaffold-DrSDkcAf.js";import"./query-assigned-nodes-D8SsSM9e.js";import"./base-DVmwUFg0.js";import"./when-CI7b_ccM.js";import"./base-lit-element-D917_3Iy.js";import"./directive-CwRn8Fwj.js";function n(o){const t={blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",ul:"ul",...s(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{of:a,tags:["hidden"]}),`
`,e.jsx(r,{}),`
`,e.jsx(t.p,{children:"The Content Scaffold provides a structured layout for organizing content into distinct header, body, and footer sections. It uses CSS Grid to create a flexible container where the header and footer automatically size to their content, while the body expands to fill all available space."}),`
`,e.jsx(t.p,{children:"This component helps standardize the layout of cards, dialogs, side panels, and any UI pattern requiring a consistent header/body/footer structure. By providing a reusable layout primitive, it ensures visual consistency across your application while eliminating the need to recreate common layout patterns."}),`
`,e.jsx(l,{of:c}),`
`,e.jsx(t.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(t.p,{children:"The Content Scaffold is ideal for creating consistent content layouts where you need a fixed header and/or footer with a scrollable body section. The component automatically handles the layout arrangement using CSS Grid, ensuring the body section takes up all remaining vertical space."}),`
`,e.jsx(t.h2,{id:"structure",children:"Structure"}),`
`,e.jsx(t.p,{children:"The Content Scaffold supports two layout modes for headers and footers, automatically determined by which slots you use:"}),`
`,e.jsx(t.h3,{id:"full-width-mode-recommended-for-complex-layouts",children:"Full-Width Mode (Recommended for Complex Layouts)"}),`
`,e.jsxs(t.p,{children:["When you place content in the ",e.jsx(t.code,{children:"header"})," or ",e.jsx(t.code,{children:"footer"})," slots, full-width mode is automatically enabled, giving you complete control over the layout:"]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"header"})," - Full-width header content slot (hides the multi-slot header layout when used)"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"body"})," - Main content area that expands to fill available space (1fr)"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"footer"})," - Full-width footer content slot (hides the multi-slot footer layout when used)"]}),`
`]}),`
`,e.jsx(t.h3,{id:"standard-mode-built-in-layout",children:"Standard Mode (Built-in Layout)"}),`
`,e.jsxs(t.p,{children:["When the ",e.jsx(t.code,{children:"header"})," and ",e.jsx(t.code,{children:"footer"})," slots are empty, the component provides a built-in toolbar layout with multiple slots:"]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"before-header-start"})," - Content displayed before the header start slot (e.g., back button, icon)"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"header-start"})," - Content displayed at the start of the header section (e.g., title, heading)"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"header-end"})," - Content displayed at the end of the header section (e.g., actions, menus)"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"body"})," - Main content area that expands to fill available space (1fr)"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"footer-start"})," - Content displayed at the start of the footer section (e.g., pagination)"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"footer-end"})," - Content displayed at the end of the footer section (e.g., action buttons)"]}),`
`]}),`
`,e.jsx(t.p,{children:"All slots are optional, allowing you to use only the sections you need for your specific use case."}),`
`,e.jsx(t.h2,{id:"common-use-cases",children:"Common Use Cases"}),`
`,e.jsx(t.p,{children:"The Content Scaffold is particularly useful for:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Detail panels with a title header and action footer"}),`
`,e.jsx(t.li,{children:"Card layouts with header toolbars and footer actions"}),`
`,e.jsx(t.li,{children:"Content areas that need a consistent three-section layout"}),`
`,e.jsx(t.li,{children:"Scrollable content regions with fixed headers and footers"}),`
`]}),`
`,e.jsx(t.h2,{id:"layout-behavior",children:"Layout Behavior"}),`
`,e.jsxs(t.p,{children:["The component uses ",e.jsx(t.code,{children:"display: grid"})," with ",e.jsx(t.code,{children:"grid-template-rows: auto 1fr auto"})," to arrange the three sections:"]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Header and footer use ",e.jsx(t.code,{children:"auto"})," sizing, taking only the space their content requires"]}),`
`,e.jsxs(t.li,{children:["Body uses ",e.jsx(t.code,{children:"1fr"}),", expanding to fill all remaining vertical space"]}),`
`,e.jsxs(t.li,{children:["The container is set to ",e.jsx(t.code,{children:"height: 100%"}),", inheriting height from its parent"]}),`
`]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note:"})," For the Content Scaffold to properly fill available space, ensure its parent container has a defined height."]}),`
`]}),`
`,e.jsx(t.h2,{id:"css-custom-properties",children:"CSS Custom Properties"}),`
`,e.jsx(t.p,{children:"The component exposes several CSS custom properties for customization:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"--forge-content-scaffold-header-height"})," - Controls the height of the header section. Defaults to ",e.jsx(t.code,{children:"auto"}),"."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"--forge-content-scaffold-header-background"})," - Controls the background color of the header. Defaults to ",e.jsx(t.code,{children:"transparent"}),"."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"--forge-content-scaffold-header-min-height"})," - Controls the minimum height of the header. Defaults to ",e.jsx(t.code,{children:"48px"}),"."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"--forge-content-scaffold-body-height"})," - Controls the height of the body section. Defaults to ",e.jsx(t.code,{children:"auto"}),"."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"--forge-content-scaffold-body-padding-inline"})," - Controls the inline padding applied to the body section. Defaults to Forge's medium spacing token."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"--forge-content-scaffold-footer-height"})," - Controls the height of the footer section. Defaults to ",e.jsx(t.code,{children:"auto"}),"."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"--forge-content-scaffold-footer-background"})," - Controls the background color of the footer. Defaults to ",e.jsx(t.code,{children:"transparent"}),"."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"--forge-content-scaffold-footer-min-height"})," - Controls the minimum height of the footer. Defaults to ",e.jsx(t.code,{children:"48px"}),"."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"--forge-content-scaffold-footer-full-padding"})," - Controls the padding applied to full-width footer content. Defaults to Forge's small spacing token."]}),`
`]}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(d,{})]})}function k(o={}){const{wrapper:t}={...s(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{k as default};
