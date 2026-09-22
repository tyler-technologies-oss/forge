import{u as o,j as e,M as a,T as s,C as r}from"./blocks-ZCF8jAuh.js";import{C as c}from"./CustomArgTypes-BrNnIXPT.js";import{D as l,a as d,b as h,C as m}from"./DatePicker.stories-C7kG_Gx5.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DAoAvB82.js";import"./iframe-CGF9490j.js";import"./_commonjsHelpers-CqkleIqs.js";import"./utils-cbnKSSEt.js";import"./service-adapter-DlT-lJx7.js";import"./date-picker-Bm3aEs4x.js";import"./base-component-DokdPcmx.js";import"./tyler-icons-CM84cyec.js";import"./property-h_NQN_ax.js";import"./base-lit-element-BzArp5lX.js";import"./directive-CwRn8Fwj.js";import"./constants-Ds-UekRh.js";import"./feature-detection-Cxj81Y1H.js";import"./calendar-WFRAhrnZ.js";import"./base-adapter-C2s8cO2K.js";import"./dom-utils-D38acdAW.js";import"./tooltip-u84XDAZH.js";import"./utils-DU-9AqTO.js";import"./overlay-iu-_ABPF.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./with-longpress-listener-D-W76F-r.js";import"./dismissible-stack-xq-0Rg1q.js";import"./with-element-internals-CJt7fDtX.js";import"./a11y-utils-a04gn1ZN.js";import"./focus-indicator-BuzCXwAm.js";import"./state-layer-BcVD1OXH.js";import"./event-utils-C1SDeUaq.js";import"./button-X-BaipNf.js";import"./class-map-C-Xl3VxB.js";import"./base-button-BJYE3STx.js";import"./state-CvgusLtP.js";import"./query-CtiAP21w.js";import"./base-DVmwUFg0.js";import"./query-assigned-elements-43hYArgI.js";import"./button-constants-D5k34xES.js";import"./icon-button-D1wmfd79.js";import"./icon-button-constants-BJvh1yHL.js";import"./popover-CBkkBxnw.js";import"./base-date-picker-core-BJT1uEP2.js";import"./a11y-BxM9_46k.js";import"./text-field-V39Mt-6S.js";import"./base-field-D8CxI0Jj.js";import"./label-CtoUkODo.js";import"./button-toggle-group-constants-lDTvG_dF.js";import"./checkbox-constants-BbWb-R-a.js";import"./switch-constants-DiyC_PIB.js";import"./with-label-aware-BP3asw-P.js";function i(n){const t={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...o(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{of:l}),`
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
`]})]})}function he(n={}){const{wrapper:t}={...o(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(i,{...n})}):i(n)}export{he as default};
