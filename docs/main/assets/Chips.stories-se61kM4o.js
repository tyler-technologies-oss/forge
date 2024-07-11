import{a as c}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{I}from"./icon-DjINFoyU.js";import{b as j,c as _,d as w,e as C}from"./index-CIZ3m0iD.js";import{x as t,T as r}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{o as A}from"./style-map-D0ILlpbs.js";import{a as S,g as l,G as T}from"./utils-BeGdvWla.js";import"./constants-DjE6emXm.js";import"./avatar-9nkaewEO.js";import"./chip-set-DIrRrxj7.js";import"./focus-indicator-BPFZRBe9.js";import"./index-Dh0vMUMR.js";import"./state-layer-D8bHAvjj.js";I.define([j,_,w,C]);const p="forge-chip-set",g="forge-chip",z=c("forge-chip-select"),O=c("forge-chip-delete"),V=c("forge-chip-navigate"),P={title:"Components/Chips",render:e=>{const o=S(e),i=o?A(o):r;return t`
      <forge-chip-set
        .vertical=${e.vertical}
        .type=${e.type}
        .dense=${e.dense}
        .disabled=${e.disabled}
        .invalid=${e.invalid}
        .theme=${e.theme}
        style=${i}
        @forge-chip-select=${z}
        @forge-chip-delete=${O}>
        <forge-chip value="payments"> Payments ${e.withIcon?t`<forge-icon name="payment" slot=${e.iconSlot}></forge-icon>`:r} </forge-chip>
        <forge-chip value="bills"> Bills ${e.withIcon?t`<forge-icon name="payments" slot=${e.iconSlot}></forge-icon>`:r} </forge-chip>
        <forge-chip value="adjustments">
          Adjustments ${e.withIcon?t`<forge-icon name="adjust" slot=${e.iconSlot}></forge-icon>`:r}
        </forge-chip>
      </forge-chip-set>
    `},component:p,subcomponents:{Chip:g},argTypes:{...l({tagName:p,controls:{theme:{control:"select",options:T},type:{control:"select",options:["choice","filter","action","input","field"]}}}),...l({tagName:g,include:/^--forge-chip/}),withIcon:{control:"boolean"},iconSlot:{control:"select",options:["start","end"],if:{arg:"icon",eq:!0}}},args:{withIcon:!1,iconSlot:"end",vertical:!1,type:"action",dense:!1,disabled:!1,invalid:!1,theme:"primary"}},a={},n={parameters:{controls:{disable:!0}},render:()=>t`
    <forge-chip-set>
      <forge-chip value="payments" href="javascript: void(0);" @forge-chip-navigate=${V}>
        Anchor
        <forge-icon name="open_in_new" slot="end"></forge-icon>
      </forge-chip>
    </forge-chip-set>
  `},s={argTypes:{avatarSlot:{control:"select",options:["start","end"]},withIcon:{table:{disable:!0}}},args:{avatarSlot:"start"},render:e=>{const o=S(e),i=o?A(o):r;return t`
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
    `}};var f,m,h;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:"{}",...(h=(m=a.parameters)==null?void 0:m.docs)==null?void 0:h.source}}};var d,v,u;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(u=(v=n.parameters)==null?void 0:v.docs)==null?void 0:u.source}}};var y,$,b;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(b=($=s.parameters)==null?void 0:$.docs)==null?void 0:b.source}}};const E=["Demo","Anchor","Avatar"],K=Object.freeze(Object.defineProperty({__proto__:null,Anchor:n,Avatar:s,Demo:a,__namedExportsOrder:E,default:P},Symbol.toStringTag,{value:"Module"}));export{n as A,K as C,a as D,s as a};
