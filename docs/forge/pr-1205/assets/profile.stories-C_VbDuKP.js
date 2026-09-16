import{b as d}from"./iframe-B3uRBkD3.js";import{s as u,g as f}from"./utils-CnROM8aW.js";import"./service-adapter-8tADcN_b.js";import"./accordion-B8rbwwxu.js";import"./app-bar-profile-button-XK1WGDjz.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CoQb4rn7.js";import"./menu-CGqle7b9.js";import"./linear-progress-BuTzYSPq.js";import"./list-ZmONF4RK.js";import"./popover-CoBuGMRm.js";import"./overlay-Y1uV9JXh.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-C3Ydk4_S.js";import"./avatar-DEZ2jdRE.js";import"./icon-button-Cv65tCEo.js";import"./focus-indicator-CEVhxSoX.js";import"./state-layer-B1dog9AJ.js";import"./autocomplete-Can599Y-.js";import"./label-WOSXuSGL.js";import"./base-field-DRIHvKC6.js";import"./text-field-D3KR3xbP.js";import"./backdrop-CIiH6Dag.js";import"./badge-C-2b81b5.js";import"./banner-BLKtJgKV.js";import"./bottom-sheet-DFevqYLb.js";import"./dialog-Cde_C6WI.js";import"./button-area-Dw3OL1H7.js";import"./button-toggle-group-C2tIdqFv.js";import"./button-D-LT5CJs.js";import"./calendar-BP05pjAZ.js";import"./card-TBBTzmBT.js";import"./checkbox-J6XO052F.js";import"./chip-set-D9nnox5f.js";import"./circular-progress-BqNemWjC.js";import"./color-picker-B8YSaSoX.js";import"./date-picker-tL6NDhU_.js";import"./date-range-picker-B2J5yH4v.js";import"./divider-DCEAIgvP.js";import"./base-drawer-H_Vclf0e.js";import"./drawer-VrFasrSd.js";import"./modal-drawer-B5TY4Qqi.js";import"./mini-drawer-j_wQw-o8.js";import"./expansion-panel-BYub_lss.js";import"./open-icon-CzDwyOPC.js";import"./file-picker-CDpL1Ot9.js";import"./floating-action-button-Dka0CQ5T.js";import"./inline-message-Bn0Suvrv.js";import"./key-item-3pMmNidi.js";import"./keyboard-shortcut-D0cE9nH2.js";import"./label-value-BBtWzpWn.js";import"./listbox-CO7t2xmC.js";import"./meter-group-CTolLv1d.js";import"./page-state-CbLkYdiz.js";import"./paginator-k1AFTL2E.js";import"./radio-group-DEHN-R0v.js";import"./scaffold-DgAVuyRY.js";import"./secret-B3pj__iD.js";import"./option-Cu0cKHXU.js";import"./select-dropdown-C8EFslmZ.js";import"./select-22_XPSIy.js";import"./skip-link-wzLhYB71.js";import"./slider-PEhN9iwN.js";import"./split-view-C1czjq-S.js";import"./stack-BJj2fenZ.js";import"./stepper-weP6F0hj.js";import"./switch-CkArOn15.js";import"./table-Do0wWUEV.js";import"./tab-panel-CUMubjdG.js";import"./time-picker-Cmlt-nOk.js";import"./timestamp-Bypd-NIA.js";import"./toast-B4k1e3RP.js";import"./toolbar-ZKzuHk3g.js";import"./tooltip-CgNnMk9Z.js";import"./tree-item-BUoXr956.js";import"./view-switcher-Cke0UXCI.js";import"./deprecated-icon-button-CSFUt6lD.js";import"./split-button-B2ajRGsp.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Gt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Gt as P,m as W};
