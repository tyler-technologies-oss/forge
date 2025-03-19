import"./lit-element-JplMEnZc.js";import{x as r,E as s}from"./lit-html-paDGiEfB.js";import{a as g}from"./index-Cf3axooF.js";import{g as w,s as h}from"./utils-C0KK1NN_.js";import{f as y,g as I,h as S,i as D}from"./index-ByifSpfC.js";import{I as $}from"./icon-CND1_bFA.js";import{n as x,e as j}from"./ref-DJjbfkOF.js";import"./feature-detection-DRCh51Sa.js";import"./drawer-GVt_Ufm9.js";import"./list-taWGoVxz.js";import"./toolbar-DrgqBcwu.js";import"./index-CiLSBptl.js";import"./scaffold-D66s8WNO.js";import"./card-C10NOeAn.js";import"./app-bar-profile-button-C1Qxnv8b.js";import"./state-layer-DCupnvce.js";import"./focus-indicator-BjVpbo_K.js";import"./badge-Dp1fyGkw.js";import"./menu-D3cpy8Jn.js";import"./linear-progress-CqfIuBkR.js";import"./popover-TwkKUBh9.js";import"./overlay-B9ywocRd.js";import"./skeleton-D2S3-1Sc.js";import"./avatar-D_XGi29H.js";import"./icon-button-DmyR8RGa.js";const n="forge-drawer",L=g("forge-drawer-after-open"),O=g("forge-drawer-after-close");$.define([y,I,S,D]);const C={title:"Components/Drawer",render:e=>{const i=j();function u(){const a=i.value;a.open=!a.open}const b=e.showHeader?r`
          <forge-toolbar slot="header">
            <div>Header</div>
          </forge-toolbar>
        `:s,v=e.showFooter?r`
          <forge-toolbar inverted slot="footer">
            <div>Footer</div>
          </forge-toolbar>
        `:s;return r`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${u}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-drawer
          ${x(i)}
          slot=${`body-${e.direction}`}
          .open=${e.open}
          .direction=${e.direction}
          @forge-drawer-after-open=${L}
          @forge-drawer-after-close=${O}>
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
    `};var l,f,m;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:"{}",...(m=(f=o.parameters)==null?void 0:f.docs)==null?void 0:m.source}}};var c,d,p;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(p=(d=t.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const _=["Demo","CSSOnly"],te=Object.freeze(Object.defineProperty({__proto__:null,CSSOnly:t,Demo:o,__namedExportsOrder:_,default:C},Symbol.toStringTag,{value:"Module"}));export{t as C,te as D,o as a};
