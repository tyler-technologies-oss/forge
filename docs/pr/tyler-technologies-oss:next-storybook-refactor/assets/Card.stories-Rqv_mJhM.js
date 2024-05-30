import{x as g}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{c as q,g as v,s as b}from"./constants-QmM0_U5j.js";import"./card--JRhjOGh.js";import"./icon-button-BLiMlWOi.js";import{f as y}from"./index-BUpHWqBe.js";import"./focus-indicator-DKBXeYVD.js";import"./index-Dh0vMUMR.js";import"./state-layer-BaGosJQ5.js";import{I as x}from"./icon-gqtp6lOK.js";import"./button-BuozQdai.js";import"./scaffold-CiNncb1d.js";import"./toolbar-cfSG4fjP.js";const i="forge-card",h={title:"Components/Card",render:r=>{const s=q(i,r);return s.textContent=r.text,s},component:i,parameters:{actions:{disable:!0}},argTypes:{...v({tagName:i})},args:{raised:!1,text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias quas sed aliquid cumque sunt iste ad, alias quod adipisci? Nulla, libero necessitatibus enim sint nesciunt provident excepturi dolorum pariatur illum?"}},e={},t={...b,render:()=>(x.define([y]),g`
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
      `};var n,a,u;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:"{}",...(u=(a=e.parameters)==null?void 0:a.docs)==null?void 0:u.source}}};var d,l,c;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(c=(l=t.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var m,p,f;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(f=(p=o.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};const S=["Demo","Styled","Scaffold"],j=Object.freeze(Object.defineProperty({__proto__:null,Demo:e,Scaffold:o,Styled:t,__namedExportsOrder:S,default:h},Symbol.toStringTag,{value:"Module"}));export{j as C,e as D,t as S};
