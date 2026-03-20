import{b as c,A as m}from"./iframe-CxtGcj9H.js";import{s as l,g as u,b as d,c as p}from"./utils-BnVlj7nJ.js";import{o as g}from"./style-map-DFzst3aO.js";import"./service-adapter-8tADcN_b.js";import"./secret-saRTRJ6a.js";const a="forge-secret",f={title:"Components/Secret",render:o=>{const n=d(o),i=n?g(n):m,s=p(a,o);return s.textContent=o.text,i&&s.setAttribute("style",String(i)),s},component:a,parameters:{actions:{disable:!0}},argTypes:{...u({tagName:a,exclude:["name"],controls:{variant:{control:"select",options:["blur","dots"]},buttonPosition:{control:"select",options:["start","end"]}}}),text:{control:"text"}},args:{text:"Secret content here",open:!1,variant:"blur",mask:"",maskCharacter:"●",allow:"",block:!1,buttonPosition:"end",showOnHover:!1}},e={},t={...l,render:()=>c`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-secret name="secrets">Lorem ipsum</forge-secret>
      <forge-secret name="secrets">Dolor sit amet</forge-secret>
      <forge-secret name="secrets">consectetur adipiscing elit</forge-secret>
    </div>
  `},r={...l,render:()=>c`
    <forge-secret block>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </forge-secret>
  `};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <forge-secret name="secrets">Lorem ipsum</forge-secret>
      <forge-secret name="secrets">Dolor sit amet</forge-secret>
      <forge-secret name="secrets">consectetur adipiscing elit</forge-secret>
    </div>
  \`
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-secret block>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </forge-secret>
  \`
}`,...r.parameters?.docs?.source}}};const b=["Demo","NamedGroup","Block"],h=Object.freeze(Object.defineProperty({__proto__:null,Block:r,Demo:e,NamedGroup:t,__namedExportsOrder:b,default:f},Symbol.toStringTag,{value:"Module"}));export{r as B,e as D,t as N,h as S};
