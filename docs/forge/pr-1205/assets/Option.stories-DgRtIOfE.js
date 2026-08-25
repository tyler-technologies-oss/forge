import{b as e,A as n}from"./iframe-BblV6lM6.js";import"./service-adapter-8tADcN_b.js";import{I as c,u as d,d as u,e as m}from"./tyler-icons-DRA6bGfg.js";import{s as p,g as y,b}from"./utils-BUKDVvEj.js";import{o as v}from"./style-map-BXri1jdm.js";import"./option-group-L79y3Jcb.js";c.define([d,u,m]);const f="forge-option",x="forge-option-group",h={title:"Components/Option",render:o=>{const l=b(o),g=l?v(l):n;return e`
      <forge-listbox style=${g}>
        <forge-option value="1" ?disabled=${o.disabled} ?two-line=${o.twoLine} ?three-line=${o.threeLine}>
          Option 1 ${o.twoLine||o.threeLine?e`<span slot="secondary">Secondary text</span>`:n}
          ${o.threeLine?e`<span slot="tertiary">Tertiary text</span>`:n}
        </forge-option>
        <forge-option value="2" ?disabled=${o.disabled} ?two-line=${o.twoLine} ?three-line=${o.threeLine}>
          Option 2 ${o.twoLine||o.threeLine?e`<span slot="secondary">Secondary text</span>`:n}
          ${o.threeLine?e`<span slot="tertiary">Tertiary text</span>`:n}
        </forge-option>
        <forge-option value="3" ?disabled=${o.disabled} ?two-line=${o.twoLine} ?three-line=${o.threeLine}>
          Option 3 ${o.twoLine||o.threeLine?e`<span slot="secondary">Secondary text</span>`:n}
          ${o.threeLine?e`<span slot="tertiary">Tertiary text</span>`:n}
        </forge-option>
      </forge-listbox>
    `},component:f,subcomponents:{"Forge Option Group":x},argTypes:{...y({tagName:f,exclude:["value","label","secondaryLabel","optionClass"]})},args:{disabled:!1,twoLine:!1,threeLine:!1}},t={},r={...p,render:()=>e`
    <forge-listbox>
      <forge-option value="home">
        <forge-icon name="home" slot="start"></forge-icon>
        Home
      </forge-option>
      <forge-option value="settings">
        <forge-icon name="settings" slot="start"></forge-icon>
        Settings
      </forge-option>
      <forge-option value="profile">
        <forge-icon name="person" slot="start"></forge-icon>
        Profile
      </forge-option>
    </forge-listbox>
  `},a={...p,render:()=>e`
    <forge-listbox>
      <forge-option value="1" two-line>
        <span>Option 1</span>
        <span slot="secondary">Secondary text for option 1</span>
      </forge-option>
      <forge-option value="2" two-line>
        <span>Option 2</span>
        <span slot="secondary">Secondary text for option 2</span>
      </forge-option>
      <forge-option value="3" two-line>
        <span>Option 3</span>
        <span slot="secondary">Secondary text for option 3</span>
      </forge-option>
    </forge-listbox>
  `},s={...p,render:()=>e`
    <forge-listbox>
      <forge-option value="1" three-line>
        <span>Option 1</span>
        <span slot="secondary">Secondary text for option 1</span>
        <span slot="tertiary">Tertiary text for option 1</span>
      </forge-option>
      <forge-option value="2" three-line>
        <span>Option 2</span>
        <span slot="secondary">Secondary text for option 2</span>
        <span slot="tertiary">Tertiary text for option 2</span>
      </forge-option>
    </forge-listbox>
  `},i={...p,render:()=>e`
    <forge-listbox>
      <forge-option-group>
        <div slot="label">Fruits</div>
        <forge-option value="apple">Apple</forge-option>
        <forge-option value="banana">Banana</forge-option>
        <forge-option value="orange">Orange</forge-option>
      </forge-option-group>
      <forge-option-group>
        <div slot="label">Vegetables</div>
        <forge-option value="carrot">Carrot</forge-option>
        <forge-option value="lettuce">Lettuce</forge-option>
        <forge-option value="tomato">Tomato</forge-option>
      </forge-option-group>
    </forge-listbox>
  `};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-listbox>
      <forge-option value="home">
        <forge-icon name="home" slot="start"></forge-icon>
        Home
      </forge-option>
      <forge-option value="settings">
        <forge-icon name="settings" slot="start"></forge-icon>
        Settings
      </forge-option>
      <forge-option value="profile">
        <forge-icon name="person" slot="start"></forge-icon>
        Profile
      </forge-option>
    </forge-listbox>
  \`
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-listbox>
      <forge-option value="1" two-line>
        <span>Option 1</span>
        <span slot="secondary">Secondary text for option 1</span>
      </forge-option>
      <forge-option value="2" two-line>
        <span>Option 2</span>
        <span slot="secondary">Secondary text for option 2</span>
      </forge-option>
      <forge-option value="3" two-line>
        <span>Option 3</span>
        <span slot="secondary">Secondary text for option 3</span>
      </forge-option>
    </forge-listbox>
  \`
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-listbox>
      <forge-option value="1" three-line>
        <span>Option 1</span>
        <span slot="secondary">Secondary text for option 1</span>
        <span slot="tertiary">Tertiary text for option 1</span>
      </forge-option>
      <forge-option value="2" three-line>
        <span>Option 2</span>
        <span slot="secondary">Secondary text for option 2</span>
        <span slot="tertiary">Tertiary text for option 2</span>
      </forge-option>
    </forge-listbox>
  \`
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-listbox>
      <forge-option-group>
        <div slot="label">Fruits</div>
        <forge-option value="apple">Apple</forge-option>
        <forge-option value="banana">Banana</forge-option>
        <forge-option value="orange">Orange</forge-option>
      </forge-option-group>
      <forge-option-group>
        <div slot="label">Vegetables</div>
        <forge-option value="carrot">Carrot</forge-option>
        <forge-option value="lettuce">Lettuce</forge-option>
        <forge-option value="tomato">Tomato</forge-option>
      </forge-option-group>
    </forge-listbox>
  \`
}`,...i.parameters?.docs?.source}}};const S=["Demo","WithIcons","TwoLine","ThreeLine","Groups"],C=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,Groups:i,ThreeLine:s,TwoLine:a,WithIcons:r,__namedExportsOrder:S,default:h},Symbol.toStringTag,{value:"Module"}));export{t as D,i as G,C as O,a as T,r as W,s as a};
