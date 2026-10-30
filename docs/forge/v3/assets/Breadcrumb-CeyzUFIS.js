import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-W22LQPXL-DaWckgVw.js";import{h as i,n as a,p as o,u as s}from"./blocks-fd9Z3xSU.js";import{n as c,t as l}from"./CustomArgTypes-Cnceb5ig.js";import{a as u,c as d,i as f,n as p,o as m,r as h,s as g,t as _}from"./Breadcrumb.stories-NRkZ-aTb.js";function v(e){let n={code:`code`,h2:`h2`,li:`li`,p:`p`,ul:`ul`,...t(),...e.components};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(s,{of:_}),`
`,(0,b.jsx)(o,{}),`
`,(0,b.jsx)(n.p,{children:`Breadcrumbs show the user's location within a hierarchy and provide links back to parent pages.`}),`
`,(0,b.jsx)(a,{of:h}),`
`,(0,b.jsx)(n.h2,{id:`overflow-menu`,children:`Overflow menu`}),`
`,(0,b.jsxs)(n.p,{children:[`Use `,(0,b.jsx)(n.code,{children:`forge-breadcrumb-overflow-menu`}),` to collapse middle items into a popover opened by an overflow
button. Slot `,(0,b.jsx)(n.code,{children:`forge-breadcrumb-item`}),` elements into it.`]}),`
`,(0,b.jsx)(n.p,{children:`Use an overflow menu when there are more than five breadcrumb items or too many to display in a
single line. Place the overflow menu after the first breadcrumb item and include one or two
breadcrumb items after it.`}),`
`,(0,b.jsx)(a,{of:f}),`
`,(0,b.jsx)(n.h2,{id:`child-items`,children:`Child items`}),`
`,(0,b.jsxs)(n.p,{children:[`An item can have child items. Slot `,(0,b.jsx)(n.code,{children:`forge-breadcrumb-item`}),` elements into the `,(0,b.jsx)(n.code,{children:`children`}),` slot of a
breadcrumb item to display sibling pages in a popover menu. When child items are slotted, the
item's button toggles the menu instead of navigating, and its `,(0,b.jsx)(n.code,{children:`href`}),` is ignored.`]}),`
`,(0,b.jsx)(n.p,{children:`Use child items when a level of the hierarchy has related pages the user may want to jump to directly,
such as the other pages within a section. Child items are displayed in the same style as items in the
overflow menu, and the menu closes when a link is selected or focus moves out of it.`}),`
`,(0,b.jsxs)(n.p,{children:[`Child items are only supported one level deep. A child item that has its own `,(0,b.jsx)(n.code,{children:`children`}),` slotted
is still displayed as a regular menu item.`]}),`
`,(0,b.jsx)(a,{of:p}),`
`,(0,b.jsx)(n.h2,{id:`scroll-buttons`,children:`Scroll buttons`}),`
`,(0,b.jsxs)(n.p,{children:[`Set the `,(0,b.jsx)(n.code,{children:`scroll-buttons`}),` attribute to keep the breadcrumb items on a single line instead of wrapping. When
the items overflow their container, previous and next buttons are displayed to scroll through them, and the
breadcrumb starts scrolled to the end so the current page is visible.`]}),`
`,(0,b.jsx)(n.p,{children:`The scroll buttons are only rendered while the items overflow. The previous button is disabled when scrolled
to the start, and the next button is disabled when scrolled to the end. Each button shows a tooltip that
labels it ("Previous breadcrumbs" or "Next breadcrumbs").`}),`
`,(0,b.jsx)(a,{of:u}),`
`,(0,b.jsx)(n.h2,{id:`home-item`,children:`Home item`}),`
`,(0,b.jsxs)(n.p,{children:[`Set the `,(0,b.jsx)(n.code,{children:`home`}),` attribute on a `,(0,b.jsx)(n.code,{children:`forge-breadcrumb-item`}),` to render a home icon in place of its text. Use
it for the first item in the breadcrumb. A tooltip labels the icon with "Home" by default; slot text into
the item to provide a different label.`]}),`
`,(0,b.jsx)(n.h2,{id:`current-item`,children:`Current item`}),`
`,(0,b.jsxs)(n.p,{children:[`The current item represents the page the user is currently on. It should be marked with the
`,(0,b.jsx)(n.code,{children:`current`}),` attribute and will render as non-interactive text, and the item will have `,(0,b.jsx)(n.code,{children:`aria-current="page"`}),`.`]}),`
`,(0,b.jsx)(n.p,{children:`Only include the current page in the breadcrumb when the page doesn't already have a title displayed
or is unclear. When the current page is included, it must be the last item in the breadcrumb.`}),`
`,(0,b.jsx)(n.h2,{id:`icons`,children:`Icons`}),`
`,(0,b.jsxs)(n.p,{children:[`Use the `,(0,b.jsx)(n.code,{children:`start`}),` slot to place an icon (or other content) before an item's text. The slot is supported by
items in the breadcrumb, within the overflow menu, and within an item's child items.`]}),`
`,(0,b.jsx)(a,{of:m}),`
`,(0,b.jsx)(n.h2,{id:`without-links`,children:`Without links`}),`
`,(0,b.jsxs)(n.p,{children:[`An item without an `,(0,b.jsx)(n.code,{children:`href`}),` renders as non-interactive text instead of a link. Use this for levels of the
hierarchy that don't have a page of their own.`]}),`
`,(0,b.jsx)(a,{of:g}),`
`,(0,b.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,b.jsx)(l,{}),`
`,(0,b.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,b.jsxs)(n.ul,{children:[`
`,(0,b.jsxs)(n.li,{children:[(0,b.jsx)(n.code,{children:`forge-breadcrumb`}),` has the `,(0,b.jsx)(n.code,{children:`navigation`}),` role. Provide an `,(0,b.jsx)(n.code,{children:`aria-label`}),` (such as "Breadcrumb") so it is
distinguishable from other navigation landmarks.`]}),`
`,(0,b.jsxs)(n.li,{children:[`Set `,(0,b.jsx)(n.code,{children:`current`}),` on the item that represents the current page. It renders non-interactive text in place of
the link and sets `,(0,b.jsx)(n.code,{children:`aria-current="page"`}),` on the item.`]}),`
`,(0,b.jsxs)(n.li,{children:[`When `,(0,b.jsx)(n.code,{children:`scroll-buttons`}),` is set and the items overflow, the previous and next buttons are focusable
buttons labeled by their tooltips. A button is marked `,(0,b.jsx)(n.code,{children:`aria-disabled`}),` when there is nothing further to
scroll to in that direction.`]}),`
`,(0,b.jsxs)(n.li,{children:[`Place content in the overflow menu's `,(0,b.jsx)(n.code,{children:`tooltip`}),` slot to provide an accessible name for the overflow button.`]}),`
`,(0,b.jsxs)(n.li,{children:[`When child items are slotted, the item's button toggles the menu and exposes its state with
`,(0,b.jsx)(n.code,{children:`aria-expanded`}),`. Include the item's text so the button has an accessible name.`]}),`
`,(0,b.jsxs)(n.li,{children:[`Slot text into a `,(0,b.jsx)(n.code,{children:`home`}),` item to provide an accessible name for the home icon other than the default
"Home".`]}),`
`]})]})}function y(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,b.jsx)(n,{...e,children:(0,b.jsx)(v,{...e})}):v(e)}var b;function x(){return(x=e((()=>{b=r(),n(),i(),c(),d()})))()}x();export{y as default};