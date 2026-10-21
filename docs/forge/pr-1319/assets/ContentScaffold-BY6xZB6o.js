import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-BjnIcTYW.js";import{n as c,t as l}from"./CustomArgTypes-DROUQxDe.js";import{n as u,r as d,t as f}from"./ContentScaffold.stories-C83uHqL6.js";function p(e){let n={blockquote:`blockquote`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(s,{of:f,tags:[`hidden`]}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsx)(n.p,{children:`The Content Scaffold provides a structured layout for organizing content into distinct header, body, and footer sections. It uses CSS Grid to create a flexible container where the header and footer automatically size to their content, while the body expands to fill all available space.`}),`
`,(0,h.jsx)(n.p,{children:`This component helps standardize the layout of cards, dialogs, side panels, and any UI pattern requiring a consistent header/body/footer structure. By providing a reusable layout primitive, it ensures visual consistency across your application while eliminating the need to recreate common layout patterns.`}),`
`,(0,h.jsx)(a,{of:u}),`
`,(0,h.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,h.jsx)(n.p,{children:`The Content Scaffold is ideal for creating consistent content layouts where you need a fixed header and/or footer with a scrollable body section. The component automatically handles the layout arrangement using CSS Grid, ensuring the body section takes up all remaining vertical space.`}),`
`,(0,h.jsx)(n.h2,{id:`structure`,children:`Structure`}),`
`,(0,h.jsx)(n.p,{children:`The Content Scaffold supports two layout modes for headers and footers, automatically determined by which slots you use:`}),`
`,(0,h.jsx)(n.h3,{id:`full-width-mode-recommended-for-complex-layouts`,children:`Full-Width Mode (Recommended for Complex Layouts)`}),`
`,(0,h.jsxs)(n.p,{children:[`When you place content in the `,(0,h.jsx)(n.code,{children:`header`}),` or `,(0,h.jsx)(n.code,{children:`footer`}),` slots, full-width mode is automatically enabled, giving you complete control over the layout:`]}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.strong,{children:`header`}),` - Full-width header content slot (hides the multi-slot header layout when used)`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.strong,{children:`body`}),` - Main content area that expands to fill available space (1fr)`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.strong,{children:`footer`}),` - Full-width footer content slot (hides the multi-slot footer layout when used)`]}),`
`]}),`
`,(0,h.jsx)(n.h3,{id:`standard-mode-built-in-layout`,children:`Standard Mode (Built-in Layout)`}),`
`,(0,h.jsxs)(n.p,{children:[`When the `,(0,h.jsx)(n.code,{children:`header`}),` and `,(0,h.jsx)(n.code,{children:`footer`}),` slots are empty, the component provides a built-in toolbar layout with multiple slots:`]}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.strong,{children:`before-header-start`}),` - Content displayed before the header start slot (e.g., back button, icon)`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.strong,{children:`header-start`}),` - Content displayed at the start of the header section (e.g., title, heading)`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.strong,{children:`header-end`}),` - Content displayed at the end of the header section (e.g., actions, menus)`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.strong,{children:`body`}),` - Main content area that expands to fill available space (1fr)`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.strong,{children:`footer-start`}),` - Content displayed at the start of the footer section (e.g., pagination)`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.strong,{children:`footer-end`}),` - Content displayed at the end of the footer section (e.g., action buttons)`]}),`
`]}),`
`,(0,h.jsx)(n.p,{children:`All slots are optional, allowing you to use only the sections you need for your specific use case.`}),`
`,(0,h.jsx)(n.h2,{id:`common-use-cases`,children:`Common Use Cases`}),`
`,(0,h.jsx)(n.p,{children:`The Content Scaffold is particularly useful for:`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsx)(n.li,{children:`Detail panels with a title header and action footer`}),`
`,(0,h.jsx)(n.li,{children:`Card layouts with header toolbars and footer actions`}),`
`,(0,h.jsx)(n.li,{children:`Content areas that need a consistent three-section layout`}),`
`,(0,h.jsx)(n.li,{children:`Scrollable content regions with fixed headers and footers`}),`
`]}),`
`,(0,h.jsx)(n.h2,{id:`layout-behavior`,children:`Layout Behavior`}),`
`,(0,h.jsxs)(n.p,{children:[`The component uses `,(0,h.jsx)(n.code,{children:`display: grid`}),` with `,(0,h.jsx)(n.code,{children:`grid-template-rows: auto 1fr auto`}),` to arrange the three sections:`]}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[`Header and footer use `,(0,h.jsx)(n.code,{children:`auto`}),` sizing, taking only the space their content requires`]}),`
`,(0,h.jsxs)(n.li,{children:[`Body uses `,(0,h.jsx)(n.code,{children:`1fr`}),`, expanding to fill all remaining vertical space`]}),`
`,(0,h.jsxs)(n.li,{children:[`The container is set to `,(0,h.jsx)(n.code,{children:`height: 100%`}),`, inheriting height from its parent`]}),`
`]}),`
`,(0,h.jsxs)(n.blockquote,{children:[`
`,(0,h.jsxs)(n.p,{children:[(0,h.jsx)(n.strong,{children:`Note:`}),` For the Content Scaffold to properly fill available space, ensure its parent container has a defined height.`]}),`
`]}),`
`,(0,h.jsx)(n.h2,{id:`css-custom-properties`,children:`CSS Custom Properties`}),`
`,(0,h.jsx)(n.p,{children:`The component exposes several CSS custom properties for customization:`}),`
`,(0,h.jsxs)(n.ul,{children:[`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`--forge-content-scaffold-header-height`}),` - Controls the height of the header section. Defaults to `,(0,h.jsx)(n.code,{children:`auto`}),`.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`--forge-content-scaffold-header-background`}),` - Controls the background color of the header. Defaults to `,(0,h.jsx)(n.code,{children:`transparent`}),`.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`--forge-content-scaffold-header-min-height`}),` - Controls the minimum height of the header. Defaults to `,(0,h.jsx)(n.code,{children:`48px`}),`.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`--forge-content-scaffold-body-height`}),` - Controls the height of the body section. Defaults to `,(0,h.jsx)(n.code,{children:`auto`}),`.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`--forge-content-scaffold-body-padding-inline`}),` - Controls the inline padding applied to the body section. Defaults to Forge's medium spacing token.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`--forge-content-scaffold-footer-height`}),` - Controls the height of the footer section. Defaults to `,(0,h.jsx)(n.code,{children:`auto`}),`.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`--forge-content-scaffold-footer-background`}),` - Controls the background color of the footer. Defaults to `,(0,h.jsx)(n.code,{children:`transparent`}),`.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`--forge-content-scaffold-footer-min-height`}),` - Controls the minimum height of the footer. Defaults to `,(0,h.jsx)(n.code,{children:`48px`}),`.`]}),`
`,(0,h.jsxs)(n.li,{children:[(0,h.jsx)(n.code,{children:`--forge-content-scaffold-footer-full-padding`}),` - Controls the padding applied to full-width footer content. Defaults to Forge's small spacing token.`]}),`
`]}),`
`,(0,h.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,h.jsx)(l,{})]})}function m(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(p,{...e})}):p(e)}var h;function g(){return(g=e((()=>{h=r(),n(),i(),c(),d()})))()}g();export{m as default};