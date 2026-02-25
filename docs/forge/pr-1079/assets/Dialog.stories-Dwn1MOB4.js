import"./service-adapter-CoGDs2_3.js";import{D as o}from"./dialog-BidBU9U3.js";import"./backdrop-DBJsfqA2.js";import{I as h,C as b}from"./tyler-icons-DRTyRvfU.js";import"./index-DTwfV0k0.js";import{b as y,D as S}from"./iframe-CvOKOd3F.js";import{e as E}from"./class-map-DXUaajGX.js";import{s as T}from"./decorators-BC54IVDh.js";import{c as C,g as D}from"./utils-zCyTXnrZ.js";import"./icon-button-dDjQtfj0.js";import"./focus-indicator-D4rjhUva.js";import"./state-layer-D7Damx7l.js";import"./button-Bi90NRzP.js";import"./scaffold-B5aByuW8.js";import"./toolbar-DKTN8__P.js";const{action:a}=__STORYBOOK_MODULE_ACTIONS__,O=a("forge-dialog-close"),L=a("forge-dialog-before-close"),x=a("forge-dialog-move-start"),$=a("forge-dialog-move"),_=a("forge-dialog-move-end"),A=a("forge-dialog-fullscreen-change"),M=f=>{h.define(b);const t=document.createElement("div"),r=document.createElement("forge-button");r.variant="raised",r.innerText="Open dialog",r.addEventListener("click",()=>e.open=!0),t.appendChild(r);const e=C("forge-dialog",f);e.label="My dialog title",e.description="My dialog description",e.addEventListener("forge-dialog-close",s=>{O(s),e.open=!1}),e.addEventListener("forge-dialog-before-close",L),e.addEventListener("forge-dialog-move-start",x),e.addEventListener("forge-dialog-move",$),e.addEventListener("forge-dialog-move-end",_),e.addEventListener("forge-dialog-fullscreen-change",A),t.appendChild(e);const u=y`
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
  `;return S(u,e),t},q="forge-dialog:not([fullscreen]) forge-scaffold{--forge-scaffold-width: 500px}forge-dialog forge-scaffold{height:auto}forge-dialog forge-scaffold h1{margin:0}forge-dialog forge-scaffold>[slot=body]{padding:var(--forge-spacing-medium)}";h.define([b]);const I="forge-dialog",k={title:"Components/Dialog",render:M,component:"forge-dialog",decorators:[T(q)],argTypes:{...D({tagName:I,exclude:["trigger","triggerElement"],controls:{mode:{control:"select",options:["modal","inline-modal","nonmodal"]},type:{control:"select",options:["dialog","alertdialog"]},animationType:{control:"select",options:["none","zoom","fade","slide"]},preset:{control:"select",options:["dialog","left-sheet","right-sheet","top-sheet","bottom-sheet"]},sizeStrategy:{control:"select",options:["content","container-inline","container-block"]},positionStrategy:{control:"select",options:["viewport","container"]},placement:{control:"select",options:["custom","center","top","right","bottom","left","top-right","top-left","bottom-right","bottom-left"]},fullscreenThreshold:{control:"number"}}})},args:{open:!1,persistent:!1,fullscreen:!1,fullscreenThreshold:o.defaults.FULLSCREEN_THRESHOLD,moveable:!1,mode:o.defaults.MODE,type:o.defaults.TYPE,label:"My dialog title",description:"My dialog description",animationType:o.defaults.ANIMATION_TYPE,preset:o.defaults.PRESET,sizeStrategy:o.defaults.SIZE_STRATEGY,positionStrategy:o.defaults.POSITION_STRATEGY,placement:o.defaults.PLACEMENT}},l={},n={args:{preset:"right-sheet"}},i={args:{preset:"left-sheet"}},c={args:{preset:"top-sheet"}},d={args:{preset:"bottom-sheet"}},g={args:{fullscreen:!0}},m={parameters:{controls:{mode:{control:"select",options:["modal","nonmodal"]},placement:{control:"select",options:["center","top","top-right","top-left","right","left","bottom","bottom-right","bottom-left"]},preset:{control:"select",options:["dialog","top-sheet","bottom-sheet","left-sheet","right-sheet"]},fullscreen:{control:"boolean"},animationType:{control:"select",options:["none","zoom","fade","slide"]}}},args:{fullscreen:!1,mode:"modal",placement:"center",preset:"dialog",animationType:"zoom"},render:({fullscreen:f,mode:t,placement:r,preset:e,animationType:u})=>{const s=()=>{const p=document.getElementById("css-dialog");if(p.open){p.close();return}t==="modal"?p.showModal():p.show()},v=E({"forge-dialog":!0,"forge-dialog--fullscreen":!!f,[`forge-dialog--${t}`]:!0,[`forge-dialog--${r}`]:!0,[`forge-dialog--${e}`]:!0,[`forge-dialog--${u}`]:!0});return y`
      <forge-button variant="raised" @click=${s}>Open Dialog</forge-button>
      <dialog id="css-dialog" class=${v} style="max-inline-size: 480px;">
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
    `}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    preset: 'right-sheet'
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    preset: 'left-sheet'
  }
}`,...i.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    preset: 'top-sheet'
  }
}`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    preset: 'bottom-sheet'
  }
}`,...d.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    fullscreen: true
  }
}`,...g.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
    const toggleDialog = (): void => {
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
}`,...m.parameters?.docs?.source}}};const z=["Demo","RightSheet","LeftSheet","TopSheet","BottomSheet","Fullscreen","CSSOnly"],V=Object.freeze(Object.defineProperty({__proto__:null,BottomSheet:d,CSSOnly:m,Demo:l,Fullscreen:g,LeftSheet:i,RightSheet:n,TopSheet:c,__namedExportsOrder:z,default:k},Symbol.toStringTag,{value:"Module"}));export{m as C,V as D,l as a};
