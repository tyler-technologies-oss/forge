import{j as e,M as o,T as r,C as i}from"./blocks-BiOEtk1e.js";import{useMDXComponents as n}from"./index-B_QGz6G5.js";import{C as c}from"./CustomArgTypes-CdGL2gxd.js";import{S as d,D as h,L as a,a as p,M as x}from"./Select.stories-BnmI6jYO.js";import"./iframe-CE3HZkEz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-CEkw6ujh.js";import"./style-map-Det8BwjZ.js";import"./directive-CJw_OlP2.js";import"./decorators-B95OLgQg.js";import"./feature-detection-CY6TVbRZ.js";import"./select-dropdown-6wQx9nWS.js";import"./constants-NErMj_Tj.js";import"./base-adapter-Ch0oiIsw.js";import"./select-YaDYno8K.js";import"./icon-Bh1zyXYd.js";import"./index-CiLSBptl.js";import"./circular-progress-pTvFqlis.js";import"./with-default-aria-srFr2cNz.js";import"./a11y-utils-DGb1vALN.js";import"./with-form-associated-9Gj0jfo_.js";import"./with-label-aware-DkCFYjRm.js";import"./base-field-CF9KCSOy.js";import"./focus-indicator-Cgfkaa3d.js";import"./utils-CRxrUqQD.js";import"./label-iMGwTRlg.js";import"./button-CLmfPElC.js";import"./state-layer-BVsNuAhs.js";import"./base-button-adapter-BF7s-Uk_.js";import"./button-toggle-group-5BDyeLck.js";import"./checkbox-CF9fzMIR.js";import"./icon-button-CuEKyh48.js";import"./switch-ZI6WyDhE.js";import"./list-DCzhHkfW.js";import"./event-utils-zQ4FLDwK.js";import"./popover-BUd5kSDj.js";import"./overlay-CmLQVoKV.js";import"./with-longpress-listener-BDlFima-.js";import"./dismissible-stack-BdWcv7_4.js";import"./scaffold-BjMvQLbF.js";import"./toolbar-CJj-iw1_.js";import"./linear-progress-CJb_8skk.js";import"./skeleton-DocRecw2.js";import"./list-dropdown-aware-core-DOOobZVK.js";import"./list-dropdown-C4pyqmXN.js";import"./event-utils-C1SDeUaq.js";import"./a11y-BxM9_46k.js";function s(l){const t={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...n(),...l.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{of:d}),`
`,e.jsx(r,{}),`
`,e.jsx(t.p,{children:"Selects are used to present a list of options to the user."}),`
`,e.jsx(i,{of:h}),`
`,e.jsx(t.h2,{id:"label-position",children:"Label Position"}),`
`,e.jsxs(t.p,{children:["The select supports a ",e.jsx(t.code,{children:"labelPosition"})," property/attribute to control the position of the label. The default value is ",e.jsx(t.code,{children:'"inset"'}),`
where the label is positioned inside the select, but it can also be set to `,e.jsx(t.code,{children:'"block-start"'}),` or "inline-start" to position the
label above or to the left of the select respectively.`]}),`
`,e.jsx(t.h3,{id:"block-start",children:"Block Start"}),`
`,e.jsx(t.p,{children:"This variant positions the label above the select."}),`
`,e.jsx(i,{of:a}),`
`,e.jsx(t.h3,{id:"inline-start",children:"Inline Start"}),`
`,e.jsx(t.p,{children:"This variant positions the label to the left of the select."}),`
`,e.jsx(i,{of:p}),`
`,e.jsxs(t.blockquote,{children:[`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Note:"})," The ",e.jsx(t.code,{children:"labelPosition"})," property is available via ",e.jsx(t.a,{href:"?path=/docs/getting-started-global-configuration--docs",children:"global configuration"}),` if
you want to set adjust the default value for all select in your application.`]}),`
`]}),`
`,e.jsx(t.h2,{id:"multiple",children:"Multiple"}),`
`,e.jsxs(t.p,{children:["The select supports a ",e.jsx(t.code,{children:"multiple"})," property/attribute to allow multiple options to be selected."]}),`
`,e.jsx(i,{of:x}),`
`,e.jsxs(t.p,{children:["When the select is in multiple mode, the ",e.jsx(t.code,{children:"value"})," property/attribute should be an array of selected values."]}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(c,{}),`
`,e.jsx(t.h2,{id:"keyboard-shortcuts",children:"Keyboard shortcuts"}),`
`,e.jsxs(t.table,{children:[e.jsx(t.thead,{children:e.jsxs(t.tr,{children:[e.jsx(t.th,{style:{textAlign:"left"},children:"Name"}),e.jsx(t.th,{style:{textAlign:"left"},children:"Description"})]})}),e.jsxs(t.tbody,{children:[e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.strong,{children:"Select Opened"})}),e.jsx(t.td,{style:{textAlign:"left"}})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"escape / space"})}),e.jsx(t.td,{style:{textAlign:"left"},children:"Closes the select."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"tab / enter"})}),e.jsx(t.td,{style:{textAlign:"left"},children:"Selects the focused option and closes the select."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"arrow down"})}),e.jsx(t.td,{style:{textAlign:"left"},children:"Highlights the next option if an option is selected, otherwise highlights the first option."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"arrow up"})}),e.jsx(t.td,{style:{textAlign:"left"},children:"Highlights the previous option if an option is selected, otherwise highlights the first option."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"home"})}),e.jsx(t.td,{style:{textAlign:"left"},children:"Highlights the first option that is not disabled."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"end"})}),e.jsx(t.td,{style:{textAlign:"left"},children:"Highlights the last option that is not disabled."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.strong,{children:"Select Closed"})}),e.jsx(t.td,{style:{textAlign:"left"}})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"space / enter"})}),e.jsx(t.td,{style:{textAlign:"left"},children:"Opens the select."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"arrow down"})}),e.jsx(t.td,{style:{textAlign:"left"},children:"Selects the next option if an option is selected, otherwise selects the first option."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"arrow up"})}),e.jsx(t.td,{style:{textAlign:"left"},children:"Selects the previous option if an option is selected, otherwise selects the first option."})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.strong,{children:"Select Closed and Multiple"})}),e.jsx(t.td,{style:{textAlign:"left"}})]}),e.jsxs(t.tr,{children:[e.jsx(t.td,{style:{textAlign:"left"},children:e.jsx(t.code,{children:"arrow down / arrow up"})}),e.jsx(t.td,{style:{textAlign:"left"},children:"Opens the select and selects the first option"})]})]})]}),`
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
`})})]})}function re(l={}){const{wrapper:t}={...n(),...l.components};return t?e.jsx(t,{...l,children:e.jsx(s,{...l})}):s(l)}export{re as default};
