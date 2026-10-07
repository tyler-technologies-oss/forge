import{b as a}from"./iframe-Doaa3Kdk.js";import{l as f}from"./tyler-icons-NVf08gHb.js";import"./service-adapter-8tADcN_b.js";import{I as u}from"./icon-ozIZoPIz.js";import{g as t}from"./utils-C8_-3lrC.js";import"./breadcrumb-overflow-menu-D1b5zGow.js";const c="forge-breadcrumb",d={title:"Components/Breadcrumb",tags:["new"],render:()=>a`
    <forge-breadcrumb aria-label="Breadcrumb">
      <forge-breadcrumb-item href="#" home></forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Section</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Subsection</forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  `,component:c,subcomponents:{"Breadcrumb Item":"forge-breadcrumb-item","Breadcrumb Overflow Menu":"forge-breadcrumb-overflow-menu"},argTypes:{...t({tagName:"forge-breadcrumb-overflow-menu"}),...t({tagName:"forge-breadcrumb-item"}),...t({tagName:c})}},r={},e={render:()=>a`
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
  `},o={render:()=>(u.define(f),a`
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
    `)},m={render:()=>a`
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
  `},b={render:()=>a`
    <forge-breadcrumb aria-label="Breadcrumb" scroll-buttons style="max-width: 400px;">
      <forge-breadcrumb-item href="#" home></forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Section</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Subsection</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Category</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Subcategory</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Parent</forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  `};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}};const g=["Demo","OverflowMenu","WithIcons","WithoutLinks","ScrollButtons"],S=Object.freeze(Object.defineProperty({__proto__:null,Demo:r,OverflowMenu:e,ScrollButtons:b,WithIcons:o,WithoutLinks:m,__namedExportsOrder:g,default:d},Symbol.toStringTag,{value:"Module"}));export{S as B,r as D,e as O,b as S,o as W,m as a};
