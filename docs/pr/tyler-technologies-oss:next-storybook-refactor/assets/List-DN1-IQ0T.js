import{j as e}from"./jsx-runtime-DzFEfnWq.js";import{u as o}from"./index-3-N9MIgX.js";import{M as r,T as a,C as n}from"./index-B1kq_Xd0.js";import{C as c}from"./CustomArgTypes-DfQNaghm.js";import{L as l,D as d,I as h,W as m,N as p,E as u}from"./List.stories-Bx-StQlX.js";import"./iframe-CL0XGQMW.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./utils-Tr_H8vMI.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./chunk-MZXVCX43-CM0pFb8Z.js";import"./v4-CQkTLCs1.js";import"./icon-V4IE3JYq.js";import"./base-adapter-BIKyOSkq.js";import"./constants-C96o6uhb.js";import"./index-Dh0vMUMR.js";import"./index-CDQrnaq1.js";import"./index-fxMNKkgx.js";import"./style-map-D0ILlpbs.js";import"./directive-CF8sV3Lr.js";import"./decorators-B79PnA5z.js";import"./list-Cu4wzbUs.js";import"./state-layer-b0IlkqgO.js";import"./focus-indicator-By3BQe1w.js";import"./with-default-aria-lryJjX2Z.js";import"./drawer-BAcOpRM_.js";import"./base-drawer-DrGyi1KL.js";import"./event-utils-DC3JW7a-.js";import"./avatar-BXavy-1u.js";import"./checkbox-BZl9IGGg.js";import"./with-form-associated-e_PToDaQ.js";import"./with-label-aware-DCBgJY4W.js";import"./label-DREoufrJ.js";import"./button-D5XxdyZ6.js";import"./base-button-adapter-CRi8-gKl.js";import"./button-toggle-group-D0JifxTm.js";import"./icon-button-CZlBA0tM.js";import"./switch-DljXu9M_.js";import"./expansion-panel-DyVyzPAv.js";function s(i){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:l}),`
`,e.jsx(a,{}),`
`,e.jsx(t.p,{children:"Lists are used to display a collection of items in a vertical format. They can be used for navigation, selection, or just to display static data."}),`
`,e.jsxs(t.p,{children:["Lists are semantically equivalent to the HTML ",e.jsx(t.code,{children:"<ul>"})," and ",e.jsx(t.code,{children:"<li>"})," elements, can be used in the same way, and are ",e.jsx(t.strong,{children:"static by default"}),`. If you want your
list items to be interactive, see the examples below.`]}),`
`,e.jsx(n,{of:d}),`
`,e.jsx(t.h2,{id:"interactive",children:"Interactive"}),`
`,e.jsxs(t.p,{children:["Lists can be made interactive by providing a ",e.jsx(t.code,{children:"<button>"}),` element around your main list item content. This allows the list item to receive focus, and provides
visual feedback when the item is hovered or pressed.`]}),`
`,e.jsx(n,{of:h}),`
`,e.jsx(t.h2,{id:"with-anchor",children:"With Anchor"}),`
`,e.jsxs(t.p,{children:["Lists can also be used for navigation by providing a ",e.jsx(t.code,{children:"<a>"}),` element around your main list item content instead. When your list item will navigate to a new page,
it is recommended to use an `,e.jsx(t.code,{children:"<a>"})," element to provide the correct semantics and expectations for users."]}),`
`,e.jsx(n,{of:m}),`
`,e.jsx(t.h2,{id:"navigation-menu",children:"Navigation Menu"}),`
`,e.jsxs(t.p,{children:["It is common to provide a list of navigation items in a ",e.jsx(t.a,{href:"?path=/docs/components-drawer--docs",children:"drawer"}),` or other container component. This gives your application
a consistent location for the central navigation of your site.`]}),`
`,e.jsx(t.h3,{id:"navlist",children:"Navlist"}),`
`,e.jsxs(t.p,{children:["When lists are placed within a ",e.jsx(t.code,{children:"<forge-drawer>"})," or are used for navigation menus, you should add the ",e.jsx(t.code,{children:"navlist"})," attribute to your ",e.jsx(t.code,{children:"<forge-list>"}),` element so that the
list items are styled appropriately.`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<forge-list navlist></forge-list>
`})}),`
`,e.jsx(n,{of:p}),`
`,e.jsxs(t.p,{children:["When using a list as a navigation menu, it is common to provide a visual indicator of the currently active item. This can be done by providing a ",e.jsx(t.code,{children:"selected"}),`
attribute to the list item that is currently active, or by using the `,e.jsx(t.code,{children:"selectedValue"})," attribute on the ",e.jsx(t.code,{children:"<forge-list>"}),` element to indicate the currently active
item by its matching `,e.jsx(t.code,{children:"value"}),"."]}),`
`,e.jsxs(t.p,{children:["Additionally, you should provide the ",e.jsx(t.code,{children:'aria-current="page"'})," attribute to the currently active list item to indicate to screen readers that it is the current page."]}),`
`,e.jsx(t.h2,{id:"with-expandable-items",children:"With Expandable Items"}),`
`,e.jsxs(t.p,{children:["Lists can also contain expandable items via the ",e.jsx(t.a,{href:"?path=/docs/components-expansion-panel--docs",children:"expansion panel"}),` component, which can be used to show or hide additional
content and/or sub-lists.`]}),`
`,e.jsx(n,{of:u}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Important:"})," make note of the adjacent wrapper ",e.jsx(t.code,{children:"<div>"})," elements that have a ",e.jsx(t.code,{children:'role="listitem"'})," attribute to ensure that the structure is accessible to screen readers."]}),`
`]}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(c,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Verify that you can reach each active list item by keyboard navigation.",`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure a distinct visual style is applied which highlights the currently focused list item."}),`
`]}),`
`]}),`
`,e.jsx(t.li,{children:"Verify that pressing the space bar or enter key while focused on a list-item will activate the list-item in the same manner as if it had been clicked with a mouse."}),`
`,e.jsx(t.li,{children:"Be sure to include a role attribute to indicate to screen readers what the list-item is being used for."}),`
`,e.jsx(t.li,{children:"If the list item contains a checkbox or radio box, ensure that it can be focused and selected/toggled by keyboard."}),`
`]})]})}function oe(i={}){const{wrapper:t}={...o(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(s,{...i})}):s(i)}export{oe as default};
