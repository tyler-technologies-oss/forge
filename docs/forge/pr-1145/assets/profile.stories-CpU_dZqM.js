import{b as d}from"./iframe-C_y89U-L.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-6q1ry6_-.js";import"./app-bar-profile-button-DnDkfm9n.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-ErbcogQE.js";import"./menu-Bvx7MEq-.js";import"./linear-progress-dFUODLVX.js";import"./list-DLWrXLig.js";import"./popover-CZRIaKbl.js";import"./overlay-CX_m1mvq.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BxrGynUp.js";import"./avatar-CBSM0gBF.js";import"./icon-button-BpuNSx44.js";import"./focus-indicator-_-X7rpwi.js";import"./state-layer-CKPcsXao.js";import"./autocomplete-BD3bIlhn.js";import"./label-CCJpr-qV.js";import"./base-field-CmXaQlYT.js";import"./text-field-Y5Q5K-XK.js";import"./backdrop--ezx6yHr.js";import"./badge-D15NY2uR.js";import"./banner-oE0kETWp.js";import"./bottom-sheet-D4YyTlPZ.js";import"./dialog-D3n85AUX.js";import"./button-area-DFO2SrTm.js";import"./button-toggle-group-Bmwrgt5a.js";import"./button-DzytO-Um.js";import"./calendar-C-Z2AQ2J.js";import"./card-CwrY8OUO.js";import"./checkbox-C8gtVlq_.js";import"./chip-set-uo7S8kL6.js";import"./circular-progress-BvJErdQG.js";import"./color-picker-B3shReSM.js";import"./date-picker-Cto1qhI_.js";import"./date-range-picker-BX3-Jr10.js";import"./divider-CEpOIxm1.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BJC8mhbC.js";import"./modal-drawer-C_HzRa2f.js";import"./mini-drawer-CJFzgWnt.js";import"./expansion-panel-CDC5JYvk.js";import"./open-icon-DZBro1nZ.js";import"./file-picker-D8XVk--C.js";import"./floating-action-button-CUbSWIye.js";import"./inline-message-1YYbEfHN.js";import"./key-item-v2wVGGtm.js";import"./keyboard-shortcut-CJVT8cyI.js";import"./label-value-CMJEsLJf.js";import"./meter-group-CiFrqMdS.js";import"./page-state-BwPC_Hd9.js";import"./paginator-D7t54Ijv.js";import"./radio-group-BayGAJCm.js";import"./scaffold-BAVRvYZ-.js";import"./secret-DKcX7Wcd.js";import"./select-dropdown-CVYPdtAs.js";import"./select-CafjWxUK.js";import"./skip-link-EhEy0l2U.js";import"./slider-1Gxd0XsF.js";import"./split-view-BBE1UJ5j.js";import"./stack-BRmnsrL_.js";import"./stepper-Cf05DTsr.js";import"./switch-D5B52yrg.js";import"./table-DsLW64sO.js";import"./tab-bar-d5eRjNgx.js";import"./time-picker-CsHKofGs.js";import"./toast-DFpS9r4j.js";import"./toolbar-m2auwteb.js";import"./tooltip-CE7u4Ary.js";import"./tree-item-DVTf7SsP.js";import"./view-switcher-B4ao6iwI.js";import"./deprecated-icon-button-QeBcPUi8.js";import"./split-button-CrKkYv6m.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
