import{j as e}from"./jsx-runtime-B90IPUH6.js";import{u as o}from"./index-BmS3b3Pa.js";import{ae as r,af as a,ag as n}from"./index-BpDpOyso.js";import{C as c}from"./CustomArgTypes-D45OSR85.js";import{C as l}from"./CssOnlyInformation-QDVtbEx4.js";import{L as d,D as h,I as m,W as p,N as u,E as x,C as j}from"./List.stories-BcAquJBZ.js";import"./iframe-IV-JUf41.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-DxKRhftL.js";import"./index-DrFu-skq.js";import"./utils-CRuDW25z.js";import"./lit-element-Dk2-kgKT.js";import"./lit-html-DZH-Jm0H.js";import"./chunk-454WOBUV-CM0pFb8Z.js";import"./v4-CQkTLCs1.js";import"./icon-DHpZ4R73.js";import"./constants-DjE6emXm.js";import"./base-adapter-F7QHxK2H.js";import"./index-Dh0vMUMR.js";import"./index-ByifSpfC.js";import"./index-fxMNKkgx.js";import"./style-map-DxfbqtuX.js";import"./directive-Ctav8iJK.js";import"./class-map-D93gIiBE.js";import"./decorators-DvEJi2JG.js";import"./list-ePbvhvCk.js";import"./state-layer-DTKAXCUq.js";import"./focus-indicator-_fDu4ZqT.js";import"./with-default-aria-DCLjqsVH.js";import"./drawer-BaSOALQ_.js";import"./base-drawer-CHX_xDf6.js";import"./event-utils-CyAMYupJ.js";import"./avatar-Cja6atCs.js";import"./checkbox-DohAEIBZ.js";import"./with-form-associated-DjPnTr_x.js";import"./with-label-aware-CLWydNrR.js";import"./label-BKvMlVMw.js";import"./button-C5f1g9CL.js";import"./base-button-adapter-WOmen6Ii.js";import"./button-toggle-group-BJ7gYCrU.js";import"./icon-button-XdSjYqUR.js";import"./switch-BL3gYf9s.js";import"./expansion-panel-Da14WzAs.js";function s(i){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
`,e.jsx(a,{}),`
`,e.jsx(t.p,{children:"Lists are used to display a collection of items in a vertical format. They can be used for navigation, selection, or just to display static data."}),`
`,e.jsxs(t.p,{children:["Lists are semantically equivalent to the HTML ",e.jsx(t.code,{children:"<ul>"})," and ",e.jsx(t.code,{children:"<li>"})," elements, can be used in the same way, and are ",e.jsx(t.strong,{children:"static by default"}),`. If you want your
list items to be interactive, see the examples below.`]}),`
`,e.jsx(n,{of:h}),`
`,e.jsx(t.h2,{id:"interactive",children:"Interactive"}),`
`,e.jsxs(t.p,{children:["Lists can be made interactive by providing a ",e.jsx(t.code,{children:"<button>"}),` element around your main list item content. This allows the list item to receive focus, and provides
visual feedback when the item is hovered or pressed.`]}),`
`,e.jsx(n,{of:m}),`
`,e.jsx(t.h2,{id:"with-anchor",children:"With Anchor"}),`
`,e.jsxs(t.p,{children:["Lists can also be used for navigation by providing a ",e.jsx(t.code,{children:"<a>"}),` element around your main list item content instead. When your list item will navigate to a new page,
it is recommended to use an `,e.jsx(t.code,{children:"<a>"})," element to provide the correct semantics and expectations for users."]}),`
`,e.jsx(n,{of:p}),`
`,e.jsx(t.h2,{id:"navigation-menu",children:"Navigation Menu"}),`
`,e.jsxs(t.p,{children:["It is common to provide a list of navigation items in a ",e.jsx(t.a,{href:"?path=/docs/components-drawer--docs",children:"drawer"}),` or other container component. This gives your application
a consistent location for the central navigation of your site.`]}),`
`,e.jsx(t.h3,{id:"navlist",children:"Navlist"}),`
`,e.jsxs(t.p,{children:["When lists are placed within a ",e.jsx(t.code,{children:"<forge-drawer>"})," or are used for navigation menus, you should add the ",e.jsx(t.code,{children:"navlist"})," attribute to your ",e.jsx(t.code,{children:"<forge-list>"}),` element so that the
list items are styled appropriately.`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<forge-list navlist></forge-list>
`})}),`
`,e.jsx(n,{of:u}),`
`,e.jsxs(t.p,{children:["When using a list as a navigation menu, it is common to provide a visual indicator of the currently active item. This can be done by providing a ",e.jsx(t.code,{children:"selected"}),`
attribute to the list item that is currently active, or by using the `,e.jsx(t.code,{children:"selectedValue"})," attribute on the ",e.jsx(t.code,{children:"<forge-list>"}),` element to indicate the currently active
item by its matching `,e.jsx(t.code,{children:"value"}),"."]}),`
`,e.jsxs(t.p,{children:["Additionally, you should provide the ",e.jsx(t.code,{children:'aria-current="page"'})," attribute to the currently active list item to indicate to screen readers that it is the current page."]}),`
`,e.jsx(t.h2,{id:"with-expandable-items",children:"With Expandable Items"}),`
`,e.jsxs(t.p,{children:["Lists can also contain expandable items via the ",e.jsx(t.a,{href:"?path=/docs/components-expansion-panel--docs",children:"expansion panel"}),` component, which can be used to show or hide additional
content and/or sub-lists.`]}),`
`,e.jsx(n,{of:x}),`
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
`]}),`
`,e.jsx(t.h2,{id:"css-only",children:"CSS-Only"}),`
`,e.jsx(t.p,{children:"The list component is also available as a CSS-only component without the need for JavaScript."}),`
`,e.jsx(n,{of:j}),`
`,e.jsx(l,{})]})}function ce(i={}){const{wrapper:t}={...o(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(s,{...i})}):s(i)}export{ce as default};
