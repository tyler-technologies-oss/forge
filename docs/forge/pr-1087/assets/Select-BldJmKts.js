import{j as e,M as s,T as r,C as l}from"./blocks-DLeGyBVo.js";import{useMDXComponents as i}from"./index-CDYF2lhS.js";import{C as c}from"./CustomArgTypes-Cxc7DOQq.js";import{S as a,D as h,L as d,a as p,M as x,b as j}from"./Select.stories-CvzIwurp.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CGNXTVBT.js";import"./utils-BLyw4gKD.js";import"./style-map-T2wPhjs1.js";import"./directive-jorct-Oe.js";import"./decorators-BnjrdNqp.js";import"./service-adapter-CoGDs2_3.js";import"./select-dropdown-kNVs3NVE.js";import"./base-component-DtuZ_bHQ.js";import"./dom-utils-DBb1ZGPZ.js";import"./base-adapter-CrwPj14V.js";import"./select-CalGyJio.js";import"./tyler-icons-DJO2-615.js";import"./index-DTwfV0k0.js";import"./constants-d60dfpEV.js";import"./feature-detection-DlorGArm.js";import"./circular-progress-Bjkv8PLj.js";import"./with-default-aria-BAoBQKAE.js";import"./a11y-utils-BcRiVt5E.js";import"./with-form-associated-CILBPDg5.js";import"./with-label-aware-DpjVJhjv.js";import"./base-field-B3B3UyEM.js";import"./focus-indicator-VaTOwLCu.js";import"./property-DfXuZKJv.js";import"./base-lit-element-CtFXb0D8.js";import"./utils-DU-9AqTO.js";import"./label-D8iUihNG.js";import"./button-N-IY4KqJ.js";import"./state-layer-n7PzpGlA.js";import"./base-button-core-BSrY8KFZ.js";import"./button-toggle-group-Da2ZoXAH.js";import"./checkbox-BYAGyDdl.js";import"./icon-button-DDH96UYI.js";import"./switch-BteeO8PC.js";import"./list-DPF6xCfb.js";import"./event-utils-zQ4FLDwK.js";import"./popover-Duzv0w_S.js";import"./overlay-CCoxAUi3.js";import"./with-longpress-listener-v9rKrqen.js";import"./dismissible-stack-xq-0Rg1q.js";import"./scaffold-cHzeNvE0.js";import"./toolbar-C0v5iIUr.js";import"./linear-progress-CdLostcG.js";import"./skeleton-pRzfknAa.js";import"./list-dropdown-aware-core-BAJdlVGR.js";import"./list-dropdown-CRwsmrgL.js";import"./event-utils-C1SDeUaq.js";import"./a11y-BxM9_46k.js";import"./divider-BLje3hRJ.js";function n(o){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",th:"th",thead:"thead",tr:"tr",ul:"ul",...i(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:a}),`
`,e.jsx(r,{}),`
`,e.jsx(t.p,{children:"Selects are used to present a list of options to the user."}),`
`,e.jsx(l,{of:h}),`
`,e.jsx(t.h2,{id:"label-position",children:"Label Position"}),`
`,e.jsxs(t.p,{children:["The select supports a ",e.jsx(t.code,{children:"labelPosition"})," property/attribute to control the position of the label. The default value is ",e.jsx(t.code,{children:'"inset"'}),`
where the label is positioned inside the select, but it can also be set to `,e.jsx(t.code,{children:'"block-start"'}),` or "inline-start" to position the
label above or to the left of the select respectively.`]}),`
`,e.jsx(t.h3,{id:"block-start",children:"Block Start"}),`
`,e.jsx(t.p,{children:"This variant positions the label above the select."}),`
`,e.jsx(l,{of:d}),`
`,e.jsx(t.h3,{id:"inline-start",children:"Inline Start"}),`
`,e.jsx(t.p,{children:"This variant positions the label to the left of the select."}),`
`,e.jsx(l,{of:p}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note:"})," The ",e.jsx(t.code,{children:"labelPosition"})," property is available via ",e.jsx(t.a,{href:"?path=/docs/getting-started-global-configuration--docs",children:"global configuration"}),` if
you want to set adjust the default value for all select in your application.`]}),`
`]}),`
`,e.jsx(t.h2,{id:"multiple",children:"Multiple"}),`
`,e.jsxs(t.p,{children:["The select supports a ",e.jsx(t.code,{children:"multiple"})," property/attribute to allow multiple options to be selected."]}),`
`,e.jsx(l,{of:x}),`
`,e.jsxs(t.p,{children:["When the select is in multiple mode, the ",e.jsx(t.code,{children:"value"})," property/attribute should be an array of selected values."]}),`
`,e.jsx(t.h2,{id:"select-all",children:"Select All"}),`
`,e.jsxs(t.p,{children:['When using the select in multiple mode, you can enable a "Select All" option by setting the ',e.jsx(t.code,{children:"showSelectAll"})," property to ",e.jsx(t.code,{children:"true"}),". This adds a convenient option at the top of the dropdown to select or deselect all available options at once."]}),`
`,e.jsx(l,{of:j}),`
`,e.jsxs(t.p,{children:['To customize the label for the "Select all" option, use the ',e.jsx(t.code,{children:"selectAllLabel"})," property (or ",e.jsx(t.code,{children:"select-all-label"})," attribute). This is useful for localization or when you want to use different wording."]}),`
`,e.jsxs(t.p,{children:['When the "Select All" option is clicked, the component dispatches a ',e.jsx(t.code,{children:"forge-select-all"})," event before the standard ",e.jsx(t.code,{children:"change"})," event. The ",e.jsx(t.code,{children:"forge-select-all"})," event detail contains:"]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"value"}),": An array of all option values (when selecting all) or an empty array (when deselecting all)"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"isAllSelected"}),": A boolean indicating whether all options are now selected (",e.jsx(t.code,{children:"true"}),") or deselected (",e.jsx(t.code,{children:"false"}),")"]}),`
`]}),`
`,e.jsxs(t.p,{children:["You can prevent the select all action by calling ",e.jsx(t.code,{children:"preventDefault()"})," on the ",e.jsx(t.code,{children:"forge-select-all"})," event, which will also prevent the subsequent ",e.jsx(t.code,{children:"change"})," event from being dispatched."]}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(c,{}),`
`,e.jsx(t.h2,{id:"keyboard-shortcuts",children:"Keyboard shortcuts"}),`
`,e.jsx(t.table,{children:e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{style:{textAlign:"left"},children:"Name"}),e.jsx(t.th,{style:{textAlign:"left"},children:"Description"})]})})}),`
`,e.jsxs(t.p,{children:["| ",e.jsx(t.strong,{children:"Select Opened"}),`
| `,e.jsx(t.code,{children:"escape / space"}),` | Closes the select.
| `,e.jsx(t.code,{children:"tab / enter"}),` | Selects the focused option and closes the select. If the "Select All" option is focused, toggles all options.
| `,e.jsx(t.code,{children:"arrow down"}),` | Highlights the next option if an option is selected, otherwise highlights the first option.
| `,e.jsx(t.code,{children:"arrow up"}),` | Highlights the previous option if an option is selected, otherwise highlights the first option.
| `,e.jsx(t.code,{children:"home"}),` | Highlights the first option that is not disabled.
| `,e.jsx(t.code,{children:"end"}),` | Highlights the last option that is not disabled.
| `,e.jsx(t.strong,{children:"Select Closed"}),`
| `,e.jsx(t.code,{children:"space / arrow down / arrow up"}),` | Opens the select and highlights the selected option.
| `,e.jsx(t.strong,{children:"Select Closed and Multiple"}),` |
| `,e.jsx(t.code,{children:"arrow down / arrow up"})," | Opens the select and highlights the first option."]}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Ensure that all of the controls that are accessible by mouse are also accessible by keyboard.",`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"Ensure the controls are reachable by the tab key."}),`
`,e.jsx(t.li,{children:"Ensure each control can be updated or activated by the keyboard."}),`
`]}),`
`]}),`
`,e.jsx(t.li,{children:"Verify that the select list can be toggled open or closed by pressing the space or enter key."}),`
`,e.jsx(t.li,{children:"Verify that each active item in the select list can be reached by the up-arrow and down-arrow keys."}),`
`,e.jsx(t.li,{children:"Verify that in multiple-select mode, the Enter key can toggle an item as selected or un-selected."}),`
`,e.jsxs(t.li,{children:["Verify that the select has a label and/or placeholder set via the ",e.jsx(t.code,{children:"label"})," and ",e.jsx(t.code,{children:"placeholder"})," properties/attributes.",`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["The select does not support the ",e.jsx(t.code,{children:"aria-label"}),", ",e.jsx(t.code,{children:"aria-labelledby"})," attributes. Instead, use the ",e.jsx(t.code,{children:"label"})," property/attribute to set an accessible label."]}),`
`]}),`
`]}),`
`]}),`
`,e.jsx(t.h2,{id:"css-only",children:"CSS-Only"}),`
`,e.jsx(t.p,{children:'The select component is also available as a CSS-only component. This is a variant of the "field" component.'}),`
`,e.jsxs(t.p,{children:["See the ",e.jsx(t.a,{href:"?path=/docs/components-field--docs#css-only",children:"field documentation"}),` for more information on how to create
a CSS-only select.`]}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note:"})," The only difference is that the select will use a native ",e.jsx(t.code,{children:"<select>"})," element instead of an ",e.jsx(t.code,{children:"<input>"})," element."]}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<div class="forge-field">
  <select>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
</div>
`})})]})}function me(o={}){const{wrapper:t}={...i(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{me as default};
