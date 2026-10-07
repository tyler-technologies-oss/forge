import{u as r,j as e,M as s,T as a,C as o}from"./blocks-Cal7HuuV.js";import{C as l}from"./CustomArgTypes-w-oY4vMu.js";import{M as c,D as d,C as h,G as p}from"./Menu.stories-BfCxYNf_.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BQYzHRrc.js";import"./iframe-Doaa3Kdk.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-C8_-3lrC.js";import"./style-map-7Yr-sdwa.js";import"./directive-CwRn8Fwj.js";import"./ref-DJsPY-ou.js";import"./async-directive-MwfSmi4y.js";import"./service-adapter-8tADcN_b.js";import"./menu-CX3Zlgon.js";import"./custom-element-DR9AFpIK.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./core-property-Co8uF8PW.js";import"./dom-utils-BDbRr6KM.js";import"./tyler-icons-NVf08gHb.js";import"./icon-ozIZoPIz.js";import"./property-DJuTIPPA.js";import"./base-lit-element-CpHmPn0S.js";import"./constants-ffvdo6x3.js";import"./create-context-BxR5I8pu.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./list-BGzEP44Z.js";import"./base-component-BFu9bkgC.js";import"./base-adapter-DOky_or5.js";import"./list-item-MbhLyvqr.js";import"./event-utils-zQ4FLDwK.js";import"./state-layer-gtlkuVuf.js";import"./utils-C31il88P.js";import"./focus-indicator-D4pryyUP.js";import"./floating-ui.dom-DaMtbvS2.js";import"./with-element-internals-CFYP_epH.js";import"./a11y-utils-DssnAab5.js";import"./list-dropdown-aware-core-BYe93us0.js";import"./list-dropdown-ChzCuzkA.js";import"./event-utils-C1SDeUaq.js";import"./linear-progress-BuMeIIdZ.js";import"./popover-K4jtrW_G.js";import"./overlay-DNJXwLw8.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./with-longpress-listener-D4ROnnkg.js";import"./dismissible-stack-DyoP5jNB.js";import"./skeleton-CC97axfM.js";import"./a11y-BxM9_46k.js";import"./scroll-axis-observer-DmuibK9q.js";import"./tooltip-BZoCBE_e.js";import"./button-BsMnzWz3.js";import"./class-map-CsjCCn6c.js";import"./base-button-DcOcEdtA.js";import"./state-a4Qik7Qa.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./button-constants-DRqTH6Pv.js";function i(t){const n={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...r(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:c}),`
`,e.jsx(a,{}),`
`,e.jsx(n.p,{children:"Menus are used to provide a list of options/actions to a user, and are typically anchored dynamically to a button or other similar trigger element."}),`
`,e.jsxs(n.p,{children:["The ",e.jsx(n.code,{children:"<forge-menu>"}),` component is a "decorator" style component which means it wraps around a trigger element and will attach itself to automatically open
and close when the trigger element is interacted with.`]}),`
`,e.jsx(n.p,{children:`Menus can be used in a variety of ways, such as a simple list of options, a list of actions, or a hierarchical/cascading list of options. Menus do not
hold selection state.`}),`
`,e.jsx(o,{of:d}),`
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
`,e.jsx(n.h2,{id:"option-select-callbacks",children:"Option select callbacks"}),`
`,e.jsxs(n.p,{children:["Every selection dispatches a single ",e.jsx(n.code,{children:"forge-menu-select"})," event on the ",e.jsx(n.code,{children:"<forge-menu>"})," element with the selected option's ",e.jsx(n.code,{children:"value"}),` in the event detail. When a
menu lists actions, that means a handler that branches over every value. Instead, you can attach an `,e.jsx(n.code,{children:"onSelect"}),` callback directly to each option so the
action lives next to the option that triggers it:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`const options: IMenuOption[] = [
  { label: 'Print', value: 'print', onSelect: () => print() },
  { label: 'Export', value: 'export', onSelect: () => exportReport() }
];
`})}),`
`,e.jsxs(n.p,{children:["The callback receives the same data as the ",e.jsx(n.code,{children:"forge-menu-select"})," event and runs after the event has been dispatched. Calling ",e.jsx(n.code,{children:"preventDefault()"}),` on the
event cancels the selection, and the callback does not run. Nested options in cascading menus are called from the child menu that renders them.`]}),`
`,e.jsx(n.h2,{id:"cascading",children:"Cascading"}),`
`,e.jsx(n.p,{children:"Cascading menus are used to display a hierarchical list of options. When a menu item is hovered, a child menu will open next of the parent menu item."}),`
`,e.jsxs(n.p,{children:["To set up a cascading menu, you can provide an array of options to the ",e.jsx(n.code,{children:"options"}),` property on any menu option object. This tells the menu to render a child
menu when the parent menu item is hovered:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`const options: IMenuOption[] = [
  { label: 'Save', value: 'save' },
  {
    label: 'Edit',
    value: 'edit',
    options: [
      { label: 'As New', value: 'asNew' },
      { label: 'Overwrite', value: 'overwrite' },
      {
        label: 'More',
        value: 'more',
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' }
        ]
      }
    ]
  },
  { label: 'Delete', value: 'delete' }
];
`})}),`
`,e.jsx(o,{of:h}),`
`,e.jsx(n.h2,{id:"menu-groups",children:"Menu Groups"}),`
`,e.jsxs(n.p,{children:["Grouping menu items can be useful to visually separate different types of options. The menu options use the ",e.jsx(n.code,{children:"IMenuOptionGroup"}),` interface to define the group
and its options.`]}),`
`,e.jsx(n.p,{children:"Below is an example of a basic array of menu options with groups:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-javascript",children:`let optionGroup: IMenuOptionGroup[] = [
      {
        text: 'Group 1',
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
        ]
      },
      {
        text: 'Group 2',
        options: [
          { label: 'Option 3', value: 'option3' },
          { label: 'Option 4', value: 'option4' }
        ]
      }
    ];
`})}),`
`,e.jsx(o,{of:p}),`
`,e.jsx(n.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
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
`]})]})}function ge(t={}){const{wrapper:n}={...r(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(i,{...t})}):i(t)}export{ge as default};
