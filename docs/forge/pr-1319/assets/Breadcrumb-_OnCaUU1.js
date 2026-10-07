import{u as o,j as e,M as s,T as a,C as n}from"./blocks-Cal7HuuV.js";import{C as l}from"./CustomArgTypes-w-oY4vMu.js";import{B as h,D as d,O as c,S as m,W as p,a as u}from"./Breadcrumb.stories-B75e26C1.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BQYzHRrc.js";import"./iframe-Doaa3Kdk.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-C8_-3lrC.js";import"./tyler-icons-NVf08gHb.js";import"./service-adapter-8tADcN_b.js";import"./icon-ozIZoPIz.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./property-DJuTIPPA.js";import"./base-lit-element-CpHmPn0S.js";import"./async-directive-MwfSmi4y.js";import"./directive-CwRn8Fwj.js";import"./constants-ffvdo6x3.js";import"./create-context-BxR5I8pu.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./breadcrumb-overflow-menu-D1b5zGow.js";import"./state-a4Qik7Qa.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./class-map-CsjCCn6c.js";import"./a11y-utils-DssnAab5.js";import"./dom-utils-BDbRr6KM.js";import"./icon-button-Ck8_ypsD.js";import"./base-button-DcOcEdtA.js";import"./query-assigned-elements-43hYArgI.js";import"./utils-C31il88P.js";import"./focus-indicator-D4pryyUP.js";import"./floating-ui.dom-DaMtbvS2.js";import"./state-layer-gtlkuVuf.js";import"./custom-element-DR9AFpIK.js";import"./core-property-Co8uF8PW.js";import"./base-adapter-DOky_or5.js";import"./base-component-BFu9bkgC.js";import"./icon-button-constants-JHHxiN9v.js";import"./tooltip-BZoCBE_e.js";import"./overlay-DNJXwLw8.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./with-longpress-listener-D4ROnnkg.js";import"./dismissible-stack-DyoP5jNB.js";import"./with-element-internals-CFYP_epH.js";import"./if-defined-Df7qgOjW.js";import"./button-BsMnzWz3.js";import"./button-constants-DRqTH6Pv.js";import"./list-item-MbhLyvqr.js";import"./event-utils-zQ4FLDwK.js";import"./popover-K4jtrW_G.js";function i(r){const t={code:"code",h2:"h2",li:"li",p:"p",ul:"ul",...o(),...r.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:h}),`
`,e.jsx(a,{}),`
`,e.jsx(t.p,{children:"Breadcrumbs show the user's location within a hierarchy and provide links back to parent pages."}),`
`,e.jsx(n,{of:d}),`
`,e.jsx(t.h2,{id:"overflow-menu",children:"Overflow menu"}),`
`,e.jsxs(t.p,{children:["Use ",e.jsx(t.code,{children:"forge-breadcrumb-overflow-menu"}),` to collapse middle items into a popover opened by an overflow
button. Slot `,e.jsx(t.code,{children:"forge-breadcrumb-item"})," elements into it."]}),`
`,e.jsx(t.p,{children:`Use an overflow menu when there are more than five breadcrumb items or too many to display in a
single line. Place the overflow menu after the first breadcrumb item and include one or two
breadcrumb items after it.`}),`
`,e.jsx(n,{of:c}),`
`,e.jsx(t.h2,{id:"scroll-buttons",children:"Scroll buttons"}),`
`,e.jsxs(t.p,{children:["Set the ",e.jsx(t.code,{children:"scroll-buttons"}),` attribute to keep the breadcrumb items on a single line instead of wrapping. When
the items overflow their container, previous and next buttons are displayed to scroll through them, and the
breadcrumb starts scrolled to the end so the current page is visible.`]}),`
`,e.jsx(t.p,{children:`The scroll buttons are only rendered while the items overflow. The previous button is disabled when scrolled
to the start, and the next button is disabled when scrolled to the end. Each button shows a tooltip that
labels it ("Previous breadcrumbs" or "Next breadcrumbs").`}),`
`,e.jsx(n,{of:m}),`
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
items in the breadcrumb and within the overflow menu.`]}),`
`,e.jsx(n,{of:p}),`
`,e.jsx(t.h2,{id:"without-links",children:"Without links"}),`
`,e.jsxs(t.p,{children:["An item without an ",e.jsx(t.code,{children:"href"}),` renders as non-interactive text instead of a link. Use this for levels of the
hierarchy that don't have a page of their own.`]}),`
`,e.jsx(n,{of:u}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
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
`,e.jsxs(t.li,{children:["Slot text into a ",e.jsx(t.code,{children:"home"}),` item to provide an accessible name for the home icon other than the default
"Home".`]}),`
`]})]})}function ue(r={}){const{wrapper:t}={...o(),...r.components};return t?e.jsx(t,{...r,children:e.jsx(i,{...r})}):i(r)}export{ue as default};
