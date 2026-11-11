import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{g as r}from"./iframe-ClwUS-ZX.js";import{_ as i,m as a}from"./utils-DIETEFPp.js";import{t as o}from"./time-picker-BZv82NG8.js";import{t as s}from"./text-field-I5DE23hd.js";import{n as c,r as l,t as u}from"./autocomplete-DrzJiGaT.js";import{t as d}from"./date-picker-DLfW_DXM.js";import{t as f}from"./date-range-picker-TwLiIUoC.js";import{t as p}from"./select-DZq5elHx.js";import{t as m}from"./stack-BY8huyf2.js";var h=t({Fields:()=>b,Pickers:()=>C,States:()=>S,Variants:()=>x,__namedExportsOrder:()=>w,default:()=>y}),g,_,v,y,b,x,S,C,w;function T(){return(T=e((()=>{r(),a(),u(),c(),l(),d(),f(),p(),m(),s(),o(),g=[`Summarize`,`Translate`,`Rewrite`,`Explain`].map(e=>({label:e,value:e})),_=[`outlined`,`tonal`,`filled`,`raised`,`plain`],v=e=>g.filter(({label:t})=>t.toLowerCase().includes((e??``).toLowerCase())),y={title:`Getting Started/AI Styles Examples`,tags:[`hidden`]},b={...i,render:()=>n`
    <forge-stack gap="24" style="max-width: 400px">
      <forge-text-field class="forge-ai">
        <label slot="label" for="ai-text-field">Prompt</label>
        <input type="text" id="ai-text-field" value="Summarize this document" />
        <span slot="support-text">Describe what you want to generate</span>
      </forge-text-field>

      <forge-text-field class="forge-ai">
        <label slot="label" for="ai-textarea">Notes</label>
        <textarea id="ai-textarea">Keep it short and friendly.</textarea>
      </forge-text-field>

      <forge-select class="forge-ai" label="Tone" value="friendly">
        <forge-option value="friendly">Friendly</forge-option>
        <forge-option value="formal">Formal</forge-option>
        <forge-option value="concise">Concise</forge-option>
      </forge-select>

      <forge-chip-field class="forge-ai">
        <label slot="label" for="ai-chip-field">Topics</label>
        <input type="text" id="ai-chip-field" />
        <forge-chip slot="member" type="field">Reports</forge-chip>
        <forge-chip slot="member" type="field">Budgets</forge-chip>
      </forge-chip-field>
    </forge-stack>
  `},x={...i,render:()=>n`
    <forge-stack gap="24" style="max-width: 400px">
      ${_.map(e=>n`
          <forge-text-field class="forge-ai" variant=${e}>
            <label slot="label" for=${`ai-variant-${e}`}>${e[0].toUpperCase()}${e.slice(1)}</label>
            <input type="text" id=${`ai-variant-${e}`} />
          </forge-text-field>
        `)}
    </forge-stack>
  `},S={...i,render:()=>n`
    <forge-stack gap="24" style="max-width: 400px">
      <forge-text-field class="forge-ai" invalid>
        <label slot="label" for="ai-invalid">Invalid</label>
        <input type="text" id="ai-invalid" />
        <span slot="support-text">Invalid fields keep their error styling</span>
      </forge-text-field>

      <forge-text-field class="forge-ai" disabled>
        <label slot="label" for="ai-disabled">Disabled</label>
        <input type="text" id="ai-disabled" disabled />
      </forge-text-field>
    </forge-stack>
  `},C={...i,render:()=>n`
    <forge-stack gap="24" style="max-width: 400px">
      <forge-autocomplete class="forge-ai" .filter=${v}>
        <forge-text-field popover-icon>
          <label for="ai-autocomplete">Suggested action</label>
          <input type="text" id="ai-autocomplete" />
        </forge-text-field>
      </forge-autocomplete>

      <forge-date-picker class="forge-ai">
        <forge-text-field>
          <label for="ai-date-picker">Date</label>
          <input type="text" id="ai-date-picker" autocomplete="off" />
        </forge-text-field>
      </forge-date-picker>

      <forge-date-range-picker class="forge-ai">
        <forge-text-field>
          <label for="ai-date-range-start">Date range</label>
          <input type="text" id="ai-date-range-start" autocomplete="off" />
          <input type="text" id="ai-date-range-end" autocomplete="off" />
        </forge-text-field>
      </forge-date-range-picker>

      <forge-time-picker class="forge-ai">
        <forge-text-field>
          <label for="ai-time-picker">Time</label>
          <input type="text" id="ai-time-picker" autocomplete="off" />
        </forge-text-field>
      </forge-time-picker>
    </forge-stack>
  `},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-stack gap="24" style="max-width: 400px">
      <forge-text-field class="forge-ai">
        <label slot="label" for="ai-text-field">Prompt</label>
        <input type="text" id="ai-text-field" value="Summarize this document" />
        <span slot="support-text">Describe what you want to generate</span>
      </forge-text-field>

      <forge-text-field class="forge-ai">
        <label slot="label" for="ai-textarea">Notes</label>
        <textarea id="ai-textarea">Keep it short and friendly.</textarea>
      </forge-text-field>

      <forge-select class="forge-ai" label="Tone" value="friendly">
        <forge-option value="friendly">Friendly</forge-option>
        <forge-option value="formal">Formal</forge-option>
        <forge-option value="concise">Concise</forge-option>
      </forge-select>

      <forge-chip-field class="forge-ai">
        <label slot="label" for="ai-chip-field">Topics</label>
        <input type="text" id="ai-chip-field" />
        <forge-chip slot="member" type="field">Reports</forge-chip>
        <forge-chip slot="member" type="field">Budgets</forge-chip>
      </forge-chip-field>
    </forge-stack>
  \`
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:'{\n  ...standaloneStoryParams,\n  render: () => html`\n    <forge-stack gap="24" style="max-width: 400px">\n      ${VARIANTS.map(variant => html`\n          <forge-text-field class="forge-ai" variant=${variant}>\n            <label slot="label" for=${`ai-variant-${variant}`}>${variant[0].toUpperCase()}${variant.slice(1)}</label>\n            <input type="text" id=${`ai-variant-${variant}`} />\n          </forge-text-field>\n        `)}\n    </forge-stack>\n  `\n}',...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-stack gap="24" style="max-width: 400px">
      <forge-text-field class="forge-ai" invalid>
        <label slot="label" for="ai-invalid">Invalid</label>
        <input type="text" id="ai-invalid" />
        <span slot="support-text">Invalid fields keep their error styling</span>
      </forge-text-field>

      <forge-text-field class="forge-ai" disabled>
        <label slot="label" for="ai-disabled">Disabled</label>
        <input type="text" id="ai-disabled" disabled />
      </forge-text-field>
    </forge-stack>
  \`
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-stack gap="24" style="max-width: 400px">
      <forge-autocomplete class="forge-ai" .filter=\${filterSuggestions}>
        <forge-text-field popover-icon>
          <label for="ai-autocomplete">Suggested action</label>
          <input type="text" id="ai-autocomplete" />
        </forge-text-field>
      </forge-autocomplete>

      <forge-date-picker class="forge-ai">
        <forge-text-field>
          <label for="ai-date-picker">Date</label>
          <input type="text" id="ai-date-picker" autocomplete="off" />
        </forge-text-field>
      </forge-date-picker>

      <forge-date-range-picker class="forge-ai">
        <forge-text-field>
          <label for="ai-date-range-start">Date range</label>
          <input type="text" id="ai-date-range-start" autocomplete="off" />
          <input type="text" id="ai-date-range-end" autocomplete="off" />
        </forge-text-field>
      </forge-date-range-picker>

      <forge-time-picker class="forge-ai">
        <forge-text-field>
          <label for="ai-time-picker">Time</label>
          <input type="text" id="ai-time-picker" autocomplete="off" />
        </forge-text-field>
      </forge-time-picker>
    </forge-stack>
  \`
}`,...C.parameters?.docs?.source}}},w=[`Fields`,`Variants`,`States`,`Pickers`]})))()}export{x as a,S as i,b as n,T as o,C as r,h as t};