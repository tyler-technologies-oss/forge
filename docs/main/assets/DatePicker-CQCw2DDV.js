import{j as t}from"./jsx-runtime-BOxXCiH9.js";import{u as o}from"./index-DuPH5XzU.js";import{M as s,T as a,C as i}from"./index-DqH3OTA9.js";import{C as l}from"./CustomArgTypes-G8i2MET4.js";import{D as c,a as d,C as m}from"./DatePicker.stories-fY5_GT6E.js";import"./iframe-Dl2z-e7R.js";import"../sb-preview/runtime.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./chunk-QN4WKJDJ-Bf_F3oir.js";import"./index-DXimoRZY.js";import"./index-DvzDrELh.js";import"./index-DrFu-skq.js";import"./utils-Dtr3SQvK.js";import"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import"./chunk-MZXVCX43-CM0pFb8Z.js";import"./v4-CQkTLCs1.js";import"./constants-ngK8be3i.js";import"./date-picker-DOVlEsNf.js";import"./index-CIZ3m0iD.js";import"./calendar-CqrOoEFz.js";import"./base-adapter-uOfGA2wD.js";import"./tooltip-FbyHcKsY.js";import"./focus-indicator-C4Z5XP1c.js";import"./index-Dh0vMUMR.js";import"./overlay-D7ruZE35.js";import"./with-longpress-listener-CJlfUm7c.js";import"./dismissible-stack-jVokvGcY.js";import"./with-default-aria-Bw3nCsY-.js";import"./state-layer-BisR_hRI.js";import"./event-utils-C1SDeUaq.js";import"./button-GqT3ELiS.js";import"./icon-DHVNhAh1.js";import"./base-button-adapter-DTaQearl.js";import"./with-label-aware-DCBgJY4W.js";import"./icon-button-DNIpFQC2.js";import"./popover-CnzyzWS6.js";import"./base-date-picker-core-CuP-pKIs.js";import"./a11y-BxM9_46k.js";import"./text-field-C2sV2q9w.js";import"./base-field-CdQ37kwO.js";import"./label-BSpLsvKH.js";import"./button-toggle-group-BCHiADOy.js";import"./with-form-associated-BhFY5YZm.js";import"./checkbox-BCGc4uqs.js";import"./switch-BtH834SF.js";function r(n){const e={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...n.components};return t.jsxs(t.Fragment,{children:[t.jsx(s,{of:c}),`
`,t.jsx(a,{}),`
`,t.jsx(e.p,{children:"Date pickers are used to allow users to select a date from a calendar."}),`
`,t.jsx(i,{of:d}),`
`,t.jsx(e.h2,{id:"custom-date-format",children:"Custom Date Format"}),`
`,t.jsxs(e.p,{children:["Input masking is enabled by default to ensure the user enters the date in the correct format, but you can also customize the date format via the ",t.jsx(e.code,{children:"parseCallback"}),", ",t.jsx(e.code,{children:"formatCallback"}),`,
and `,t.jsx(e.code,{children:"maskFormat"})," properties."]}),`
`,t.jsx(i,{of:m}),`
`,t.jsxs(e.p,{children:["In the example above, the ",t.jsx(e.code,{children:"parseCallback"})," function is used to parse the date string into a ",t.jsx(e.code,{children:"Date"})," object, and the ",t.jsx(e.code,{children:"formatCallback"}),` function is used to format the date object into a string
using the `,t.jsx(e.code,{children:"YYYY-MM-DD"})," format. You will also need to set the ",t.jsx(e.code,{children:"mask-format"})," attribute to ",t.jsx(e.code,{children:"YYYY-MM-DD"})," to enable input masking support."]}),`
`,t.jsx(e.pre,{children:t.jsx(e.code,{className:"language-typescript",children:`function parseCallback(str: string): Date | null {
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
`,t.jsx(e.h2,{id:"api",children:"API"}),`
`,t.jsx(l,{}),`
`,t.jsx(e.h2,{id:"accessibility",children:"Accessibility"}),`
`,t.jsxs(e.ul,{children:[`
`,t.jsx(e.li,{children:"When using a screen reader, ensure keyboard navigation in the calendar is announced."}),`
`,t.jsxs(e.li,{children:["Be sure that you add the proper aria-label to the ",t.jsx(e.code,{children:"<input>"})," element if necessary."]}),`
`,t.jsxs(e.li,{children:["The date picker component will add the following ARIA attributes to the ",t.jsx(e.code,{children:"<input>"})," element for you:",`
`,t.jsxs(e.ul,{children:[`
`,t.jsx(e.li,{children:t.jsx(e.code,{children:"aria-live"})}),`
`,t.jsx(e.li,{children:t.jsx(e.code,{children:"aria-atomic"})}),`
`,t.jsx(e.li,{children:t.jsx(e.code,{children:"aria-haspopup"})}),`
`,t.jsx(e.li,{children:t.jsx(e.code,{children:"aria-expanded"})}),`
`,t.jsx(e.li,{children:t.jsx(e.code,{children:"aria-owns"})}),`
`,t.jsx(e.li,{children:t.jsx(e.code,{children:"aria-disabled"})}),`
`]}),`
`]}),`
`]})]})}function rt(n={}){const{wrapper:e}={...o(),...n.components};return e?t.jsx(e,{...n,children:t.jsx(r,{...n})}):r(n)}export{rt as default};
