import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,r as n}from"./react-CqthO5_N.js";import{a as r}from"./chunk-RD3KTAHR-scUwhTZZ.js";import{h as i,n as a,p as o,u as s}from"./blocks-Bcs6hT4V.js";import{n as c,t as l}from"./CustomArgTypes-3XqZyV8V.js";import{a as u,i as d,n as f,r as p,t as m}from"./DatePicker.stories-CRfeUC8O.js";function h(e){let n={code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(s,{of:p}),`
`,(0,_.jsx)(o,{}),`
`,(0,_.jsx)(n.p,{children:`Date pickers are used to allow users to select a date from a calendar.`}),`
`,(0,_.jsx)(a,{of:d}),`
`,(0,_.jsx)(n.h2,{id:`alternative-date-formats`,children:`Alternative Date Formats`}),`
`,(0,_.jsxs)(n.p,{children:[`The date picker component supports multiple built-in date formats, which can be set via the `,(0,_.jsx)(n.code,{children:`date-format`}),` attribute. The default format is `,(0,_.jsx)(n.code,{children:`MM/DD/YYYY`}),`,
but you can change it to any of the following formats:`]}),`
`,(0,_.jsxs)(n.ul,{children:[`
`,(0,_.jsx)(n.li,{children:(0,_.jsx)(n.code,{children:`MM/DD/YYYY`})}),`
`,(0,_.jsx)(n.li,{children:(0,_.jsx)(n.code,{children:`MM/DD/YY`})}),`
`,(0,_.jsx)(n.li,{children:(0,_.jsx)(n.code,{children:`DD/MMM/YYYY`})}),`
`,(0,_.jsx)(n.li,{children:(0,_.jsx)(n.code,{children:`MM-DD-YYYY`})}),`
`,(0,_.jsx)(n.li,{children:(0,_.jsx)(n.code,{children:`MM-DD-YY`})}),`
`,(0,_.jsx)(n.li,{children:(0,_.jsx)(n.code,{children:`DD-MMM-YYYY`})}),`
`,(0,_.jsx)(n.li,{children:(0,_.jsx)(n.code,{children:`YYYY-MM-DD`})}),`
`,(0,_.jsx)(n.li,{children:(0,_.jsx)(n.code,{children:`YYYY-MMM-DD`})}),`
`,(0,_.jsx)(n.li,{children:(0,_.jsx)(n.code,{children:`DD.MM.YYYY`})}),`
`,(0,_.jsx)(n.li,{children:(0,_.jsx)(n.code,{children:`DD.MM.YY`})}),`
`]}),`
`,(0,_.jsx)(n.p,{children:`When changing the default format, the date picker will automatically update the input mask to match the new format as well as handle the parsing and formatting of the date value.`}),`
`,(0,_.jsx)(a,{of:f}),`
`,(0,_.jsx)(n.h2,{id:`custom-date-format`,children:`Custom Date Format`}),`
`,(0,_.jsxs)(n.p,{children:[`You can also customize the date format via the `,(0,_.jsx)(n.code,{children:`parseCallback`}),`, `,(0,_.jsx)(n.code,{children:`formatCallback`}),`, and `,(0,_.jsx)(n.code,{children:`maskFormat`}),` properties. This gives you full control over how the date is parsed from the input string and how it is formatted back into a string for display.`]}),`
`,(0,_.jsxs)(n.p,{children:[`The following mask segment blocks are supported for the `,(0,_.jsx)(n.code,{children:`mask-format`}),` attribute:`]}),`
`,(0,_.jsxs)(n.ul,{children:[`
`,(0,_.jsxs)(n.li,{children:[(0,_.jsx)(n.code,{children:`Mmm`}),` - Month abbreviation (e.g., Jan, Feb, Mar)`]}),`
`,(0,_.jsxs)(n.li,{children:[(0,_.jsx)(n.code,{children:`MMM`}),` - Month abbreviation uppercase (e.g., JAN, FEB, MAR)`]}),`
`,(0,_.jsxs)(n.li,{children:[(0,_.jsx)(n.code,{children:`DD`}),` - Day of the month with leading zero (01 to 31)`]}),`
`,(0,_.jsxs)(n.li,{children:[(0,_.jsx)(n.code,{children:`YYYY`}),` - Four-digit year (e.g., 2025)`]}),`
`,(0,_.jsxs)(n.li,{children:[(0,_.jsx)(n.code,{children:`YY`}),` - Two-digit year (e.g., 25)`]}),`
`]}),`
`,(0,_.jsx)(a,{of:m}),`
`,(0,_.jsxs)(n.p,{children:[`In the example above, the `,(0,_.jsx)(n.code,{children:`parseCallback`}),` function is used to parse the date string into a `,(0,_.jsx)(n.code,{children:`Date`}),` object, and the `,(0,_.jsx)(n.code,{children:`formatCallback`}),` function is used to format the date object into a string
using the `,(0,_.jsx)(n.code,{children:`Mmm DD, YYYY`}),` format. You will also need to set the `,(0,_.jsx)(n.code,{children:`mask-format`}),` attribute to `,(0,_.jsx)(n.code,{children:`Mmm DD, YYYY`}),` to enable input masking support.`]}),`
`,(0,_.jsx)(n.pre,{children:(0,_.jsx)(n.code,{className:`language-typescript`,children:`function parseCallback(str: string): Date | null {
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
`,(0,_.jsx)(n.h2,{id:`custom-shortcuts`,children:`Custom Shortcuts`}),`
`,(0,_.jsxs)(n.p,{children:[`You can also customize the shortcuts available in the date picker by using the `,(0,_.jsx)(n.code,{children:`shortcuts`}),` property. This allows you to define your own key shortcuts based on your application's needs.`]}),`
`,(0,_.jsx)(n.p,{children:`The date picker supports the following built-in shortcuts by default:`}),`
`,(0,_.jsxs)(n.ul,{children:[`
`,(0,_.jsxs)(n.li,{children:[(0,_.jsx)(n.code,{children:`t`}),`: Today`]}),`
`]}),`
`,(0,_.jsxs)(n.p,{children:[`If you need to turn off the built-in shortcuts, you can set the `,(0,_.jsx)(n.code,{children:`shortcuts`}),` attribute to `,(0,_.jsx)(n.code,{children:`"off"`}),`.`]}),`
`,(0,_.jsxs)(n.p,{children:[`If you want to add custom shortcuts, you can set the `,(0,_.jsx)(n.code,{children:`shortcuts`}),` property to a JavaScript object that maps key names to a callback function that returns a `,(0,_.jsx)(n.code,{children:`Date`}),` object. The callback function will receive the current date as an argument, which you can use to calculate the desired date.`]}),`
`,(0,_.jsx)(n.pre,{children:(0,_.jsx)(n.code,{className:`language-typescript`,children:`const shortcuts = {
  t: (currentDate: Date) => new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
  y: (currentDate: Date) => new Date(currentDate.getFullYear(), 0, 1),
  e: (currentDate: Date) => new Date(currentDate.getFullYear(), 11, 31)
};
`})}),`
`,(0,_.jsx)(n.h2,{id:`api`,children:`API`}),`
`,(0,_.jsx)(l,{}),`
`,(0,_.jsx)(n.h2,{id:`accessibility`,children:`Accessibility`}),`
`,(0,_.jsxs)(n.ul,{children:[`
`,(0,_.jsx)(n.li,{children:`When using a screen reader, ensure keyboard navigation in the calendar is announced.`}),`
`,(0,_.jsxs)(n.li,{children:[`Be sure that you add the proper aria-label to the `,(0,_.jsx)(n.code,{children:`<input>`}),` element if necessary.`]}),`
`,(0,_.jsxs)(n.li,{children:[`The date picker component will add the following ARIA attributes to the `,(0,_.jsx)(n.code,{children:`<input>`}),` element for you:`,`
`,(0,_.jsxs)(n.ul,{children:[`
`,(0,_.jsx)(n.li,{children:(0,_.jsx)(n.code,{children:`aria-live`})}),`
`,(0,_.jsx)(n.li,{children:(0,_.jsx)(n.code,{children:`aria-atomic`})}),`
`,(0,_.jsx)(n.li,{children:(0,_.jsx)(n.code,{children:`aria-haspopup`})}),`
`,(0,_.jsx)(n.li,{children:(0,_.jsx)(n.code,{children:`aria-expanded`})}),`
`,(0,_.jsx)(n.li,{children:(0,_.jsx)(n.code,{children:`aria-owns`})}),`
`,(0,_.jsx)(n.li,{children:(0,_.jsx)(n.code,{children:`aria-disabled`})}),`
`]}),`
`]}),`
`]})]})}function g(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,_.jsx)(n,{...e,children:(0,_.jsx)(h,{...e})}):h(e)}var _;function v(){return(v=e((()=>{_=r(),n(),i(),c(),u()})))()}v();export{g as default};