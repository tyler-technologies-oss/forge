import{n as e,r as t}from"./rolldown-runtime-sJBDdmOt.js";import{a as n,n as r}from"./lit-html-SpIZ5SkX.js";import{p as i}from"./iframe-C-z8vi0w.js";import{m as a,o,s}from"./utils-BktKkMbo.js";import{n as c,t as l}from"./decorators-Eg-GwljX.js";import{t as u}from"./class-map-DEew1OiS.js";import{t as d}from"./class-map-8zp5OV2u.js";import{o as f,t as p}from"./icon-BrLOytZD.js";import{O as m,t as h}from"./tyler-icons-CLXzO0Q_.js";import{t as g}from"./icon-button-CZACX3Xp.js";import{t as _}from"./button-BCGxI4mr.js";import{t as v}from"./toolbar-D1sAxtpp.js";import{i as y,t as b}from"./dialog-C_9Ls6Or.js";import{t as x}from"./scaffold-NUY7AQ8t.js";var S,C,w,T,E,D,O,k;function A(){return(A=e((()=>{i(),h(),p(),a(),g(),_(),b(),x(),v(),{action:S}=__STORYBOOK_MODULE_ACTIONS__,C=S(`forge-dialog-close`),w=S(`forge-dialog-before-close`),T=S(`forge-dialog-move-start`),E=S(`forge-dialog-move`),D=S(`forge-dialog-move-end`),O=S(`forge-dialog-fullscreen-change`),k=e=>{f.define(m);let t=document.createElement(`div`),i=document.createElement(`forge-button`);i.variant=`raised`,i.innerText=`Open dialog`,i.addEventListener(`click`,()=>a.open=!0),t.appendChild(i);let a=o(`forge-dialog`,e);a.label=`My dialog title`,a.description=`My dialog description`,a.addEventListener(`forge-dialog-close`,e=>{C(e),a.open=!1}),a.addEventListener(`forge-dialog-before-close`,w),a.addEventListener(`forge-dialog-move-start`,T),a.addEventListener(`forge-dialog-move`,E),a.addEventListener(`forge-dialog-move-end`,D),a.addEventListener(`forge-dialog-fullscreen-change`,O),t.appendChild(a);let s=n`
    <forge-scaffold>
      <forge-toolbar slot="header" no-divider>
        <h1 class="forge-typography--heading4" id="dialog-title" slot="start">Title text</h1>
        <forge-icon-button slot="end" aria-label="Close dialog" @click=${()=>a.open=!1}>
          <forge-icon name="close"></forge-icon>
        </forge-icon-button>
      </forge-toolbar>
      <p slot="body" id="dialog-message">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit sed pariatur error repellendus eos! Quas, optio esse ad illum quis blanditiis rerum quia.
        Corrupti, ad hic velit praesentium voluptatum dolores?
      </p>
      <forge-toolbar slot="footer" no-divider>
        <forge-button slot="end" variant="raised" @click=${()=>a.open=!1}>Close</forge-button>
      </forge-toolbar>
    </forge-scaffold>
  `;return r(s,a),t}})))()}var j;function M(){return(M=e((()=>{j=`forge-dialog:not([fullscreen]) forge-scaffold{--forge-scaffold-width:500px}forge-dialog forge-scaffold{height:auto}forge-dialog forge-scaffold h1{margin:0}forge-dialog forge-scaffold>[slot=body]{padding:var(--forge-spacing-medium)}`})))()}var N=t({BottomSheet:()=>z,CSSOnly:()=>V,Demo:()=>F,Fullscreen:()=>B,LeftSheet:()=>L,RightSheet:()=>I,TopSheet:()=>R,__namedExportsOrder:()=>H,default:()=>P}),P,F,I,L,R,z,B,V,H;function U(){return(U=e((()=>{b(),p(),h(),i(),d(),l(),a(),A(),_(),g(),x(),v(),M(),f.define([m]),P={title:`Components/Dialog`,render:k,component:`forge-dialog`,decorators:[c(j)],argTypes:{...s({tagName:`forge-dialog`,exclude:[`trigger`,`triggerElement`],controls:{mode:{control:`select`,options:[`modal`,`inline-modal`,`nonmodal`]},type:{control:`select`,options:[`dialog`,`alertdialog`]},animationType:{control:`select`,options:[`none`,`zoom`,`fade`,`slide`]},preset:{control:`select`,options:[`dialog`,`left-sheet`,`right-sheet`,`top-sheet`,`bottom-sheet`]},sizeStrategy:{control:`select`,options:[`content`,`container-inline`,`container-block`]},positionStrategy:{control:`select`,options:[`viewport`,`container`]},placement:{control:`select`,options:[`custom`,`center`,`top`,`right`,`bottom`,`left`,`top-right`,`top-left`,`bottom-right`,`bottom-left`]},fullscreenThreshold:{control:`number`}}})},args:{open:!1,persistent:!1,fullscreen:!1,fullscreenThreshold:y.defaults.FULLSCREEN_THRESHOLD,moveable:!1,mode:y.defaults.MODE,type:y.defaults.TYPE,label:`My dialog title`,description:`My dialog description`,animationType:y.defaults.ANIMATION_TYPE,preset:y.defaults.PRESET,sizeStrategy:y.defaults.SIZE_STRATEGY,positionStrategy:y.defaults.POSITION_STRATEGY,placement:y.defaults.PLACEMENT}},F={},I={args:{preset:`right-sheet`}},L={args:{preset:`left-sheet`}},R={args:{preset:`top-sheet`}},z={args:{preset:`bottom-sheet`}},B={args:{fullscreen:!0}},V={parameters:{controls:{mode:{control:`select`,options:[`modal`,`nonmodal`]},placement:{control:`select`,options:[`center`,`top`,`top-right`,`top-left`,`right`,`left`,`bottom`,`bottom-right`,`bottom-left`]},preset:{control:`select`,options:[`dialog`,`top-sheet`,`bottom-sheet`,`left-sheet`,`right-sheet`]},fullscreen:{control:`boolean`},animationType:{control:`select`,options:[`none`,`zoom`,`fade`,`slide`]}}},args:{fullscreen:!1,mode:`modal`,placement:`center`,preset:`dialog`,animationType:`zoom`},render:({fullscreen:e,mode:t,placement:r,preset:i,animationType:a})=>{let o=()=>{let e=document.getElementById(`css-dialog`);e.open?e.close():t===`modal`?e.showModal():e.show()},s=u({"forge-dialog":!0,"forge-dialog--fullscreen":!!e,[`forge-dialog--${t}`]:!0,[`forge-dialog--${r}`]:!0,[`forge-dialog--${i}`]:!0,[`forge-dialog--${a}`]:!0});return n`
      <forge-button variant="raised" @click=${o}>Open Dialog</forge-button>
      <dialog id="css-dialog" class=${s} style="max-inline-size: 480px;">
        <forge-scaffold>
          <forge-toolbar slot="header" no-border>
            <h2 class="forge-typography--heading4">Title</h2>
            <forge-icon-button slot="end" aria-label="Close" @click=${o}>
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
            <forge-button slot="end" @click=${o}>Close</forge-button>
          </forge-toolbar>
        </forge-scaffold>
      </dialog>
    `}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    preset: 'right-sheet'
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    preset: 'left-sheet'
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    preset: 'top-sheet'
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    preset: 'bottom-sheet'
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    fullscreen: true
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
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
}`,...V.parameters?.docs?.source}}},H=[`Demo`,`RightSheet`,`LeftSheet`,`TopSheet`,`BottomSheet`,`Fullscreen`,`CSSOnly`]})))()}export{U as i,F as n,N as r,V as t};