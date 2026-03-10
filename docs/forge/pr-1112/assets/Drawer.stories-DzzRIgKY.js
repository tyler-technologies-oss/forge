import{b as r,A as i}from"./iframe-FS6UuRTf.js";import{s as d,g}from"./utils-Dyztg_A4.js";import{I as p,l as u,m as b,n as v,o as w}from"./tyler-icons-iDvhFOMC.js";import"./service-adapter-8tADcN_b.js";import"./index-DTwfV0k0.js";import{n as h,e as y}from"./ref-Dw8cL2_y.js";import"./drawer-Bhr3bs1s.js";import"./list-B6gOTQYv.js";import"./toolbar-Bf50hayz.js";import"./scaffold-1Jx5bjjO.js";import"./card-D6VfsD4a.js";import"./app-bar-profile-button-2OwMH6ju.js";import"./menu-DYdAcAxp.js";import"./linear-progress-DJCUZyG6.js";import"./popover-BblH4OjR.js";import"./overlay-Btn1tEyh.js";import"./skeleton-Ctt20BWR.js";import"./avatar-BejPiSXX.js";import"./icon-button-rbnRrweT.js";import"./focus-indicator-DXnp9Plt.js";import"./state-layer-D0PE-_Ks.js";const{action:l}=__STORYBOOK_MODULE_ACTIONS__,n="forge-drawer",I=l("forge-drawer-after-open"),S=l("forge-drawer-after-close");p.define([u,b,v,w]);const O={title:"Components/Drawer",render:e=>{const a=y();function f(){const s=a.value;s.open=!s.open}const c=e.showHeader?r`
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
