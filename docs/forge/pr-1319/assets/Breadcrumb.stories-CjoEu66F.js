import{b as e}from"./iframe-CfOLmNdo.js";import{l as f}from"./tyler-icons-Bg2kTxF-.js";import"./service-adapter-8tADcN_b.js";import{I as d}from"./icon-CBhfd-3H.js";import{g as c}from"./utils-BGdtyhdL.js";import"./breadcrumb-overflow-menu-COzkIx7k.js";const u="forge-breadcrumb",n={title:"Components/Breadcrumb",tags:["new"],render:()=>e`
    <forge-breadcrumb aria-label="Breadcrumb">
      <forge-breadcrumb-item href="#" home></forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Section</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Subsection</forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  `,component:u,subcomponents:{"Breadcrumb Item":"forge-breadcrumb-item","Breadcrumb Overflow Menu":"forge-breadcrumb-overflow-menu"},argTypes:{...c({tagName:"forge-breadcrumb-overflow-menu"}),...c({tagName:"forge-breadcrumb-item"}),...c({tagName:u})}},r={},o={render:()=>e`
    <forge-breadcrumb aria-label="Breadcrumb">
      <forge-breadcrumb-item href="#" home></forge-breadcrumb-item>
      <forge-breadcrumb-overflow-menu>
        <forge-breadcrumb-item href="#">Section</forge-breadcrumb-item>
        <forge-breadcrumb-item href="#">Subsection</forge-breadcrumb-item>
        <forge-breadcrumb-item href="#">Category</forge-breadcrumb-item>
      </forge-breadcrumb-overflow-menu>
      <forge-breadcrumb-item href="#">Parent</forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  `},m={render:()=>e`
    <forge-breadcrumb aria-label="Breadcrumb">
      <forge-breadcrumb-item href="#" home></forge-breadcrumb-item>
      <forge-breadcrumb-item>
        Section
        <forge-breadcrumb-item slot="children" href="#">Subsection one</forge-breadcrumb-item>
        <forge-breadcrumb-item slot="children" href="#">Subsection two</forge-breadcrumb-item>
        <forge-breadcrumb-item slot="children" href="#">Subsection three</forge-breadcrumb-item>
      </forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  `},b={render:()=>(d.define(f),e`
      <forge-breadcrumb aria-label="Breadcrumb">
        <forge-breadcrumb-item href="#" home></forge-breadcrumb-item>
        <forge-breadcrumb-overflow-menu>
          <forge-breadcrumb-item href="#"><forge-icon slot="start" name="folder"></forge-icon>Section</forge-breadcrumb-item>
          <forge-breadcrumb-item href="#"><forge-icon slot="start" name="folder"></forge-icon>Subsection</forge-breadcrumb-item>
          <forge-breadcrumb-item href="#"><forge-icon slot="start" name="folder"></forge-icon>Category</forge-breadcrumb-item>
        </forge-breadcrumb-overflow-menu>
        <forge-breadcrumb-item href="#"><forge-icon slot="start" name="folder"></forge-icon>Parent</forge-breadcrumb-item>
        <forge-breadcrumb-item current><forge-icon slot="start" name="folder"></forge-icon>Current page</forge-breadcrumb-item>
      </forge-breadcrumb>
    `)},a={render:()=>e`
    <forge-breadcrumb aria-label="Breadcrumb">
      <forge-breadcrumb-item home></forge-breadcrumb-item>
      <forge-breadcrumb-overflow-menu>
        <forge-breadcrumb-item>Section</forge-breadcrumb-item>
        <forge-breadcrumb-item>Subsection</forge-breadcrumb-item>
        <forge-breadcrumb-item>Category</forge-breadcrumb-item>
      </forge-breadcrumb-overflow-menu>
      <forge-breadcrumb-item>Parent</forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  `},t={render:()=>e`
    <forge-breadcrumb aria-label="Breadcrumb" scroll-buttons style="max-width: 400px;">
      <forge-breadcrumb-item href="#" home></forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Section</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Subsection</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Category</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Subcategory</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Parent</forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  `};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <forge-breadcrumb aria-label="Breadcrumb">
      <forge-breadcrumb-item href="#" home></forge-breadcrumb-item>
      <forge-breadcrumb-overflow-menu>
        <forge-breadcrumb-item href="#">Section</forge-breadcrumb-item>
        <forge-breadcrumb-item href="#">Subsection</forge-breadcrumb-item>
        <forge-breadcrumb-item href="#">Category</forge-breadcrumb-item>
      </forge-breadcrumb-overflow-menu>
      <forge-breadcrumb-item href="#">Parent</forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  \`
}`,...o.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <forge-breadcrumb aria-label="Breadcrumb">
      <forge-breadcrumb-item href="#" home></forge-breadcrumb-item>
      <forge-breadcrumb-item>
        Section
        <forge-breadcrumb-item slot="children" href="#">Subsection one</forge-breadcrumb-item>
        <forge-breadcrumb-item slot="children" href="#">Subsection two</forge-breadcrumb-item>
        <forge-breadcrumb-item slot="children" href="#">Subsection three</forge-breadcrumb-item>
      </forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  \`
}`,...m.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    IconRegistry.define(tylIconFolder);
    return html\`
      <forge-breadcrumb aria-label="Breadcrumb">
        <forge-breadcrumb-item href="#" home></forge-breadcrumb-item>
        <forge-breadcrumb-overflow-menu>
          <forge-breadcrumb-item href="#"><forge-icon slot="start" name="folder"></forge-icon>Section</forge-breadcrumb-item>
          <forge-breadcrumb-item href="#"><forge-icon slot="start" name="folder"></forge-icon>Subsection</forge-breadcrumb-item>
          <forge-breadcrumb-item href="#"><forge-icon slot="start" name="folder"></forge-icon>Category</forge-breadcrumb-item>
        </forge-breadcrumb-overflow-menu>
        <forge-breadcrumb-item href="#"><forge-icon slot="start" name="folder"></forge-icon>Parent</forge-breadcrumb-item>
        <forge-breadcrumb-item current><forge-icon slot="start" name="folder"></forge-icon>Current page</forge-breadcrumb-item>
      </forge-breadcrumb>
    \`;
  }
}`,...b.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <forge-breadcrumb aria-label="Breadcrumb">
      <forge-breadcrumb-item home></forge-breadcrumb-item>
      <forge-breadcrumb-overflow-menu>
        <forge-breadcrumb-item>Section</forge-breadcrumb-item>
        <forge-breadcrumb-item>Subsection</forge-breadcrumb-item>
        <forge-breadcrumb-item>Category</forge-breadcrumb-item>
      </forge-breadcrumb-overflow-menu>
      <forge-breadcrumb-item>Parent</forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  \`
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <forge-breadcrumb aria-label="Breadcrumb" scroll-buttons style="max-width: 400px;">
      <forge-breadcrumb-item href="#" home></forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Section</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Subsection</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Category</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Subcategory</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Parent</forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  \`
}`,...t.parameters?.docs?.source}}};const i=["Demo","OverflowMenu","ChildItems","WithIcons","WithoutLinks","ScrollButtons"],C=Object.freeze(Object.defineProperty({__proto__:null,ChildItems:m,Demo:r,OverflowMenu:o,ScrollButtons:t,WithIcons:b,WithoutLinks:a,__namedExportsOrder:i,default:n},Symbol.toStringTag,{value:"Module"}));export{C as B,m as C,r as D,o as O,t as S,b as W,a};
