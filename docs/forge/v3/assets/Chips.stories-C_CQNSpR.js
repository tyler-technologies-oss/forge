import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-BMUBXmXw.js";import{l as a,m as o,n as s,s as c}from"./utils-B_1gC6gM.js";import{t as l}from"./class-map-DEew1OiS.js";import{t as u}from"./class-map-8zp5OV2u.js";import{o as d,t as f}from"./icon-CNNuo8Sp.js";import{Ft as p,It as m,Lt as h,a as g,t as _}from"./tyler-icons-CLXzO0Q_.js";import{r as v,t as y}from"./style-map-C_WKUe4Y.js";import{n as b}from"./avatar-o_Yx0o6x.js";import{n as x,t as S}from"./chip-set-BVlKrwgk.js";var C=t({Anchor:()=>M,Avatar:()=>N,CSSOnly:()=>P,Demo:()=>j,__namedExportsOrder:()=>F,default:()=>A}),w,T,E,D,O,k,A,j,M,N,P,F;function I(){return(I=e((()=>{f(),_(),i(),y(),u(),o(),b(),x(),S(),{action:w}=__STORYBOOK_MODULE_ACTIONS__,d.define([p,m,h,g]),T=`forge-chip-set`,E=`forge-chip`,D=w(`forge-chip-select`),O=w(`forge-chip-delete`),k=w(`forge-chip-navigate`),A={title:`Components/Chips`,render:e=>{let t=a(e),i=t?v(t):r;return n`
      <forge-chip-set
        .vertical=${e.vertical}
        .type=${e.type}
        .dense=${e.dense}
        .disabled=${e.disabled}
        .invalid=${e.invalid}
        .theme=${e.theme}
        style=${i}
        @forge-chip-select=${D}
        @forge-chip-delete=${O}>
        <forge-chip value="payments"> Payments ${e.withIcon?n`<forge-icon name="payment" slot=${e.iconSlot}></forge-icon>`:r} </forge-chip>
        <forge-chip value="bills"> Bills ${e.withIcon?n`<forge-icon name="payments" slot=${e.iconSlot}></forge-icon>`:r} </forge-chip>
        <forge-chip value="adjustments">
          Adjustments ${e.withIcon?n`<forge-icon name="adjust" slot=${e.iconSlot}></forge-icon>`:r}
        </forge-chip>
      </forge-chip-set>
    `},component:T,subcomponents:{Chip:E},argTypes:{...c({tagName:T,controls:{theme:{control:`select`,options:s},type:{control:`select`,options:[`choice`,`filter`,`action`,`input`,`field`]}}}),...c({tagName:E,include:/^--forge-chip/}),withIcon:{control:`boolean`},iconSlot:{control:`select`,options:[`start`,`end`],if:{arg:`icon`,eq:!0}}},args:{withIcon:!1,iconSlot:`end`,vertical:!1,type:`action`,dense:!1,disabled:!1,invalid:!1,theme:`primary`}},j={},M={parameters:{controls:{disable:!0}},render:()=>n`
    <forge-chip-set>
      <forge-chip value="payments" href="javascript: void(0);" @forge-chip-navigate=${k}>
        Anchor
        <forge-icon name="open_in_new" slot="end"></forge-icon>
      </forge-chip>
    </forge-chip-set>
  `},N={argTypes:{avatarSlot:{control:`select`,options:[`start`,`end`]},withIcon:{table:{disable:!0}}},args:{avatarSlot:`start`},render:e=>{let t=a(e),i=t?v(t):r;return n`
      <forge-chip-set
        .vertical=${e.vertical}
        .type=${e.type}
        .dense=${e.dense}
        .disabled=${e.disabled}
        .invalid=${e.invalid}
        .theme=${e.theme}
        style=${i}>
        <forge-chip value="ruby">
          <forge-avatar slot=${e.avatarSlot} size="small" image-url="./ruby-side.jpg"></forge-avatar>
          Ruby
        </forge-chip>
        <forge-chip value="leo">
          <forge-avatar slot=${e.avatarSlot} size="small" image-url="./leo.png"></forge-avatar>
          Leo
        </forge-chip>
        <forge-chip value="harley">
          <forge-avatar slot=${e.avatarSlot} size="small" image-url="./harley.jpg"></forge-avatar>
          Harley
        </forge-chip>
      </forge-chip-set>
    `}},P={parameters:{controls:{include:/^--|dense|disabled|invalid|vertical/}},args:{disabled:!1,invalid:!1,dense:!1,vertical:!1},render:({disabled:e,invalid:t,dense:r,vertical:i})=>{let a={"forge-chip":!0,"forge-chip--invalid":t,"forge-chip--dense":r};return n`
      <div
        class=${l({"forge-chip-set":!0,"forge-chip-set--vertical":i})}>
        <button class=${l(a)} .disabled=${e}>Small</button>
        <button class=${l({...a,"forge-chip--selected":!0})} .disabled=${e}>Medium</button>
        <button class=${l(a)} .disabled=${e}>Large</button>
      </div>
    `}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => html\`
    <forge-chip-set>
      <forge-chip value="payments" href="javascript: void(0);" @forge-chip-navigate=\${navigateAction}>
        Anchor
        <forge-icon name="open_in_new" slot="end"></forge-icon>
      </forge-chip>
    </forge-chip-set>
  \`
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  argTypes: {
    avatarSlot: {
      control: 'select',
      options: ['start', 'end']
    },
    withIcon: {
      table: {
        disable: true
      }
    }
  },
  args: {
    avatarSlot: 'start'
  },
  render: args => {
    const cssVarArgs = getCssVariableArgs(args);
    const style = cssVarArgs ? styleMap(cssVarArgs) : nothing;
    return html\`
      <forge-chip-set
        .vertical=\${args.vertical}
        .type=\${args.type}
        .dense=\${args.dense}
        .disabled=\${args.disabled}
        .invalid=\${args.invalid}
        .theme=\${args.theme}
        style=\${style}>
        <forge-chip value="ruby">
          <forge-avatar slot=\${args.avatarSlot} size="small" image-url="./ruby-side.jpg"></forge-avatar>
          Ruby
        </forge-chip>
        <forge-chip value="leo">
          <forge-avatar slot=\${args.avatarSlot} size="small" image-url="./leo.png"></forge-avatar>
          Leo
        </forge-chip>
        <forge-chip value="harley">
          <forge-avatar slot=\${args.avatarSlot} size="small" image-url="./harley.jpg"></forge-avatar>
          Harley
        </forge-chip>
      </forge-chip-set>
    \`;
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: /^--|dense|disabled|invalid|vertical/
    }
  },
  args: {
    disabled: false,
    invalid: false,
    dense: false,
    vertical: false
  },
  render: ({
    disabled,
    invalid,
    dense,
    vertical
  }) => {
    const classes = {
      'forge-chip': true,
      'forge-chip--invalid': invalid,
      'forge-chip--dense': dense
    };
    return html\`
      <div
        class=\${classMap({
      'forge-chip-set': true,
      'forge-chip-set--vertical': vertical
    })}>
        <button class=\${classMap(classes)} .disabled=\${disabled}>Small</button>
        <button class=\${classMap({
      ...classes,
      'forge-chip--selected': true
    })} .disabled=\${disabled}>Medium</button>
        <button class=\${classMap(classes)} .disabled=\${disabled}>Large</button>
      </div>
    \`;
  }
}`,...P.parameters?.docs?.source}}},F=[`Demo`,`Anchor`,`Avatar`,`CSSOnly`]})))()}export{j as a,C as i,N as n,I as o,P as r,M as t};