import{b as r,A as i}from"./iframe-Ct7_Im3r.js";import{s as d,g}from"./utils-YUGVIsXY.js";import{I as p,l as u,m as b,n as v,o as w}from"./tyler-icons-DHcFYUo8.js";import"./service-adapter-8tADcN_b.js";import{n as h,e as y}from"./ref-5hIHDzHG.js";import"./drawer-DthgZrcs.js";import"./list-BZX3BfXR.js";import"./toolbar-B_QLjelg.js";import"./scaffold-l7cEUk27.js";import"./card-Cd2DEfI2.js";import"./app-bar-profile-button-P5X1ncIl.js";import"./menu-C8uTwp6w.js";import"./linear-progress-BvuLf7up.js";import"./popover-mByQYqA1.js";import"./overlay-B4lWdMx2.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-e7_Ylra4.js";import"./avatar-9R_n9OY2.js";import"./icon-button-Bl0BWpRR.js";const{action:l}=__STORYBOOK_MODULE_ACTIONS__,n="forge-drawer",I=l("forge-drawer-after-open"),S=l("forge-drawer-after-close");p.define([u,b,v,w]);const O={title:"Components/Drawer",render:e=>{const a=y();function f(){const s=a.value;s.open=!s.open}const c=e.showHeader?r`
          <forge-toolbar slot="header">
            <div>Header</div>
          </forge-toolbar>
        `:i,m=e.showFooter?r`
          <forge-toolbar inverted slot="footer">
            <div>Footer</div>
          </forge-toolbar>
        `:i;return r`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${f}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-drawer
          ${h(a)}
          slot=${`body-${e.direction}`}
          .open=${e.open}
          .direction=${e.direction}
          @forge-drawer-after-open=${I}
          @forge-drawer-after-close=${S}>
          ${c}
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
          ${m}
        </forge-drawer>

        <main slot="body" style="padding: 16px; background-color: var(--forge-theme-surface-dim);">
          <forge-card>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </forge-card>
        </main>
      </forge-scaffold>
    `},component:n,argTypes:{...g({tagName:n,controls:{direction:{control:"select",options:["left","right"]}}}),showHeader:{control:{type:"boolean"}},showFooter:{control:{type:"boolean"}}},args:{showHeader:!1,showFooter:!1,open:!0,direction:"left"}},o={},t={...d,render:()=>r`
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
  `};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:"{}",...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};const _=["Demo","CSSOnly"],U=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:t,Demo:o,__namedExportsOrder:_,default:O},Symbol.toStringTag,{value:"Module"}));export{t as C,U as D,o as a};
