import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-Byzp6JFn.js";import{n as c,t as l}from"./CustomArgTypes-QAslgvtG.js";import{a as u,i as d,n as f,o as p,r as m,s as h,t as g}from"./Select.stories-Dky-YDXl.js";function _(e){let n={a:`a`,blockquote:`blockquote`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...t(),...e.components};return(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(s,{of:p}),`
`,(0,y.jsx)(o,{}),`
`,(0,y.jsx)(n.p,{children:`Selects are used to present a list of options to the user.`}),`
`,(0,y.jsx)(a,{of:g}),`
`,(0,y.jsx)(n.h2,{id:`label-position`,children:`Label Position`}),`
`,(0,y.jsxs)(n.p,{children:[`The select supports a `,(0,y.jsx)(n.code,{children:`labelPosition`}),` property/attribute to control the position of the label. The default value is `,(0,y.jsx)(n.code,{children:`"inset"`}),`
where the label is positioned inside the select, but it can also be set to `,(0,y.jsx)(n.code,{children:`"block-start"`}),` or "inline-start" to position the
label above or to the left of the select respectively.`]}),`
`,(0,y.jsx)(n.h3,{id:`block-start`,children:`Block Start`}),`
`,(0,y.jsx)(n.p,{children:`This variant positions the label above the select.`}),`
`,(0,y.jsx)(a,{of:f}),`
`,(0,y.jsx)(n.h3,{id:`inline-start`,children:`Inline Start`}),`
`,(0,y.jsx)(n.p,{children:`This variant positions the label to the left of the select.`}),`
`,(0,y.jsx)(a,{of:m}),`
`,(0,y.jsxs)(n.blockquote,{children:[`
`,(0,y.jsxs)(n.p,{children:[(0,y.jsx)(n.strong,{children:`Note:`}),` The `,(0,y.jsx)(n.code,{children:`labelPosition`}),` property is available via `,(0,y.jsx)(n.a,{href:`?path=/docs/getting-started-global-configuration--docs`,children:`global configuration`}),` if
you want to set adjust the default value for all select in your application.`]}),`
`]}),`
`,(0,y.jsx)(n.h2,{id:`multiple`,children:`Multiple`}),`
`,(0,y.jsxs)(n.p,{children:[`The select supports a `,(0,y.jsx)(n.code,{children:`multiple`}),` property/attribute to allow multiple options to be selected.`]}),`
`,(0,y.jsx)(a,{of:d}),`
`,(0,y.jsxs)(n.p,{children:[`When the select is in multiple mode, the `,(0,y.jsx)(n.code,{children:`value`}),` property/attribute should be an array of selected values.`]}),`
`,(0,y.jsx)(n.h2,{id:`select-all`,children:`Select All`}),`
`,(0,y.jsxs)(n.p,{children:[`When using the select in multiple mode, you can enable a "Select All" option by setting the `,(0,y.jsx)(n.code,{children:`showSelectAll`}),` property to `,(0,y.jsx)(n.code,{children:`true`}),`. This adds a convenient option at the top of the dropdown to select or deselect all available options at once.`]}),`
`,(0,y.jsx)(a,{of:u}),`
`,(0,y.jsxs)(n.p,{children:[`To customize the label for the "Select all" option, use the `,(0,y.jsx)(n.code,{children:`selectAllLabel`}),` property (or `,(0,y.jsx)(n.code,{children:`select-all-label`}),` attribute). This is useful for localization or when you want to use different wording.`]}),`
`,(0,y.jsxs)(n.p,{children:[`When the "Select All" option is clicked, the component dispatches a `,(0,y.jsx)(n.code,{children:`forge-select-all`}),` event before the standard `,(0,y.jsx)(n.code,{children:`change`}),` event. The `,(0,y.jsx)(n.code,{children:`forge-select-all`}),` event detail contains:`]}),`
`,(0,y.jsxs)(n.ul,{children:[`
`,(0,y.jsxs)(n.li,{children:[(0,y.jsx)(n.code,{children:`value`}),`: An array of all option values (when selecting all) or an empty array (when deselecting all)`]}),`
`,(0,y.jsxs)(n.li,{children:[(0,y.jsx)(n.code,{children:`isAllSelected`}),`: A boolean indicating whether all options are now selected (`,(0,y.jsx)(n.code,{children:`true`}),`) or deselected (`,(0,y.jsx)(n.code,{children:`false`}),`)`]}),`
`]}),`
`,(0,y.jsxs)(n.p,{children:[`You can prevent the select all action by calling `,(0,y.jsx)(n.code,{children:`preventDefault()`}),` on the `,(0,y.jsx)(n.code,{children:`forge-select-all`}),` event, which will also prevent the subsequent `,(0,y.jsx)(n.code,{children:`change`}),` event from being dispatched.`]}),`
`,(0,y.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,y.jsx)(l,{}),`
`,(0,y.jsx)(n.h2,{id:`keyboard-shortcuts`,children:`Keyboard shortcuts`}),`
`,(0,y.jsx)(n.table,{children:(0,y.jsx)(n.thead,{children:(0,y.jsxs)(n.tr,{children:[(0,y.jsx)(n.th,{style:{textAlign:`left`},children:`Name`}),(0,y.jsx)(n.th,{style:{textAlign:`left`},children:`Description`})]})})}),`
`,(0,y.jsxs)(n.p,{children:[`| `,(0,y.jsx)(n.strong,{children:`Select Opened`}),`
| `,(0,y.jsx)(n.code,{children:`escape / space`}),` | Closes the select.
| `,(0,y.jsx)(n.code,{children:`tab / enter`}),` | Selects the focused option and closes the select. If the "Select All" option is focused, toggles all options.
| `,(0,y.jsx)(n.code,{children:`arrow down`}),` | Highlights the next option if an option is selected, otherwise highlights the first option.
| `,(0,y.jsx)(n.code,{children:`arrow up`}),` | Highlights the previous option if an option is selected, otherwise highlights the first option.
| `,(0,y.jsx)(n.code,{children:`home`}),` | Highlights the first option that is not disabled.
| `,(0,y.jsx)(n.code,{children:`end`}),` | Highlights the last option that is not disabled.
| `,(0,y.jsx)(n.strong,{children:`Select Closed`}),`
| `,(0,y.jsx)(n.code,{children:`space / arrow down / arrow up`}),` | Opens the select and highlights the selected option.
| `,(0,y.jsx)(n.strong,{children:`Select Closed and Multiple`}),` |
| `,(0,y.jsx)(n.code,{children:`arrow down / arrow up`}),` | Opens the select and highlights the first option.`]}),`
`,(0,y.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,y.jsxs)(n.ul,{children:[`
`,(0,y.jsxs)(n.li,{children:[`Ensure that all of the controls that are accessible by mouse are also accessible by keyboard.`,`
`,(0,y.jsxs)(n.ul,{children:[`
`,(0,y.jsx)(n.li,{children:`Ensure the controls are reachable by the tab key.`}),`
`,(0,y.jsx)(n.li,{children:`Ensure each control can be updated or activated by the keyboard.`}),`
`]}),`
`]}),`
`,(0,y.jsx)(n.li,{children:`Verify that the select list can be toggled open or closed by pressing the space or enter key.`}),`
`,(0,y.jsx)(n.li,{children:`Verify that each active item in the select list can be reached by the up-arrow and down-arrow keys.`}),`
`,(0,y.jsx)(n.li,{children:`Verify that in multiple-select mode, the Enter key can toggle an item as selected or un-selected.`}),`
`,(0,y.jsxs)(n.li,{children:[`Verify that the select has a label and/or placeholder set via the `,(0,y.jsx)(n.code,{children:`label`}),` and `,(0,y.jsx)(n.code,{children:`placeholder`}),` properties/attributes.`,`
`,(0,y.jsxs)(n.ul,{children:[`
`,(0,y.jsxs)(n.li,{children:[`The select does not support the `,(0,y.jsx)(n.code,{children:`aria-label`}),`, `,(0,y.jsx)(n.code,{children:`aria-labelledby`}),` attributes. Instead, use the `,(0,y.jsx)(n.code,{children:`label`}),` property/attribute to set an accessible label.`]}),`
`]}),`
`]}),`
`]}),`
`,(0,y.jsx)(n.h2,{id:`css-only`,children:`CSS-Only`}),`
`,(0,y.jsx)(n.p,{children:`The select component is also available as a CSS-only component. This is a variant of the "field" component.`}),`
`,(0,y.jsxs)(n.p,{children:[`See the `,(0,y.jsx)(n.a,{href:`?path=/docs/components-field--docs#css-only`,children:`field documentation`}),` for more information on how to create
a CSS-only select.`]}),`
`,(0,y.jsxs)(n.blockquote,{children:[`
`,(0,y.jsxs)(n.p,{children:[(0,y.jsx)(n.strong,{children:`Note:`}),` The only difference is that the select will use a native `,(0,y.jsx)(n.code,{children:`<select>`}),` element instead of an `,(0,y.jsx)(n.code,{children:`<input>`}),` element.`]}),`
`]}),`
`,(0,y.jsx)(n.pre,{children:(0,y.jsx)(n.code,{className:`language-html`,children:`<div class="forge-field">
  <select>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
</div>
`})})]})}function v(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,y.jsx)(n,{...e,children:(0,y.jsx)(_,{...e})}):_(e)}var y;function b(){return(b=e((()=>{y=r(),n(),i(),c(),h()})))()}b();export{v as default};