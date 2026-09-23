import{b as r,A as x}from"./iframe-CCQPwMqK.js";import"./service-adapter-DlT-lJx7.js";import{I as O,e as y,d as h,i as S}from"./tyler-icons-D_P4inVM.js";import{s as e,g as D,b as A}from"./utils-71auwco3.js";import{o as L}from"./style-map-DcvoGNcx.js";import"./listbox-C7EIxqca.js";import"./option-DxLPA5Op.js";import"./card-BOT7vSRz.js";const{action:u}=__STORYBOOK_MODULE_ACTIONS__;O.define([y,h,S]);const b="forge-listbox",$=u("change"),k=u("forge-listbox-drag-out"),P=u("forge-listbox-drop");function v(o){P(o.detail);const d=o.target,f=o.detail.group??d,m=f.children[o.detail.index],c=o.detail.option;m!==c&&(c.parentElement?.removeChild(c),f.insertBefore(c,m))}const _={title:"Components/Listbox",tags:["new"],render:o=>{const d=A(o),f=d?L(d):x;return r`
      <forge-listbox
        .multiple=${o.multiple}
        .disabled=${o.disabled}
        .readonly=${o.readonly}
        .dense=${o.dense}
        .allowDeselect=${o.allowDeselect}
        style=${f}
        @change=${$}>
        <forge-option value="1">Option 1</forge-option>
        <forge-option value="2">Option 2</forge-option>
        <forge-option value="3">Option 3</forge-option>
      </forge-listbox>
    `},component:b,argTypes:{...D({tagName:b,exclude:["value","name","required","dragLink","dragLinkElements","dropLink","dropLinkElements","reorderable","labels","form"]})},args:{multiple:!1,disabled:!1,readonly:!1,dense:!1,allowDeselect:!1}},t={},n={...e,args:{multiple:!0}},a={...e,args:{dense:!0}},i={...e,render:()=>r`
    <forge-listbox>
      <forge-option-group>
        <div slot="label">Fruits</div>
        <forge-option value="apple">Apple</forge-option>
        <forge-option value="banana">Banana</forge-option>
        <forge-option value="orange">Orange</forge-option>
      </forge-option-group>
      <forge-option-group>
        <div slot="label">Vegetables</div>
        <forge-option value="carrot">Carrot</forge-option>
        <forge-option value="lettuce">Lettuce</forge-option>
        <forge-option value="tomato">Tomato</forge-option>
      </forge-option-group>
    </forge-listbox>
  `},s={...e,render:()=>r`
    <forge-listbox>
      <forge-option value="home">
        <forge-icon name="home" slot="start"></forge-icon>
        Home
      </forge-option>
      <forge-option value="settings">
        <forge-icon name="settings" slot="start"></forge-icon>
        Settings
      </forge-option>
      <forge-option value="profile">
        <forge-icon name="person" slot="start"></forge-icon>
        Profile
      </forge-option>
    </forge-listbox>
  `},p={...e,render:()=>r`
    <forge-listbox reorderable @forge-listbox-drop=${v}>
      <forge-option value="1">Option 1</forge-option>
      <forge-option value="2">Option 2</forge-option>
      <forge-option value="3">Option 3</forge-option>
    </forge-listbox>
  `},g={...e,render:()=>r`
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;" @forge-listbox-drag-out=${k} @forge-listbox-drop=${v}>
      <forge-card style="--forge-card-padding: 0;">
        <forge-listbox style="min-height: 48px;" id="drag-and-drop-1" drag-link="drag-and-drop-2" drop-link="drag-and-drop-2">
          <forge-option value="1">Option 1</forge-option>
          <forge-option value="2">Option 2</forge-option>
          <forge-option value="3">Option 3</forge-option>
        </forge-listbox>
      </forge-card>
      <forge-card style="--forge-card-padding: 0;">
        <forge-listbox style="min-height: 48px;" id="drag-and-drop-2" drag-link="drag-and-drop-1" drop-link="drag-and-drop-1">
          <forge-option value="a">Option A</forge-option>
          <forge-option value="b">Option B</forge-option>
          <forge-option value="c">Option C</forge-option>
        </forge-listbox>
      </forge-card>
    </div>
  `},l={...e,render:()=>r`
    <forge-listbox>
      <forge-option value="1">Option 1</forge-option>
      <forge-option value="2" disabled>Option 2</forge-option>
      <forge-option value="3">Option 3</forge-option>
    </forge-listbox>
  `};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    multiple: true
  }
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  args: {
    dense: true
  }
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-listbox>
      <forge-option-group>
        <div slot="label">Fruits</div>
        <forge-option value="apple">Apple</forge-option>
        <forge-option value="banana">Banana</forge-option>
        <forge-option value="orange">Orange</forge-option>
      </forge-option-group>
      <forge-option-group>
        <div slot="label">Vegetables</div>
        <forge-option value="carrot">Carrot</forge-option>
        <forge-option value="lettuce">Lettuce</forge-option>
        <forge-option value="tomato">Tomato</forge-option>
      </forge-option-group>
    </forge-listbox>
  \`
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-listbox>
      <forge-option value="home">
        <forge-icon name="home" slot="start"></forge-icon>
        Home
      </forge-option>
      <forge-option value="settings">
        <forge-icon name="settings" slot="start"></forge-icon>
        Settings
      </forge-option>
      <forge-option value="profile">
        <forge-icon name="person" slot="start"></forge-icon>
        Profile
      </forge-option>
    </forge-listbox>
  \`
}`,...s.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-listbox reorderable @forge-listbox-drop=\${handleListboxDrop}>
      <forge-option value="1">Option 1</forge-option>
      <forge-option value="2">Option 2</forge-option>
      <forge-option value="3">Option 3</forge-option>
    </forge-listbox>
  \`
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;" @forge-listbox-drag-out=\${dragOutAction} @forge-listbox-drop=\${handleListboxDrop}>
      <forge-card style="--forge-card-padding: 0;">
        <forge-listbox style="min-height: 48px;" id="drag-and-drop-1" drag-link="drag-and-drop-2" drop-link="drag-and-drop-2">
          <forge-option value="1">Option 1</forge-option>
          <forge-option value="2">Option 2</forge-option>
          <forge-option value="3">Option 3</forge-option>
        </forge-listbox>
      </forge-card>
      <forge-card style="--forge-card-padding: 0;">
        <forge-listbox style="min-height: 48px;" id="drag-and-drop-2" drag-link="drag-and-drop-1" drop-link="drag-and-drop-1">
          <forge-option value="a">Option A</forge-option>
          <forge-option value="b">Option B</forge-option>
          <forge-option value="c">Option C</forge-option>
        </forge-listbox>
      </forge-card>
    </div>
  \`
}`,...g.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <forge-listbox>
      <forge-option value="1">Option 1</forge-option>
      <forge-option value="2" disabled>Option 2</forge-option>
      <forge-option value="3">Option 3</forge-option>
    </forge-listbox>
  \`
}`,...l.parameters?.docs?.source}}};const C=["Demo","Multiple","Dense","WithOptionGroups","WithIcons","Reorderable","DragAndDrop","Disabled"],V=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,Dense:a,Disabled:l,DragAndDrop:g,Multiple:n,Reorderable:p,WithIcons:s,WithOptionGroups:i,__namedExportsOrder:C,default:_},Symbol.toStringTag,{value:"Module"}));export{t as D,V as L,n as M,p as R,i as W,a,l as b,g as c};
