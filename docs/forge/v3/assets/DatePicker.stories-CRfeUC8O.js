import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{p as r}from"./iframe-CebKObJP.js";import{_ as i,m as a,s as o}from"./utils-C3ow8Ikc.js";import{t as s}from"./date-picker-Pi51yvtS.js";var c=t({CustomFormat:()=>v,DateFormats:()=>_,Demo:()=>g,__namedExportsOrder:()=>y,default:()=>h}),l,u,d,f,p,m,h,g,_,v,y;function b(){return(b=e((()=>{r(),a(),s(),{action:l}=__STORYBOOK_MODULE_ACTIONS__,u=`forge-date-picker`,d=e=>l(`forge-date-picker-change`)(e.detail),f=e=>l(`forge-date-picker-open`)(e.detail),p=e=>l(`forge-date-picker-close`)(e.detail),m=e=>l(`forge-date-picker-input`)(e.detail),h={title:`Components/Date Picker`,render:e=>n`
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
      @forge-date-picker-change=${d}
      @forge-date-picker-open=${f}
      @forge-date-picker-close=${p}
      @forge-date-picker-input=${m}>
      <forge-text-field>
        <label for="date-picker">Date</label>
        <input aria-label="Pick a date" type="text" id="date-picker" autocomplete="off" placeholder="" />
      </forge-text-field>
    </forge-date-picker>
  `,component:u,argTypes:{...o({tagName:u,exclude:[`disableDayCallback`,`prepareMaskCallback`,`formatCallback`,`parseCallback`,`maskFormat`,`popupClasses`,`disabledDates`,`value`,`valueMode`,`notifyInputValueChanges`],controls:{disabledDaysOfWeek:{control:{type:`multi-select`,labels:[`Sunday`,`Monday`,`Tuesday`,`Wednesday`,`Thursday`,`Friday`,`Saturday`]},options:[0,1,2,3,4,5,6]},dateFormat:{control:{type:`select`},options:[`MM/DD/YYYY`,`MM/DD/YY`,`DD/MMM/YYYY`,`MM-DD-YYYY`,`MM-DD-YY`,`DD-MMM-YYYY`,`YYYY-MM-DD`,`YYYY-MMM-DD`,`DD.MM.YYYY`,`DD.MM.YY`]}}})},args:{allowInvalidDate:!1,disabled:!1,disabledDaysOfWeek:[],locale:`en-US`,masked:!0,dateFormat:`MM/DD/YYYY`,max:``,min:``,open:!1,showClear:!1,showMaskFormat:!1,showToday:!1,yearRange:`-50:+50`}},g={},_={parameters:{controls:{include:[`dateFormat`]}},render:e=>n`
    <forge-date-picker date-format=${e.dateFormat} @forge-date-picker-change=${d}>
      <forge-text-field>
        <label for="date-picker-date-formats">${e.dateFormat}</label>
        <input type="text" id="date-picker-date-formats" autocomplete="off" />
      </forge-text-field>
    </forge-date-picker>
  `},v={...i,render:()=>{function e(e){if(!e)return null;let t=e.match(/(\w{3}) (\d{2}), (\d{4})/);if(!t||t.length!==4)return null;let n=t[1],r=parseInt(t[2],10),i=parseInt(t[3],10),a={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11}[n];if(isNaN(r)||isNaN(a)||isNaN(i))return null;let o=new Date(i,a,r);return o.getFullYear()!==i||o.getMonth()!==a||o.getDate()!==r?null:o}function t(e){return e?new Intl.DateTimeFormat(`en-US`,{month:`short`,day:`2-digit`,year:`numeric`}).format(e):``}return n`
      <forge-date-picker
        .parseCallback=${e}
        .formatCallback=${t}
        mask-format="Mmm DD, YYYY"
        shortcuts="off"
        @forge-date-picker-change=${d}>
        <forge-text-field>
          <label for="date-picker">Date</label>
          <input type="text" id="date-picker" autocomplete="off" placeholder="Mmm DD, YYYY" />
          <span slot="support-text">Enter a date in the format Mmm DD, YYYY (e.g., Jul 08, 2025)</span>
        </forge-text-field>
      </forge-date-picker>
    `}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['dateFormat']
    }
  },
  render: args => html\`
    <forge-date-picker date-format=\${args.dateFormat} @forge-date-picker-change=\${changeAction}>
      <forge-text-field>
        <label for="date-picker-date-formats">\${args.dateFormat}</label>
        <input type="text" id="date-picker-date-formats" autocomplete="off" />
      </forge-text-field>
    </forge-date-picker>
  \`
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y=[`Demo`,`DateFormats`,`CustomFormat`]})))()}export{b as a,g as i,_ as n,c as r,v as t};