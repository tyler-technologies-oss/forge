import{j as e,M as r}from"./blocks-B0mVbcMk.js";import{useMDXComponents as i}from"./index-DhkgItXa.js";import"./FocusIndicatorClipping.stories-BQqHmxkR.js";import"./iframe-BBIpcTp1.js";import"./_commonjsHelpers-CqkleIqs.js";import"./feature-detection-uS6p5jc8.js";import"./card-BP-ena7y.js";import"./base-lit-element-BujLXP1z.js";import"./utils-CRxrUqQD.js";import"./scaffold-CGyusmPL.js";import"./constants-wOq9K3uV.js";import"./button-r2EMLpWm.js";import"./base-adapter-Mla2Q9YN.js";import"./icon-B8CdcxqJ.js";import"./index-CiLSBptl.js";import"./focus-indicator-IWpzSXYP.js";import"./state-layer-BFwsAUDA.js";import"./base-button-adapter-D0zqnDMQ.js";import"./with-label-aware-D31hYnqk.js";import"./with-default-aria-CUUWGrPB.js";import"./a11y-utils-fzPGYZJ6.js";import"./text-field-BnoM3v28.js";import"./base-field-PCIQc44M.js";import"./label-BSASIOtP.js";import"./button-toggle-group-D5jBldBo.js";import"./with-form-associated-BeE6NBc1.js";import"./checkbox-DOmkbh7U.js";import"./icon-button-DkluvO-9.js";import"./switch-Bt2bdQXJ.js";import"./tooltip-CcxiN_AO.js";import"./overlay-D-bkGTD9.js";import"./with-longpress-listener-CGXzI-TM.js";import"./dismissible-stack-BdWcv7_4.js";import"./decorators-BfeqqAiL.js";function t(o){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{title:"FAQ/Dropdown Options"}),`
`,e.jsx(n.h1,{id:"dropdown-options",children:"Dropdown Options"}),`
`,e.jsx(n.p,{children:`Many of the dropdown-style components in Tyler Forge™, such as the autocomplete and menu for example, are configured using an array of JavaScript objects that
describe the options that should be rendered to the user. This allows for a high degree of customization and flexibility when it comes to the content and
behavior of the dropdown, while also making it easier to manage the data that is displayed.`}),`
`,e.jsx(n.p,{children:`With that said, sometimes it can be difficult to understand how to configure these dropdowns, especially when it comes to more complex scenarios. This guide
will help you understand how to configure options in various ways, while also showing example of how to use what we call "builder" callbacks to provide
your own custom content and overrides for the options.`}),`
`,e.jsx(n.h2,{id:"list-items",children:"List Items"}),`
`,e.jsxs(n.p,{children:['The "options" you see rendered within a dropdwon are just ',e.jsx(n.code,{children:"<forge-list-item>"})," components that are rendered within a ",e.jsx(n.code,{children:"<forge-list>"}),` component. This means that
you can use the same configuration options that are available to the `,e.jsx(n.code,{children:"<forge-list-item>"}),` component to customize the appearance and behavior of the options
that are rendered in the dropdown.`]}),`
`,e.jsx(n.p,{children:`Keep this in mind for below when we discuss the builder callbacks because an instance of the list item component is created for each option that is rendered in the
dropdown, and it is provided as an argument to the builder callback so that you can further control the list item if necessary.`}),`
`,e.jsx(n.h2,{id:"configuration",children:"Configuration"}),`
`,e.jsxs(n.p,{children:[`The configuration of dropdown options is typically done using an array of JavaScript objects that describe the options that should be rendered in the dropdown.
Each object in the array represents an option that the user can select, and typically contains properties such as `,e.jsx(n.code,{children:"label"}),", ",e.jsx(n.code,{children:"value"}),", and ",e.jsx(n.code,{children:"disabled"}),` (among many others)
to control the appearance and behavior of the option.`]}),`
`,e.jsx(n.p,{children:"The interfaces below are an example of all of the configuration properties that are available to you at a base level:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`interface IBaseListDropdownOption<T = any> {
  value: T; // The underlying value
  label: string; // The primary text
  secondaryLabel?: string; // Secondary supporting text (optional)
  disabled?: boolean; // Whether the option is disabled
  divider?: boolean; // Options can be just a divider to separate groups of options
  optionClass?: string | string[]; // Custom CSS classes to apply to the option
  leadingIcon?: string; // Leading icon name
  leadingIconClass?: string; // Custom CSS classes to apply to the leading icon
  leadingIconType?: ListDropdownIconType; // Icon type, font (default) or component (renders a <forge-icon>).
  leadingIconComponentProps?: Partial<IIconComponent>; // Props to pass to the leading icon component (only pertains when the leading icon type is "component")
  trailingIcon?: string; // Trailing icon name
  trailingIconClass?: string; // Custom CSS classes to apply to the trailing icon
  trailingIconType?: ListDropdownIconType; // Icon type, font (default) or component (renders a <forge-icon>).
  trailingIconComponentProps?: Partial<IIconComponent>; // Props to pass to the trailing icon component (only pertains when the trailing icon type is "component")
  leadingBuilder?: () => HTMLElement; // Allows for providing a custom content in the leading area of the option
  trailingBuilder?: () => HTMLElement; // Allows for providing a custom content in the trailing area of the option
  tooltip?: ListDropdownTooltipConfig; // Tooltip configuration
}

interface IListDropdownOption<T = any> extends IBaseListDropdownOption<T> {
  options?: Array<IListDropdownOption | IListDropdownOptionGroup>; // Nested options (can be a flat list of options or a group of options with header labels)
  elementAttributes?: Map<string, string>; // Attributes to apply to the option (<forge-list-item>)
}
`})}),`
`,e.jsx(n.p,{children:`The interface is the base configuration that is used for all dropdown-style components in Tyler Forge™. However, each dropdown component may have additional
properties that are specific to that component. See below for information on how to configure options for each dropdown component:`}),`
`,e.jsx(n.h3,{id:"menu",children:"Menu"}),`
`,e.jsx(n.p,{children:"The menu component provides a few additional configuration options that are specific to the menu component:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`interface IMenuOption<T = any> extends IListDropdownOption<T> {
  icon?: string; // A convenience property for setting the leading icon
  selected?: boolean; // Whether the option is selected
}
`})}),`
`,e.jsx(n.h3,{id:"builder-callbacks",children:"Builder Callbacks"}),`
`,e.jsx(n.p,{children:`Builder callbacks are a way to provide your own custom content and overrides for the options that are rendered in the dropdown. This concept is commonly known
as "render props" in various frameworks out there. It essentially allows for you to hook into the rendering process of the options and provide your own custom
content or behavior for each option that is rendered (to an extent).`}),`
`,e.jsx(n.p,{children:"See below for an example of how to use builder callbacks to provide your own custom content for the options that are rendered in the dropdown:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`// The type for the builder callback will be specific to the component.
// Below is an example that pertains to the \`<forge-menu>\` component.
const optionBuilder: MenuOptionBuilder = (option, listItem) => {
  // You can modify the \`<forge-list-item>\` here if necessary via the \`listItem\` argument
  listItem.setAttribute('data-custom-attribute', 'custom-value');

  // You can return either a string (which overrides the option label) or an HTML element
  const span = document.createElement('span');
  span.style.color = 'red';
  span.textContent = \`Custom label: \${option.label}\`;
  return span;
}
`})}),`
`,e.jsx(n.h3,{id:"example",children:"Example"}),`
`,e.jsx(n.p,{children:"Below is an example of how you might configure menu options using various properties such as leading icons, secondary text, and tooltips:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-typescript",children:`const options: IMenuOption[] = [
  {
    label: 'Settings',
    secondaryLabel: 'Settings for your account',
    value: 'settings',
    leadingIcon: 'settings',
    leadingIconType: 'component',
    tooltip: { text: 'View user settings', type: 'label' }
  },
  {
    label: 'Help',
    secondaryLabel: 'Get help with the application',
    value: 'help',
    leadingIcon: 'help',
    leadingIconType: 'component',
    tooltip: { text: 'View help information', type: 'label' }
  }
];
`})}),`
`,e.jsx(n.h2,{id:"declarative-configuration",children:"Declarative Configuration"}),`
`,e.jsxs(n.p,{children:[`The select component is a good example of a dropdown-style component that uses a declarative configuration to define the options that should be displayed to the user.
The child `,e.jsx(n.code,{children:"<forge-option>"}),` elements are just configuration. However, this is just syntax sugar for the underlying JavaScript objects configuration that is used to
render the options.`]}),`
`,e.jsxs(n.p,{children:["A caveat with this pattern is that if you were to place any HTML within the ",e.jsx(n.code,{children:"<forge-option>"}),` elements, it would be rendered as text and not as HTML. This is because
the `,e.jsx(n.code,{children:"<forge-option>"})," elements are just configuration and not actual HTML elements that get rendered in the dropdown..."]}),`
`,e.jsx(n.h2,{id:"future-improvements",children:"Future Improvements"}),`
`,e.jsxs(n.p,{children:["Now that the native HTML Popover API is available and used to power the ",e.jsx(n.code,{children:"<forge-popover>"}),", we have the opportunity to actually render the ",e.jsx(n.code,{children:"<forge-option>"}),` elements, and
any HTML specified within their content, verbatim in the dropdown. This will be a huge improvement over the current pattern, and greatly simplify the configuration
and usage of all dropdown-style components within Forge.`]}),`
`,e.jsx(n.p,{children:"We expect to begin work on implementing this change in the second half of 2025, so stay tuned for updates on this exciting new feature!"})]})}function J(o={}){const{wrapper:n}={...i(),...o.components};return n?e.jsx(n,{...o,children:e.jsx(t,{...o})}):t(o)}export{J as default};
