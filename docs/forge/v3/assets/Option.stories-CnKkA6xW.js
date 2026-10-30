import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{g as i}from"./iframe-B8S20_VI.js";import{_ as a,l as o,m as s,s as c}from"./utils-BifgMLEM.js";import{o as l,t as u}from"./icon-BDzt98o-.js";import{Jt as d,mt as f,t as p,zt as m}from"./tyler-icons-CLXzO0Q_.js";import{r as h,t as g}from"./style-map-C_WKUe4Y.js";import{n as _,t as v}from"./option-CR9wS0U0.js";var y=t({Demo:()=>S,Groups:()=>E,ThreeLine:()=>T,TwoLine:()=>w,WithIcons:()=>C,__namedExportsOrder:()=>D,default:()=>x}),b,x,S,C,w,T,E,D;function O(){return(O=e((()=>{i(),u(),p(),s(),g(),_(),v(),l.define([f,d,m]),b=`forge-option`,x={title:`Components/Option`,render:e=>{let t=o(e),i=t?h(t):r;return n`
      <forge-listbox style=${i}>
        <forge-option value="1" ?disabled=${e.disabled} ?two-line=${e.twoLine} ?three-line=${e.threeLine}>
          Option 1 ${e.twoLine||e.threeLine?n`<span slot="secondary">Secondary text</span>`:r}
          ${e.threeLine?n`<span slot="tertiary">Tertiary text</span>`:r}
        </forge-option>
        <forge-option value="2" ?disabled=${e.disabled} ?two-line=${e.twoLine} ?three-line=${e.threeLine}>
          Option 2 ${e.twoLine||e.threeLine?n`<span slot="secondary">Secondary text</span>`:r}
          ${e.threeLine?n`<span slot="tertiary">Tertiary text</span>`:r}
        </forge-option>
        <forge-option value="3" ?disabled=${e.disabled} ?two-line=${e.twoLine} ?three-line=${e.threeLine}>
          Option 3 ${e.twoLine||e.threeLine?n`<span slot="secondary">Secondary text</span>`:r}
          ${e.threeLine?n`<span slot="tertiary">Tertiary text</span>`:r}
        </forge-option>
      </forge-listbox>
    `},component:b,subcomponents:{"Forge Option Group":`forge-option-group`},argTypes:{...c({tagName:b,exclude:[`value`,`label`,`secondaryLabel`,`optionClass`]})},args:{disabled:!1,twoLine:!1,threeLine:!1}},S={},C={...a,render:()=>n`
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
  `},w={...a,render:()=>n`
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
  `},T={...a,render:()=>n`
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
  `},E={...a,render:()=>n`
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
  `},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
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
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}},D=[`Demo`,`WithIcons`,`TwoLine`,`ThreeLine`,`Groups`]})))()}export{w as a,T as i,E as n,C as o,y as r,O as s,S as t};