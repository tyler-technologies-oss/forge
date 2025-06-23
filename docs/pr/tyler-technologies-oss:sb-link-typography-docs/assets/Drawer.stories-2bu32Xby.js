import{x as r,E as i}from"./iframe-rNJ7j0IZ.js";import{g as w,s as h}from"./utils-gw6R9s7u.js";import{I as y,k as I,l as S,m as O,n as _}from"./icon-ANstxuR5.js";import{n as D,e as $}from"./ref-Cp31DDa6.js";import"./feature-detection-CY6TVbRZ.js";import"./drawer-DpoxQTjp.js";import"./list-DCzhHkfW.js";import"./toolbar-CJj-iw1_.js";import"./index-CiLSBptl.js";import"./scaffold-BjMvQLbF.js";import"./card-CGNxvxBg.js";import"./app-bar-profile-button-C76fwUGp.js";import"./state-layer-BVsNuAhs.js";import"./focus-indicator-Cgfkaa3d.js";import"./menu-C8rNUMJM.js";import"./linear-progress-CJb_8skk.js";import"./popover-BUd5kSDj.js";import"./overlay-CmLQVoKV.js";import"./skeleton-DocRecw2.js";import"./avatar-L8UmEzeW.js";import"./icon-button-BWhggrld.js";const{action:p}=__STORYBOOK_MODULE_ACTIONS__,n="forge-drawer",x=p("forge-drawer-after-open"),L=p("forge-drawer-after-close");y.define([I,S,O,_]);const j={title:"Components/Drawer",render:e=>{const a=$();function u(){const s=a.value;s.open=!s.open}const b=e.showHeader?r`
          <forge-toolbar slot="header">
            <div>Header</div>
          </forge-toolbar>
        `:i,v=e.showFooter?r`
          <forge-toolbar inverted slot="footer">
            <div>Footer</div>
          </forge-toolbar>
        `:i;return r`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${u}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-drawer
          ${D(a)}
          slot=${`body-${e.direction}`}
          .open=${e.open}
          .direction=${e.direction}
          @forge-drawer-after-open=${x}
          @forge-drawer-after-close=${L}>
          ${b}
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
          ${v}
        </forge-drawer>

        <main slot="body" style="padding: 16px; background-color: var(--forge-theme-surface-dim);">
          <forge-card>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </forge-card>
        </main>
      </forge-scaffold>
    `},component:n,argTypes:{...w({tagName:n,controls:{direction:{control:"select",options:["left","right"]}}}),showHeader:{control:{type:"boolean"}},showFooter:{control:{type:"boolean"}}},args:{showHeader:!1,showFooter:!1,open:!0,direction:"left"}},o={},t={...h,render:()=>r`
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
    `};var l,f,c;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:"{}",...(c=(f=o.parameters)==null?void 0:f.docs)==null?void 0:c.source}}};var m,d,g;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
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
    \`;
  }
}`,...(g=(d=t.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};const C=["Demo","CSSOnly"],X=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:t,Demo:o,__namedExportsOrder:C,default:j},Symbol.toStringTag,{value:"Module"}));export{t as C,X as D,o as a};
