import{j as e,M as s,T as a,C as i}from"./index-w01xucW8.js";import{useMDXComponents as o}from"./index-Be4DGfmT.js";import{C as l}from"./CustomArgTypes-cTufunHN.js";import{D as c,a as d,C as m}from"./DatePicker.stories-x4Qj7RUv.js";import"./iframe-BHKin_8s.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-D-8MO0q_.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-DyehaB2W.js";import"./lit-element-JplMEnZc.js";import"./lit-html-paDGiEfB.js";import"./chunk-D5ZWXAHU-CGElDDNX.js";import"./v4-CQkTLCs1.js";import"./feature-detection-ONR9WHvu.js";import"./date-picker-BnohN0h_.js";import"./constants-BjnHqKgS.js";import"./index-ByifSpfC.js";import"./calendar-DWv5EfKC.js";import"./base-adapter-CQdYccXX.js";import"./tooltip-D0ywHBAv.js";import"./focus-indicator-R2otSvsR.js";import"./index-BmocOEUj.js";import"./overlay-DAcircNE.js";import"./with-longpress-listener-S3ft74cg.js";import"./dismissible-stack-9mJiid_W.js";import"./with-default-aria-BcIvJ7-x.js";import"./a11y-utils-BOPvdiVn.js";import"./state-layer-B7GOb8iB.js";import"./event-utils-C1SDeUaq.js";import"./button-vPgaRyW5.js";import"./icon-B5S0VGIT.js";import"./base-button-adapter-OmzAW3c3.js";import"./with-label-aware-DAaZnhel.js";import"./icon-button-DfODsaKD.js";import"./popover-Dq2OmXS_.js";import"./base-date-picker-core-BzI9WcUX.js";import"./a11y-BxM9_46k.js";import"./text-field-DHXYud3A.js";import"./base-field-BSRSGQL0.js";import"./label-BOjkkgiS.js";import"./button-toggle-group-Cft-ohT1.js";import"./with-form-associated-Dm8KqB07.js";import"./checkbox-e65WGDEs.js";import"./switch-BRBW-vzp.js";function r(n){const t={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:c}),`
`,e.jsx(a,{}),`
`,e.jsx(t.p,{children:"Date pickers are used to allow users to select a date from a calendar."}),`
`,e.jsx(i,{of:d}),`
`,e.jsx(t.h2,{id:"custom-date-format",children:"Custom Date Format"}),`
`,e.jsxs(t.p,{children:["Input masking is enabled by default to ensure the user enters the date in the correct format, but you can also customize the date format via the ",e.jsx(t.code,{children:"parseCallback"}),", ",e.jsx(t.code,{children:"formatCallback"}),`,
and `,e.jsx(t.code,{children:"maskFormat"})," properties."]}),`
`,e.jsx(i,{of:m}),`
`,e.jsxs(t.p,{children:["In the example above, the ",e.jsx(t.code,{children:"parseCallback"})," function is used to parse the date string into a ",e.jsx(t.code,{children:"Date"})," object, and the ",e.jsx(t.code,{children:"formatCallback"}),` function is used to format the date object into a string
using the `,e.jsx(t.code,{children:"YYYY-MM-DD"})," format. You will also need to set the ",e.jsx(t.code,{children:"mask-format"})," attribute to ",e.jsx(t.code,{children:"YYYY-MM-DD"})," to enable input masking support."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-typescript",children:`function parseCallback(str: string): Date | null {
  if (!str) {
    return null;
  }

  const split = str.split('-');

  if (split.length !== 3) {
    return null;
  }

  const yyyy = +split[0];
  const mm = +split[1];
  const dd = split[2].indexOf('T') ? +split[2].split('T')[0] : +split[2];

  if (!yyyy || isNaN(yyyy) || !mm || isNaN(mm) || !dd || isNaN(dd)) {
    return null;
  }

  return new Date(yyyy, mm - 1, dd, 0, 0, 0, 0);
}

function formatCallback(date: Date): string | null {
  return date ? date.toISOString().split('T')[0] : null;
}
`})}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(l,{}),`
`,e.jsx(t.h2,{id:"accessibility",children:"Accessibility"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"When using a screen reader, ensure keyboard navigation in the calendar is announced."}),`
`,e.jsxs(t.li,{children:["Be sure that you add the proper aria-label to the ",e.jsx(t.code,{children:"<input>"})," element if necessary."]}),`
`,e.jsxs(t.li,{children:["The date picker component will add the following ARIA attributes to the ",e.jsx(t.code,{children:"<input>"})," element for you:",`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"aria-live"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"aria-atomic"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"aria-haspopup"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"aria-expanded"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"aria-owns"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"aria-disabled"})}),`
`]}),`
`]}),`
`]})]})}function ie(n={}){const{wrapper:t}={...o(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(r,{...n})}):r(n)}export{ie as default};
