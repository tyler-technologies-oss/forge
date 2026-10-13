import{u as o,j as e,M as s,T as l,C as n}from"./blocks-Bh82kgiK.js";import{C as a}from"./CustomArgTypes-zMS4PiTs.js";import{B as h,D as d,O as c,C as m,S as p,W as u,a as b}from"./Breadcrumb.stories-CjoEu66F.js";import"./preload-helper-PPVm8Dsz.js";import"./index-D1tbGGl7.js";import"./iframe-CfOLmNdo.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-BGdtyhdL.js";import"./tyler-icons-Bg2kTxF-.js";import"./service-adapter-8tADcN_b.js";import"./icon-CBhfd-3H.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./property-BFy3hwUI.js";import"./base-lit-element-B8Z_yHEY.js";import"./async-directive-BiEklV4L.js";import"./directive-CwRn8Fwj.js";import"./constants-ffvdo6x3.js";import"./create-context-BxR5I8pu.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./breadcrumb-overflow-menu-COzkIx7k.js";import"./state-Ca5NDuRx.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./class-map-CNinm4lY.js";import"./a11y-utils-DssnAab5.js";import"./dom-utils-BDbRr6KM.js";import"./icon-button-DzuMMbE4.js";import"./base-button-9k8Yqu2-.js";import"./query-assigned-elements-43hYArgI.js";import"./utils-C31il88P.js";import"./focus-indicator--smaJyaa.js";import"./floating-ui.dom-DaMtbvS2.js";import"./state-layer-gtlkuVuf.js";import"./custom-element-DR9AFpIK.js";import"./core-property-Co8uF8PW.js";import"./base-adapter-DOky_or5.js";import"./base-component-BFu9bkgC.js";import"./icon-button-constants-JHHxiN9v.js";import"./tooltip-DfvpF4Ch.js";import"./overlay-ByK8Mow1.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./with-longpress-listener-D4ROnnkg.js";import"./dismissible-stack-DyoP5jNB.js";import"./with-element-internals-CFYP_epH.js";import"./if-defined-D-sotilK.js";import"./button-COy1ZAqx.js";import"./button-constants-DRqTH6Pv.js";import"./list-item-BOvnL-I1.js";import"./event-utils-zQ4FLDwK.js";import"./popover-SQPenc0O.js";function r(i){const t={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:h}),`
`,e.jsx(l,{}),`
`,e.jsx(t.p,{children:"Breadcrumbs show the user's location within a hierarchy and provide links back to parent pages."}),`
`,e.jsx(n,{of:d}),`
`,e.jsx(t.h2,{id:"overflow-menu",children:"Overflow menu"}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"forge-breadcrumb-overflow-menu"}),` to collapse middle items into a popover opened by an overflow
button. Slot `,e.jsx(t.code,{children:"forge-breadcrumb-item"})," elements into it."]}),`
`,e.jsx(t.p,{children:`Use an overflow menu when there are more than five breadcrumb items or too many to display in a
single line. Place the overflow menu after the first breadcrumb item and include one or two
breadcrumb items after it.`}),`
`,e.jsx(n,{of:c}),`
`,e.jsx(t.h2,{id:"child-items",children:"Child items"}),`
`,e.jsxs(t.p,{children:["An item can have child items. Slot ",e.jsx(t.code,{children:"forge-breadcrumb-item"})," elements into the ",e.jsx(t.code,{children:"children"}),` slot of a
breadcrumb item to display sibling pages in a popover menu. When child items are slotted, the
item's button toggles the menu instead of navigating, and its `,e.jsx(t.code,{children:"href"})," is ignored."]}),`
`,e.jsx(t.p,{children:`Use child items when a level of the hierarchy has related pages the user may want to jump to directly,
such as the other pages within a section. Child items are displayed in the same style as items in the
overflow menu, and the menu closes when a link is selected or focus moves out of it.`}),`
`,e.jsxs(t.p,{children:["Child items are only supported one level deep. A child item that has its own ",e.jsx(t.code,{children:"children"}),` slotted
is still displayed as a regular menu item.`]}),`
`,e.jsx(n,{of:m}),`
`,e.jsx(t.h2,{id:"scroll-buttons",children:"Scroll buttons"}),`
`,e.jsxs(t.p,{children:["Set the ",e.jsx(t.code,{children:"scroll-buttons"}),` attribute to keep the breadcrumb items on a single line instead of wrapping. When
the items overflow their container, previous and next buttons are displayed to scroll through them, and the
breadcrumb starts scrolled to the end so the current page is visible.`]}),`
`,e.jsx(t.p,{children:`The scroll buttons are only rendered while the items overflow. The previous button is disabled when scrolled
to the start, and the next button is disabled when scrolled to the end. Each button shows a tooltip that
labels it ("Previous breadcrumbs" or "Next breadcrumbs").`}),`
`,e.jsx(n,{of:p}),`
`,e.jsx(t.h2,{id:"home-item",children:"Home item"}),`
`,e.jsxs(t.p,{children:["Set the ",e.jsx(t.code,{children:"home"})," attribute on a ",e.jsx(t.code,{children:"forge-breadcrumb-item"}),` to render a home icon in place of its text. Use
it for the first item in the breadcrumb. A tooltip labels the icon with "Home" by default; slot text into
the item to provide a different label.`]}),`
`,e.jsx(t.h2,{id:"current-item",children:"Current item"}),`
`,e.jsxs(t.p,{children:[`The current item represents the page the user is currently on. It should be marked with the
`,e.jsx(t.code,{children:"current"})," attribute and will render as non-interactive text, and the item will have ",e.jsx(t.code,{children:'aria-current="page"'}),"."]}),`
`,e.jsx(t.p,{children:`Only include the current page in the breadcrumb when the page doesn't already have a title displayed
or is unclear. When the current page is included, it must be the last item in the breadcrumb.`}),`
`,e.jsx(t.h2,{id:"icons",children:"Icons"}),`
`,e.jsxs(t.p,{children:["Use the ",e.jsx(t.code,{children:"start"}),` slot to place an icon (or other content) before an item's text. The slot is supported by
items in the breadcrumb, within the overflow menu, and within an item's child items.`]}),`
`,e.jsx(n,{of:u}),`
`,e.jsx(t.h2,{id:"without-links",children:"Without links"}),`
`,e.jsxs(t.p,{children:["An item without an ",e.jsx(t.code,{children:"href"}),` renders as non-interactive text instead of a link. Use this for levels of the
hierarchy that don't have a page of their own.`]}),`
`,e.jsx(n,{of:b}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(a,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"forge-breadcrumb"})," has the ",e.jsx(t.code,{children:"navigation"})," role. Provide an ",e.jsx(t.code,{children:"aria-label"}),` (such as "Breadcrumb") so it is
distinguishable from other navigation landmarks.`]}),`
`,e.jsxs(t.li,{children:["Set ",e.jsx(t.code,{children:"current"}),` on the item that represents the current page. It renders non-interactive text in place of
the link and sets `,e.jsx(t.code,{children:'aria-current="page"'})," on the item."]}),`
`,e.jsxs(t.li,{children:["When ",e.jsx(t.code,{children:"scroll-buttons"}),` is set and the items overflow, the previous and next buttons are focusable
buttons labeled by their tooltips. A button is marked `,e.jsx(t.code,{children:"aria-disabled"}),` when there is nothing further to
scroll to in that direction.`]}),`
`,e.jsxs(t.li,{children:["Place content in the overflow menu's ",e.jsx(t.code,{children:"tooltip"})," slot to provide an accessible name for the overflow button."]}),`
`,e.jsxs(t.li,{children:[`When child items are slotted, the item's button toggles the menu and exposes its state with
`,e.jsx(t.code,{children:"aria-expanded"}),". Include the item's text so the button has an accessible name."]}),`
`,e.jsxs(t.li,{children:["Slot text into a ",e.jsx(t.code,{children:"home"}),` item to provide an accessible name for the home icon other than the default
"Home".`]}),`
`]})]})}function be(i={}){const{wrapper:t}={...o(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(r,{...i})}):r(i)}export{be as default};
