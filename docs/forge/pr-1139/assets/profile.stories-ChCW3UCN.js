import{b as d}from"./iframe-BYO1bXoJ.js";import{s as u,g as f}from"./utils-CJ7ikJXH.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CgDbFrXp.js";import"./app-bar-profile-button-C3sUBGjO.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-7uX1bPDw.js";import"./menu-SXsmU0nM.js";import"./linear-progress-DEYvX0ZE.js";import"./list-CUmFk2WX.js";import"./popover-CuKDZ7_o.js";import"./overlay-D9banag4.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./skeleton-g_Ea1Wjh.js";import"./avatar-Pe-gyKWB.js";import"./icon-button-BImepwl9.js";import"./focus-indicator-DqIVBzGS.js";import"./state-layer-7HWBWBQu.js";import"./autocomplete-VmbUEKve.js";import"./label-CyCZ1UCZ.js";import"./button-veE_5Z_L.js";import"./button-toggle-group-N0k30em1.js";import"./checkbox-B-0yZncB.js";import"./switch-DecUR8kn.js";import"./base-field-DB0sHKTX.js";import"./text-field-DckKtu6K.js";import"./backdrop-DuhijlGd.js";import"./badge-BSBXRVV9.js";import"./banner-RxH9PBMw.js";import"./bottom-sheet-BE6jby3V.js";import"./dialog-CIwcrJYI.js";import"./button-area-B5LsVFiC.js";import"./calendar-Bujdz0BK.js";import"./card-5StB8P4_.js";import"./chip-set-B4dHo4ot.js";import"./circular-progress-uG5S0Plk.js";import"./color-picker-5rEyvrtD.js";import"./date-picker-CAww9mwx.js";import"./date-range-picker-CW9JHMvC.js";import"./divider-B2dPZjC5.js";import"./base-drawer-CUYrr1Bq.js";import"./drawer-BTwfPRXS.js";import"./modal-drawer-DlWTH1RZ.js";import"./mini-drawer-BzvDiXZa.js";import"./expansion-panel-Dx3PbgF2.js";import"./open-icon-Dg4qPtaB.js";import"./file-picker-Bme8l4HH.js";import"./floating-action-button-BRi3u1AT.js";import"./inline-message-CzR1CZl4.js";import"./key-item-CVkV1sHw.js";import"./keyboard-shortcut-BTgVW-5n.js";import"./label-value-CI8WZIke.js";import"./meter-group-D1KROUAU.js";import"./page-state-DLzWYTpL.js";import"./paginator-Bh-XIb0k.js";import"./scaffold-D6_2VrU0.js";import"./secret-D3l6_4sJ.js";import"./select-dropdown-CVslYo1R.js";import"./select-CpezNZUX.js";import"./skip-link-DoVJDQlL.js";import"./slider-j7mpEEET.js";import"./split-view-CCHub0uH.js";import"./stack-Ck9YjAi0.js";import"./stepper-B81M3veq.js";import"./table-BR1WVNzO.js";import"./tab-bar-CsglugRe.js";import"./time-picker-Dy29saUm.js";import"./toast-CNCDdfcv.js";import"./toolbar-Bt_F_1V6.js";import"./tooltip-BGJQ-ppx.js";import"./tree-item-SvntF2Jy.js";import"./view-switcher-CbwfYveT.js";import"./deprecated-icon-button-DTwkfEMu.js";import"./split-button-Di2LMism.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],zt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,zt as P,m as W};
