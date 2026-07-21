import"./service-adapter-8tADcN_b.js";import"./timestamp-CzX5TqO_.js";import{b as o}from"./iframe-CJhNcN38.js";import{s,g as y,d as p}from"./utils-TiAJY-9P.js";const n="forge-timestamp",v={title:"Components/Timestamp",tags:["new"],render:e=>{const i=document.createElement("forge-timestamp");p(i,e);const r=new Date;return i.setAttribute("datetime",`${r.getFullYear()}-${r.getMonth()+1}-${r.getDate()}`),i},component:n,argTypes:{...y({tagName:n})},args:{}},t={},a={...s,render:()=>o`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div>Start separator <forge-timestamp datetime="2024-06-15T14:30:45" separator="start"></forge-timestamp></div>
      <div><forge-timestamp datetime="2024-06-15T14:30:45" separator="end"></forge-timestamp> End separator</div>
      <div>No separator <forge-timestamp datetime="2024-06-15T14:30:45" separator="none"></forge-timestamp></div>
    </div>
  `},d={...s,render:()=>{const e="2024-06-15T14:30:45";return o`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div>
          <div>Default format (MM/dd/yyyy)</div>
          <forge-timestamp datetime=${e}></forge-timestamp>
        </div>
        <div>
          <div>ISO format (yyyy-MM-dd)</div>
          <forge-timestamp datetime=${e} format="yyyy-MM-dd"></forge-timestamp>
        </div>
        <div>
          <div>European format (dd.MM.yyyy)</div>
          <forge-timestamp datetime=${e} format="dd.MM.yyyy"></forge-timestamp>
        </div>
        <div>
          <div>Long format (dd MMM yyyy)</div>
          <forge-timestamp datetime=${e} format="dd MMM yyyy"></forge-timestamp>
        </div>
        <div>
          <div>Time only (HH:mm:ss)</div>
          <forge-timestamp datetime=${e} format="HH:mm:ss"></forge-timestamp>
        </div>
        <div>
          <div>DateTime (MM/dd/yyyy HH:mm)</div>
          <forge-timestamp datetime=${e} format="MM/dd/yyyy HH:mm"></forge-timestamp>
        </div>
      </div>
    `}},m={...s,render:()=>{const e="2024-06-15";return o`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div>
          <div>English (en-US)</div>
          <forge-timestamp datetime=${e} locale="en-US" format="dd MMMM yyyy"></forge-timestamp>
        </div>
        <div>
          <div>German (de-DE)</div>
          <forge-timestamp datetime=${e} locale="de-DE" format="dd MMMM yyyy"></forge-timestamp>
        </div>
        <div>
          <div>French (fr-FR)</div>
          <forge-timestamp datetime=${e} locale="fr-FR" format="dd MMMM yyyy"></forge-timestamp>
        </div>
        <div>
          <div>Spanish (es-ES)</div>
          <forge-timestamp datetime=${e} locale="es-ES" format="dd MMMM yyyy"></forge-timestamp>
        </div>
        <div>
          <div>Japanese (ja-JP)</div>
          <forge-timestamp datetime=${e} locale="ja-JP" format="yyyy年MMMM月dd日 (E)"></forge-timestamp>
        </div>
      </div>
    `}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div>Start separator <forge-timestamp datetime="2024-06-15T14:30:45" separator="start"></forge-timestamp></div>
      <div><forge-timestamp datetime="2024-06-15T14:30:45" separator="end"></forge-timestamp> End separator</div>
      <div>No separator <forge-timestamp datetime="2024-06-15T14:30:45" separator="none"></forge-timestamp></div>
    </div>
  \`
}`,...a.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const testDate = '2024-06-15T14:30:45';
    return html\`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div>
          <div>Default format (MM/dd/yyyy)</div>
          <forge-timestamp datetime=\${testDate}></forge-timestamp>
        </div>
        <div>
          <div>ISO format (yyyy-MM-dd)</div>
          <forge-timestamp datetime=\${testDate} format="yyyy-MM-dd"></forge-timestamp>
        </div>
        <div>
          <div>European format (dd.MM.yyyy)</div>
          <forge-timestamp datetime=\${testDate} format="dd.MM.yyyy"></forge-timestamp>
        </div>
        <div>
          <div>Long format (dd MMM yyyy)</div>
          <forge-timestamp datetime=\${testDate} format="dd MMM yyyy"></forge-timestamp>
        </div>
        <div>
          <div>Time only (HH:mm:ss)</div>
          <forge-timestamp datetime=\${testDate} format="HH:mm:ss"></forge-timestamp>
        </div>
        <div>
          <div>DateTime (MM/dd/yyyy HH:mm)</div>
          <forge-timestamp datetime=\${testDate} format="MM/dd/yyyy HH:mm"></forge-timestamp>
        </div>
      </div>
    \`;
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    const testDate = '2024-06-15';
    return html\`
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div>
          <div>English (en-US)</div>
          <forge-timestamp datetime=\${testDate} locale="en-US" format="dd MMMM yyyy"></forge-timestamp>
        </div>
        <div>
          <div>German (de-DE)</div>
          <forge-timestamp datetime=\${testDate} locale="de-DE" format="dd MMMM yyyy"></forge-timestamp>
        </div>
        <div>
          <div>French (fr-FR)</div>
          <forge-timestamp datetime=\${testDate} locale="fr-FR" format="dd MMMM yyyy"></forge-timestamp>
        </div>
        <div>
          <div>Spanish (es-ES)</div>
          <forge-timestamp datetime=\${testDate} locale="es-ES" format="dd MMMM yyyy"></forge-timestamp>
        </div>
        <div>
          <div>Japanese (ja-JP)</div>
          <forge-timestamp datetime=\${testDate} locale="ja-JP" format="yyyy年MMMM月dd日 (E)"></forge-timestamp>
        </div>
      </div>
    \`;
  }
}`,...m.parameters?.docs?.source}}};const f=["Demo","WithSeparators","Formats","Locales"],u=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,Formats:d,Locales:m,WithSeparators:a,__namedExportsOrder:f,default:v},Symbol.toStringTag,{value:"Module"}));export{t as D,u as T,a as W};
