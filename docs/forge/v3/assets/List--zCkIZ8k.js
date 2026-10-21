import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-Bcs6hT4V.js";import{n as c,t as l}from"./CustomArgTypes-3XqZyV8V.js";import{n as u,t as d}from"./CssOnlyInformation-Cprf9fuU.js";import{a as f,c as p,i as m,l as h,n as g,o as _,r as v,s as y,t as b}from"./List.stories-D8WAse0C.js";function x(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(s,{of:f}),`
`,(0,C.jsx)(o,{}),`
`,(0,C.jsx)(n.p,{children:`Lists are used to display a collection of items in a vertical format. They can be used for navigation, selection, or just to display static data.`}),`
`,(0,C.jsxs)(n.p,{children:[`Lists are semantically equivalent to the HTML `,(0,C.jsx)(n.code,{children:`<ul>`}),` and `,(0,C.jsx)(n.code,{children:`<li>`}),` elements, can be used in the same way, and are `,(0,C.jsx)(n.strong,{children:`static by default`}),`. If you want your
list items to be interactive, see the examples below.`]}),`
`,(0,C.jsx)(a,{of:g}),`
`,(0,C.jsx)(n.h2,{id:`interactive`,children:`Interactive`}),`
`,(0,C.jsxs)(n.p,{children:[`Lists can be made interactive by providing a `,(0,C.jsx)(n.code,{children:`<button>`}),` element around your main list item content. This allows the list item to receive focus, and provides
visual feedback when the item is hovered or pressed.`]}),`
`,(0,C.jsx)(a,{of:m}),`
`,(0,C.jsxs)(n.h3,{id:`using-the-forge-ignore-attribute`,children:[`Using the `,(0,C.jsx)(n.code,{children:`forge-ignore`}),` attribute`]}),`
`,(0,C.jsxs)(n.p,{children:[`It is common to place multiple interactive elements within a `,(0,C.jsx)(n.code,{children:`<forge-list-item>`}),`. However, by default, children of an interactive `,(0,C.jsx)(n.code,{children:`<forge-list-item>`}),` will not receive pointer events.
To ensure certain elements receive pointer events instead of the `,(0,C.jsx)(n.code,{children:`<forge-list-item>`}),`, you can either listen for the click event yourself on these specific elements and call `,(0,C.jsx)(n.code,{children:`stopPropagation()`}),`
on the event, or you can use the `,(0,C.jsx)(n.code,{children:`forge-ignore`}),` attribute for convenience. This attribute is used to prevent the list item from handling the event when the
element (or any children of the element) is clicked.`]}),`
`,(0,C.jsx)(n.pre,{children:(0,C.jsx)(n.code,{className:`language-html`,children:`<forge-list-item>
  <button type="button">List Item</button>

  <!--
    Using the forge-ignore attribute allows this element to be placed within the
    list item without causing the list item to respond to pointer events when clicked.
  -->
  <forge-checkbox slot="start" tabindex="-1" forge-ignore aria-label="Checkbox"></forge-checkbox>
