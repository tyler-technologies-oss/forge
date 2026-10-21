import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n}from"./lit-html-SpIZ5SkX.js";import{p as r}from"./iframe-CebKObJP.js";import{m as i,s as a}from"./utils-C3ow8Ikc.js";import{o,t as s}from"./icon-DTQwimRS.js";import{Z as c,t as l}from"./tyler-icons-CLXzO0Q_.js";import{t as u}from"./breadcrumb-CHFb1Ey3.js";var d=t({ChildItems:()=>g,Demo:()=>m,OverflowMenu:()=>h,ScrollButtons:()=>y,WithIcons:()=>_,WithoutLinks:()=>v,__namedExportsOrder:()=>b,default:()=>p}),f,p,m,h,g,_,v,y,b;function x(){return(x=e((()=>{r(),l(),s(),i(),u(),f=`forge-breadcrumb`,p={title:`Components/Breadcrumb`,tags:[`new`],render:()=>n`
    <forge-breadcrumb aria-label="Breadcrumb">
      <forge-breadcrumb-item href="#" home></forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Section</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Subsection</forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  `,component:f,subcomponents:{"Breadcrumb Item":`forge-breadcrumb-item`,"Breadcrumb Overflow Menu":`forge-breadcrumb-overflow-menu`},argTypes:{...a({tagName:`forge-breadcrumb-overflow-menu`}),...a({tagName:`forge-breadcrumb-item`}),...a({tagName:f})}},m={},h={render:()=>n`
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
  `},g={render:()=>n`
    <forge-breadcrumb aria-label="Breadcrumb">
      <forge-breadcrumb-item href="#" home></forge-breadcrumb-item>
      <forge-breadcrumb-item>
        Section one
        <forge-breadcrumb-item slot="children" href="#">Section one</forge-breadcrumb-item>
        <forge-breadcrumb-item slot="children" href="#">Section two</forge-breadcrumb-item>
        <forge-breadcrumb-item slot="children" href="#">Section three</forge-breadcrumb-item>
      </forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  `},_={render:()=>(o.define(c),n`
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
    `)},v={render:()=>n`
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
  `},y={render:()=>n`
    <forge-breadcrumb aria-label="Breadcrumb" scroll-buttons style="max-width: 400px;">
      <forge-breadcrumb-item href="#" home></forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Section</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Subsection</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Category</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Subcategory</forge-breadcrumb-item>
      <forge-breadcrumb-item href="#">Parent</forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  `},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => html\`
    <forge-breadcrumb aria-label="Breadcrumb">
      <forge-breadcrumb-item href="#" home></forge-breadcrumb-item>
      <forge-breadcrumb-item>
        Section one
        <forge-breadcrumb-item slot="children" href="#">Section one</forge-breadcrumb-item>
        <forge-breadcrumb-item slot="children" href="#">Section two</forge-breadcrumb-item>
        <forge-breadcrumb-item slot="children" href="#">Section three</forge-breadcrumb-item>
      </forge-breadcrumb-item>
      <forge-breadcrumb-item current>Current page</forge-breadcrumb-item>
    </forge-breadcrumb>
  \`
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b=[`Demo`,`OverflowMenu`,`ChildItems`,`WithIcons`,`WithoutLinks`,`ScrollButtons`]})))()}export{y as a,x as c,h as i,g as n,_ as o,m as r,v as s,d as t};