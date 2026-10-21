import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-Bcs6hT4V.js";import{n as c,t as l}from"./CustomArgTypes-3XqZyV8V.js";import{a as u,c as d,i as f,n as p,o as m,r as h,s as g,t as _}from"./CountCard.stories-DMICvmJ1.js";function v(e){let n={blockquote:`blockquote`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(s,{of:p}),`
`,(0,b.jsx)(o,{}),`
`,(0,b.jsx)(n.p,{children:`A card component for displaying counts, metrics, or key values with an accompanying icon and label. Ideal for dashboards and summary views where you need to highlight important numbers at a glance.`}),`
`,(0,b.jsx)(a,{of:h}),`
`,(0,b.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,b.jsx)(n.p,{children:`The Count Card uses a slot-based architecture with eight main areas:`}),`
`,(0,b.jsxs)(n.ul,{children:[`
`,(0,b.jsxs)(n.li,{children:[(0,b.jsx)(n.strong,{children:`icon`}),` - An icon displayed in a styled container at the start of the header`]}),`
`,(0,b.jsxs)(n.li,{children:[(0,b.jsx)(n.strong,{children:`label`}),` - Descriptive text next to the icon explaining what the count represents`]}),`
`,(0,b.jsxs)(n.li,{children:[(0,b.jsx)(n.strong,{children:`header-end`}),` - Optional content at the end of the header, ideal for badges or small accessories`]}),`
`,(0,b.jsxs)(n.li,{children:[(0,b.jsx)(n.strong,{children:`action`}),` - Optional slot for a `,(0,b.jsx)(n.code,{children:`forge-icon-button`}),` (see note below)`]}),`
`,(0,b.jsxs)(n.li,{children:[(0,b.jsx)(n.strong,{children:`count`}),` - The main value or metric displayed prominently`]}),`
`,(0,b.jsxs)(n.li,{children:[(0,b.jsx)(n.strong,{children:`count-end`}),` - Optional content displayed after the count, ideal for units or secondary values`]}),`
`,(0,b.jsxs)(n.li,{children:[(0,b.jsx)(n.strong,{children:`body`}),` - Optional content below the count for additional details or secondary information`]}),`
`,(0,b.jsxs)(n.li,{children:[(0,b.jsx)(n.strong,{children:`full-width`}),` - Optional full-width content below the primary card content, ideal for sparklines, meters, or progress indicators`]}),`
`]}),`
`,(0,b.jsxs)(n.blockquote,{children:[`
`,(0,b.jsxs)(n.p,{children:[(0,b.jsx)(n.strong,{children:`Note:`}),` Use the `,(0,b.jsx)(n.code,{children:`action`}),` slot instead of `,(0,b.jsx)(n.code,{children:`header-end`}),` when adding a `,(0,b.jsx)(n.code,{children:`forge-icon-button`}),`. Icon buttons have a 48x48px touch target that can disrupt the card's layout when placed in `,(0,b.jsx)(n.code,{children:`header-end`}),`. The `,(0,b.jsx)(n.code,{children:`action`}),` slot provides proper alignment for icon buttons.`]}),`
`]}),`
`,(0,b.jsx)(n.h3,{id:`structural-consistency`,children:`Structural Consistency`}),`
`,(0,b.jsx)(n.p,{children:`For best results, use the same slot structure across all count cards on a page and always include at least an icon and count. This ensures visual balance and alignment when cards are displayed in a grid.`}),`
`,(0,b.jsx)(n.pre,{children:(0,b.jsx)(n.code,{className:`language-html`,children:`<forge-count-card>
  <forge-icon slot="icon" name="attach_money"></forge-icon>
  <span slot="label">Revenue</span>
  <span slot="count">$12,450.00</span>
</forge-count-card>
`})}),`
`,(0,b.jsx)(n.h2,{id:`examples`,children:`Examples`}),`
`,(0,b.jsx)(n.h3,{id:`multiple-cards`,children:`Multiple Cards`}),`
`,(0,b.jsx)(n.p,{children:`Count cards work well in grid layouts to create dashboard-style displays.`}),`
`,(0,b.jsx)(a,{of:f}),`
`,(0,b.jsx)(n.h3,{id:`with-full-width-content`,children:`With Full Width Content`}),`
`,(0,b.jsxs)(n.p,{children:[`Use the `,(0,b.jsx)(n.code,{children:`full-width`}),` slot to add full-width content below the primary card content. This is ideal for sparklines, progress bars, or any visualization that should span the entire width of the card.`]}),`
`,(0,b.jsx)(a,{of:m}),`
`,(0,b.jsx)(n.h3,{id:`additional-body-content`,children:`Additional Body Content`}),`
`,(0,b.jsxs)(n.p,{children:[`Use the `,(0,b.jsx)(n.code,{children:`body`}),` slot to add supplementary content below the count. This is useful for displaying additional context, progress indicators, or secondary metrics.`]}),`
`,(0,b.jsx)(a,{of:_}),`
`,(0,b.jsx)(n.h3,{id:`with-menu`,children:`With Menu`}),`
`,(0,b.jsxs)(n.p,{children:[`Use the `,(0,b.jsx)(n.code,{children:`action`}),` slot to add an icon button for card-level actions like an options menu.`]}),`
`,(0,b.jsx)(a,{of:g}),`
`,(0,b.jsx)(n.h3,{id:`themes`,children:`Themes`}),`
`,(0,b.jsxs)(n.p,{children:[`Use the `,(0,b.jsx)(n.code,{children:`theme`}),` property to apply semantic color styling to the card. Available themes include `,(0,b.jsx)(n.code,{children:`primary`}),`, `,(0,b.jsx)(n.code,{children:`secondary`}),`, `,(0,b.jsx)(n.code,{children:`tertiary`}),`, `,(0,b.jsx)(n.code,{children:`success`}),`, `,(0,b.jsx)(n.code,{children:`error`}),`, `,(0,b.jsx)(n.code,{children:`warning`}),`, `,(0,b.jsx)(n.code,{children:`info`}),`, and `,(0,b.jsx)(n.code,{children:`info-secondary`}),`.`]}),`
`,(0,b.jsx)(a,{of:u}),`
`,(0,b.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,b.jsx)(l,{})]})}function y(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,b.jsx)(n,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;function x(){return(x=e((()=>{b=r(),n(),i(),c(),d()})))()}x();export{y as default};