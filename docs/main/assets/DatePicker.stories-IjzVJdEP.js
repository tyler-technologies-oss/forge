import{x as y}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as n}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{g as b,s as g}from"./utils-CpZ1flO4.js";import"./constants-DjE6emXm.js";import"./date-picker-CUt74FG0.js";import"./calendar-CWqZszfs.js";import"./index-Dh0vMUMR.js";import"./icon-button-B2LQlK1e.js";import"./focus-indicator-BPFZRBe9.js";import"./state-layer-D8bHAvjj.js";import"./icon-DjINFoyU.js";import"./text-field-RvdQEqTJ.js";import"./base-field-DI05trcI.js";import"./label-u49DyhbP.js";import"./button-BZEZMHKM.js";import"./button-toggle-group-CVRZEG3N.js";import"./checkbox-an-Xb1xB.js";import"./switch-CiP8pWu1.js";const p="forge-date-picker",Y=n("forge-date-picker-change"),C=n("forge-date-picker-open"),h=n("forge-date-picker-close"),M=n("forge-date-picker-input"),$={title:"Components/Date Picker",render:e=>y`
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
    `,component:p,argTypes:{...b({tagName:p,exclude:["disableDayCallback","prepareMaskCallback","formatCallback","parseCallback","popupClasses","disabledDates","value","valueMode","notifyInputValueChanges"],controls:{disabledDaysOfWeek:{control:{type:"multi-select",labels:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},options:[0,1,2,3,4,5,6]}}})},args:{allowInvalidDate:!1,disabled:!1,disabledDaysOfWeek:[],locale:"en-US",masked:!0,maskFormat:"MM/DD/YYYY",max:"",min:"",open:!1,showClear:!1,showMaskFormat:!1,showToday:!1,yearRange:"-50:+50"}},r={},o={...g,render:()=>{function e(a){if(!a)return null;const t=a.split("-");if(t.length!==3)return null;const l=+t[0],s=+t[1],i=t[2].indexOf("T")?+t[2].split("T")[0]:+t[2];return!l||isNaN(l)||!s||isNaN(s)||!i||isNaN(i)?null:new Date(l,s-1,i,0,0,0,0)}function D(a){return a?a.toISOString().split("T")[0]:null}return y`
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
