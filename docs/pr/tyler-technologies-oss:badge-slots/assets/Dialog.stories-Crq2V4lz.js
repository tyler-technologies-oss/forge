import"./feature-detection-CY6TVbRZ.js";import{D as o}from"./dialog-DEObTM6-.js";import"./backdrop-Bv12Tb1U.js";import{I as N,C as w}from"./icon-Bqgt-0wI.js";import"./index-CiLSBptl.js";import"./lit-element-BuSzPo2N.js";import{x as P,B as F}from"./lit-html-Ox1a2bD1.js";import{e as Y}from"./class-map-D3FxRsP9.js";import{s as G}from"./decorators-CiKOYuay.js";import{c as H,g as U}from"./utils-C9ubTmun.js";import{a}from"./index-B-lxVbXh.js";import"./icon-button-BkG6pY8m.js";import"./focus-indicator-Cgfkaa3d.js";import"./state-layer-BVsNuAhs.js";import"./button-CC-L5W3b.js";import"./scaffold-BjMvQLbF.js";import"./toolbar-CJj-iw1_.js";const j=a("forge-dialog-close"),Q=a("forge-dialog-before-close"),Z=a("forge-dialog-move-start"),J=a("forge-dialog-move"),K=a("forge-dialog-move-end"),V=a("forge-dialog-fullscreen-change"),W=f=>{N.define(w);const t=document.createElement("div"),r=document.createElement("forge-button");r.variant="raised",r.innerText="Open dialog",r.addEventListener("click",()=>e.open=!0),t.appendChild(r);const e=H("forge-dialog",f);e.label="My dialog title",e.description="My dialog description",e.addEventListener("forge-dialog-close",s=>{j(s),e.open=!1}),e.addEventListener("forge-dialog-before-close",Q),e.addEventListener("forge-dialog-move-start",Z),e.addEventListener("forge-dialog-move",J),e.addEventListener("forge-dialog-move-end",K),e.addEventListener("forge-dialog-fullscreen-change",V),t.appendChild(e);const u=P`
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
  `;return F(u,e),t},X="forge-dialog:not([fullscreen]) forge-scaffold{--forge-scaffold-width: 500px}forge-dialog forge-scaffold{height:auto}forge-dialog forge-scaffold h1{margin:0}forge-dialog forge-scaffold>[slot=body]{padding:var(--forge-spacing-medium)}";N.define([w]);const ee="forge-dialog",oe={title:"Components/Dialog",render:W,component:"forge-dialog",decorators:[G(X)],argTypes:{...U({tagName:ee,exclude:["trigger","triggerElement"],controls:{mode:{control:"select",options:["modal","inline-modal","nonmodal"]},type:{control:"select",options:["dialog","alertdialog"]},animationType:{control:"select",options:["none","zoom","fade","slide"]},preset:{control:"select",options:["dialog","left-sheet","right-sheet","top-sheet","bottom-sheet"]},sizeStrategy:{control:"select",options:["content","container-inline","container-block"]},positionStrategy:{control:"select",options:["viewport","container"]},placement:{control:"select",options:["custom","center","top","right","bottom","left","top-right","top-left","bottom-right","bottom-left"]},fullscreenThreshold:{control:"number"}}})},args:{open:!1,persistent:!1,fullscreen:!1,fullscreenThreshold:o.defaults.FULLSCREEN_THRESHOLD,moveable:!1,mode:o.defaults.MODE,type:o.defaults.TYPE,label:"My dialog title",description:"My dialog description",animationType:o.defaults.ANIMATION_TYPE,preset:o.defaults.PRESET,sizeStrategy:o.defaults.SIZE_STRATEGY,positionStrategy:o.defaults.POSITION_STRATEGY,placement:o.defaults.PLACEMENT}},l={},n={args:{preset:"right-sheet"}},i={args:{preset:"left-sheet"}},c={args:{preset:"top-sheet"}},d={args:{preset:"bottom-sheet"}},g={args:{fullscreen:!0}},m={parameters:{controls:{mode:{control:"select",options:["modal","nonmodal"]},placement:{control:"select",options:["center","top","top-right","top-left","right","left","bottom","bottom-right","bottom-left"]},preset:{control:"select",options:["dialog","top-sheet","bottom-sheet","left-sheet","right-sheet"]},fullscreen:{control:"boolean"},animationType:{control:"select",options:["none","zoom","fade","slide"]}}},args:{fullscreen:!1,mode:"modal",placement:"center",preset:"dialog",animationType:"zoom"},render:({fullscreen:f,mode:t,placement:r,preset:e,animationType:u})=>{const s=()=>{const p=document.getElementById("css-dialog");if(p.open){p.close();return}t==="modal"?p.showModal():p.show()},B=Y({"forge-dialog":!0,"forge-dialog--fullscreen":!!f,[`forge-dialog--${t}`]:!0,[`forge-dialog--${r}`]:!0,[`forge-dialog--${e}`]:!0,[`forge-dialog--${u}`]:!0});return P`
      <forge-button variant="raised" @click=${s}>Open Dialog</forge-button>
      <dialog id="css-dialog" class=${B} style="max-inline-size: 480px;">
        <forge-scaffold>
          <forge-toolbar slot="header" no-border>
            <h2 class="forge-typography--heading4">Title</h2>
            <forge-icon-button slot="end" aria-label="Close" @click=${s}>
              <forge-icon name="close"></forge-icon>
            </forge-icon-button>
          </forge-toolbar>
          <p slot="body" style="margin: 16px;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
          <forge-toolbar slot="footer" no-border>
            <forge-button slot="end" @click=${s}>Close</forge-button>
          </forge-toolbar>
        </forge-scaffold>
      </dialog>
    `}};var h,b,y;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:"{}",...(y=(b=l.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var v,S,E;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    preset: 'right-sheet'
  }
}`,...(E=(S=n.parameters)==null?void 0:S.docs)==null?void 0:E.source}}};var T,C,D;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    preset: 'left-sheet'
  }
}`,...(D=(C=i.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var x,L,$;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    preset: 'top-sheet'
  }
}`,...($=(L=c.parameters)==null?void 0:L.docs)==null?void 0:$.source}}};var O,A,q;d.parameters={...d.parameters,docs:{...(O=d.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    preset: 'bottom-sheet'
  }
}`,...(q=(A=d.parameters)==null?void 0:A.docs)==null?void 0:q.source}}};var M,I,_;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    fullscreen: true
  }
}`,...(_=(I=g.parameters)==null?void 0:I.docs)==null?void 0:_.source}}};var k,z,R;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
  parameters: {
    controls: {
      mode: {
        control: 'select',
        options: ['modal', 'nonmodal']
      },
      placement: {
        control: 'select',
        options: ['center', 'top', 'top-right', 'top-left', 'right', 'left', 'bottom', 'bottom-right', 'bottom-left']
      },
      preset: {
        control: 'select',
        options: ['dialog', 'top-sheet', 'bottom-sheet', 'left-sheet', 'right-sheet']
      },
      fullscreen: {
        control: 'boolean'
      },
      animationType: {
        control: 'select',
        options: ['none', 'zoom', 'fade', 'slide']
      }
    }
  },
  args: {
    fullscreen: false,
    mode: 'modal',
    placement: 'center',
    preset: 'dialog',
    animationType: 'zoom'
  },
  render: ({
    fullscreen,
    mode,
    placement,
    preset,
    animationType
  }) => {
    const toggleDialog = () => {
      const dialog = document.getElementById('css-dialog') as HTMLDialogElement;
      if (dialog.open) {
        dialog.close();
        return;
      }
      if (mode === 'modal') {
        dialog.showModal();
      } else {
        dialog.show();
      }
    };
    const classes = classMap({
      'forge-dialog': true,
      'forge-dialog--fullscreen': !!fullscreen,
      [\`forge-dialog--\${mode}\`]: true,
      [\`forge-dialog--\${placement}\`]: true,
      [\`forge-dialog--\${preset}\`]: true,
      [\`forge-dialog--\${animationType}\`]: true
    });
    return html\`
      <forge-button variant="raised" @click=\${toggleDialog}>Open Dialog</forge-button>
      <dialog id="css-dialog" class=\${classes} style="max-inline-size: 480px;">
        <forge-scaffold>
          <forge-toolbar slot="header" no-border>
            <h2 class="forge-typography--heading4">Title</h2>
            <forge-icon-button slot="end" aria-label="Close" @click=\${toggleDialog}>
              <forge-icon name="close"></forge-icon>
            </forge-icon-button>
          </forge-toolbar>
          <p slot="body" style="margin: 16px;">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
          <forge-toolbar slot="footer" no-border>
            <forge-button slot="end" @click=\${toggleDialog}>Close</forge-button>
          </forge-toolbar>
        </forge-scaffold>
      </dialog>
    \`;
  }
}`,...(R=(z=m.parameters)==null?void 0:z.docs)==null?void 0:R.source}}};const te=["Demo","RightSheet","LeftSheet","TopSheet","BottomSheet","Fullscreen","CSSOnly"],Se=Object.freeze(Object.defineProperty({__proto__:null,BottomSheet:d,CSSOnly:m,Demo:l,Fullscreen:g,LeftSheet:i,RightSheet:n,TopSheet:c,__namedExportsOrder:te,default:oe},Symbol.toStringTag,{value:"Module"}));export{m as C,Se as D,l as a};
