import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-92lRto7J.js";import{n as c,t as l}from"./CustomArgTypes-sQOLn0vT.js";import{a as u,i as d,n as f,r as p,t as m}from"./Autocomplete.stories-CAeOIH5j.js";function h(e){let n={blockquote:`blockquote`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(s,{of:m}),`
`,(0,_.jsx)(o,{}),`
`,(0,_.jsxs)(n.p,{children:[`The autocomplete is a "decorator" style component in that allows you to wrap a `,(0,_.jsx)(n.code,{children:`<forge-autocomplete>`}),` element around any HTML that contains an `,(0,_.jsx)(n.code,{children:`<input>`}),` element as a child.
This allows the autocomplete to bind itself to that `,(0,_.jsx)(n.code,{children:`<input>`}),` and show suggestions in a popover as the user is typing.`]}),`
`,(0,_.jsxs)(n.p,{children:[`It is expected that the consuming application/library provides a `,(0,_.jsx)(n.code,{children:`filter`}),` callback that the component can call when it needs to update the list of available options or suggestions.
There are many variations of using an autocomplete and it is highly configurable, and while it's most commonly used together with a backend service to provide suggestions asynchronously,
it's up to the developer to choose how to fetch and return the options based on the current text the user has typed into the `,(0,_.jsx)(n.code,{children:`<input>`}),` element.`]}),`
`,(0,_.jsx)(a,{of:p}),`
`,(0,_.jsxs)(n.p,{children:[`The only requirement in the HTML is to provide a child `,(0,_.jsx)(n.code,{children:`<input>`}),` element. While a `,(0,_.jsx)(n.code,{children:`<forge-text-field>`}),` component will typically be used, you can attach autocomplete functionality to
any `,(0,_.jsx)(n.code,{children:`<input>`}),` element. This allows for flexibility in the styling of the input, while allowing the autocomplete to provide suggestions in the form of a floating popover anchored to
that input.`]}),`
`,(0,_.jsxs)(n.p,{children:[`The only requirement for integration via JavaScript is that you provide a callback function to the `,(0,_.jsx)(n.code,{children:`filter`}),` property to provide options based on the current filter text.`]}),`
`,(0,_.jsx)(n.h2,{id:`modes`,children:`Modes`}),`
`,(0,_.jsx)(n.p,{children:`The autocomplete component has two modes:`}),`
`,(0,_.jsxs)(n.ul,{children:[`
`,(0,_.jsxs)(n.li,{children:[(0,_.jsx)(n.strong,{children:`default`}),`: This is the stateful mode where the component will manage the selection state for you as a form control. This is the most common mode.`]}),`
`,(0,_.jsxs)(n.li,{children:[(0,_.jsx)(n.strong,{children:`stateless`}),`: This is the stateless mode where the component will not manage the selection state. This mode is useful when you want to just use the autocomplete to allow for the
user to type in a value and then you can handle the selection state yourself.`]}),`
`]}),`
`,(0,_.jsx)(n.h2,{id:`initial-value`,children:`Initial Value`}),`
`,(0,_.jsx)(n.p,{children:`The autocomplete component can be initialized with a selected value. This is useful when you want to pre-populate the input with a value from a previous selection on page load. This comes
with the caveat that you must also provide the option(s) that the autocomplete can use to filter and select from to show the display text in the input for the bound value.`}),`
`,(0,_.jsx)(n.p,{children:`This can be done in two ways:`}),`
`,(0,_.jsxs)(n.ol,{children:[`
`,(0,_.jsxs)(n.li,{children:[`By providing the `,(0,_.jsx)(n.code,{children:`value`}),` property with the full `,(0,_.jsx)(n.code,{children:`IOption`}),` object that contains both the `,(0,_.jsx)(n.code,{children:`value`}),` and `,(0,_.jsx)(n.code,{children:`label`}),` properties.`]}),`
`,(0,_.jsxs)(n.li,{children:[`Using the `,(0,_.jsx)(n.code,{children:`filter`}),` callback to return the full `,(0,_.jsx)(n.code,{children:`IOption`}),` object that matches the `,(0,_.jsx)(n.code,{children:`value`}),` by using the second parameter of the callback. This parameter is provided by the autocomplete
only when the it cannot locate a matching option in the current list of options. It allow for you to fetch the option from a backend service or other source.`]}),`
`]}),`
`,(0,_.jsx)(n.h2,{id:`filtering`,children:`Filtering`}),`
`,(0,_.jsx)(n.p,{children:`The autocomplete component will filter the options based on the text entered into the input by the user. When the filter callback is executed, it will pass the current text in the input
as the first parameter. This allows you to use whatever means necessary to fetch and filter the options to display in the dropdown. The autocomplete will then display the options in a
popover anchored to the input to allow the user to make a selection.`}),`
`,(0,_.jsxs)(n.p,{children:[`The filter callback can return a promise or a synchronous array of options. If the `,(0,_.jsx)(n.code,{children:`filter`}),` callback returns a promise, the autocomplete will show a loading spinner in the dropdown until
the promise is resolved. This is useful when you need to fetch options asynchronously from a backend service.`]}),`
`,(0,_.jsx)(n.p,{children:`As noted above in regards to initial value, the filter callback also has a second parameter that is provided by the autocomplete when it cannot locate a matching option in the current list
of options. This parameter is the current selected value bound to the component, and allows you to fetch the full option from a backend service or other source to display in the input.`}),`
`,(0,_.jsx)(n.h2,{id:`infinite-scrolling`,children:`Infinite Scrolling`}),`
`,(0,_.jsx)(n.p,{children:`The autocomplete component supports infinite scrolling for scenarios when there are too many potential options to display in the dropdown in a performant manner. This is useful when you want
to provide a seamless experience for the user when they are searching for an option in a large list, but they don't necessarily know what they are looking for and need to see more options.`}),`
`,(0,_.jsxs)(n.p,{children:[`This can be enabled by using the `,(0,_.jsx)(n.code,{children:`observe-scroll`}),` attribute. When this attribute is present, the autocomplete will emit the `,(0,_.jsx)(n.code,{children:`forge-autocomplete-scrolled-bottom`}),` event when the user
scrolls to the bottom of the dropdown. You can listen for this event and then call the `,(0,_.jsx)(n.code,{children:`appendOptions()`}),` method on the autocomplete to add more options to the dropdown.`]}),`
`,(0,_.jsx)(a,{of:d}),`
`,(0,_.jsxs)(n.blockquote,{children:[`
`,(0,_.jsxs)(n.p,{children:[(0,_.jsx)(n.strong,{children:`Note:`}),` You will need a reference to the `,(0,_.jsx)(n.code,{children:`<forge-autocomplete>`}),` element to call the `,(0,_.jsx)(n.code,{children:`appendOptions()`}),` method.`]}),`
`]}),`
`,(0,_.jsx)(n.h2,{id:`custom-option-templates`,children:`Custom Option Templates`}),`
`,(0,_.jsxs)(n.p,{children:[`The autocomplete component allows you to customize the appearance of the options in the dropdown by providing a custom template for the options. This is useful when you want to display
more information about the options than just the label. You can provide a custom template by using the `,(0,_.jsx)(n.code,{children:`optionBuilder`}),` callback. This callback will be called for each option in the
dropdown as it is being created and should return an HTML element that will be rendered within the list item.`]}),`
`,(0,_.jsxs)(n.p,{children:[`The following example shows how you can use the `,(0,_.jsx)(n.code,{children:`optionBuilder`}),` callback to customize the appearance of the options in the dropdown by adding an avatar to each option:`]}),`
`,(0,_.jsx)(a,{of:f}),`
`,(0,_.jsxs)(n.blockquote,{children:[`
`,(0,_.jsxs)(n.p,{children:[(0,_.jsx)(n.strong,{children:`Note:`}),` The content you return will be rendered within a `,(0,_.jsx)(n.code,{children:`<forge-list-item>`}),` element, so you should only return the content of the list item, not a replacement for the list item itself.`]}),`
`]}),`
`,(0,_.jsx)(n.h2,{id:`empty-state`,children:`Empty State`}),`
`,(0,_.jsx)(n.p,{children:`When the filter callback returns no results, the default empty state message is displayed to provide feedback to the user. This is useful for indicating that the search returned no matches.`}),`
`,(0,_.jsxs)(n.p,{children:[`For more control over the empty state content, use the `,(0,_.jsx)(n.code,{children:`emptyMessage`}),` property to change it, or the `,(0,_.jsx)(n.code,{children:`emptyStateBuilder`}),` callback. The callback receives the current filter text and can return either a `,(0,_.jsx)(n.code,{children:`string`}),` or an `,(0,_.jsx)(n.code,{children:`HTMLElement`}),`:`]}),`
`,(0,_.jsx)(n.pre,{children:(0,_.jsx)(n.code,{className:`language-typescript`,children:`// Update the default text
autocomplete.emptyMessage = 'Better luck next time!';

