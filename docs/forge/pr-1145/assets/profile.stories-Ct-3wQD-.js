import{b as d}from"./iframe-btN_zwTw.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-1QaRghsX.js";import"./app-bar-profile-button-C_y26m9_.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-tV2RfHbB.js";import"./menu-Dw45Q3pV.js";import"./linear-progress-dFUODLVX.js";import"./list-DCfdNf-1.js";import"./popover-CZRIaKbl.js";import"./overlay-CX_m1mvq.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BxrGynUp.js";import"./avatar-CuBo6Kv8.js";import"./icon-button-x3vvpLmo.js";import"./focus-indicator-BicTiHsY.js";import"./state-layer-CKPcsXao.js";import"./autocomplete-CNFFILuU.js";import"./label-CCJpr-qV.js";import"./base-field-B6th7P-B.js";import"./text-field-B8OIX03e.js";import"./backdrop--ezx6yHr.js";import"./badge-km4NfZJq.js";import"./banner-BSo4GDUe.js";import"./bottom-sheet-D4YyTlPZ.js";import"./dialog-D3n85AUX.js";import"./button-area-CXcKTOWc.js";import"./button-toggle-group--w2oXYns.js";import"./button-BEMK5DxP.js";import"./calendar-ZkzIiERM.js";import"./card-BMrhMMw8.js";import"./checkbox-BX1EqKj5.js";import"./chip-set-BynAptQf.js";import"./circular-progress-BvJErdQG.js";import"./color-picker-jk0fU2dm.js";import"./date-picker-DOQQHwqd.js";import"./date-range-picker-DLFvOg3U.js";import"./divider-Dm_3dLiN.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BJC8mhbC.js";import"./modal-drawer-C_HzRa2f.js";import"./mini-drawer-CJFzgWnt.js";import"./expansion-panel-DW0u-XN6.js";import"./open-icon-0sGZhyMz.js";import"./file-picker-INNWTYXN.js";import"./floating-action-button-k9ZDRmMc.js";import"./inline-message-1YYbEfHN.js";import"./key-item-CokixxnL.js";import"./keyboard-shortcut-V72MmCax.js";import"./label-value-CMJEsLJf.js";import"./meter-group-BiPSizYG.js";import"./page-state-BwPC_Hd9.js";import"./paginator-Y2aHBM2f.js";import"./radio-group-Cx-BD8az.js";import"./scaffold-BAVRvYZ-.js";import"./secret-F61tpDTn.js";import"./select-dropdown-BgVRVeG7.js";import"./select-JcWwiHXt.js";import"./skip-link-Dabos95L.js";import"./slider-DucDb6KG.js";import"./split-view-DrsQN6fj.js";import"./stack-BRmnsrL_.js";import"./stepper-DJKCPwJV.js";import"./switch-DaaIQuPU.js";import"./table-BRfOONmh.js";import"./tab-bar-CoHUvfdp.js";import"./time-picker-BnipKftT.js";import"./toast-CgY2kH8V.js";import"./toolbar-m2auwteb.js";import"./tooltip-CE7u4Ary.js";import"./tree-item-Cjkm62Tp.js";import"./view-switcher-B4ao6iwI.js";import"./deprecated-icon-button-ph_jFkvX.js";import"./split-button-DqRPQiWb.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