</forge-list-item>
`})}),`
`,(0,C.jsx)(n.h2,{id:`with-anchor`,children:`With Anchor`}),`
`,(0,C.jsxs)(n.p,{children:[`Lists can also be used for navigation by providing a `,(0,C.jsx)(n.code,{children:`<a>`}),` element around your main list item content instead. When your list item will navigate to a new page,
it is recommended to use an `,(0,C.jsx)(n.code,{children:`<a>`}),` element to provide the correct semantics and expectations for users.`]}),`
`,(0,C.jsx)(a,{of:p}),`
`,(0,C.jsx)(n.h2,{id:`navigation-menu`,children:`Navigation Menu`}),`
`,(0,C.jsxs)(n.p,{children:[`It is common to provide a list of navigation items in a `,(0,C.jsx)(n.a,{href:`?path=/docs/components-drawer--docs`,children:`drawer`}),` or other container component. This gives your application
a consistent location for the central navigation of your site.`]}),`
`,(0,C.jsx)(n.h3,{id:`navlist`,children:`Navlist`}),`
`,(0,C.jsxs)(n.p,{children:[`When lists are placed within a `,(0,C.jsx)(n.code,{children:`<forge-drawer>`}),` or are used for navigation menus, you should add the `,(0,C.jsx)(n.code,{children:`navlist`}),` attribute to your `,(0,C.jsx)(n.code,{children:`<forge-list>`}),` element so that the
list items are styled appropriately.`]}),`
`,(0,C.jsx)(n.pre,{children:(0,C.jsx)(n.code,{className:`language-html`,children:`<forge-list navlist></forge-list>
`})}),`
`,(0,C.jsx)(a,{of:y}),`
`,(0,C.jsxs)(n.p,{children:[`When using a list as a navigation menu, it is common to provide a visual indicator of the currently active item. This can be done by providing a `,(0,C.jsx)(n.code,{children:`selected`}),`
attribute to the list item that is currently active, or by using the `,(0,C.jsx)(n.code,{children:`selectedValue`}),` attribute on the `,(0,C.jsx)(n.code,{children:`<forge-list>`}),` element to indicate the currently active
item by its matching `,(0,C.jsx)(n.code,{children:`value`}),`.`]}),`
`,(0,C.jsxs)(n.p,{children:[`Additionally, you should provide the `,(0,C.jsx)(n.code,{children:`aria-current="page"`}),` attribute to the currently active list item to indicate to screen readers that it is the current page.`]}),`
`,(0,C.jsx)(n.h2,{id:`with-expandable-items`,children:`With Expandable Items`}),`
`,(0,C.jsxs)(n.p,{children:[`Lists can also contain expandable items via the `,(0,C.jsx)(n.a,{href:`?path=/docs/components-expansion-panel--docs`,children:`expansion panel`}),` component, which can be used to show or hide additional
content and/or sub-lists.`]}),`
`,(0,C.jsx)(a,{of:v}),`
`,(0,C.jsxs)(n.blockquote,{children:[`
`,(0,C.jsxs)(n.p,{children:[(0,C.jsx)(n.strong,{children:`Important:`}),` make note of the `,(0,C.jsx)(n.code,{children:`slot="additional-content"`}),` attribute on elements within the `,(0,C.jsx)(n.code,{children:`<forge-list-item>`}),`. This is required to ensure that the additional content is
visually + structurally separated from the main/interactive list item content, and is announced properly by screen readers.`]}),`
`]}),`
`,(0,C.jsx)(n.h2,{id:`multicolumn-layout`,children:`Multicolumn Layout`}),`
`,(0,C.jsx)(n.p,{children:`The list component supports a responsive multicolumn grid layout that automatically adapts the number of columns based on available width. This is useful for displaying large collections of items in a compact, scannable format.`}),`
`,(0,C.jsxs)(n.p,{children:[`When enabled via the `,(0,C.jsx)(n.code,{children:`multicolumn`}),` attribute, list items are displayed in a CSS Grid using a `,(0,C.jsx)(n.code,{children:`repeat(auto-fit, minmax())`}),` pattern, which creates as many columns as will fit given the minimum column width constraint.`]}),`
`,(0,C.jsx)(a,{of:_}),`
`,(0,C.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,C.jsx)(l,{}),`
`,(0,C.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,C.jsxs)(n.ul,{children:[`
`,(0,C.jsxs)(n.li,{children:[`Verify that you can reach each active list item by keyboard navigation.`,`
`,(0,C.jsxs)(n.ul,{children:[`
`,(0,C.jsx)(n.li,{children:`Ensure a distinct visual style is applied which highlights the currently focused list item.`}),`
`]}),`
`]}),`
`,(0,C.jsx)(n.li,{children:`Verify that pressing the space bar or enter key while focused on a list-item will activate the list-item in the same manner as if it had been clicked with a mouse.`}),`
`,(0,C.jsx)(n.li,{children:`Be sure to include a role attribute to indicate to screen readers what the list-item is being used for.`}),`
`,(0,C.jsx)(n.li,{children:`If the list item contains a checkbox or radio box, ensure that it can be focused and selected/toggled by keyboard.`}),`
`]}),`
`,(0,C.jsx)(n.h2,{id:`css-only`,children:`CSS-Only`}),`
`,(0,C.jsx)(n.p,{children:`The list component is also available as a CSS-only component without the need for JavaScript.`}),`
`,(0,C.jsx)(a,{of:b}),`
`,(0,C.jsx)(d,{})]})}function S(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,C.jsx)(n,{...e,children:(0,C.jsx)(x,{...e})}):x(e)}var C;function w(){return(w=e((()=>{C=r(),n(),i(),c(),u(),h()})))()}w();export{S as default};