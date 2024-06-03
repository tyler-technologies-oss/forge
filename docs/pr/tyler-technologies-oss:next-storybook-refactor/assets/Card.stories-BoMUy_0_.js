import{x as g}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{c as q,g as v,s as b}from"./utils-Bo5WgmOW.js";import{I as y}from"./icon-Cn5siE75.js";import"./index-Dh0vMUMR.js";import{n as x}from"./index-W-tNKQGp.js";import"./card-K90Ch6mV.js";import"./icon-button-CcYkD_r5.js";import"./focus-indicator-jd-AY9Jk.js";import"./state-layer-DzrxdbUp.js";import"./button-DIahYMuH.js";import"./scaffold-2Da0R44t.js";import"./toolbar-l7xYvrSc.js";import{s as h}from"./decorators-B79PnA5z.js";const S=".demo-card{max-width:400px}.demo-card .forge-card-header-container{display:flex;justify-content:space-between}.demo-card .forge-card-footer{display:flex;justify-content:flex-end}.scaffold-card{width:400px;--forge-card-padding: 0;--forge-card-height: 300px }.card-content{padding:16px;margin:0}",r="forge-card",M={title:"Components/Card",render:i=>{const a=q(r,i);return a.textContent=i.text,a},component:r,decorators:[h(S)],parameters:{actions:{disable:!0}},argTypes:{...v({tagName:r})},args:{raised:!1,text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus enim sint nesciunt provident excepturi dolorum pariatur illum?"}},e={},t={...b,render:()=>(y.define([x]),g`
    <div class="demo-card">
      <forge-card>
        <div class="forge-card-header-container">
          <h3 >This is the card title</h3>
          <forge-icon-button>
              <forge-icon name="more_vert"></forge-icon>
          </forge-icon-button>
        </div>

        <div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias exercitationem doloremque dolorem ullam, nesciunt quia velit necessitatibus numquam quasi voluptates impedit earum dolores repudiandae facilis totam non quo labore itaque?
          </p>
        </div>

        <div class="forge-card-footer">
          <div>
            <forge-button>
              Ok
            </forge-button>
            <forge-button>
              Cancel
            </forge-button>
          </div>
        </div>
      </forge-card>
    </div>
  `)},o={...b,render:()=>g`
    <forge-card class="scaffold-card">
      <forge-scaffold>
        <forge-toolbar slot="header">
          <h1 slot="start">Lorem ipsum</h1>
        </forge-toolbar>

        <p slot="body" tabindex="0" class="card-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed
          aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus
          enim sint nesciunt provident excepturi dolorum pariatur illum?

          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed
          aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus
          enim sint nesciunt provident excepturi dolorum pariatur illum?

          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed
          aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus
          enim sint nesciunt provident excepturi dolorum pariatur illum?
        </p>

        <forge-toolbar slot="footer" inverted>
          <forge-button type="outlined" slot="end">
            Cancel
          </forge-button>
          <forge-button type="unelevated" slot="end" style="margin-left: 8px;">
            Ok
          </forge-button>
        </forge-toolbar>
      </forge-scaffold>
    </forge-card>
      `};var s,n,d;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:"{}",...(d=(n=e.parameters)==null?void 0:n.docs)==null?void 0:d.source}}};var l,u,c;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    IconRegistry.define([tylIconMoreVert]);
    return html\`
    <div class="demo-card">
      <forge-card>
        <div class="forge-card-header-container">
          <h3 >This is the card title</h3>
          <forge-icon-button>
              <forge-icon name="more_vert"></forge-icon>
          </forge-icon-button>
        </div>

        <div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias exercitationem doloremque dolorem ullam, nesciunt quia velit necessitatibus numquam quasi voluptates impedit earum dolores repudiandae facilis totam non quo labore itaque?
          </p>
        </div>

        <div class="forge-card-footer">
          <div>
            <forge-button>
              Ok
            </forge-button>
            <forge-button>
              Cancel
            </forge-button>
          </div>
        </div>
      </forge-card>
    </div>
  \`;
  }
}`,...(c=(u=t.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};var m,p,f;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    return html\`
    <forge-card class="scaffold-card">
      <forge-scaffold>
        <forge-toolbar slot="header">
          <h1 slot="start">Lorem ipsum</h1>
        </forge-toolbar>

        <p slot="body" tabindex="0" class="card-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed
          aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus
          enim sint nesciunt provident excepturi dolorum pariatur illum?

          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed
          aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus
          enim sint nesciunt provident excepturi dolorum pariatur illum?

          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed
          aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus
          enim sint nesciunt provident excepturi dolorum pariatur illum?
        </p>

        <forge-toolbar slot="footer" inverted>
          <forge-button type="outlined" slot="end">
            Cancel
          </forge-button>
          <forge-button type="unelevated" slot="end" style="margin-left: 8px;">
            Ok
          </forge-button>
        </forge-toolbar>
      </forge-scaffold>
    </forge-card>
      \`;
  }
}`,...(f=(p=o.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};const L=["Demo","Styled","Scaffold"],z=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,Scaffold:o,Styled:t,__namedExportsOrder:L,default:M},Symbol.toStringTag,{value:"Module"}));export{z as C,e as D,t as S};
