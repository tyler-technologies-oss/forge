import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-B8S20_VI.js";import{_ as i,a,m as o,s}from"./utils-BifgMLEM.js";import{n as c,t as l}from"./timestamp-CMEs3DTV.js";var u=t({Demo:()=>p,Formats:()=>h,Locales:()=>g,WithSeparators:()=>m,__namedExportsOrder:()=>_,default:()=>f}),d,f,p,m,h,g,_;function v(){return(v=e((()=>{l(),c(),r(),o(),d=`forge-timestamp`,f={title:`Components/Timestamp`,tags:[`new`],render:e=>{let t=document.createElement(`forge-timestamp`);a(t,e);let n=new Date;return t.setAttribute(`datetime`,`${n.getFullYear()}-${n.getMonth()+1}-${n.getDate()}`),t},component:d,argTypes:{...s({tagName:d})},args:{}},p={},m={...i,render:()=>n`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div>Start separator <forge-timestamp datetime="2024-06-15T14:30:45" separator="start"></forge-timestamp></div>
      <div><forge-timestamp datetime="2024-06-15T14:30:45" separator="end"></forge-timestamp> End separator</div>
      <div>No separator <forge-timestamp datetime="2024-06-15T14:30:45" separator="none"></forge-timestamp></div>
    </div>
  `},h={...i,render:()=>{let e=`2024-06-15T14:30:45`;return n`
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
    `}},g={...i,render:()=>{let e=`2024-06-15`;return n`
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
    `}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 8px;">
      <div>Start separator <forge-timestamp datetime="2024-06-15T14:30:45" separator="start"></forge-timestamp></div>
      <div><forge-timestamp datetime="2024-06-15T14:30:45" separator="end"></forge-timestamp> End separator</div>
      <div>No separator <forge-timestamp datetime="2024-06-15T14:30:45" separator="none"></forge-timestamp></div>
    </div>
  \`
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}},_=[`Demo`,`WithSeparators`,`Formats`,`Locales`]})))()}export{v as i,u as n,m as r,p as t};