import{j as e,M as r,T as l,C as n}from"./index-w01xucW8.js";import{useMDXComponents as s}from"./index-Be4DGfmT.js";import{C as h}from"./CustomArgTypes-cTufunHN.js";import{A as a,D as c,I as d,C as p}from"./Autocomplete.stories-brSs_dXg.js";import"./iframe-BHKin_8s.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-DyehaB2W.js";import"./lit-element-JplMEnZc.js";import"./lit-html-paDGiEfB.js";import"./chunk-D5ZWXAHU-CGElDDNX.js";import"./v4-CQkTLCs1.js";import"./ref-DJjbfkOF.js";import"./directive-helpers-DcB0QpIl.js";import"./directive-CF8sV3Lr.js";import"./feature-detection-ONR9WHvu.js";import"./autocomplete-kK-Y2VE_.js";import"./constants-BjnHqKgS.js";import"./base-adapter-CQdYccXX.js";import"./index-ByifSpfC.js";import"./divider-CpwmAwgQ.js";import"./icon-B5S0VGIT.js";import"./index-BmocOEUj.js";import"./linear-progress-DPUjJFYN.js";import"./with-default-aria-BcIvJ7-x.js";import"./a11y-utils-BOPvdiVn.js";import"./list-DndFp_bX.js";import"./state-layer-B7GOb8iB.js";import"./focus-indicator-R2otSvsR.js";import"./list-dropdown-aware-core-CDYm9sj0.js";import"./list-dropdown-CXmPPylA.js";import"./event-utils-C1SDeUaq.js";import"./popover-Dq2OmXS_.js";import"./overlay-DAcircNE.js";import"./with-longpress-listener-S3ft74cg.js";import"./dismissible-stack-9mJiid_W.js";import"./skeleton-Dfdgg-pt.js";import"./a11y-BxM9_46k.js";import"./text-field-DHXYud3A.js";import"./base-field-BSRSGQL0.js";import"./label-BOjkkgiS.js";import"./button-vPgaRyW5.js";import"./base-button-adapter-OmzAW3c3.js";import"./with-label-aware-DAaZnhel.js";import"./button-toggle-group-Cft-ohT1.js";import"./with-form-associated-Dm8KqB07.js";import"./checkbox-e65WGDEs.js";import"./icon-button-DfODsaKD.js";import"./switch-BRBW-vzp.js";import"./tooltip-D0ywHBAv.js";import"./chip-set-CZl8AgDF.js";import"./avatar-Du1LPt_G.js";function i(o){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:a}),`
`,e.jsx(l,{}),`
`,e.jsxs(t.p,{children:['The autocomplete is a "decorator" style component in that allows you to wrap a ',e.jsx(t.code,{children:"<forge-autocomplete>"})," element around any HTML that contains an ",e.jsx(t.code,{children:"<input>"}),` element as a child.
This allows the autocomplete to bind itself to that `,e.jsx(t.code,{children:"<input>"})," and show suggestions in a popover as the user is typing."]}),`
`,e.jsxs(t.p,{children:["It is expected that the consuming application/library provides a ",e.jsx(t.code,{children:"filter"}),` callback that the component can call when it needs to update the list of available options or suggestions.
There are many variations of using an autocomplete and it is highly configurable, and while it's most commonly used together with a backend service to provide suggestions asynchronously,
it's up to the developer to choose how to fetch and return the options based on the current text the user has typed into the `,e.jsx(t.code,{children:"<input>"})," element."]}),`
`,e.jsx(n,{of:c}),`
`,e.jsxs(t.p,{children:["The only requirement in the HTML is to provide a child ",e.jsx(t.code,{children:"<input>"})," element. While a ",e.jsx(t.code,{children:"<forge-text-field>"}),` component will typically be used, you can attach autocomplete functionality to
any `,e.jsx(t.code,{children:"<input>"}),` element. This allows for flexibility in the styling of the input, while allowing the autocomplete to provide suggestions in the form of a floating popover anchored to
that input.`]}),`
`,e.jsxs(t.p,{children:["The only requirement for integration via JavaScript is that you provide a callback function to the ",e.jsx(t.code,{children:"filter"})," property to provide options based on the current filter text."]}),`
`,e.jsx(t.h2,{id:"modes",children:"Modes"}),`
`,e.jsx(t.p,{children:"The autocomplete component has two modes:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"default"}),": This is the stateful mode where the component will manage the selection state for you as a form control. This is the most common mode."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"stateless"}),`: This is the stateless mode where the component will not manage the selection state. This mode is useful when you want to just use the autocomplete to allow for the
user to type in a value and then you can handle the selection state yourself.`]}),`
`]}),`
`,e.jsx(t.h2,{id:"initial-value",children:"Initial Value"}),`
`,e.jsx(t.p,{children:`The autocomplete component can be initialized with a selected value. This is useful when you want to pre-populate the input with a value from a previous selection on page load. This comes
with the caveat that you must also provide the option(s) that the autocomplete can use to filter and select from to show the display text in the input for the bound value.`}),`
`,e.jsx(t.p,{children:"This can be done in two ways:"}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsxs(t.li,{children:["By providing the ",e.jsx(t.code,{children:"value"})," property with the full ",e.jsx(t.code,{children:"IOption"})," object that contains both the ",e.jsx(t.code,{children:"value"})," and ",e.jsx(t.code,{children:"label"})," properties."]}),`
`,e.jsxs(t.li,{children:["Using the ",e.jsx(t.code,{children:"filter"})," callback to return the full ",e.jsx(t.code,{children:"IOption"})," object that matches the ",e.jsx(t.code,{children:"value"}),` by using the second parameter of the callback. This parameter is provided by the autocomplete
only when the it cannot locate a matching option in the current list of options. It allow for you to fetch the option from a backend service or other source.`]}),`
`]}),`
`,e.jsx(t.h2,{id:"filtering",children:"Filtering"}),`
`,e.jsx(t.p,{children:`The autocomplete component will filter the options based on the text entered into the input by the user. When the filter callback is executed, it will pass the current text in the input
as the first parameter. This allows you to use whatever means necessary to fetch and filter the options to display in the dropdown. The autocomplete will then display the options in a
popover anchored to the input to allow the user to make a selection.`}),`
`,e.jsxs(t.p,{children:["The filter callback can return a promise or a synchronous array of options. If the ",e.jsx(t.code,{children:"filter"}),` callback returns a promise, the autocomplete will show a loading spinner in the dropdown until
the promise is resolved. This is useful when you need to fetch options asynchronously from a backend service.`]}),`
`,e.jsx(t.p,{children:`As noted above in regards to initial value, the filter callback also has a second parameter that is provided by the autocomplete when it cannot locate a matching option in the current list
of options. This parameter is the current selected value bound to the component, and allows you to fetch the full option from a backend service or other source to display in the input.`}),`
`,e.jsx(t.h2,{id:"infinite-scrolling",children:"Infinite Scrolling"}),`
`,e.jsx(t.p,{children:`The autocomplete component supports infinite scrolling for scenarios when there are too many potential options to display in the dropdown in a performant manner. This is useful when you want
to provide a seamless experience for the user when they are searching for an option in a large list, but they don't necessarily know what they are looking for and need to see more options.`}),`
`,e.jsxs(t.p,{children:["This can be enabled by using the ",e.jsx(t.code,{children:"observe-scroll"})," attribute. When this attribute is present, the autocomplete will emit the ",e.jsx(t.code,{children:"forge-autocomplete-scrolled-bottom"}),` event when the user
scrolls to the bottom of the dropdown. You can listen for this event and then call the `,e.jsx(t.code,{children:"appendOptions()"})," method on the autocomplete to add more options to the dropdown."]}),`
`,e.jsx(n,{of:d}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note:"})," You will need a reference to the ",e.jsx(t.code,{children:"<forge-autocomplete>"})," element to call the ",e.jsx(t.code,{children:"appendOptions()"})," method."]}),`
`]}),`
`,e.jsx(t.h2,{id:"custom-option-templates",children:"Custom Option Templates"}),`
`,e.jsxs(t.p,{children:[`The autocomplete component allows you to customize the appearance of the options in the dropdown by providing a custom template for the options. This is useful when you want to display
more information about the options than just the label. You can provide a custom template by using the `,e.jsx(t.code,{children:"optionBuilder"}),` callback. This callback will be called for each option in the
dropdown as it is being created and should return an HTML element that will be rendered within the list item.`]}),`
`,e.jsxs(t.p,{children:["The following example shows how you can use the ",e.jsx(t.code,{children:"optionBuilder"})," callback to customize the appearance of the options in the dropdown by adding an avatar to each option:"]}),`
`,e.jsx(n,{of:p}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note:"})," The content you return will be rendered within a ",e.jsx(t.code,{children:"<forge-list-item>"})," element, so you should only return the content of the list item, not a replacement for the list item itself."]}),`
`]}),`
`,e.jsx(t.h2,{id:"configuration",children:"Configuration"}),`
`,e.jsx(t.p,{children:`The autocomplete is one of the most volatile and highly configurable components in the Forge library. It has many properties that allow you to customize the behavior and appearance of the
component to suit your needs. The autocomplete can be used in a variety of ways, from simple text input with suggestions to complex forms with multiple selections and chips. See the API
reference below for a full list of properties and their descriptions.`}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(h,{}),`
`,e.jsx(t.h2,{id:"keyboard-shortcuts",children:"Keyboard Shortcuts"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{children:"Name"}),e.jsx(t.th,{children:"Description"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.strong,{children:"Select Opened"})}),e.jsx(t.td,{})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"down / arrow down"})}),e.jsx(t.td,{children:"Opens the dropdown and activates the first option"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.strong,{children:"Dropdown opened"})}),e.jsx(t.td,{})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"tab"})}),e.jsx(t.td,{children:"Single select: Select the active option"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"escape"})}),e.jsx(t.td,{children:"Close the dropdown when the dropdown is open"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"down / arrow down"})}),e.jsx(t.td,{children:"List keyboard shortcuts"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"up / arrow up"})}),e.jsx(t.td,{children:"List keyboard shortcuts"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"enter / home / end"})}),e.jsx(t.td,{children:"List keyboard shortcuts"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.strong,{children:"Dropdown opened or closed"})}),e.jsx(t.td,{})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"backspace"})}),e.jsx(t.td,{children:"Two or more input.value.length: Removes the end character in the input.value"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"backspace"})}),e.jsx(t.td,{children:"One input.value.length and Single select and not a chip field: Clears the input.value"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"delete"})}),e.jsx(t.td,{children:"Two or more input.value.length: Removes the start character in the input.value"})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{children:e.jsx(t.code,{children:"delete"})}),e.jsx(t.td,{children:"One input.value.length and Single select and not a chip field: Clears the input.value"})]})]})]}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Verify that you can tab into the autocomplete component."}),`
`,e.jsx(t.li,{children:"Verify that you can access the options within the autocomplete component using only the keyboard."}),`
`,e.jsxs(t.li,{children:["The input element will receive the proper ARIA attributes such as ",e.jsx(t.code,{children:'role="combobox"'}),", ",e.jsx(t.code,{children:"aria-live"}),", ",e.jsx(t.code,{children:"aria-owns"}),", ... etc."]}),`
`,e.jsxs(t.li,{children:["You should ensure that you either use a ",e.jsx(t.code,{children:"<label>"})," element, or add an ",e.jsx(t.code,{children:"aria-label"})," or ",e.jsx(t.code,{children:"aria-labelledby"})," attribute to provide a meaningful label."]}),`
`]})]})}function ue(o={}){const{wrapper:t}={...s(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(i,{...o})}):i(o)}export{ue as default};
