import{j as e,M as s,T as a,C as i}from"./index-CXXCjGiy.js";import{useMDXComponents as o}from"./index-BwIbM6C-.js";import{C as l}from"./CustomArgTypes-BxS7J06Y.js";import{D as c,a as d,C as m}from"./DatePicker.stories-DtMy_ZZo.js";import"./iframe-lj1jpJol.js";import"./_commonjsHelpers-Cpj98o6Y.js";import"./index-BHYIh-Xd.js";import"./index-DrFu-skq.js";import"./utils-DWPQW4DQ.js";import"./lit-element-JplMEnZc.js";import"./lit-html-paDGiEfB.js";import"./index-Cf3axooF.js";import"./v4-CQkTLCs1.js";import"./feature-detection-DRCh51Sa.js";import"./date-picker-CRX6i4YI.js";import"./constants-9n5_0r7k.js";import"./index-ByifSpfC.js";import"./calendar-fFTw8O5Y.js";import"./base-adapter-B6TJxM93.js";import"./tooltip-Cps7zk-s.js";import"./focus-indicator-CcRMHyPf.js";import"./index-CiLSBptl.js";import"./overlay-C0hWcV7g.js";import"./with-longpress-listener-BdUe1dXe.js";import"./dismissible-stack-CszJr02K.js";import"./with-default-aria-B0dk5gj8.js";import"./a11y-utils-DJ_tX8xT.js";import"./state-layer-CeKzZv66.js";import"./event-utils-C1SDeUaq.js";import"./button-BGYCwjxN.js";import"./icon-CND1_bFA.js";import"./base-button-adapter-DcvSuJjQ.js";import"./with-label-aware-OEbK3wHg.js";import"./icon-button-BBeQfCZG.js";import"./popover-DKMemx82.js";import"./base-date-picker-core-DFt_D6HY.js";import"./a11y-BxM9_46k.js";import"./text-field-CmiUBu7J.js";import"./base-field-Cxr01wbS.js";import"./label-BZR8wfMZ.js";import"./button-toggle-group-mB8WGz9d.js";import"./with-form-associated-Bje5Hee1.js";import"./checkbox-C0_Zuap3.js";import"./switch-C3Bp6VOE.js";function r(n){const t={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:c}),`
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
`]})]})}function ne(n={}){const{wrapper:t}={...o(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(r,{...n})}):r(n)}export{ne as default};
