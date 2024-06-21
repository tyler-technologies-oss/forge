import{j as e}from"./jsx-runtime-Cd0S-B27.js";import{u as i}from"./index-1VkhJ4Fv.js";import{M as r,T as s,C as a}from"./index-CxH9GLVX.js";import{C as l}from"./CustomArgTypes-Cue3itF-.js";import{A as c,D as p}from"./Autocomplete.stories-Bupqn9dt.js";import"./iframe-B9sbzTsF.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./utils-Cceq4NFH.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./constants-D32Jr2uy.js";import"./autocomplete-DH9KzLad.js";import"./base-adapter-BA904X7f.js";import"./index-TSSE1zcJ.js";import"./divider-Cv-LZSeV.js";import"./icon-CRQudG-b.js";import"./index-Dh0vMUMR.js";import"./linear-progress-DDuiLuf_.js";import"./with-default-aria--3R5aVE8.js";import"./list-dUPbNzHI.js";import"./state-layer-BRvIemvG.js";import"./focus-indicator-DCOk5mvy.js";import"./list-dropdown-aware-core-sKDq8C47.js";import"./list-dropdown-Cwu_R7t1.js";import"./event-utils-C1SDeUaq.js";import"./popover-fL2nRo2T.js";import"./overlay-DiKhgH_u.js";import"./with-longpress-listener-B3UkmdmB.js";import"./dismissible-stack-utRZDmaV.js";import"./skeleton-BaEsbVV3.js";import"./a11y-BxM9_46k.js";import"./text-field-Dw10Z76S.js";import"./base-field-0V9RDNSH.js";import"./label-CcpeGv-c.js";import"./button-BF9wbu_o.js";import"./base-button-adapter-DbSYD7FH.js";import"./with-label-aware-DCBgJY4W.js";import"./button-toggle-group-b68KB2vb.js";import"./with-form-associated-DmfBqGfr.js";import"./checkbox-Chjo1vae.js";import"./icon-button-BIREJzI3.js";import"./switch-DWALD2Z-.js";import"./tooltip-BTx4ydNh.js";import"./base-field-core-DTiRcxay.js";import"./chip-field-CbM2Vb1n.js";import"./chip-set-CJfmQDiB.js";function n(o){const t={blockquote:"blockquote",code:"code",h2:"h2",li:"li",p:"p",strong:"strong",table:"table",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(r,{of:c}),`
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
`]})]})}function le(o={}){const{wrapper:t}={...i(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{le as default};
