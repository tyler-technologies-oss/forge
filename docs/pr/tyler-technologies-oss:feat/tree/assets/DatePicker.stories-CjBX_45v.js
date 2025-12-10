import{x as p}from"./iframe-CxOf2Yik.js";import{g as D,s as k}from"./utils-CWNZ6DqN.js";import"./service-adapter-CffG5Lhq.js";import"./date-picker-RtAa41Wd.js";import"./calendar-CConGmRm.js";import"./index-DTwfV0k0.js";import"./icon-button-Ca4_lLWu.js";import"./focus-indicator-6htZ7g-E.js";import"./state-layer-BEEsPoZf.js";import"./icon-Uwxy940_.js";import"./text-field-CTFCgFRz.js";import"./base-field-CXtcKSyk.js";import"./label-CCwd-QXp.js";import"./button-DM85ngA_.js";import"./button-toggle-group-D17NnQhn.js";import"./checkbox-o1E4x5is.js";import"./switch-CcSuJni8.js";const{action:s}=__STORYBOOK_MODULE_ACTIONS__,u="forge-date-picker",f=e=>s("forge-date-picker-change")(e.detail),h=e=>s("forge-date-picker-open")(e.detail),M=e=>s("forge-date-picker-close")(e.detail),y=e=>s("forge-date-picker-input")(e.detail),b={title:"Components/Date Picker",render:e=>p`
      <forge-date-picker
        .allowInvalidDate=${e.allowInvalidDate}
        ?disabled=${e.disabled}
        .disabledDaysOfWeek=${e.disabledDaysOfWeek}
        .locale=${e.locale}
        .masked=${e.masked}
        .max=${e.max}
        .min=${e.min}
        .open=${e.open}
        .showClear=${e.showClear}
        .showMaskFormat=${e.showMaskFormat}
        .showToday=${e.showToday}
        .yearRange=${e.yearRange}
        .dateFormat=${e.dateFormat}
        @forge-date-picker-change=${f}
        @forge-date-picker-open=${h}
        @forge-date-picker-close=${M}
        @forge-date-picker-input=${y}>
        <forge-text-field>
          <label for="date-picker">Date</label>
          <input aria-label="Pick a date" type="text" id="date-picker" autocomplete="off" placeholder="" />
        </forge-text-field>
      </forge-date-picker>
    `,component:u,argTypes:{...D({tagName:u,exclude:["disableDayCallback","prepareMaskCallback","formatCallback","parseCallback","maskFormat","popupClasses","disabledDates","value","valueMode","notifyInputValueChanges"],controls:{disabledDaysOfWeek:{control:{type:"multi-select",labels:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},options:[0,1,2,3,4,5,6]},dateFormat:{control:{type:"select"},options:["MM/DD/YYYY","MM/DD/YY","DD/MMM/YYYY","MM-DD-YYYY","MM-DD-YY","DD-MMM-YYYY","YYYY-MM-DD","YYYY-MMM-DD","DD.MM.YYYY","DD.MM.YY"]}}})},args:{allowInvalidDate:!1,disabled:!1,disabledDaysOfWeek:[],locale:"en-US",masked:!0,dateFormat:"MM/DD/YYYY",max:"",min:"",open:!1,showClear:!1,showMaskFormat:!1,showToday:!1,yearRange:"-50:+50"}},r={},o={parameters:{controls:{include:["dateFormat"]}},render:e=>p`
      <forge-date-picker date-format=${e.dateFormat} @forge-date-picker-change=${f}>
        <forge-text-field>
          <label for="date-picker-date-formats">${e.dateFormat}</label>
          <input type="text" id="date-picker-date-formats" autocomplete="off" />
        </forge-text-field>
      </forge-date-picker>
    `},n={...k,render:()=>{function e(t){if(!t)return null;const i=/(\w{3}) (\d{2}), (\d{4})/,a=t.match(i);if(!a||a.length!==4)return null;const Y=a[1],c=parseInt(a[2],10),d=parseInt(a[3],10),m={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}[Y];if(isNaN(c)||isNaN(m)||isNaN(d))return null;const l=new Date(d,m,c);return l.getFullYear()!==d||l.getMonth()!==m||l.getDate()!==c?null:l}function g(t){if(!t)return"";const i={month:"short",day:"2-digit",year:"numeric"};return new Intl.DateTimeFormat("en-US",i).format(t)}return p`
      <forge-date-picker
        .parseCallback=${e}
        .formatCallback=${g}
        mask-format="Mmm DD, YYYY"
        shortcuts="off"
        @forge-date-picker-change=${f}>
        <forge-text-field>
          <label for="date-picker">Date</label>
          <input type="text" id="date-picker" autocomplete="off" placeholder="Mmm DD, YYYY" />
          <span slot="support-text">Enter a date in the format Mmm DD, YYYY (e.g., Jul 08, 2025)</span>
        </forge-text-field>
      </forge-date-picker>
    `}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['dateFormat']
    }
  },
  render: args => {
    return html\`
      <forge-date-picker date-format=\${args.dateFormat} @forge-date-picker-change=\${changeAction}>
        <forge-text-field>
          <label for="date-picker-date-formats">\${args.dateFormat}</label>
          <input type="text" id="date-picker-date-formats" autocomplete="off" />
        </forge-text-field>
      </forge-date-picker>
    \`;
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    function parseCallback(str: string): Date | null {
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
      const monthMap: {
        [key: string]: number;
      } = {
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
      const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      };
      return new Intl.DateTimeFormat('en-US', options).format(date);
    }
    return html\`
      <forge-date-picker
        .parseCallback=\${parseCallback}
        .formatCallback=\${formatCallback}
        mask-format="Mmm DD, YYYY"
        shortcuts="off"
        @forge-date-picker-change=\${changeAction}>
        <forge-text-field>
          <label for="date-picker">Date</label>
          <input type="text" id="date-picker" autocomplete="off" placeholder="Mmm DD, YYYY" />
          <span slot="support-text">Enter a date in the format Mmm DD, YYYY (e.g., Jul 08, 2025)</span>
        </forge-text-field>
      </forge-date-picker>
    \`;
  }
}`,...n.parameters?.docs?.source}}};const x=["Demo","DateFormats","CustomFormat"],j=Object.freeze(Object.defineProperty({__proto__:null,CustomFormat:n,DateFormats:o,Demo:r,__namedExportsOrder:x,default:b},Symbol.toStringTag,{value:"Module"}));export{n as C,j as D,r as a,o as b};
