import{j as e,M as l,T as r,C as i}from"./index-DiP_pDzj.js";import{useMDXComponents as s}from"./index-hTF7yDIQ.js";import{C as c}from"./CustomArgTypes-CecgHYAK.js";import{S as h,D as a,L as d,a as p,M as m}from"./Select.stories-ClyXwHf5.js";import"./iframe-Bzf8rinl.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-C0KK1NN_.js";import"./lit-element-JplMEnZc.js";import"./lit-html-paDGiEfB.js";import"./index-Cf3axooF.js";import"./v4-CQkTLCs1.js";import"./style-map-C9nPWcxA.js";import"./directive-CF8sV3Lr.js";import"./decorators-DOnQS6BC.js";import"./feature-detection-DRCh51Sa.js";import"./select-dropdown-CmflC_9z.js";import"./constants-9n5_0r7k.js";import"./base-adapter-B6TJxM93.js";import"./select-DD54wLwG.js";import"./index-ByifSpfC.js";import"./circular-progress-qTjvyVPT.js";import"./with-default-aria-B0dk5gj8.js";import"./a11y-utils-DJ_tX8xT.js";import"./with-form-associated-Bje5Hee1.js";import"./with-label-aware-OEbK3wHg.js";import"./base-field-8Iz1CxTs.js";import"./index-CiLSBptl.js";import"./focus-indicator-BjVpbo_K.js";import"./utils-CYJ0zQHl.js";import"./label-BzeRt-Lc.js";import"./button-DNfE4hZt.js";import"./icon-CND1_bFA.js";import"./state-layer-DCupnvce.js";import"./base-button-adapter-BRP9UQfP.js";import"./button-toggle-group-CKvzK4s7.js";import"./checkbox-DJzJynGd.js";import"./icon-button-DmyR8RGa.js";import"./switch-BJym_Nst.js";import"./list-taWGoVxz.js";import"./popover-TwkKUBh9.js";import"./overlay-B9ywocRd.js";import"./with-longpress-listener-BdUe1dXe.js";import"./dismissible-stack-kdhTFvbL.js";import"./scaffold-D66s8WNO.js";import"./toolbar-DrgqBcwu.js";import"./linear-progress-CqfIuBkR.js";import"./skeleton-D2S3-1Sc.js";import"./list-dropdown-aware-core-CFEcvUYc.js";import"./list-dropdown-G34ygcSw.js";import"./event-utils-C1SDeUaq.js";import"./a11y-BxM9_46k.js";function n(o){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:h}),`
`,e.jsx(r,{}),`
`,e.jsx(t.p,{children:"Selects are used to present a list of options to the user."}),`
`,e.jsx(i,{of:a}),`
`,e.jsx(t.h2,{id:"label-position",children:"Label Position"}),`
`,e.jsxs(t.p,{children:["The select supports a ",e.jsx(t.code,{children:"labelPosition"})," property/attribute to control the position of the label. The default value is ",e.jsx(t.code,{children:'"inset"'}),`
where the label is positioned inside the select, but it can also be set to `,e.jsx(t.code,{children:'"block-start"'}),` or "inline-start" to position the
label above or to the left of the select respectively.`]}),`
`,e.jsx(t.h3,{id:"block-start",children:"Block Start"}),`
`,e.jsx(t.p,{children:"This variant positions the label above the select."}),`
`,e.jsx(i,{of:d}),`
`,e.jsx(t.h3,{id:"inline-start",children:"Inline Start"}),`
`,e.jsx(t.p,{children:"This variant positions the label to the left of the select."}),`
`,e.jsx(i,{of:p}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note:"})," The ",e.jsx(t.code,{children:"labelPosition"})," property is available via ",e.jsx(t.a,{href:"?path=/docs/getting-started-global-configuration--docs",children:"global configuration"}),` if
you want to set adjust the default value for all select in your application.`]}),`
`]}),`
`,e.jsx(t.h2,{id:"multiple",children:"Multiple"}),`
`,e.jsxs(t.p,{children:["The select supports a ",e.jsx(t.code,{children:"multiple"})," property/attribute to allow multiple options to be selected."]}),`
`,e.jsx(i,{of:m}),`
`,e.jsxs(t.p,{children:["When the select is in multiple mode, the ",e.jsx(t.code,{children:"value"})," property/attribute should be an array of selected values."]}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(c,{}),`
`,e.jsx(t.h2,{id:"keyboard-shortcuts",children:"Keyboard shortcuts"}),`
`,e.jsx(t.table,{children:e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{style:{textAlign:"left"},children:"Name"}),e.jsx(t.th,{style:{textAlign:"left"},children:"Description"})]})})}),`
`,e.jsxs(t.p,{children:["| ",e.jsx(t.strong,{children:"Select Opened"}),`
| `,e.jsx(t.code,{children:"escape / space"}),` | Closes the select.
| `,e.jsx(t.code,{children:"tab / enter"}),` | Selects the focused option and closes the select.
| `,e.jsx(t.code,{children:"arrow down"}),` | Highlights the next option if an option is selected, otherwise highlights the first option.
| `,e.jsx(t.code,{children:"arrow up"}),` | Highlights the previous option if an option is selected, otherwise highlights the first option.
| `,e.jsx(t.code,{children:"home"}),` | Highlights the first option that is not disabled.
| `,e.jsx(t.code,{children:"end"}),` | Highlights the last option that is not disabled.
| `,e.jsx(t.strong,{children:"Select Closed"}),`
| `,e.jsx(t.code,{children:"space / enter"}),` | Opens the select.
| `,e.jsx(t.code,{children:"arrow down"}),` | Selects the next option if an option is selected, otherwise selects the first option.
| `,e.jsx(t.code,{children:"arrow up"}),` | Selects the previous option if an option is selected, otherwise selects the first option.
| `,e.jsx(t.strong,{children:"Select Closed and Multiple"}),` |
| `,e.jsx(t.code,{children:"arrow down / arrow up"})," | Opens the select and selects the first option"]}),`
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
`})})]})}function me(o={}){const{wrapper:t}={...s(),...o.components};return t?e.jsx(t,{...o,children:e.jsx(n,{...o})}):n(o)}export{me as default};
