import{b as r,A as s}from"./iframe-1amZ02A4.js";import{g as m}from"./utils-s6uih_-r.js";import{I as c,l as p,m as g,n as u,o as w}from"./tyler-icons-CzoCbVaa.js";import{n as b,e as v}from"./ref-DjoxsuPm.js";import"./service-adapter-CoGDs2_3.js";import"./modal-drawer-CvOegoGK.js";import"./backdrop-CFGTkHhD.js";import"./base-drawer-CHln_uqB.js";import"./list-7b1y5hwO.js";import"./toolbar-C3hZOw9r.js";import"./index-DTwfV0k0.js";import"./scaffold-DS4rOy-Y.js";import"./card-BvgwV_S5.js";import"./app-bar-profile-button-CYKmH8Qe.js";import"./state-layer-DFBFTfpT.js";import"./focus-indicator-C5TEsO7E.js";import"./menu-Ba834p8F.js";import"./linear-progress-DSeJSqzy.js";import"./popover-uUF2Q5pH.js";import"./overlay-xfWlPvUl.js";import"./skeleton-CfBVzZbg.js";import"./avatar-CFsh7WCn.js";import"./icon-button-DIbOVWXo.js";const{action:t}=__STORYBOOK_MODULE_ACTIONS__,n="forge-modal-drawer",h=t("forge-modal-drawer-close"),y=t("forge-drawer-after-open"),D=t("forge-drawer-after-close");c.define([p,g,u,w]);const _={title:"Components/Drawer/Modal Drawer",render:o=>{const a=v();function l(){const i=a.value;i.open=!i.open}const f=o.showHeader?r`
          <forge-toolbar slot="header">
            <div>Header</div>
          </forge-toolbar>
        `:s,d=o.showFooter?r`
          <forge-toolbar inverted slot="footer">
            <div>Footer</div>
          </forge-toolbar>
        `:s;return r`
      <forge-scaffold style="--forge-scaffold-height: 300px;">
        <forge-app-bar slot="header" title-text="Modal Drawer Demo">
          <forge-app-bar-menu-button slot="start" @click=${l}></forge-app-bar-menu-button>
        </forge-app-bar>
        <forge-modal-drawer
          ${b(a)}
          slot=${o.direction}
          .open=${o.open}
          .direction=${o.direction}
          @forge-modal-drawer-close=${h}
          @forge-drawer-after-open=${y}
          @forge-drawer-after-close=${D}>
          ${f}
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
          ${d}
        </forge-modal-drawer>

        <main slot="body">
          <forge-card>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </forge-card>
        </main>
      </forge-scaffold>
    `},component:n,argTypes:{...m({tagName:n,controls:{direction:{control:"select",options:["left","right"]}}}),showHeader:{control:{type:"boolean"}},showFooter:{control:{type:"boolean"}}},args:{showHeader:!1,showFooter:!1,open:!0,direction:"left"}},e={};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};const O=["Demo"],G=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,__namedExportsOrder:O,default:_},Symbol.toStringTag,{value:"Module"}));export{e as D,G as M};
