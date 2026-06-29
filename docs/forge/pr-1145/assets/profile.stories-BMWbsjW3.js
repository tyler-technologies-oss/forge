import{b as d}from"./iframe-B0oG94N-.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-B377wwUs.js";import"./app-bar-profile-button-DqCf68Mu.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BWKaUOa1.js";import"./menu-DDUnLh0l.js";import"./linear-progress-dFUODLVX.js";import"./list-dqETZBFD.js";import"./popover-CZRIaKbl.js";import"./overlay-CX_m1mvq.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BxrGynUp.js";import"./avatar-G-8QA2JL.js";import"./icon-button-D434cbAR.js";import"./focus-indicator-Dt6-rnpH.js";import"./state-layer-CKPcsXao.js";import"./autocomplete-D2e7JsB0.js";import"./label-CCJpr-qV.js";import"./base-field-8wT2kcj3.js";import"./text-field-cytd-rrE.js";import"./backdrop--ezx6yHr.js";import"./badge-DFCF6alF.js";import"./banner-BUgXBLzX.js";import"./bottom-sheet-D4YyTlPZ.js";import"./dialog-D3n85AUX.js";import"./button-area-D6SZgzfZ.js";import"./button-toggle-group-DNvzU7PX.js";import"./button-BwnbxHCK.js";import"./calendar-F2yPtBqv.js";import"./card-BpCJ6bR3.js";import"./checkbox-6L0Zongq.js";import"./chip-set-DzRRlEaV.js";import"./circular-progress-BvJErdQG.js";import"./color-picker-dARDRUbJ.js";import"./date-picker-BtWpNbzS.js";import"./date-range-picker-CPP4mk56.js";import"./divider-B7BplwOh.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BJC8mhbC.js";import"./modal-drawer-C_HzRa2f.js";import"./mini-drawer-CJFzgWnt.js";import"./expansion-panel-CR8R-rJW.js";import"./open-icon-DAI7CzOD.js";import"./file-picker-DBW3gXhd.js";import"./floating-action-button-4vC0U847.js";import"./inline-message-1YYbEfHN.js";import"./key-item-DXr-gI6G.js";import"./keyboard-shortcut-BBzp67gK.js";import"./label-value-CMJEsLJf.js";import"./meter-group-BUwoMnaD.js";import"./page-state-BwPC_Hd9.js";import"./paginator-Cv7V-JMo.js";import"./radio-group-Cu4fRkZJ.js";import"./scaffold-BAVRvYZ-.js";import"./secret-6tnAICFF.js";import"./select-dropdown-DQopsC43.js";import"./select-BBmAFBX-.js";import"./skip-link-Dsd-IdFW.js";import"./slider-2nuCshLk.js";import"./split-view-CS5F4xAv.js";import"./stack-BRmnsrL_.js";import"./stepper-CrJ1-GNs.js";import"./switch-Cd78mdet.js";import"./table-9LV2Swcj.js";import"./tab-bar-CFPVV4zW.js";import"./time-picker-9peu005i.js";import"./toast-BVtjuVDt.js";import"./toolbar-m2auwteb.js";import"./tooltip-CE7u4Ary.js";import"./tree-item-DxS2ifbK.js";import"./view-switcher-B4ao6iwI.js";import"./deprecated-icon-button-DPb70WQS.js";import"./split-button-B_KW4lGC.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
