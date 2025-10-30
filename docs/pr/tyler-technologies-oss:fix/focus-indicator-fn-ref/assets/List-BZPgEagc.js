import{j as e,M as r,T as a,C as n}from"./blocks-9l-d2DJv.js";import{useMDXComponents as s}from"./index-DemGgAEd.js";import{C as c}from"./CustomArgTypes-DoC-COyi.js";import{C as l}from"./CssOnlyInformation-C0aT0WHR.js";import{L as d,D as h,I as m,W as p,N as u,E as x,C as j}from"./List.stories-DCapZ_qz.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-BFlAyfIN.js";import"./utils-C83vs9tY.js";import"./icon-kuXwuZAY.js";import"./constants-DzQy6WDX.js";import"./service-adapter-CffG5Lhq.js";import"./feature-detection-B-sRDmdg.js";import"./base-adapter-C8aSF3nG.js";import"./index-5CPwzmQS.js";import"./style-map-D7msSEwu.js";import"./directive-CJw_OlP2.js";import"./class-map-BLl4-78s.js";import"./decorators-B_kqXN_e.js";import"./list-BHkkkq3U.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-gAgMwMHF.js";import"./utils-Bd6MGx91.js";import"./focus-indicator-yFQbMPVG.js";import"./base-lit-element-MJT3RFU7.js";import"./with-default-aria-6GN_uk1I.js";import"./a11y-utils-Dj08p-2z.js";import"./drawer-B9FH5M3o.js";import"./base-drawer-CyECteXI.js";import"./avatar-BI-ySJ2x.js";import"./state-E9LxXjwv.js";import"./checkbox-jQVuQOxP.js";import"./with-form-associated-DNJXxTFO.js";import"./with-label-aware-C7up74QW.js";import"./label-D5DFhyNo.js";import"./button-BJzpnrOc.js";import"./base-button-adapter-CA8DBOGE.js";import"./button-toggle-group-DIqjWydJ.js";import"./icon-button-DlbKyjJp.js";import"./switch-DguidbhN.js";import"./expansion-panel-CtPm9dI4.js";function o(i){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:d}),`
`,e.jsx(a,{}),`
`,e.jsx(t.p,{children:"Lists are used to display a collection of items in a vertical format. They can be used for navigation, selection, or just to display static data."}),`
`,e.jsxs(t.p,{children:["Lists are semantically equivalent to the HTML ",e.jsx(t.code,{children:"<ul>"})," and ",e.jsx(t.code,{children:"<li>"})," elements, can be used in the same way, and are ",e.jsx(t.strong,{children:"static by default"}),`. If you want your
list items to be interactive, see the examples below.`]}),`
`,e.jsx(n,{of:h}),`
`,e.jsx(t.h2,{id:"interactive",children:"Interactive"}),`
`,e.jsxs(t.p,{children:["Lists can be made interactive by providing a ",e.jsx(t.code,{children:"<button>"}),` element around your main list item content. This allows the list item to receive focus, and provides
visual feedback when the item is hovered or pressed.`]}),`
`,e.jsx(n,{of:m}),`
`,e.jsxs(t.h3,{id:"using-the-forge-ignore-attribute",children:["Using the ",e.jsx(t.code,{children:"forge-ignore"})," attribute"]}),`
`,e.jsxs(t.p,{children:["It is common to place multiple interactive elements within a ",e.jsx(t.code,{children:"<forge-list-item>"}),`. However, you may want to prevent the list item from responding to pointer events
on specific elements. To do this you can either listen for the click event yourself on the specific elements you care about and call `,e.jsx(t.code,{children:"stopPropagation()"}),`
on the event, or you can use the `,e.jsx(t.code,{children:"forge-ignore"}),` attribute for convenience. This attribute is used to prevent the list item from handling the event when the
element (or any children of the element) is clicked.`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<forge-list-item>
  <button type="button">List Item</button>

  <!--
    Using the forge-ignore attribute allows this element to be placed within the
    list item without causing the list item to respond to pointer events when clicked.
  -->
  <forge-checkbox slot="start" tabindex="-1" forge-ignore aria-label="Checkbox"></forge-checkbox>
</forge-list-item>
`})}),`
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
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Important:"})," make note of the ",e.jsx(t.code,{children:'slot="additional-content"'})," attribute on elements within the ",e.jsx(t.code,{children:"<forge-list-item>"}),`. This is required to ensure that the additional content is
visually + structurally separated from the main/interactive list item content, and is announced properly by screen readers.`]}),`
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
`,e.jsx(l,{})]})}function oe(i={}){const{wrapper:t}={...s(),...i.components};return t?e.jsx(t,{...i,children:e.jsx(o,{...i})}):o(i)}export{oe as default};
