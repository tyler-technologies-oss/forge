import{I as b,h as $,i as y,j as S,k as A}from"./icon-kuXwuZAY.js";import{E as n,x as t}from"./iframe-7ipV3BDo.js";import{o as h}from"./style-map-Ct8U4Hxk.js";import{e as c}from"./class-map-O7JS4q0S.js";import{g,G as _,a as u}from"./utils-Cqbxq2Mi.js";import"./service-adapter-CffG5Lhq.js";import"./avatar-DGobuvkt.js";import"./chip-set-D-b9Wjri.js";import"./focus-indicator-DjsWD5XE.js";import"./state-layer-gAgMwMHF.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__;b.define([$,y,S,A]);const f="forge-chip-set",m="forge-chip",I=d("forge-chip-select"),O=d("forge-chip-delete"),j=d("forge-chip-navigate"),C={title:"Components/Chips",render:e=>{const a=u(e),r=a?h(a):n;return t`
      <forge-chip-set
        .vertical=${e.vertical}
        .type=${e.type}
        .dense=${e.dense}
        .disabled=${e.disabled}
        .invalid=${e.invalid}
        .theme=${e.theme}
        style=${r}
        @forge-chip-select=${I}
        @forge-chip-delete=${O}>
        <forge-chip value="payments"> Payments ${e.withIcon?t`<forge-icon name="payment" slot=${e.iconSlot}></forge-icon>`:n} </forge-chip>
        <forge-chip value="bills"> Bills ${e.withIcon?t`<forge-icon name="payments" slot=${e.iconSlot}></forge-icon>`:n} </forge-chip>
        <forge-chip value="adjustments">
          Adjustments ${e.withIcon?t`<forge-icon name="adjust" slot=${e.iconSlot}></forge-icon>`:n}
        </forge-chip>
      </forge-chip-set>
    `},component:f,subcomponents:{Chip:m},argTypes:{...g({tagName:f,controls:{theme:{control:"select",options:_},type:{control:"select",options:["choice","filter","action","input","field"]}}}),...g({tagName:m,include:/^--forge-chip/}),withIcon:{control:"boolean"},iconSlot:{control:"select",options:["start","end"],if:{arg:"icon",eq:!0}}},args:{withIcon:!1,iconSlot:"end",vertical:!1,type:"action",dense:!1,disabled:!1,invalid:!1,theme:"primary"}},o={},s={parameters:{controls:{disable:!0}},render:()=>t`
    <forge-chip-set>
      <forge-chip value="payments" href="javascript: void(0);" @forge-chip-navigate=${j}>
        Anchor
        <forge-icon name="open_in_new" slot="end"></forge-icon>
      </forge-chip>
    </forge-chip-set>
  `},i={argTypes:{avatarSlot:{control:"select",options:["start","end"]},withIcon:{table:{disable:!0}}},args:{avatarSlot:"start"},render:e=>{const a=u(e),r=a?h(a):n;return t`
      <forge-chip-set
        .vertical=${e.vertical}
        .type=${e.type}
        .dense=${e.dense}
        .disabled=${e.disabled}
        .invalid=${e.invalid}
        .theme=${e.theme}
        style=${r}>
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
    `}},l={parameters:{controls:{include:/^--|dense|disabled|invalid|vertical/}},args:{disabled:!1,invalid:!1,dense:!1,vertical:!1},render:({disabled:e,invalid:a,dense:r,vertical:v})=>{const p={"forge-chip":!0,"forge-chip--invalid":a,"forge-chip--dense":r};return t`
      <div
        class=${c({"forge-chip-set":!0,"forge-chip-set--vertical":v})}>
        <button class=${c(p)} .disabled=${e}>Small</button>
        <button class=${c({...p,"forge-chip--selected":!0})} .disabled=${e}>Medium</button>
        <button class=${c(p)} .disabled=${e}>Large</button>
      </div>
    `}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const w=["Demo","Anchor","Avatar","CSSOnly"],x=Object.freeze(Object.defineProperty({__proto__:null,Anchor:s,Avatar:i,CSSOnly:l,Demo:o,__namedExportsOrder:w,default:C},Symbol.toStringTag,{value:"Module"}));export{s as A,x as C,o as D,i as a,l as b};