// Return a dynamic string
autocomplete.emptyStateBuilder = (filterText) => {
  return \`No results found for "\${filterText}"\`;
};

// Or return custom HTML
autocomplete.emptyStateBuilder = (filterText) => {
  const el = document.createElement('div');
  el.innerHTML = \`<strong>No matches</strong><br>Try a different search term\`;
  return el;
};
`})}),`
`,(0,_.jsxs)(n.blockquote,{children:[`
`,(0,_.jsxs)(n.p,{children:[(0,_.jsx)(n.strong,{children:`Note:`}),` If both `,(0,_.jsx)(n.code,{children:`emptyMessage`}),` and `,(0,_.jsx)(n.code,{children:`emptyStateBuilder`}),` are set, the `,(0,_.jsx)(n.code,{children:`emptyStateBuilder`}),` takes precedence.`]}),`
`]}),`
`,(0,_.jsx)(n.h2,{id:`configuration`,children:`Configuration`}),`
`,(0,_.jsx)(n.p,{children:`The autocomplete is one of the most volatile and highly configurable components in the Forge library. It has many properties that allow you to customize the behavior and appearance of the
component to suit your needs. The autocomplete can be used in a variety of ways, from simple text input with suggestions to complex forms with multiple selections and chips. See the API
reference below for a full list of properties and their descriptions.`}),`
`,(0,_.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,_.jsx)(l,{}),`
`,(0,_.jsx)(n.h2,{id:`keyboard-shortcuts`,children:`Keyboard Shortcuts`}),`
`,(0,_.jsxs)(n.table,{children:[(0,_.jsx)(n.thead,{children:(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.th,{children:`Name`}),(0,_.jsx)(n.th,{children:`Description`})]})}),(0,_.jsxs)(n.tbody,{children:[(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.td,{children:(0,_.jsx)(n.strong,{children:`Select Opened`})}),(0,_.jsx)(n.td,{})]}),(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.td,{children:(0,_.jsx)(n.code,{children:`down / arrow down`})}),(0,_.jsx)(n.td,{children:`Opens the dropdown and activates the first option`})]}),(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.td,{children:(0,_.jsx)(n.strong,{children:`Dropdown opened`})}),(0,_.jsx)(n.td,{})]}),(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.td,{children:(0,_.jsx)(n.code,{children:`tab`})}),(0,_.jsx)(n.td,{children:`Single select: Select the active option`})]}),(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.td,{children:(0,_.jsx)(n.code,{children:`escape`})}),(0,_.jsx)(n.td,{children:`Close the dropdown when the dropdown is open`})]}),(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.td,{children:(0,_.jsx)(n.code,{children:`down / arrow down`})}),(0,_.jsx)(n.td,{children:`List keyboard shortcuts`})]}),(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.td,{children:(0,_.jsx)(n.code,{children:`up / arrow up`})}),(0,_.jsx)(n.td,{children:`List keyboard shortcuts`})]}),(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.td,{children:(0,_.jsx)(n.code,{children:`enter / home / end`})}),(0,_.jsx)(n.td,{children:`List keyboard shortcuts`})]}),(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.td,{children:(0,_.jsx)(n.strong,{children:`Dropdown opened or closed`})}),(0,_.jsx)(n.td,{})]}),(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.td,{children:(0,_.jsx)(n.code,{children:`backspace`})}),(0,_.jsx)(n.td,{children:`Two or more input.value.length: Removes the end character in the input.value`})]}),(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.td,{children:(0,_.jsx)(n.code,{children:`backspace`})}),(0,_.jsx)(n.td,{children:`One input.value.length and Single select and not a chip field: Clears the input.value`})]}),(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.td,{children:(0,_.jsx)(n.code,{children:`delete`})}),(0,_.jsx)(n.td,{children:`Two or more input.value.length: Removes the start character in the input.value`})]}),(0,_.jsxs)(n.tr,{children:[(0,_.jsx)(n.td,{children:(0,_.jsx)(n.code,{children:`delete`})}),(0,_.jsx)(n.td,{children:`One input.value.length and Single select and not a chip field: Clears the input.value`})]})]})]}),`
`,(0,_.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,_.jsxs)(n.ul,{children:[`
`,(0,_.jsx)(n.li,{children:`Verify that you can tab into the autocomplete component.`}),`
`,(0,_.jsx)(n.li,{children:`Verify that you can access the options within the autocomplete component using only the keyboard.`}),`
`,(0,_.jsxs)(n.li,{children:[`The input element will receive the proper ARIA attributes such as `,(0,_.jsx)(n.code,{children:`role="combobox"`}),`, `,(0,_.jsx)(n.code,{children:`aria-live`}),`, `,(0,_.jsx)(n.code,{children:`aria-owns`}),`, ... etc.`]}),`
`,(0,_.jsxs)(n.li,{children:[`You should ensure that you either use a `,(0,_.jsx)(n.code,{children:`<label>`}),` element, or add an `,(0,_.jsx)(n.code,{children:`aria-label`}),` or `,(0,_.jsx)(n.code,{children:`aria-labelledby`}),` attribute to provide a meaningful label.`]}),`
`]})]})}function g(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,_.jsx)(n,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;function v(){return(v=e((()=>{_=r(),n(),i(),c(),u()})))()}v();export{g as default};