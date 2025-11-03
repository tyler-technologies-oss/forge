import{j as e,M as a,T as s,C as r}from"./blocks-DxMpJ6CA.js";import{useMDXComponents as o}from"./index-Dabznr-_.js";import{C as c}from"./CustomArgTypes-BfBcVyPG.js";import{D as l,a as d,b as h,C as m}from"./DatePicker.stories-zMsqJT7R.js";import"./preload-helper-PPVm8Dsz.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-D6SD9KtL.js";import"./utils-C4vOzYQF.js";import"./service-adapter-CffG5Lhq.js";import"./date-picker-BtVvtGkg.js";import"./constants-DzQy6WDX.js";import"./feature-detection-B-sRDmdg.js";import"./icon-kuXwuZAY.js";import"./base-adapter-C8aSF3nG.js";import"./index-5CPwzmQS.js";import"./calendar-DtuuZuiw.js";import"./tooltip-B59ljHGY.js";import"./utils-Bd6MGx91.js";import"./overlay-B5pGv-rV.js";import"./with-longpress-listener-DtGZwA0v.js";import"./dismissible-stack-TpzCxM2R.js";import"./with-default-aria-6GN_uk1I.js";import"./a11y-utils-Dj08p-2z.js";import"./focus-indicator-Dj3yjrqX.js";import"./base-lit-element-Cs65A-wD.js";import"./state-layer-BEEsPoZf.js";import"./event-utils-C1SDeUaq.js";import"./button-D4tTiVfF.js";import"./base-button-adapter-ZA9hEgC6.js";import"./with-label-aware-C7up74QW.js";import"./icon-button-Bu40vJwL.js";import"./popover-BWVazmya.js";import"./base-date-picker-core-DCf9kICt.js";import"./a11y-BxM9_46k.js";import"./text-field-CF64bR8m.js";import"./base-field-DlzCozzi.js";import"./label-BVVHfIdQ.js";import"./button-toggle-group-C0rNACWs.js";import"./with-form-associated-DNJXxTFO.js";import"./checkbox-CzLAG6pK.js";import"./switch-B1DgetGA.js";function i(n){const t={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:l}),`
`,e.jsx(s,{}),`
`,e.jsx(t.p,{children:"Date pickers are used to allow users to select a date from a calendar."}),`
`,e.jsx(r,{of:d}),`
`,e.jsx(t.h2,{id:"alternative-date-formats",children:"Alternative Date Formats"}),`
`,e.jsxs(t.p,{children:["The date picker component supports multiple built-in date formats, which can be set via the ",e.jsx(t.code,{children:"date-format"})," attribute. The default format is ",e.jsx(t.code,{children:"MM/DD/YYYY"}),`,
but you can change it to any of the following formats:`]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"MM/DD/YYYY"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"MM/DD/YY"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"DD/MMM/YYYY"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"MM-DD-YYYY"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"MM-DD-YY"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"DD-MMM-YYYY"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"YYYY-MM-DD"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"YYYY-MMM-DD"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"DD.MM.YYYY"})}),`
`,e.jsx(t.li,{children:e.jsx(t.code,{children:"DD.MM.YY"})}),`
`]}),`
`,e.jsx(t.p,{children:"When changing the default format, the date picker will automatically update the input mask to match the new format as well as handle the parsing and formatting of the date value."}),`
`,e.jsx(r,{of:h}),`
`,e.jsx(t.h2,{id:"custom-date-format",children:"Custom Date Format"}),`
`,e.jsxs(t.p,{children:["You can also customize the date format via the ",e.jsx(t.code,{children:"parseCallback"}),", ",e.jsx(t.code,{children:"formatCallback"}),", and ",e.jsx(t.code,{children:"maskFormat"})," properties. This gives you full control over how the date is parsed from the input string and how it is formatted back into a string for display."]}),`
`,e.jsxs(t.p,{children:["The following mask segment blocks are supported for the ",e.jsx(t.code,{children:"mask-format"})," attribute:"]}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"Mmm"})," - Month abbreviation (e.g., Jan, Feb, Mar)"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"MMM"})," - Month abbreviation uppercase (e.g., JAN, FEB, MAR)"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"DD"})," - Day of the month with leading zero (01 to 31)"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"YYYY"})," - Four-digit year (e.g., 2025)"]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"YY"})," - Two-digit year (e.g., 25)"]}),`
`]}),`
`,e.jsx(r,{of:m}),`
`,e.jsxs(t.p,{children:["In the example above, the ",e.jsx(t.code,{children:"parseCallback"})," function is used to parse the date string into a ",e.jsx(t.code,{children:"Date"})," object, and the ",e.jsx(t.code,{children:"formatCallback"}),` function is used to format the date object into a string
using the `,e.jsx(t.code,{children:"Mmm DD, YYYY"})," format. You will also need to set the ",e.jsx(t.code,{children:"mask-format"})," attribute to ",e.jsx(t.code,{children:"Mmm DD, YYYY"})," to enable input masking support."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-typescript",children:`function parseCallback(str: string): Date | null {
  if (!str) {
    return null;
  }

  // Regular expression to match "Mmm DD, YYYY" (e.g., "Jul 08, 2025")
  const regex = /(\\w{3}) (\\d{2}), (\\d{4})/;
  const match = str.match(regex);

  if (!match || match.length !== 4) {
    return null;
  }

  const monthStr = match[1];
  const day = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);

  // Map month abbreviations to month numbers (0-indexed)
  const monthMap: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11
  };
  const month = monthMap[monthStr];

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return null;
  }

  const date = new Date(year, month, day);

  // Validate the date to prevent issues with invalid dates (e.g., Feb 30)
  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return null;
  }

  return date;
}

function formatCallback(date: Date | null): string {
  if (!date) {
    return '';
  }

  const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit', year: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
`})}),`
`,e.jsx(t.h2,{id:"custom-shortcuts",children:"Custom Shortcuts"}),`
`,e.jsxs(t.p,{children:["You can also customize the shortcuts available in the date picker by using the ",e.jsx(t.code,{children:"shortcuts"})," property. This allows you to define your own key shortcuts based on your application's needs."]}),`
`,e.jsx(t.p,{children:"The date picker supports the following built-in shortcuts by default:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.code,{children:"t"}),": Today"]}),`
`]}),`
`,e.jsxs(t.p,{children:["If you need to turn off the built-in shortcuts, you can set the ",e.jsx(t.code,{children:"shortcuts"})," attribute to ",e.jsx(t.code,{children:'"off"'}),"."]}),`
`,e.jsxs(t.p,{children:["If you want to add custom shortcuts, you can set the ",e.jsx(t.code,{children:"shortcuts"})," property to a JavaScript object that maps key names to a callback function that returns a ",e.jsx(t.code,{children:"Date"})," object. The callback function will receive the current date as an argument, which you can use to calculate the desired date."]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-typescript",children:`const shortcuts = {
  t: (currentDate: Date) => new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
  y: (currentDate: Date) => new Date(currentDate.getFullYear(), 0, 1),
  e: (currentDate: Date) => new Date(currentDate.getFullYear(), 11, 31),
};
`})}),`
`,e.jsx(t.h2,{id:"api",children:"API"}),`
`,e.jsx(c,{}),`
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
`]})]})}function ee(n={}){const{wrapper:t}={...o(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{ee as default};
