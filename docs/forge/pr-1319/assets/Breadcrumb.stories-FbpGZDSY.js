import{b as o}from"./iframe-BgRf1TIz.js";import{g as b}from"./utils-C-EU7_QI.js";import"./service-adapter-8tADcN_b.js";import"./breadcrumb-overflow-menu-BPPisnZR.js";const a="forge-breadcrumb",t={title:"Components/Breadcrumb",tags:["new"],render:()=>o`
    <forge-breadcrumb aria-label="Breadcrumb">
      <forge-breadcrumb-item href="#">Home</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Section</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Subsection</forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  `,component:a,subcomponents:{"Breadcrumb Item":"forge-breadcrumb-item","Breadcrumb Overflow Menu":"forge-breadcrumb-overflow-menu"},argTypes:{...b({tagName:"forge-breadcrumb-overflow-menu"}),...b({tagName:"forge-breadcrumb-item"}),...b({tagName:a})}},e={},r={render:()=>o`
    <forge-breadcrumb aria-label="Breadcrumb">
      <forge-breadcrumb-item href="#">Home</forge-breadcrumb-item>
      <forge-breadcrumb-overflow-menu>
        <forge-breadcrumb-item href="#">Section</forge-breadcrumb-item>
        <forge-breadcrumb-item href="#">Subsection</forge-breadcrumb-item>
        <forge-breadcrumb-item href="#">Category</forge-breadcrumb-item>
      </forge-breadcrumb-overflow-menu>
      <forge-breadcrumb-item href="#">Parent</forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  `},m={render:()=>o`
    <forge-breadcrumb aria-label="Breadcrumb" density="small">
      <forge-breadcrumb-item href="#">Home</forge-breadcrumb-item>
      <forge-breadcrumb-overflow-menu>
        <forge-breadcrumb-item href="#">Section</forge-breadcrumb-item>
        <forge-breadcrumb-item href="#">Subsection</forge-breadcrumb-item>
      </forge-breadcrumb-overflow-menu>
      <forge-breadcrumb-item href="#">Parent</forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  `};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <forge-breadcrumb aria-label="Breadcrumb">
      <forge-breadcrumb-item href="#">Home</forge-breadcrumb-item>
      <forge-breadcrumb-overflow-menu>
        <forge-breadcrumb-item href="#">Section</forge-breadcrumb-item>
        <forge-breadcrumb-item href="#">Subsection</forge-breadcrumb-item>
        <forge-breadcrumb-item href="#">Category</forge-breadcrumb-item>
      </forge-breadcrumb-overflow-menu>
      <forge-breadcrumb-item href="#">Parent</forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  \`
}`,...r.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <forge-breadcrumb aria-label="Breadcrumb" density="small">
      <forge-breadcrumb-item href="#">Home</forge-breadcrumb-item>
      <forge-breadcrumb-overflow-menu>
        <forge-breadcrumb-item href="#">Section</forge-breadcrumb-item>
        <forge-breadcrumb-item href="#">Subsection</forge-breadcrumb-item>
      </forge-breadcrumb-overflow-menu>
      <forge-breadcrumb-item href="#">Parent</forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  \`
}`,...m.parameters?.docs?.source}}};const c=["Demo","OverflowMenu","Small"],n=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,OverflowMenu:r,Small:m,__namedExportsOrder:c,default:t},Symbol.toStringTag,{value:"Module"}));export{n as B,e as D,r as O};
