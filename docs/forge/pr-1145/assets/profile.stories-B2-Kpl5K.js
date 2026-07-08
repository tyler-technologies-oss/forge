import{b as d}from"./iframe-BoJb98tf.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-COxvc6OK.js";import"./app-bar-profile-button-CqU2bFi0.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CzJJGHSL.js";import"./menu-PAEt4Z9c.js";import"./linear-progress-dFUODLVX.js";import"./list-6KUxHYLZ.js";import"./popover-CZRIaKbl.js";import"./overlay-CX_m1mvq.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BxrGynUp.js";import"./avatar-0uIWQbcZ.js";import"./icon-button-B0Dp8mBT.js";import"./focus-indicator-BJZchx6n.js";import"./state-layer-CKPcsXao.js";import"./autocomplete-Do2sHxNP.js";import"./label-CCJpr-qV.js";import"./base-field-hl7nyKZb.js";import"./text-field-CgAYdL2i.js";import"./backdrop--ezx6yHr.js";import"./badge-C6QOJNXl.js";import"./banner-DX9fuv3g.js";import"./bottom-sheet-D4YyTlPZ.js";import"./dialog-D3n85AUX.js";import"./button-area-CaLdmT8C.js";import"./button-toggle-group-SQ8a4moi.js";import"./button-BqNUSoct.js";import"./calendar-C5JwsQ4A.js";import"./card-BQPdjJX6.js";import"./checkbox-DaS6rirX.js";import"./chip-set-XPSdSa6g.js";import"./circular-progress-BvJErdQG.js";import"./color-picker-CX8AVfrh.js";import"./date-picker-CwVp3g_I.js";import"./date-range-picker-akflXVFj.js";import"./divider-BfXu-8SN.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BJC8mhbC.js";import"./modal-drawer-C_HzRa2f.js";import"./mini-drawer-CJFzgWnt.js";import"./expansion-panel-C_n8azec.js";import"./open-icon-JgSiXo1g.js";import"./file-picker-CTr-w98D.js";import"./floating-action-button-DMNPQrml.js";import"./inline-message-1YYbEfHN.js";import"./key-item-BiYoLrAr.js";import"./keyboard-shortcut-CxrmtF8u.js";import"./label-value-CMJEsLJf.js";import"./meter-group-DKnwHQF2.js";import"./page-state-BwPC_Hd9.js";import"./paginator-CjRqSXby.js";import"./radio-group-DWaEOEF4.js";import"./scaffold-BAVRvYZ-.js";import"./secret-DogQvXJO.js";import"./select-dropdown-BdgJCE8O.js";import"./select-CD98FxPy.js";import"./skip-link-Dc4r_d0o.js";import"./slider-DoLsXKq_.js";import"./split-view-v4yrongu.js";import"./stack-BRmnsrL_.js";import"./stepper-BdDqJ7EA.js";import"./switch-e__u4JY_.js";import"./table-JXA0UqIp.js";import"./tab-bar-pb9fC32k.js";import"./time-picker-BbvM5qsi.js";import"./toast-BI76HGVf.js";import"./toolbar-m2auwteb.js";import"./tooltip-CE7u4Ary.js";import"./tree-item-DfpgOEAn.js";import"./view-switcher-B4ao6iwI.js";import"./deprecated-icon-button-DGTUF1aO.js";import"./split-button-SiAZfihf.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
