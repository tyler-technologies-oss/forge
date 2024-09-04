import{j as N,x as P}from"./lit-element-BOOoordI.js";import"./lit-html-BWgXkSvR.js";import{a as t}from"./chunk-454WOBUV-CM0pFb8Z.js";import{x as k}from"./index-ByifSpfC.js";import{I as z}from"./icon-DHpZ4R73.js";import{c as F,g as M}from"./utils-DnAZaZRm.js";import"./constants-DjE6emXm.js";import"./icon-button-B5lcHsAP.js";import"./focus-indicator-BpCDYqsq.js";import"./index-Dh0vMUMR.js";import"./state-layer-DkOkOFSZ.js";import"./button-CoZ69e4-.js";import{D as o}from"./dialog-TURxzeUh.js";import"./backdrop-BKmy5m9d.js";import"./scaffold-R2qvsZCm.js";import"./toolbar-SJpnF1yY.js";import{s as Y}from"./decorators-EVhofM2Q.js";const j=t("forge-dialog-close"),G=t("forge-dialog-before-close"),q=t("forge-dialog-move-start"),w=t("forge-dialog-move"),B=t("forge-dialog-move-end"),H=t("forge-dialog-fullscreen-change"),$=I=>{z.define(k);const d=document.createElement("div"),c=document.createElement("forge-button");c.variant="raised",c.innerText="Open dialog",c.addEventListener("click",()=>e.open=!0),d.appendChild(c);const e=F("forge-dialog",I);e.setAttribute("aria-labelledby","dialog-title"),e.setAttribute("aria-describedby","dialog-message"),e.addEventListener("forge-dialog-close",x=>{j(x),e.open=!1}),e.addEventListener("forge-dialog-before-close",G),e.addEventListener("forge-dialog-move-start",q),e.addEventListener("forge-dialog-move",w),e.addEventListener("forge-dialog-move-end",B),e.addEventListener("forge-dialog-fullscreen-change",H),d.appendChild(e);const R=P`
    <forge-scaffold>
      <forge-toolbar slot="header" no-divider>
        <h1 class="forge-typography--heading4" id="dialog-title" slot="start">Title text</h1>
        <forge-icon-button slot="end" aria-label="Close dialog" @click=${()=>e.open=!1}>
          <forge-icon name="close"></forge-icon>
        </forge-icon-button>
      </forge-toolbar>
      <p slot="body" id="dialog-message">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit sed pariatur error repellendus eos! Quas, optio esse ad illum quis blanditiis rerum quia.
        Corrupti, ad hic velit praesentium voluptatum dolores?
      </p>
      <forge-toolbar slot="footer" no-divider>
        <forge-button slot="end" variant="raised" @click=${()=>e.open=!1}>Close</forge-button>
      </forge-toolbar>
    </forge-scaffold>
  `;return N(R,e),d},Q="forge-dialog:not([fullscreen]) forge-scaffold{--forge-scaffold-width: 500px}forge-dialog forge-scaffold{height:auto}forge-dialog forge-scaffold h1{margin:0}forge-dialog forge-scaffold>[slot=body]{padding:var(--forge-spacing-medium)}",U="forge-dialog",Z={title:"Components/Dialog",render:$,component:"forge-dialog",decorators:[Y(Q)],argTypes:{...M({tagName:U,exclude:["trigger","triggerElement"],controls:{mode:{control:"select",options:["modal","inline-modal","nonmodal"]},type:{control:"select",options:["dialog","alertdialog"]},animationType:{control:"select",options:["none","zoom","fade","slide"]},preset:{control:"select",options:["dialog","left-sheet","right-sheet","top-sheet","bottom-sheet"]},sizeStrategy:{control:"select",options:["content","container-inline","container-block"]},positionStrategy:{control:"select",options:["viewport","container"]},placement:{control:"select",options:["custom","center","top","right","bottom","left","top-right","top-left","bottom-right","bottom-left"]},fullscreenThreshold:{control:"number"}}})},args:{open:!1,persistent:!1,fullscreen:!1,fullscreenThreshold:o.defaults.FULLSCREEN_THRESHOLD,moveable:!1,mode:o.defaults.MODE,type:o.defaults.TYPE,animationType:o.defaults.ANIMATION_TYPE,preset:o.defaults.PRESET,sizeStrategy:o.defaults.SIZE_STRATEGY,positionStrategy:o.defaults.POSITION_STRATEGY,placement:o.defaults.PLACEMENT}},r={},s={args:{preset:"right-sheet"}},a={args:{preset:"left-sheet"}},n={args:{preset:"top-sheet"}},l={args:{preset:"bottom-sheet"}},i={args:{fullscreen:!0}};var g,p,m;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:"{}",...(m=(p=r.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var f,u,h;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    preset: 'right-sheet'
  }
}`,...(h=(u=s.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var b,S,v;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    preset: 'left-sheet'
  }
}`,...(v=(S=a.parameters)==null?void 0:S.docs)==null?void 0:v.source}}};var E,y,T;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    preset: 'top-sheet'
  }
}`,...(T=(y=n.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var A,L,C;l.parameters={...l.parameters,docs:{...(A=l.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    preset: 'bottom-sheet'
  }
}`,...(C=(L=l.parameters)==null?void 0:L.docs)==null?void 0:C.source}}};var O,_,D;i.parameters={...i.parameters,docs:{...(O=i.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    fullscreen: true
  }
}`,...(D=(_=i.parameters)==null?void 0:_.docs)==null?void 0:D.source}}};const J=["Demo","RightSheet","LeftSheet","TopSheet","BottomSheet","Fullscreen"],me=Object.freeze(Object.defineProperty({__proto__:null,BottomSheet:l,Demo:r,Fullscreen:i,LeftSheet:a,RightSheet:s,TopSheet:n,__namedExportsOrder:J,default:Z},Symbol.toStringTag,{value:"Module"}));export{me as D,r as a};
