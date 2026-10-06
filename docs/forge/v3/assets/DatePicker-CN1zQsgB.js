import{u as o,j as e,M as a,T as s,C as r}from"./blocks-XFXxCHax.js";import{C as c}from"./CustomArgTypes-CWzbzuQH.js";import{D as l,a as d,b as h,C as m}from"./DatePicker.stories-DM8QVI8L.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BFW4bN8h.js";import"./iframe-oAO0QRyC.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-BUadP3tW.js";import"./service-adapter-8tADcN_b.js";import"./date-picker-DQdxk9An.js";import"./custom-element-DR9AFpIK.js";import"./component-utils-vOrACU0E.js";import"./utils-B9Oh4ZKp.js";import"./tyler-icons-_o7MAz4c.js";import"./calendar-Cg8Kd7hO.js";import"./core-property-Co8uF8PW.js";import"./dom-utils-BDbRr6KM.js";import"./base-adapter-DOky_or5.js";import"./tooltip-BnZGP5cf.js";import"./constants-ffvdo6x3.js";import"./create-context-BxR5I8pu.js";import"./feature-detection-xOGaFvRv.js";import"./platform-C5RrLkNt.js";import"./utils-C31il88P.js";import"./overlay-DWOSAut5.js";import"./floating-ui.dom-DaMtbvS2.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./base-component-BFu9bkgC.js";import"./with-longpress-listener-D4ROnnkg.js";import"./dismissible-stack-DyoP5jNB.js";import"./with-element-internals-CFYP_epH.js";import"./a11y-utils-DssnAab5.js";import"./focus-indicator-DF5CnxaH.js";import"./property-CsZj1UFS.js";import"./base-lit-element-BfYfGFH_.js";import"./async-directive-B0mdDXAn.js";import"./directive-CwRn8Fwj.js";import"./state-layer-gtlkuVuf.js";import"./event-utils-C1SDeUaq.js";import"./button-CSrhRaCz.js";import"./class-map-DX-Fvzp4.js";import"./icon-BNaE2C0t.js";import"./base-button-CPl2ikJN.js";import"./state-CcYvR2OD.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./button-constants-DRqTH6Pv.js";import"./icon-button-BUDykOqB.js";import"./icon-button-constants-JHHxiN9v.js";import"./popover-DCnuFbj-.js";import"./base-date-picker-core-DjItxJ7W.js";import"./a11y-BxM9_46k.js";import"./text-field-Cm3IZ4rz.js";import"./base-field-R00t77-F.js";import"./label-DWc44Up3.js";import"./button-toggle-group-constants-CvfmN-z8.js";import"./checkbox-constants-BJ3elUIK.js";import"./switch-constants-BZVST_qJ.js";import"./with-label-aware-B4Q13qtt.js";import"./object-utils-CUPteeNI.js";function i(n){const t={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:l}),`
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
  e: (currentDate: Date) => new Date(currentDate.getFullYear(), 11, 31)
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
`]})]})}function Me(n={}){const{wrapper:t}={...o(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{Me as default};
