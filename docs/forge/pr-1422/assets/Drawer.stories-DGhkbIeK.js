import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,t as r}from"./lit-html-SpIZ5SkX.js";import{g as i}from"./iframe-CbV23-8Y.js";import{_ as a,m as o,s}from"./utils-CaRNnNM5.js";import{o as c,t as l}from"./icon-DTOjPWy9.js";import{$t as u,B as d,K as f,t as p,xt as m}from"./tyler-icons-kuH1S-j5.js";import{i as h,n as g,t as _}from"./ref-DZ35M6As.js";import{t as v}from"./card-Dq3fw6oM.js";import{t as y}from"./scaffold-KCbMx9PQ.js";import{t as b}from"./menu-button-BmFolLam.js";import{t as x}from"./app-bar-CngbJV3u.js";import{t as S}from"./list-CMvX_fMw.js";import{t as C}from"./toolbar-8xhAwSg5.js";import{t as w}from"./drawer-C-4TIRFG.js";var T=t({CSSOnly:()=>M,Demo:()=>j,__namedExportsOrder:()=>N,default:()=>A}),E,D,O,k,A,j,M,N;function P(){return(P=e((()=>{i(),o(),p(),l(),_(),w(),S(),C(),y(),v(),x(),b(),{action:E}=__STORYBOOK_MODULE_ACTIONS__,D=`forge-drawer`,O=E(`forge-drawer-after-open`),k=E(`forge-drawer-after-close`),c.define([m,u,d,f]),A={title:`Components/Drawer`,render:e=>{let t=g();function i(){let e=t.value;e.open=!e.open}let a=e.showHeader?n`
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
          ${h(t)}
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