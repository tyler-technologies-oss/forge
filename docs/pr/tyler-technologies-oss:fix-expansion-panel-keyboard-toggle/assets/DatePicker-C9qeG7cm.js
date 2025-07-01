import{j as e,M as s,T as a,C as i}from"./blocks-Cs5Si6p6.js";import{useMDXComponents as o}from"./index-D5TzcWxB.js";import{C as l}from"./CustomArgTypes-Dh8qm5e5.js";import{D as c,a as d,C as m}from"./DatePicker.stories-CLitGa8y.js";import"./iframe-mS7RoxC1.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-BIyK4qxX.js";import"./feature-detection-uS6p5jc8.js";import"./date-picker-DCqSS4Tu.js";import"./constants-wOq9K3uV.js";import"./icon-BIwO9Z2o.js";import"./base-adapter-Mla2Q9YN.js";import"./index-CiLSBptl.js";import"./calendar-BkTYTQtH.js";import"./tooltip-CEqNszOk.js";import"./utils-CRxrUqQD.js";import"./overlay-rvLcgp1q.js";import"./with-longpress-listener-CGXzI-TM.js";import"./dismissible-stack-BdWcv7_4.js";import"./with-default-aria-CUUWGrPB.js";import"./a11y-utils-fzPGYZJ6.js";import"./focus-indicator-IWpzSXYP.js";import"./state-layer-BFwsAUDA.js";import"./event-utils-C1SDeUaq.js";import"./button-axir9R8P.js";import"./base-button-adapter-Bdsqcxka.js";import"./with-label-aware-D31hYnqk.js";import"./icon-button-BTs0N2W7.js";import"./popover-CkPGSxIK.js";import"./base-date-picker-core-Tnfjz6aj.js";import"./a11y-BxM9_46k.js";import"./text-field-6cUDCCz4.js";import"./base-field-YNUqKCTB.js";import"./label-Bs2Fua0N.js";import"./button-toggle-group-D5jBldBo.js";import"./with-form-associated-BeE6NBc1.js";import"./checkbox-DOmkbh7U.js";import"./switch-Bt2bdQXJ.js";function r(n){const t={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:c}),`
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
`]})]})}function U(n={}){const{wrapper:t}={...o(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(r,{...n})}):r(n)}export{U as default};
