import{x as r}from"./iframe-DI7yp4Es.js";import{g as n,c as a,s as p}from"./utils-BwTYAoRH.js";import"./service-adapter-CffG5Lhq.js";import"./app-bar-profile-button-BubECH2l.js";import"./state-layer-gAgMwMHF.js";import"./focus-indicator-BC5BEuUe.js";import"./icon-kuXwuZAY.js";import"./index-5CPwzmQS.js";import"./menu-BrAFj9Y3.js";import"./linear-progress-r0Hzg69v.js";import"./list-u_j869sm.js";import"./popover-BWVazmya.js";import"./overlay-B5pGv-rV.js";import"./skeleton-BSiuL_ME.js";import"./avatar-vOhLs7eF.js";import"./icon-button-CQgGxtJo.js";import"./expansion-panel-CtPm9dI4.js";import"./divider-NNdF1g4c.js";const e="forge-app-bar-menu-button",m=[{label:"Menu",value:"help"}],s={title:"Components/App Bar/Menu Button",render:o=>a(e,o),component:e,parameters:{actions:{disable:!0}},argTypes:{...n({tagName:e,exclude:["options","icon"]})},args:{}},t={...p,render:()=>r`
      <forge-app-bar title-text="Menu Button">
        <forge-app-bar-menu-button slot="start" .options=${m}> </forge-app-bar-menu-button>
      </forge-app-bar>
    `};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
      <forge-app-bar title-text="Menu Button">
        <forge-app-bar-menu-button slot="start" .options=\${options}> </forge-app-bar-menu-button>
      </forge-app-bar>
    \`;
  }
}`,...t.parameters?.docs?.source}}};const i=["Demo"],h=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,__namedExportsOrder:i,default:s},Symbol.toStringTag,{value:"Module"}));export{t as D,h as M};
