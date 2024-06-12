import{j as e}from"./jsx-runtime-BgS5gtLi.js";import{u as i}from"./index-IhE3taYT.js";import{M as r,T as s,C as a}from"./index-CT2knYMk.js";import{C as l}from"./CustomArgTypes-11CZqRgm.js";import{A as c,D as p}from"./Autocomplete.stories-l3QAOxwS.js";import"./iframe-C8AHtKXV.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./utils-SjbeXOvg.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./constants-CmaEVTEu.js";import"./autocomplete-CIaS5ITB.js";import"./base-adapter-Y8TBBZEm.js";import"./index-TSSE1zcJ.js";import"./divider-CZy8SckQ.js";import"./icon-DdNu5rAq.js";import"./index-Dh0vMUMR.js";import"./linear-progress-DkhIk2Qx.js";import"./with-default-aria-DTn0qdqG.js";import"./list-BN1qzEIh.js";import"./state-layer-DjEoH8hN.js";import"./focus-indicator-CexacDHl.js";import"./list-dropdown-aware-core-uqUunrwW.js";import"./list-dropdown-C4CuZuqS.js";import"./event-utils-C1SDeUaq.js";import"./popover-D076uhwZ.js";import"./overlay-CmQ6MvbI.js";import"./with-longpress-listener-C16jHnXl.js";import"./dismissible-stack-BU50KYzw.js";import"./event-utils-DC3JW7a-.js";import"./skeleton-Cpc63rts.js";import"./a11y-BxM9_46k.js";import"./text-field-DnqY6g8w.js";import"./base-field-NtngDJOB.js";import"./label-BsLwoMJm.js";import"./button-DqH9YfaW.js";import"./base-button-adapter-Xxk3ZjTe.js";import"./with-label-aware-DCBgJY4W.js";import"./button-toggle-group-CSWkQPk2.js";import"./with-form-associated-BJ4cTi7y.js";import"./checkbox-DJehbw3q.js";import"./icon-button-Cqg7QjNu.js";import"./switch-DYQgudGV.js";import"./tooltip-CLVVSytH.js";import"./base-field-core-C0AokumC.js";import"./chip-field-9P7MKiLi.js";import"./chip-set-XjnNJye7.js";function n(o){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",table:"table",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:c}),`
`,e.jsx(s,{}),`
`,e.jsxs(t.p,{children:["The autocomplete is considered an add-on component that allows you to wrap a ",e.jsx(t.code,{children:"<forge-autocomplete>"})," element around any HTML that contains an ",e.jsx(t.code,{children:"<input>"})," element. This allows the autocomplete to bind to that input and show suggestions in a popup as the user types."]}),`
`,e.jsxs(t.p,{children:["It is expected that the consuming application provide a filter callback that the component can call when it needs to update the list of available options or suggestions. There are many variations of using an autocomplete, and while it's most commonly used together with a web service to provide suggestions asynchronously, it's up to the consuming application to choose how to fetch and return the options based on the current text the user has typed into the ",e.jsx(t.code,{children:"<input>"})," element."]}),`
`,e.jsx(a,{of:p}),`
`,e.jsxs(t.p,{children:["The only requirement in the HTML is to provide a child ",e.jsx(t.code,{children:"<input>"})," element. While a Forge text-field component will typically be used, you can attach autocomplete functionality to any ",e.jsx(t.code,{children:"<input>"})," element. This allows for flexibility in the styling of the input, while allowing the autocomplete to provide suggestions in the form of a floating popup anchored to that input."]}),`
`,e.jsxs(t.p,{children:["The only requirement for integration via JavaScript is that you provide a callback function to the ",e.jsx(t.code,{children:"filter"})," property to provide options based on the current filter text."]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note"}),": the ",e.jsx(t.code,{children:"data-forge-dropdown-icon"})," attribute being applied to the trailing icon allows the autocomplete to provide the necessary styling to control open state rotation"]}),`
`]}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(t.h2,{id:"keyboard-shorcuts",children:"Keyboard Shorcuts"}),`
`,e.jsx(t.table,{children:e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{style:{textAlign:"left"},children:"Name"}),e.jsx(t.th,{style:{textAlign:"left"},children:"Description"})]})})}),`
`,e.jsxs(t.p,{children:["| ",e.jsx(t.strong,{children:"Select Opened"}),`
| `,e.jsx(t.code,{children:"down / arrow down"}),` | Opens the dropdown and activates the first option
| `,e.jsx(t.strong,{children:"Dropdown opened"}),`
| `,e.jsx(t.code,{children:"tab"}),` | Single select: Select the active option
| `,e.jsx(t.code,{children:"escape"}),` | Close the dropdown when the dropdown is open
| `,e.jsx(t.code,{children:"down / arrow down"}),` | List keyboard shortcuts
| `,e.jsx(t.code,{children:"up / arrow up"}),` | List keyboard shortcuts
| `,e.jsx(t.code,{children:"enter / home / end"}),` | List keyboard shortcuts
| `,e.jsx(t.strong,{children:"Dropdown opened or closed"}),`
| `,e.jsx(t.code,{children:"backspace"}),` | Two or more input.value.length: Removes the end character in the input.value
| `,e.jsx(t.code,{children:"backspace"}),` | One input.value.length and Single select and not a chipfield: Clears the input.value
| `,e.jsx(t.code,{children:"delete"}),` | Two or more input.value.length: Removes the start character in the input.value
| `,e.jsx(t.code,{children:"delete"})," | One input.value.length and Single select and not a chipfield: Clears the input.value"]}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Verify that you can tab into the autocomplete component."}),`
`,e.jsx(t.li,{children:"Verify that you can access the options within the autocomplete component using only the keyboard."}),`
`,e.jsx(t.li,{children:'The input element will receive the proper ARIA attributes such as aria-role="combobox", aria-live, aria-owns, ... etc.'}),`
`,e.jsxs(t.li,{children:["You should ensure that you either use a ",e.jsx(t.code,{children:"<label>"})," element, or add an aria-label or aria-labelledby attribute to provide a meaningful label."]}),`
`]})]})}function ce(o={}){const{wrapper:t}={...i(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{ce as default};
