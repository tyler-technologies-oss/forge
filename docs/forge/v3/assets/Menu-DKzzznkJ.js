import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-DnLnh7by.js";import{n as c,t as l}from"./CustomArgTypes-DS7Rl0eI.js";import{a as u,i as d,n as f,r as p,t as m}from"./Menu.stories-qI4GKIrJ.js";function h(e){let n={blockquote:`blockquote`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(s,{of:d}),`
`,(0,_.jsx)(o,{}),`
`,(0,_.jsx)(n.p,{children:`Menus are used to provide a list of options/actions to a user, and are typically anchored dynamically to a button or other similar trigger element.`}),`
`,(0,_.jsxs)(n.p,{children:[`The `,(0,_.jsx)(n.code,{children:`<forge-menu>`}),` component is a "decorator" style component which means it wraps around a trigger element and will attach itself to automatically open
and close when the trigger element is interacted with.`]}),`
`,(0,_.jsx)(n.p,{children:`Menus can be used in a variety of ways, such as a simple list of options, a list of actions, or a hierarchical/cascading list of options. Menus do not
hold selection state.`}),`
`,(0,_.jsx)(a,{of:f}),`
`,(0,_.jsx)(n.h2,{id:`javascript`,children:`JavaScript`}),`
`,(0,_.jsxs)(n.p,{children:[`The `,(0,_.jsx)(n.code,{children:`<forge-menu>`}),` currently requires the use of JavaScript to set the options to display in the menu dropdown. The `,(0,_.jsx)(n.code,{children:`options`}),` property is an array of objects
where each object represents a menu item, and each object can have various configuration supplied for things like the label, icon, custom templates, and more.`]}),`
`,(0,_.jsx)(n.p,{children:`Below is an example of a basic array of menu options:`}),`
`,(0,_.jsx)(n.pre,{children:(0,_.jsx)(n.code,{className:`language-javascript`,children:`const options: IMenuOption[] = [
  { label: 'Option 1', value: 'option-1' },
  { label: 'Option 2', value: 'option-2' },
  { label: 'Option 3', value: 'option-3' }
];
`})}),`
`,(0,_.jsxs)(n.p,{children:[`This options array can then be set (or bound via framework) to the `,(0,_.jsx)(n.code,{children:`options`}),` property of the `,(0,_.jsx)(n.code,{children:`<forge-menu>`}),` component.`]}),`
`,(0,_.jsxs)(n.blockquote,{children:[`
`,(0,_.jsxs)(n.p,{children:[(0,_.jsx)(n.strong,{children:`Note:`}),` If you need to render icons in the menu, you can use the `,(0,_.jsx)(n.code,{children:`icon`}),`/`,(0,_.jsx)(n.code,{children:`leadingIcon`}),` and/or `,(0,_.jsx)(n.code,{children:`trailingIcon`}),` properties on the menu option object.
There are also corresponding `,(0,_.jsx)(n.code,{children:`leadingIconType`}),` and `,(0,_.jsx)(n.code,{children:`trailingIconType`}),` properties to specify the element type that will be rendered. Set these
to `,(0,_.jsx)(n.code,{children:`'component'`}),` to render a `,(0,_.jsx)(n.code,{children:`<forge-icon>`}),` element.`]}),`
`]}),`
`,(0,_.jsx)(n.h2,{id:`option-select-callbacks`,children:`Option select callbacks`}),`
`,(0,_.jsxs)(n.p,{children:[`Every selection dispatches a single `,(0,_.jsx)(n.code,{children:`forge-menu-select`}),` event on the `,(0,_.jsx)(n.code,{children:`<forge-menu>`}),` element with the selected option's `,(0,_.jsx)(n.code,{children:`value`}),` in the event detail. When a
menu lists actions, that means a handler that branches over every value. Instead, you can attach an `,(0,_.jsx)(n.code,{children:`onSelect`}),` callback directly to each option so the
action lives next to the option that triggers it:`]}),`
`,(0,_.jsx)(n.pre,{children:(0,_.jsx)(n.code,{className:`language-javascript`,children:`const options: IMenuOption[] = [
  { label: 'Print', value: 'print', onSelect: () => print() },
  { label: 'Export', value: 'export', onSelect: () => exportReport() }
];
`})}),`
`,(0,_.jsxs)(n.p,{children:[`The callback receives the same data as the `,(0,_.jsx)(n.code,{children:`forge-menu-select`}),` event and runs after the event has been dispatched. Calling `,(0,_.jsx)(n.code,{children:`preventDefault()`}),` on the
event cancels the selection, and the callback does not run. Nested options in cascading menus are called from the child menu that renders them.`]}),`
`,(0,_.jsx)(n.h2,{id:`cascading`,children:`Cascading`}),`
`,(0,_.jsx)(n.p,{children:`Cascading menus are used to display a hierarchical list of options. When a menu item is hovered, a child menu will open next of the parent menu item.`}),`
`,(0,_.jsxs)(n.p,{children:[`To set up a cascading menu, you can provide an array of options to the `,(0,_.jsx)(n.code,{children:`options`}),` property on any menu option object. This tells the menu to render a child
menu when the parent menu item is hovered:`]}),`
`,(0,_.jsx)(n.pre,{children:(0,_.jsx)(n.code,{className:`language-javascript`,children:`const options: IMenuOption[] = [
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
`,(0,_.jsx)(a,{of:m}),`
`,(0,_.jsx)(n.h2,{id:`menu-groups`,children:`Menu Groups`}),`
`,(0,_.jsxs)(n.p,{children:[`Grouping menu items can be useful to visually separate different types of options. The menu options use the `,(0,_.jsx)(n.code,{children:`IMenuOptionGroup`}),` interface to define the group
and its options.`]}),`
`,(0,_.jsx)(n.p,{children:`Below is an example of a basic array of menu options with groups:`}),`
`,(0,_.jsx)(n.pre,{children:(0,_.jsx)(n.code,{className:`language-javascript`,children:`let optionGroup: IMenuOptionGroup[] = [
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
`,(0,_.jsx)(a,{of:p}),`
`,(0,_.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,_.jsx)(l,{}),`
`,(0,_.jsx)(n.h2,{id:`keyboard-shortcuts`,children:`Keyboard shortcuts`}),`
`,(0,_.jsxs)(n.table,{children:[(0,_.jsx)(n.thead,{children:(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.th,{children:`Menu open`}),(0,_.jsx)(n.th,{children:`Description`})]})}),(0,_.jsxs)(n.tbody,{children:[(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.td,{children:(0,_.jsx)(n.code,{children:`space / escape`})}),(0,_.jsx)(n.td,{children:`Closes the menu.`})]}),(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.td,{children:(0,_.jsx)(n.code,{children:`enter / arrow right`})}),(0,_.jsx)(n.td,{children:`Opens and closes child menu of the focused menu item.`})]}),(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.td,{children:(0,_.jsx)(n.code,{children:`arrow left`})}),(0,_.jsxs)(n.td,{children:[(0,_.jsx)(n.strong,{children:`Mode is Cascade`}),`: Closes the menu.`]})]})]})]}),`
`,(0,_.jsxs)(n.table,{children:[(0,_.jsx)(n.thead,{children:(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.th,{children:`Menu closed`}),(0,_.jsx)(n.th,{children:`Description`})]})}),(0,_.jsxs)(n.tbody,{children:[(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.td,{children:(0,_.jsx)(n.code,{children:`space`})}),(0,_.jsx)(n.td,{children:`Opens the menu.`})]}),(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.td,{children:(0,_.jsx)(n.code,{children:`enter`})}),(0,_.jsx)(n.td,{children:`Opens the menu and Opens and closes child menu of the focused menu item.`})]}),(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.td,{children:(0,_.jsx)(n.code,{children:`arrow down`})}),(0,_.jsx)(n.td,{children:`Opens the menu and focuses the first menu item.`})]})]})]}),`
`,(0,_.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,_.jsxs)(n.ul,{children:[`
`,(0,_.jsxs)(n.li,{children:[`Verify that the trigger element used to open and close the menu can be focused and activated by keyboard.`,`
`,(0,_.jsxs)(n.ul,{children:[`
`,(0,_.jsx)(n.li,{children:`Ensure that there is a visual cue that the trigger element is currently in focus.`}),`
`]}),`
`]}),`
`,(0,_.jsx)(n.li,{children:`Verify that pressing the space bar or enter key while focused on the trigger element will activate the menu in the same manner as if it had been clicked with a mouse.`}),`
`,(0,_.jsx)(n.li,{children:`Ensure each menu item can be selected by using arrow-up and arrow-down.`}),`
`]})]})}function g(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,_.jsx)(n,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;function v(){return(v=e((()=>{_=r(),n(),i(),c(),u()})))()}v();export{g as default};