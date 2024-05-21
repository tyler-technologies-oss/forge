import{x as i}from"./lit-element-CiOxWxgJ.js";import{c as h,t as $,s as T}from"./utils-DeKcpcPg.js";import{I as x,t as k}from"./base-button-adapter-DdgENYzW.js";import"./button-CMSB5wYV.js";const s="forge-button",I={title:"Components/Button",render:t=>{const a=h(s,t);return a.innerHTML=t.text,a},component:s,parameters:{controls:{exclude:/^(start|end|click|root|focus-indicator|state-layer)$/i}},argTypes:{...$(s),text:{control:"text"}},args:{text:"Button"}},n={},r={...T,render:()=>i`
      <forge-button>Text</forge-button>
      <forge-button variant="outlined">Outlined</forge-button>
      <forge-button variant="filled">Filled</forge-button>
      <forge-button variant="raised">Raised</forge-button>
      <forge-button variant="link">Link</forge-button>
    `},e={parameters:{controls:{include:["variant"]}},argTypes:{variant:{options:["text","outlined","filled","raised","link"],control:{type:"select"}}},args:{variant:"raised"},render:({variant:t})=>i`
      <forge-button variant=${t}>Primary</forge-button>
      <forge-button variant=${t} theme="secondary">Secondary</forge-button>
      <forge-button variant=${t} theme="tertiary">Tertiary</forge-button>
      <forge-button variant=${t} theme="success">Success</forge-button>
      <forge-button variant=${t} theme="warning">Warning</forge-button>
      <forge-button variant=${t} theme="error">Error</forge-button>
      <forge-button variant=${t} theme="info">Info</forge-button>
    `},o={parameters:{controls:{include:["variant","iconSlot"]}},argTypes:{variant:{options:["text","outlined","filled","raised","link"],control:{type:"select"}},iconSlot:{options:["start","end"],control:{type:"select"}}},args:{variant:"raised",iconSlot:"start"},render:({variant:t,iconSlot:a})=>(x.define(k),i`
      <forge-button variant=${t}>
        <forge-icon slot=${a} name="person"></forge-icon>
        My Account
      </forge-button>
    `)};var u,c,l;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:"{}",...(l=(c=n.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var g,f,d;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
      <forge-button>Text</forge-button>
      <forge-button variant="outlined">Outlined</forge-button>
      <forge-button variant="filled">Filled</forge-button>
      <forge-button variant="raised">Raised</forge-button>
      <forge-button variant="link">Link</forge-button>
    \`;
  }
}`,...(d=(f=r.parameters)==null?void 0:f.docs)==null?void 0:d.source}}};var m,b,p;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant']
    }
  },
  argTypes: {
    variant: {
      options: ['text', 'outlined', 'filled', 'raised', 'link'],
      control: {
        type: 'select'
      }
    }
  },
  args: {
    variant: 'raised'
  },
  render: ({
    variant
  }) => {
    return html\`
      <forge-button variant=\${variant}>Primary</forge-button>
      <forge-button variant=\${variant} theme="secondary">Secondary</forge-button>
      <forge-button variant=\${variant} theme="tertiary">Tertiary</forge-button>
      <forge-button variant=\${variant} theme="success">Success</forge-button>
      <forge-button variant=\${variant} theme="warning">Warning</forge-button>
      <forge-button variant=\${variant} theme="error">Error</forge-button>
      <forge-button variant=\${variant} theme="info">Info</forge-button>
    \`;
  }
}`,...(p=(b=e.parameters)==null?void 0:b.docs)==null?void 0:p.source}}};var v,y,S;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant', 'iconSlot']
    }
  },
  argTypes: {
    variant: {
      options: ['text', 'outlined', 'filled', 'raised', 'link'],
      control: {
        type: 'select'
      }
    },
    iconSlot: {
      options: ['start', 'end'],
      control: {
        type: 'select'
      }
    }
  },
  args: {
    variant: 'raised',
    iconSlot: 'start'
  },
  render: ({
    variant,
    iconSlot
  }) => {
    IconRegistry.define(tylIconPerson);
    return html\`
      <forge-button variant=\${variant}>
        <forge-icon slot=\${iconSlot} name="person"></forge-icon>
        My Account
      </forge-button>
    \`;
  }
}`,...(S=(y=o.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};const P=["Demo","Variants","Themed","WithIcon"],B=Object.freeze(Object.defineProperty({__proto__:null,Demo:n,Themed:e,Variants:r,WithIcon:o,__namedExportsOrder:P,default:I},Symbol.toStringTag,{value:"Module"}));export{B,n as D,e as T,r as V,o as W};
