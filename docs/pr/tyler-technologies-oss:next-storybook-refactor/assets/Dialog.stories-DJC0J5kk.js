import{j as x,x as P}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as l}from"./chunk-MZXVCX43-CM0pFb8Z.js";import{g as k}from"./index-BUpHWqBe.js";import{I as z}from"./icon-gqtp6lOK.js";import{c as M,g as Y}from"./constants-QmM0_U5j.js";import"./icon-button-BLiMlWOi.js";import"./focus-indicator-DKBXeYVD.js";import"./index-Dh0vMUMR.js";import"./state-layer-BaGosJQ5.js";import"./button-BuozQdai.js";import{D as o}from"./dialog-B5TzZYcs.js";import"./backdrop-CIMNOtJF.js";import"./scaffold-CiNncb1d.js";import"./toolbar-cfSG4fjP.js";/* empty css                         */const j=l("forge-dialog-close"),F=l("forge-dialog-before-close"),G=l("forge-dialog-move-start"),q=l("forge-dialog-move"),B=l("forge-dialog-move-end"),$=I=>{z.define(k);const d=document.createElement("div"),c=document.createElement("forge-button");c.variant="raised",c.innerText="Open dialog",c.addEventListener("click",()=>e.open=!0),d.appendChild(c);const e=M("forge-dialog",I);e.setAttribute("aria-labelledby","dialog-title"),e.setAttribute("aria-describedby","dialog-message"),e.addEventListener("forge-dialog-close",R=>{j(R),e.open=!1}),e.addEventListener("forge-dialog-before-close",F),e.addEventListener("forge-dialog-move-start",G),e.addEventListener("forge-dialog-move",q),e.addEventListener("forge-dialog-move-end",B),d.appendChild(e);const N=P`
    <forge-scaffold class="dialog">
      <forge-toolbar slot="header" no-divider>
        <h1 id="dialog-title" slot="start">Title text</h1>
        <forge-icon-button slot="end" aria-label="Close dialog" @click=${()=>e.open=!1}>
          <forge-icon name="close"></forge-icon>
        </forge-icon-button>
      </forge-toolbar>
      <p slot="body" id="dialog-message">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit sed pariatur error repellendus eos! Quas,
        optio esse ad illum quis blanditiis rerum quia. Corrupti, ad hic velit praesentium voluptatum dolores?
      </p>
      <forge-toolbar slot="footer" no-divider>
        <forge-button slot="end" variant="raised" @click=${()=>e.open=!1}>Close</forge-button>
      </forge-toolbar>
    </forge-scaffold>
  `;return x(N,e),d},w="forge-dialog",Q={title:"Components/Dialog",render:$,component:"forge-dialog",argTypes:{...Y({tagName:w,exclude:["trigger","triggerElement"],controls:{mode:{control:"select",options:["modal","inline-modal","nonmodal"]},type:{control:"select",options:["dialog","alertdialog"]},animationType:{control:"select",options:["none","zoom","fade","slide"]},preset:{control:"select",options:["dialog","left-sheet","right-sheet","top-sheet","bottom-sheet"]},sizeStrategy:{control:"select",options:["content","container-inline","container-block"]},positionStrategy:{control:"select",options:["viewport","container"]},placement:{control:"select",options:["custom","center","top","right","bottom","left","top-right","top-left","bottom-right","bottom-left"]}}})},args:{open:!1,persistent:!1,fullscreen:!1,moveable:!1,mode:o.defaults.MODE,type:o.defaults.TYPE,animationType:o.defaults.ANIMATION_TYPE,preset:o.defaults.PRESET,sizeStrategy:o.defaults.SIZE_STRATEGY,positionStrategy:o.defaults.POSITION_STRATEGY,placement:o.defaults.PLACEMENT}},t={},r={args:{preset:"right-sheet"}},s={args:{preset:"left-sheet"}},a={args:{preset:"top-sheet"}},n={args:{preset:"bottom-sheet"}},i={args:{fullscreen:!0}};var p,m,g;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(g=(m=t.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};var f,u,h;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    preset: 'right-sheet'
  }
}`,...(h=(u=r.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var b,v,S;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    preset: 'left-sheet'
  }
}`,...(S=(v=s.parameters)==null?void 0:v.docs)==null?void 0:S.source}}};var E,T,y;a.parameters={...a.parameters,docs:{...(E=a.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    preset: 'top-sheet'
  }
}`,...(y=(T=a.parameters)==null?void 0:T.docs)==null?void 0:y.source}}};var A,C,L;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    preset: 'bottom-sheet'
  }
}`,...(L=(C=n.parameters)==null?void 0:C.docs)==null?void 0:L.source}}};var O,_,D;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    fullscreen: true
  }
}`,...(D=(_=i.parameters)==null?void 0:_.docs)==null?void 0:D.source}}};const Z=["Demo","RightSheet","LeftSheet","TopSheet","BottomSheet","Fullscreen"],ce=Object.freeze(Object.defineProperty({__proto__:null,BottomSheet:n,Demo:t,Fullscreen:i,LeftSheet:s,RightSheet:r,TopSheet:a,__namedExportsOrder:Z,default:Q},Symbol.toStringTag,{value:"Module"}));export{ce as D,t as a};
