import"./lit-element-Dk2-kgKT.js";import{k as y}from"./lit-html-DZH-Jm0H.js";import{a as l}from"./chunk-454WOBUV-CM0pFb8Z.js";import{g as b,s as g}from"./utils-D1kchwVb.js";import"./constants-DjE6emXm.js";import"./date-picker-CyMKz0P6.js";import"./calendar-7kNf1bkm.js";import"./index-Dh0vMUMR.js";import"./icon-button-XdSjYqUR.js";import"./focus-indicator-_fDu4ZqT.js";import"./state-layer-DTKAXCUq.js";import"./icon-DHpZ4R73.js";import"./text-field-DqH-bXsA.js";import"./base-field-BFFwcPMe.js";import"./label-DfCsGThT.js";import"./button-C5f1g9CL.js";import"./button-toggle-group-BJ7gYCrU.js";import"./checkbox-D4QiEHwm.js";import"./switch-BteFxJWF.js";const p="forge-date-picker",Y=l("forge-date-picker-change"),C=l("forge-date-picker-open"),h=l("forge-date-picker-close"),M=l("forge-date-picker-input"),$={title:"Components/Date Picker",render:e=>y`
      <forge-date-picker
        .allowInvalidDate=${e.allowInvalidDate}
        ?disabled=${e.disabled}
        .disabledDaysOfWeek=${e.disabledDaysOfWeek}
        .locale=${e.locale}
        .masked=${e.masked}
        .maskedFormat=${e.maskedFormat}
        .max=${e.max}
        .min=${e.min}
        .open=${e.open}
        .showClear=${e.showClear}
        .showMaskFormat=${e.showMaskFormat}
        .showToday=${e.showToday}
        .yearRange=${e.yearRange}
        @forge-date-picker-change=${Y}
        @forge-date-picker-open=${C}
        @forge-date-picker-close=${h}
        @forge-date-picker-input=${M}>
        <forge-text-field>
          <label for="date-picker">Date</label>
          <input aria-label="Pick a date" type="text" id="date-picker" autocomplete="off" placeholder="" />
        </forge-text-field>
      </forge-date-picker>
    `,component:p,argTypes:{...b({tagName:p,exclude:["disableDayCallback","prepareMaskCallback","formatCallback","parseCallback","popupClasses","disabledDates","value","valueMode","notifyInputValueChanges"],controls:{disabledDaysOfWeek:{control:{type:"multi-select",labels:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},options:[0,1,2,3,4,5,6]}}})},args:{allowInvalidDate:!1,disabled:!1,disabledDaysOfWeek:[],locale:"en-US",masked:!0,maskFormat:"MM/DD/YYYY",max:"",min:"",open:!1,showClear:!1,showMaskFormat:!1,showToday:!1,yearRange:"-50:+50"}},r={},o={...g,render:()=>{function e(a){if(!a)return null;const t=a.split("-");if(t.length!==3)return null;const s=+t[0],i=+t[1],n=t[2].indexOf("T")?+t[2].split("T")[0]:+t[2];return!s||isNaN(s)||!i||isNaN(i)||!n||isNaN(n)?null:new Date(s,i-1,n,0,0,0,0)}function D(a){return a?a.toISOString().split("T")[0]:null}return y`
      <forge-date-picker .parseCallback=${e} .formatCallback=${D} mask-format="YYYY-MM-DD">
        <forge-text-field>
          <label for="date-picker">Date</label>
          <input type="text" id="date-picker" autocomplete="off" placeholder="YYYY-MM-DD" />
          <span slot="support-text">Enter a date in the format YYYY-MM-DD</span>
        </forge-text-field>
      </forge-date-picker>
    `}};var d,c,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(m=(c=r.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var f,u,k;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    function parseCallback(str: string): Date | null {
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
    return html\`
      <forge-date-picker .parseCallback=\${parseCallback} .formatCallback=\${formatCallback} mask-format="YYYY-MM-DD">
        <forge-text-field>
          <label for="date-picker">Date</label>
          <input type="text" id="date-picker" autocomplete="off" placeholder="YYYY-MM-DD" />
          <span slot="support-text">Enter a date in the format YYYY-MM-DD</span>
        </forge-text-field>
      </forge-date-picker>
    \`;
  }
}`,...(k=(u=o.parameters)==null?void 0:u.docs)==null?void 0:k.source}}};const x=["Demo","CustomFormat"],B=Object.freeze(Object.defineProperty({__proto__:null,CustomFormat:o,Demo:r,__namedExportsOrder:x,default:$},Symbol.toStringTag,{value:"Module"}));export{o as C,B as D,r as a};
