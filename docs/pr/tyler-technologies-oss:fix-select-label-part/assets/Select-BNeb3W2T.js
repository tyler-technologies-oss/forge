import{j as e,M as l,T as r,C as i}from"./index-BrKdG6nK.js";import{useMDXComponents as s}from"./index-Clqr6nw0.js";import{C as c}from"./CustomArgTypes-b1aUZ4kk.js";import{S as h,D as a,L as d,a as p,M as m}from"./Select.stories-0qkUBAh1.js";import"./iframe-DLRPgTep.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-CfOrKyLd.js";import"./index-DrFu-skq.js";import"./utils-Do5MGSMS.js";import"./lit-element-B3QVTycr.js";import"./lit-html-CuBe1DX_.js";import"./index-B-lxVbXh.js";import"./v4-CtRu48qb.js";import"./style-map-CeP1Mntv.js";import"./directive-CJw_OlP2.js";import"./decorators-CBntP_d2.js";import"./feature-detection-C61kIZu7.js";import"./select-dropdown-Cqi8qMIW.js";import"./constants-DHnR0122.js";import"./base-adapter-B_B1W7NX.js";import"./select-GgERi9im.js";import"./index-RsKXMDm2.js";import"./circular-progress-CbpfkaY8.js";import"./with-default-aria-COlelyab.js";import"./a11y-utils-CCSbmmS7.js";import"./with-form-associated-BgRoomBE.js";import"./with-label-aware-CbEUrhML.js";import"./base-field-BDCxUf4S.js";import"./index-CiLSBptl.js";import"./focus-indicator-DydcbRnf.js";import"./utils-CRxrUqQD.js";import"./label-W_tr_-w0.js";import"./button-7EoU3XJS.js";import"./icon-DNSPAaK0.js";import"./state-layer-Y8UVngaT.js";import"./base-button-adapter-BvyEvlN7.js";import"./button-toggle-group-BIaWvq7W.js";import"./checkbox-CZ4HhXrD.js";import"./icon-button-DJSm0po0.js";import"./switch-CVhsVTET.js";import"./list-BEAQdsdb.js";import"./popover-DlgaZ2F2.js";import"./overlay-C2J-mFMD.js";import"./with-longpress-listener-D4mCqU-o.js";import"./dismissible-stack-BOibH_v8.js";import"./scaffold-CWDbFKLY.js";import"./toolbar-CM1YCrRV.js";import"./linear-progress-Brg7kVg_.js";import"./skeleton-Cfb12itF.js";import"./list-dropdown-aware-core-DGLK3WC5.js";import"./list-dropdown-BxzSJ6qG.js";import"./event-utils-C1SDeUaq.js";import"./a11y-BxM9_46k.js";function n(o){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",th:"th",thead:"thead",tr:"tr",ul:"ul",...s(),...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{of:h}),`
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
