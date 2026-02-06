import{b as r,A as i}from"./iframe-DdIHyASQ.js";import{s as d,g}from"./utils-CahvXhhw.js";import{I as p,l as u,m as b,n as v,o as w}from"./tyler-icons-B0WPf66k.js";import{n as h,e as y}from"./ref-CSDgKgi6.js";import"./service-adapter-CffG5Lhq.js";import"./drawer-eo8EwIfW.js";import"./list-BUAyRRaS.js";import"./toolbar-BK4uxBaY.js";import"./index-DTwfV0k0.js";import"./scaffold-B_qTjcmL.js";import"./card-cHHft-TI.js";import"./app-bar-profile-button-Bqc_fXik.js";import"./state-layer-u9rLNX9t.js";import"./focus-indicator-uodH7OpA.js";import"./menu-YVmc8C5m.js";import"./linear-progress-CsYLd0m5.js";import"./popover-oAFRtu_9.js";import"./overlay-BhwPRyah.js";import"./skeleton-DllEP8un.js";import"./avatar--XQgll8F.js";import"./icon-button-4Ugq7Vza.js";const{action:l}=__STORYBOOK_MODULE_ACTIONS__,n="forge-drawer",I=l("forge-drawer-after-open"),S=l("forge-drawer-after-close");p.define([u,b,v,w]);const O={title:"Components/Drawer",render:e=>{const a=y();function f(){const s=a.value;s.open=!s.open}const c=e.showHeader?r`
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
}`,...t.parameters?.docs?.source}}};const _=["Demo","CSSOnly"],Y=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:t,Demo:o,__namedExportsOrder:_,default:O},Symbol.toStringTag,{value:"Module"}));export{t as C,Y as D,o as a};
