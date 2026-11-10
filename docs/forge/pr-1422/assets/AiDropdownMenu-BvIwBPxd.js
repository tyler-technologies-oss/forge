import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-Dp_o0sTV.js";import{n as c,t as l}from"./CustomArgTypes-_m-okSqZ.js";import{a as u,i as d,n as f,r as p,t as m}from"./AiDropdownMenu.stories-DKXwBcIG.js";function h(e){let n={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(s,{of:m}),`
`,(0,_.jsx)(o,{}),`
`,(0,_.jsx)(n.p,{children:`A button that opens a menu of choices, such as a model picker or an actions menu. Items can act as plain actions, a single (radio) selection, or a multiple (checkbox) selection, and can be grouped or nested in submenus.`}),`
`,(0,_.jsx)(a,{of:f}),`
`,(0,_.jsx)(n.h2,{id:`usage`,children:`Usage`}),`
`,(0,_.jsxs)(n.p,{children:[`Add `,(0,_.jsx)(n.code,{children:`forge-ai-dropdown-menu-item`}),` elements to the default slot and set `,(0,_.jsx)(n.code,{children:`selection-mode`}),` to `,(0,_.jsx)(n.code,{children:`none`}),` (default), `,(0,_.jsx)(n.code,{children:`single`}),` or `,(0,_.jsx)(n.code,{children:`multi`}),`. The `,(0,_.jsx)(n.code,{children:`forge-ai-dropdown-menu-change`}),` event reports the new `,(0,_.jsx)(n.code,{children:`value`}),` and the selected item(s) for the active mode.`]}),`
`,(0,_.jsx)(n.pre,{children:(0,_.jsx)(n.code,{className:`language-html`,children:`<forge-ai-dropdown-menu selection-mode="single">
  <span slot="trigger-content">Select model</span>
  <forge-ai-dropdown-menu-item value="small">Small</forge-ai-dropdown-menu-item>
  <forge-ai-dropdown-menu-item value="large">Large</forge-ai-dropdown-menu-item>
</forge-ai-dropdown-menu>
`})}),`
`,(0,_.jsxs)(n.p,{children:[`The trigger can be a text `,(0,_.jsx)(n.code,{children:`button`}),` (default), an `,(0,_.jsx)(n.code,{children:`icon-button`}),`, or an `,(0,_.jsx)(n.code,{children:`icon-button-squared`}),`. Use `,(0,_.jsx)(n.code,{children:`density`}),` to change its size.`]}),`
`,(0,_.jsx)(n.h3,{id:`groups-and-separators`,children:`Groups and separators`}),`
`,(0,_.jsxs)(n.p,{children:[`Organize items with `,(0,_.jsx)(n.code,{children:`forge-ai-dropdown-menu-item-group`}),` (label via the `,(0,_.jsx)(n.code,{children:`label`}),` slot) and `,(0,_.jsx)(n.code,{children:`forge-ai-dropdown-menu-separator`}),`.`]}),`
`,(0,_.jsx)(a,{of:p}),`
`,(0,_.jsx)(n.h3,{id:`nested-menus`,children:`Nested menus`}),`
`,(0,_.jsxs)(n.p,{children:[`Place a `,(0,_.jsx)(n.code,{children:`forge-ai-dropdown-menu`}),` in an item's `,(0,_.jsx)(n.code,{children:`submenu`}),` slot. Use the item's `,(0,_.jsx)(n.code,{children:`submenu-trigger`}),` (`,(0,_.jsx)(n.code,{children:`hover`}),`, `,(0,_.jsx)(n.code,{children:`click`}),` or `,(0,_.jsx)(n.code,{children:`both`}),`) to choose how it opens.`]}),`
`,(0,_.jsx)(a,{of:d}),`
`,(0,_.jsx)(n.h2,{id:`keyboard`,children:`Keyboard`}),`
`,(0,_.jsxs)(n.ul,{children:[`
`,(0,_.jsx)(n.li,{children:`Arrow Up and Down move between items`}),`
`,(0,_.jsx)(n.li,{children:`Enter and Space select the focused item`}),`
`,(0,_.jsx)(n.li,{children:`Arrow Right and Left open and close submenus`}),`
`,(0,_.jsx)(n.li,{children:`Home and End jump to the first and last item`}),`
`,(0,_.jsx)(n.li,{children:`Escape closes the menu, and it also closes when focus leaves`}),`
`]}),`
`,(0,_.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,_.jsx)(l,{}),`
`,(0,_.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,_.jsxs)(n.p,{children:[`Menu roles follow the selection mode (`,(0,_.jsx)(n.code,{children:`menuitem`}),`, `,(0,_.jsx)(n.code,{children:`menuitemradio`}),`, `,(0,_.jsx)(n.code,{children:`menuitemcheckbox`}),`). For icon-only triggers, set `,(0,_.jsx)(n.code,{children:`trigger-label`}),` so the button has an accessible name.`]})]})}function g(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,_.jsx)(n,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;function v(){return(v=e((()=>{_=r(),n(),i(),c(),u()})))()}v();export{g as default};