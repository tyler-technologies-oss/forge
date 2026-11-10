import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{g as i}from"./iframe-BbUsXXnT.js";import{m as a,s as o}from"./utils-C90un5XN.js";import{o as s,t as c}from"./icon-CdA8CuQQ.js";import{$t as l,B as u,K as d,t as f,xt as p}from"./tyler-icons-kuH1S-j5.js";import{i as m,n as h,t as g}from"./ref-CKV-hb40.js";import{t as _}from"./card-fYAE1Lx6.js";import{t as v}from"./scaffold-KCbMx9PQ.js";import{t as y}from"./menu-button-A9mbTgYw.js";import{t as b}from"./app-bar-CzN-hPQF.js";import{t as x}from"./list-CnYSPteu.js";import{t as S}from"./toolbar-BJddCJGC.js";import{t as C}from"./modal-drawer-CIEojvsU.js";var w=t({Demo:()=>j,__namedExportsOrder:()=>M,default:()=>A}),T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{i(),a(),f(),c(),g(),C(),x(),S(),v(),_(),b(),y(),{action:T}=__STORYBOOK_MODULE_ACTIONS__,E=`forge-modal-drawer`,D=T(`forge-modal-drawer-close`),O=T(`forge-drawer-after-open`),k=T(`forge-drawer-after-close`),s.define([p,l,u,d]),A={title:`Components/Drawer/Modal Drawer`,render:e=>{let t=h();function i(){let e=t.value;e.open=!e.open}let a=e.showHeader?n`
          <forge-toolbar slot="header">
            <div>Header</div>
          </forge-toolbar>
        `:r,o=e.showFooter?n`
          <forge-toolbar inverted slot="footer">
            <div>Footer</div>
          </forge-toolbar>
        `:r;return n`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Modal Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${i}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-modal-drawer
          ${m(t)}
          slot=${e.direction}
          .open=${e.open}
          .direction=${e.direction}
          @forge-modal-drawer-close=${D}
          @forge-drawer-after-open=${O}
          @forge-drawer-after-close=${k}>
          ${a}
          <aside>
            <forge-list navlist>
              <forge-list-item selected>
                <forge-icon slot="start" name="inbox"></forge-icon>
                <a href="javascript: void(0)">Inbox</a>
              </forge-list-item>
              <forge-list-item>
                <forge-icon slot="start" name="send"></forge-icon>
                <a href="javascript: void(0)">Outgoing</a>
              </forge-list-item>
              <forge-list-item indented>
                <a href="javascript: void(0)">Pending</a>
              </forge-list-item>
              <forge-list-item>
                <forge-icon slot="start" name="drafts"></forge-icon>
                <a href="javascript: void(0)">Drafts</a>
              </forge-list-item>
              <forge-list-item>
                <forge-icon slot="start" name="send"></forge-icon>
                <a href="javascript: void(0)">Sent</a>
              </forge-list-item>
            </forge-list>
          </aside>
          ${o}
        </forge-modal-drawer>

        <main slot="body">
          <forge-card>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </forge-card>
        </main>
      </forge-scaffold>
    `},component:E,argTypes:{...o({tagName:E,controls:{direction:{control:`select`,options:[`left`,`right`]}}}),showHeader:{control:{type:`boolean`}},showFooter:{control:{type:`boolean`}}},args:{showHeader:!1,showFooter:!1,open:!0,direction:`left`}},j={},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{}`,...j.parameters?.docs?.source}}},M=[`Demo`]})))()}export{w as n,N as r,j as t};