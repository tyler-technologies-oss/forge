import{x as i}from"./lit-element-Dm2J4qPi.js";import{c as S,g as $,s as x,I as T,G as I}from"./base-button-adapter-u6BHygc4.js";import"./button-CkKj6ZIA.js";var _={name:"forge_logo",data:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20.9 3.2h-7.5c-.4 0-.7.2-.9.5l-1.6 2.9c-.3.5-.1 1.2.4 1.5.2.1.4.1.5.1h7.5c.4 0 .7-.2.9-.5l1.6-2.9c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.1-.5-.1zm-3.6 6.2H9.8c-.4 0-.8.2-1 .6l-1.6 2.7c-.2.3-.2.8 0 1.1l3.8 6.5c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l5.3-9.2c.3-.5.1-1.2-.4-1.5-.1-.1-.3-.2-.5-.2zm-6.9-4.6c.3-.5.1-1.2-.4-1.5-.2-.1-.4-.1-.6-.1H3c-.6 0-1.1.5-1.1 1.1 0 .2.1.4.1.5l2.7 4.6.5.9c.3.5 1 .7 1.5.4.2-.1.3-.2.4-.4l3.3-5.5z"/></svg>'};const s="forge-button",B={title:"Components/Button",render:t=>{const a=S(s,t);return a.textContent=t.text,a},component:s,argTypes:{...$({tagName:s,exclude:["form","name","value"],controls:{variant:{control:{type:"select"},options:["text","outlined","filled","raised","link"]},theme:{control:{type:"select"},options:I}}}),text:{control:"text"}},args:{text:"Button",variant:"text",pill:!1,theme:"primary",type:"button",disabled:!1,popoverIcon:!1,dense:!1,fullWidth:!1}},e={},n={...x,render:()=>i`
      <forge-button>Text</forge-button>
      <forge-button variant="outlined">Outlined</forge-button>
      <forge-button variant="filled">Filled</forge-button>
      <forge-button variant="raised">Raised</forge-button>
      <forge-button variant="link">Link</forge-button>
    `},r={parameters:{controls:{include:["variant"]}},args:{variant:"raised"},render:({variant:t})=>i`
      <forge-button variant=${t}>Primary</forge-button>
      <forge-button variant=${t} theme="secondary">Secondary</forge-button>
      <forge-button variant=${t} theme="tertiary">Tertiary</forge-button>
      <forge-button variant=${t} theme="success">Success</forge-button>
      <forge-button variant=${t} theme="warning">Warning</forge-button>
      <forge-button variant=${t} theme="error">Error</forge-button>
      <forge-button variant=${t} theme="info">Info</forge-button>
    `},o={parameters:{controls:{include:["variant","iconSlot"]}},argTypes:{iconSlot:{options:["start","end"],control:{type:"select"}}},args:{variant:"raised",iconSlot:"start"},render:({variant:t,iconSlot:a})=>(T.define(_),i`
      <forge-button variant=${t}>
        <forge-icon slot=${a} name="forge_logo"></forge-icon>
        Button
      </forge-button>
    `)};var u,c,g;e.parameters={...e.parameters,docs:{...(u=e.parameters)==null?void 0:u.docs,source:{originalSource:"{}",...(g=(c=e.parameters)==null?void 0:c.docs)==null?void 0:g.source}}};var l,f,m;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
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
}`,...(m=(f=n.parameters)==null?void 0:f.docs)==null?void 0:m.source}}};var d,b,p;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant']
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
}`,...(p=(b=r.parameters)==null?void 0:b.docs)==null?void 0:p.source}}};var v,y,h;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  parameters: {
    controls: {
      include: ['variant', 'iconSlot']
    }
  },
  argTypes: {
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
    IconRegistry.define(tylIconForgeLogo);
    return html\`
      <forge-button variant=\${variant}>
        <forge-icon slot=\${iconSlot} name="forge_logo"></forge-icon>
        Button
      </forge-button>
    \`;
  }
}`,...(h=(y=o.parameters)==null?void 0:y.docs)==null?void 0:h.source}}};const O=["Demo","Variants","Themed","WithIcon"],P=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,Themed:r,Variants:n,WithIcon:o,__namedExportsOrder:O,default:B},Symbol.toStringTag,{value:"Module"}));export{P as B,e as D,r as T,n as V,o as W};
