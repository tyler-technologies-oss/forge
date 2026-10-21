import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-CuAvrKn_.js";import{m as a,s as o}from"./utils-Cppiha4b.js";import{o as s,t as c}from"./icon-DzM2_TPc.js";import{F as l,V as u,ht as d,qt as f,t as p}from"./tyler-icons-CLXzO0Q_.js";import{t as m}from"./menu-button-2opln5Qb.js";import{t as h}from"./app-bar-JOW6KmqU.js";import{t as g}from"./list-B0huA5vt.js";import{t as _}from"./toolbar-cty3TaiD.js";import{i as v,n as y,t as b}from"./ref-UkViCfGj.js";import{t as x}from"./card-Bo_4vCUn.js";import{t as S}from"./modal-drawer-CKdMOOMo.js";import{t as C}from"./scaffold-NUY7AQ8t.js";var w=t({Demo:()=>j,__namedExportsOrder:()=>M,default:()=>A}),T,E,D,O,k,A,j,M;function N(){return(N=e((()=>{i(),a(),p(),c(),b(),S(),g(),_(),C(),x(),h(),m(),{action:T}=__STORYBOOK_MODULE_ACTIONS__,E=`forge-modal-drawer`,D=T(`forge-modal-drawer-close`),O=T(`forge-drawer-after-open`),k=T(`forge-drawer-after-close`),s.define([d,f,l,u]),A={title:`Components/Drawer/Modal Drawer`,render:e=>{let t=y();function i(){let e=t.value;e.open=!e.open}let a=e.showHeader?n`
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
          ${v(t)}
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