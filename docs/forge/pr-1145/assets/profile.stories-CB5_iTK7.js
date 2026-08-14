import{b as d}from"./iframe-D-kzxlTe.js";import{s as u,g as f}from"./utils-Dqt0WMIK.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CDrl-3Kt.js";import"./app-bar-profile-button-B3ejoXMu.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-B5dYKNa7.js";import"./menu-IcrVouBQ.js";import"./linear-progress-CsGp1g6o.js";import"./list-Bp34FSFk.js";import"./popover-BhV83ncR.js";import"./overlay-C6X10PQi.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-Ddjx93Tq.js";import"./avatar-Cwx0NZh0.js";import"./icon-button-B_RqyrDO.js";import"./focus-indicator-6toabG7w.js";import"./state-layer-Wu0zWm6m.js";import"./autocomplete-ChD8_AzK.js";import"./label-B2djtkp_.js";import"./base-field-CM0jJOgO.js";import"./text-field-aVfW1cz0.js";import"./backdrop-3KzDwztH.js";import"./badge-BwBc5Jpn.js";import"./banner-C7KoUbrP.js";import"./bottom-sheet-DmcGxX1L.js";import"./dialog-D9E1kPE3.js";import"./button-area-DOvY1et2.js";import"./button-toggle-group-BUgSNnGj.js";import"./button-Dosfbvot.js";import"./calendar-Dau33S19.js";import"./card-Ds63PTPP.js";import"./checkbox-jmzTP_vg.js";import"./chip-set-Cm_Ev7Nv.js";import"./circular-progress-DIduwjig.js";import"./color-picker-y5dPIN5f.js";import"./date-picker-DxNYoaEh.js";import"./date-range-picker-Cl6G3_4M.js";import"./divider-D_SojafC.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DV7w1-5L.js";import"./modal-drawer-BwzSP7R6.js";import"./mini-drawer-liQMnkLy.js";import"./expansion-panel-Cuc-KBNB.js";import"./open-icon-DTjQ_jxn.js";import"./file-picker-BrNNfg7g.js";import"./floating-action-button-BR8sLgm0.js";import"./inline-message-fj34p3Px.js";import"./key-item-B-1__NIv.js";import"./keyboard-shortcut-Aa4X1lf9.js";import"./label-value-cTsUvwyw.js";import"./meter-group-B3XqWnaw.js";import"./page-state-DDjhdZbK.js";import"./paginator-CF3jiAVC.js";import"./radio-group-C5y0osOa.js";import"./scaffold-CufLEZ-a.js";import"./secret-BoWSi5aU.js";import"./select-dropdown-DxpUlHw1.js";import"./select-CSVqiHAV.js";import"./skip-link-BFFGpg2P.js";import"./slider-_7KiRgjI.js";import"./split-view-ATIThv1L.js";import"./stack-Bc7kWG9C.js";import"./stepper-Dy9GUySK.js";import"./switch-DtCnelBu.js";import"./table-Dp3cCguR.js";import"./tab-panel-B26sge63.js";import"./time-picker-xyoSIrSa.js";import"./timestamp-BxdjmxXE.js";import"./toast-CtyvTsq2.js";import"./toolbar-Dno1LWJP.js";import"./tooltip-CIPbr1qD.js";import"./tree-item-DoTOZjFg.js";import"./view-switcher-BSHD_isP.js";import"./deprecated-icon-button-DWSNK9sX.js";import"./split-button-CTFcJu0M.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Yt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Yt as P,m as W};
