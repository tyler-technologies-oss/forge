import{b as r,A as x}from"./iframe-CdbO8ZWL.js";import"./service-adapter-8tADcN_b.js";import{I as O,u as y,d as h,e as S}from"./tyler-icons-CP3IuoxV.js";import{s as e,g as D,b as A}from"./utils-CjnDZgMw.js";import{o as $}from"./style-map-GYvMt1fF.js";import"./option-group-BPrct8lp.js";import"./card-Cd5hCNYZ.js";const{action:u}=__STORYBOOK_MODULE_ACTIONS__;O.define([y,h,S]);const b="forge-listbox",P=u("change"),_=u("forge-listbox-drag-out"),L=u("forge-listbox-drop");function v(o){L(o.detail);const f=o.target,d=o.detail.group??f,m=d.children[o.detail.index],c=o.detail.option;m!==c&&(c.parentElement?.removeChild(c),d.insertBefore(c,m))}const C={title:"Components/Listbox",tags:["new"],render:o=>{const f=A(o),d=f?$(f):x;return r`
      <forge-listbox
        .multiple=${o.multiple}
        .disabled=${o.disabled}
        .readonly=${o.readonly}
        .dense=${o.dense}
        .allowDeselect=${o.allowDeselect}
        style=${d}
        @change=${P}>
        <forge-option value="1">Option 1</forge-option>
        <forge-option value="2">Option 2</forge-option>
        <forge-option value="3">Option 3</forge-option>
      </forge-listbox>
    `},component:b,argTypes:{...D({tagName:b,exclude:["value","name","required","dragOut","dropFrom","dropFromElements","reorderable","labels","form"]})},args:{multiple:!1,disabled:!1,readonly:!1,dense:!1,allowDeselect:!1}},t={},n={...e,args:{multiple:!0}},a={...e,args:{dense:!0}},i={...e,render:()=>r`
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
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;" @forge-listbox-drag-out=${_} @forge-listbox-drop=${v}>
      <forge-card style="--forge-card-padding: 0;">
        <forge-listbox style="min-height: 48px;" id="drag-and-drop-1" drag-out drop-from="drag-and-drop-2">
          <forge-option value="1">Option 1</forge-option>
          <forge-option value="2">Option 2</forge-option>
          <forge-option value="3">Option 3</forge-option>
        </forge-listbox>
      </forge-card>
      <forge-card style="--forge-card-padding: 0;">
        <forge-listbox style="min-height: 48px;" id="drag-and-drop-2" drag-out drop-from="drag-and-drop-1">
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
        <forge-listbox style="min-height: 48px;" id="drag-and-drop-1" drag-out drop-from="drag-and-drop-2">
          <forge-option value="1">Option 1</forge-option>
          <forge-option value="2">Option 2</forge-option>
          <forge-option value="3">Option 3</forge-option>
        </forge-listbox>
      </forge-card>
      <forge-card style="--forge-card-padding: 0;">
        <forge-listbox style="min-height: 48px;" id="drag-and-drop-2" drag-out drop-from="drag-and-drop-1">
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
}`,...l.parameters?.docs?.source}}};const I=["Demo","Multiple","Dense","WithOptionGroups","WithIcons","Reorderable","DragAndDrop","Disabled"],F=Object.freeze(Object.defineProperty({__proto__:null,Demo:t,Dense:a,Disabled:l,DragAndDrop:g,Multiple:n,Reorderable:p,WithIcons:s,WithOptionGroups:i,__namedExportsOrder:I,default:C},Symbol.toStringTag,{value:"Module"}));export{t as D,F as L,n as M,p as R,i as W,a,l as b,g as c};
