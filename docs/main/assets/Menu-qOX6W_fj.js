import{j as e,M as s,T as c,C as i}from"./index-D8Y1Xo_F.js";import{useMDXComponents as o}from"./index-tWRZnc61.js";import{C as d}from"./CustomArgTypes-BwwbQ9aG.js";import{M as a,D as l,C as h}from"./Menu.stories-Cl4ty8ro.js";import"./iframe-C3TB-rMS.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-BbKlM6X4.js";import"./lit-element-JplMEnZc.js";import"./lit-html-paDGiEfB.js";import"./style-map-C9nPWcxA.js";import"./directive-CF8sV3Lr.js";import"./feature-detection-DRCh51Sa.js";import"./menu-C3nn2V7z.js";import"./constants-9n5_0r7k.js";import"./base-adapter-B6TJxM93.js";import"./index-ByifSpfC.js";import"./icon-DB7kP3Ec.js";import"./index-BmocOEUj.js";import"./list-ByS02Pjt.js";import"./state-layer-IxmMcKDT.js";import"./focus-indicator-DzT8BbE-.js";import"./with-default-aria-B0dk5gj8.js";import"./a11y-utils-DJ_tX8xT.js";import"./list-dropdown-aware-core-DOBtjiRo.js";import"./list-dropdown-DfIaHUdb.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-CqfIuBkR.js";import"./popover-CUMSy1gT.js";import"./overlay-es9tef1H.js";import"./with-longpress-listener-BdUe1dXe.js";import"./dismissible-stack-C80072oY.js";import"./skeleton-D2S3-1Sc.js";import"./a11y-BxM9_46k.js";import"./button-DaDzbT7D.js";import"./base-button-adapter-CyoupZ7K.js";import"./with-label-aware-OEbK3wHg.js";function r(t){const n={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...o(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:a}),`
`,e.jsx(c,{}),`
`,e.jsx(n.p,{children:"Menus are used to provide a list of options/actions to a user, and are typically anchored dynamically to a button or other similar trigger element."}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<forge-menu>"}),` component is a "decorator" style component which means it wraps around a trigger element and will attach itself to automatically open
and close when the trigger element is interacted with.`]}),`
`,e.jsx(n.p,{children:`Menus can be used in a variety of ways, such as a simple list of options, a list of actions, or a hierarchical/cascading list of options. Menus do not
hold selection state.`}),`
`,e.jsx(i,{of:l}),`
`,e.jsx(n.h2,{id:"javascript",children:"JavaScript"}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<forge-menu>"})," currently requires the use of JavaScript to set the options to display in the menu dropdown. The ",e.jsx(n.code,{children:"options"}),` property is an array of objects
where each object represents a menu item, and each object can have various configuration supplied for things like the label, icon, custom templates, and more.`]}),`
`,e.jsx(n.p,{children:"Below is an example of a basic array of menu options:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`const options: IMenuOption[] = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' }
];
`})}),`
`,e.jsxs(n.p,{children:["This options array can then be set (or bound via framework) to the ",e.jsx(n.code,{children:"options"})," property of the ",e.jsx(n.code,{children:"<forge-menu>"})," component."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," If you need to render icons in the menu, you can use the ",e.jsx(n.code,{children:"icon"}),"/",e.jsx(n.code,{children:"leadingIcon"})," and/or ",e.jsx(n.code,{children:"trailingIcon"}),` properties on the menu option object.
There are also corresponding `,e.jsx(n.code,{children:"leadingIconType"})," and ",e.jsx(n.code,{children:"trailingIconType"}),` properties to specify the element type that will be rendered. Set these
to `,e.jsx(n.code,{children:"'component'"})," to render a ",e.jsx(n.code,{children:"<forge-icon>"})," element."]}),`
`]}),`
`,e.jsx(n.h2,{id:"cascading",children:"Cascading"}),`
`,e.jsx(n.p,{children:"Cascading menus are used to display a hierarchical list of options. When a menu item is hovered, a child menu will open next of the parent menu item."}),`
`,e.jsx(i,{of:h}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(d,{}),`
`,e.jsx(n.h2,{id:"keyboard-shortcuts",children:"Keyboard shortcuts"}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Menu open"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"space / escape"})}),e.jsx(n.td,{children:"Closes the menu."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"enter / arrow right"})}),e.jsx(n.td,{children:"Opens and closes child menu of the focused menu item."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"arrow left"})}),e.jsxs(n.td,{children:[e.jsx(n.strong,{children:"Mode is Cascade"}),": Closes the menu."]})]})]})]}),`
`,e.jsxs(n.table,{children:[e.jsx(n.thead,{children:e.jsxs(n.tr,{children:[e.jsx(n.th,{children:"Menu closed"}),e.jsx(n.th,{children:"Description"})]})}),e.jsxs(n.tbody,{children:[e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"space"})}),e.jsx(n.td,{children:"Opens the menu."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"enter"})}),e.jsx(n.td,{children:"Opens the menu and Opens and closes child menu of the focused menu item."})]}),e.jsxs(n.tr,{children:[e.jsx(n.td,{children:e.jsx(n.code,{children:"arrow down"})}),e.jsx(n.td,{children:"Opens the menu and focuses the first menu item."})]})]})]}),`
`,e.jsx(n.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Verify that the trigger element used to open and close the menu can be focused and activated by keyboard.",`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Ensure that there is a visual cue that the trigger element is currently in focus."}),`
`]}),`
`]}),`
`,e.jsx(n.li,{children:"Verify that pressing the space bar or enter key while focused on the trigger element will activate the menu in the same manner as if it had been clicked with a mouse."}),`
`,e.jsx(n.li,{children:"Ensure each menu item can be selected by using arrow-up and arrow-down."}),`
`]})]})}function U(t={}){const{wrapper:n}={...o(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{U as default};
