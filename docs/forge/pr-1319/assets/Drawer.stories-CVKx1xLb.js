import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-Cygt-aqC.js";import{_ as a,m as o,s}from"./utils-C3ow8Ikc.js";import{o as c,t as l}from"./icon-D3E8ATav.js";import{F as u,V as d,ht as f,qt as p,t as m}from"./tyler-icons-CLXzO0Q_.js";import{t as h}from"./menu-button-DPZrds0o.js";import{t as g}from"./app-bar-OtDH_Y1e.js";import{t as _}from"./list--BbpOS-q.js";import{t as v}from"./toolbar-DeT5YqoD.js";import{i as y,n as b,t as x}from"./ref-DsL_jvlp.js";import{t as S}from"./card-CGPUt1wb.js";import{t as C}from"./drawer-1BtL2FrW.js";import{t as w}from"./scaffold-NUY7AQ8t.js";var T=t({CSSOnly:()=>M,Demo:()=>j,__namedExportsOrder:()=>N,default:()=>A}),E,D,O,k,A,j,M,N;function P(){return(P=e((()=>{i(),o(),m(),l(),x(),C(),_(),v(),w(),S(),g(),h(),{action:E}=__STORYBOOK_MODULE_ACTIONS__,D=`forge-drawer`,O=E(`forge-drawer-after-open`),k=E(`forge-drawer-after-close`),c.define([f,p,u,d]),A={title:`Components/Drawer`,render:e=>{let t=b();function i(){let e=t.value;e.open=!e.open}let a=e.showHeader?n`
          <forge-toolbar slot="header">
            <div>Header</div>
          </forge-toolbar>
        `:r,o=e.showFooter?n`
          <forge-toolbar inverted slot="footer">
            <div>Footer</div>
          </forge-toolbar>
        `:r;return n`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${i}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-drawer
          ${y(t)}
          slot=${`body-${e.direction}`}
          .open=${e.open}
          .direction=${e.direction}
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
        </forge-drawer>

        <main slot="body" style="padding: 16px; background-color: var(--forge-theme-surface-dim);">
          <forge-card>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </forge-card>
        </main>
      </forge-scaffold>
    `},component:D,argTypes:{...s({tagName:D,controls:{direction:{control:`select`,options:[`left`,`right`]}}}),showHeader:{control:{type:`boolean`}},showFooter:{control:{type:`boolean`}}},args:{showHeader:!1,showFooter:!1,open:!0,direction:`left`}},j={},M={...a,render:()=>n`
    <aside class="forge-drawer">
      <ul class="forge-list forge-list--navlist">
        <li class="forge-list-item">
          <button>List Item</button>
        </li>
        <li class="forge-list-item">
          <button>List Item</button>
        </li>
        <li class="forge-list-item">
          <button>List Item</button>
        </li>
      </ul>
    </aside>
  `},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => html\`
    <aside class="forge-drawer">
      <ul class="forge-list forge-list--navlist">
        <li class="forge-list-item">
          <button>List Item</button>
        </li>
        <li class="forge-list-item">
          <button>List Item</button>
        </li>
        <li class="forge-list-item">
          <button>List Item</button>
        </li>
      </ul>
    </aside>
  \`
}`,...M.parameters?.docs?.source}}},N=[`Demo`,`CSSOnly`]})))()}export{P as i,j as n,T as r,M as t};