import{b as d}from"./iframe-YJCmrxG6.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DFnI0Xve.js";import"./app-bar-profile-button-ME5WFqph.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DNFgH8fO.js";import"./menu-wB8-QZlv.js";import"./linear-progress-dFUODLVX.js";import"./list-CTWkvgA-.js";import"./popover-CZRIaKbl.js";import"./overlay-CX_m1mvq.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BxrGynUp.js";import"./avatar-DyqvncNt.js";import"./icon-button-BWTcf7oJ.js";import"./focus-indicator-CxOgR2nG.js";import"./state-layer-CKPcsXao.js";import"./autocomplete-QB-SuQig.js";import"./label-CCJpr-qV.js";import"./base-field-bTMoOJwZ.js";import"./text-field-D-byrp5b.js";import"./backdrop--ezx6yHr.js";import"./badge-bCCD_8DS.js";import"./banner-CkngdfIP.js";import"./bottom-sheet-D4YyTlPZ.js";import"./dialog-D3n85AUX.js";import"./button-area-DiQ-5ca7.js";import"./button-toggle-group-Bwuq75aV.js";import"./button-CvnXKauy.js";import"./calendar-C7ws38Bt.js";import"./card-C60_ndCF.js";import"./checkbox-Dm5cRVaN.js";import"./chip-set-6uTXrY9-.js";import"./circular-progress-BvJErdQG.js";import"./color-picker-Bb1Vjs3Y.js";import"./date-picker-BAwOQ00u.js";import"./date-range-picker-B7YIBJMa.js";import"./divider-f_XSL4lv.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BJC8mhbC.js";import"./modal-drawer-C_HzRa2f.js";import"./mini-drawer-CJFzgWnt.js";import"./expansion-panel-CxiWcKa7.js";import"./open-icon-DhY-7ghh.js";import"./file-picker-Y1E8iayk.js";import"./floating-action-button-BiRtUNYK.js";import"./inline-message-1YYbEfHN.js";import"./key-item-DJ3dUVoQ.js";import"./keyboard-shortcut-C4CPJUtn.js";import"./label-value-CMJEsLJf.js";import"./meter-group-DCOiiTvq.js";import"./page-state-BwPC_Hd9.js";import"./paginator-D_o6Tlkn.js";import"./radio-group-DYg5E1NG.js";import"./scaffold-BAVRvYZ-.js";import"./secret-ChplJWE_.js";import"./select-dropdown-Dd8H5ogJ.js";import"./select-IjV3RnFH.js";import"./skip-link-DPosgfOb.js";import"./slider-7X-EFKgE.js";import"./split-view-Dq6JS5zL.js";import"./stack-BRmnsrL_.js";import"./stepper-wEOmkT4Q.js";import"./switch-DD6T_qUK.js";import"./table-XbNBBArl.js";import"./tab-bar-A-XRBWPw.js";import"./time-picker-CE9-Qz8O.js";import"./toast-B5y3zj17.js";import"./toolbar-m2auwteb.js";import"./tooltip-CE7u4Ary.js";import"./tree-item-D_F4MFvQ.js";import"./view-switcher-B4ao6iwI.js";import"./deprecated-icon-button-ChYDknIp.js";import"./split-button-7tkoV2wk.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
    <forge-app-bar title-text="Profile">
      <forge-app-bar-profile-button
        slot="end"
        @forge-profile-card-profile=${I}
        @forge-profile-card-sign-out=${h}
        .avatarLetterCount=${n}
        .profileButton=${p}
        .profileButtonText=${e}
        .signOutButton=${t}
        .signOutButtonText=${o}
        .fullName=${r}
        .email=${i}
        .open=${a}>
      </forge-app-bar-profile-button>
    </forge-app-bar>
  `,component:s,argTypes:{...f({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},l={},m={...u,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.warn("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return d`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    function builder(): HTMLElement {
      const listElement = document.createElement('forge-list');
      listElement.addEventListener('forge-list-item-select', ({
        detail
      }) => {
        console.warn('[profile-card] Selected custom item:', detail.value);
      });
      listElement.style.setProperty('--forge-list-padding', '0');
      listElement.appendChild(document.createElement('forge-divider'));
      listElement.appendChild(buildListItemElement('My Reports', 'assignment', 'reports'));
      listElement.appendChild(buildListItemElement('My Workflow', 'work_outline', 'workflow'));
      listElement.appendChild(buildListItemElement('My Alerts', 'warning', 'alerts'));
      listElement.appendChild(buildListItemElement('My Preferences', 'settings', 'preferences'));
      return listElement;
    }
    function buildListItemElement(text: string, icon: string, value: string): HTMLElement {
      const listItemElement = document.createElement('forge-list-item');
      listItemElement.value = value;
      const iconElement = document.createElement('forge-icon');
      iconElement.slot = 'leading';
      iconElement.name = icon;
      listItemElement.appendChild(iconElement);
      const buttonElement = document.createElement('button');
      buttonElement.type = 'button';
      buttonElement.innerText = text;
      listItemElement.appendChild(buttonElement);
      return listItemElement;
    }
    return html\`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=\${builder}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    \`;
  }
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Kt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Kt as P,m as W};
