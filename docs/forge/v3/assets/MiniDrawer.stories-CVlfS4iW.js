import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-BMUBXmXw.js";import{m as a,s as o}from"./utils-B_1gC6gM.js";import{o as s,t as c}from"./icon-CNNuo8Sp.js";import{F as l,V as u,ht as d,qt as f,t as p}from"./tyler-icons-CLXzO0Q_.js";import{t as m}from"./menu-button-D7LUIfmw.js";import{t as h}from"./app-bar-DWVaF7iL.js";import{t as g}from"./tooltip-oHZhQ3L9.js";import{t as _}from"./list-Ba8vBcAH.js";import{t as v}from"./toolbar-DVICX5El.js";import{i as y,n as b,t as x}from"./ref-Dg2Jkjii.js";import{t as S}from"./card-orfgCoxN.js";import{t as C}from"./mini-drawer-d6fQ0JP-.js";import{t as w}from"./scaffold-NUY7AQ8t.js";var T=t({Demo:()=>j,Hover:()=>M,__namedExportsOrder:()=>N,default:()=>A}),E,D,O,k,A,j,M,N;function P(){return(P=e((()=>{i(),a(),p(),c(),x(),C(),_(),v(),w(),S(),h(),m(),g(),{action:E}=__STORYBOOK_MODULE_ACTIONS__,D=`forge-mini-drawer`,O=E(`forge-drawer-after-open`),k=E(`forge-drawer-after-close`),s.define([d,f,l,u]),A={title:`Components/Drawer/Mini Drawer`,render:e=>{let t=b();function i(){let e=t.value;e.open=!e.open}return n`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${i}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-mini-drawer
          ${y(t)}
          slot=${`body-${e.direction}`}
          .open=${e.open}
          .direction=${e.direction}
          ?hover=${e.hover}
          @forge-drawer-after-open=${O}
          @forge-drawer-after-close=${k}>
          <aside>
            <forge-list navlist>
              <forge-list-item selected id="tooltip-host-1">
                ${e.hover?r:n`<forge-tooltip anchor="tooltip-host-1">Inbox</forge-tooltip>`}
                <forge-icon slot="start" name="inbox"></forge-icon>
                <a href="javascript: void(0)">Inbox</a>
              </forge-list-item>
              <forge-list-item id="tooltip-host-2">
                ${e.hover?r:n`<forge-tooltip anchor="tooltip-host-2">Sent</forge-tooltip>`}
                <forge-icon slot="start" name="send"></forge-icon>
                <a href="javascript: void(0)">Sent</a>
              </forge-list-item>
              <forge-list-item id="tooltip-host-3">
                ${e.hover?r:n`<forge-tooltip anchor="tooltip-host-3">Drafts</forge-tooltip>`}
                <forge-icon slot="start" name="drafts"></forge-icon>
                <a href="javascript: void(0)">Drafts</a>
              </forge-list-item>
            </forge-list>
          </aside>
        </forge-mini-drawer>

        <main slot="body" style="padding: 16px; background-color: var(--forge-theme-surface-dim);">
          <forge-card>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </forge-card>
        </main>
      </forge-scaffold>
    `},component:D,argTypes:{...o({tagName:D,controls:{direction:{control:`select`,options:[`left`,`right`]}}})},args:{open:!0,hover:!1,direction:`left`}},j={},M={args:{hover:!0}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    hover: true
  }
}`,...M.parameters?.docs?.source}}},N=[`Demo`,`Hover`]})))()}export{P as i,M as n,T as r,j as t};