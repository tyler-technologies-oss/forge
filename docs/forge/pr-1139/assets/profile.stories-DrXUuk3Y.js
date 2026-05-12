import{b as d}from"./iframe-D7toeuV5.js";import{s as u,g as f}from"./utils-C1CTzUk_.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Bx53lz3O.js";import"./app-bar-profile-button-BJ5uxmCw.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BfDJ86wk.js";import"./menu-CV_eDiT9.js";import"./linear-progress-CKPFd0xY.js";import"./list-WfyEpOwy.js";import"./popover-RFnYJev8.js";import"./overlay-DG-q7D2L.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-g_Ea1Wjh.js";import"./avatar-Bw-x7AET.js";import"./icon-button-D3TBTdVI.js";import"./focus-indicator-BVlbyz__.js";import"./state-layer-Cnbc18vB.js";import"./autocomplete-Cand0BVI.js";import"./label-y-y6XQo3.js";import"./button-onU8f-K2.js";import"./button-toggle-group-Cg3BFiWi.js";import"./checkbox-D9piPN62.js";import"./switch-BsL5R70Z.js";import"./base-field-B1BNpBDI.js";import"./text-field-J6Ks6_F4.js";import"./backdrop-DuhijlGd.js";import"./badge-BMrtWCDN.js";import"./banner-DfX_GVFG.js";import"./bottom-sheet-DdW016G8.js";import"./dialog-CxA04cm7.js";import"./button-area-DwLBO5Pm.js";import"./calendar-BGAFoG9u.js";import"./card-BjxqHMTx.js";import"./chip-set-CLwXMIOf.js";import"./circular-progress-45kWhMLs.js";import"./color-picker-BMtXJXQS.js";import"./date-picker-C-s62K5p.js";import"./date-range-picker-WefO8na5.js";import"./divider-CFhEW3qI.js";import"./base-drawer-DBBe93d7.js";import"./drawer-1zFKHC_i.js";import"./modal-drawer-CYb8qJR2.js";import"./mini-drawer-rpwrWM4L.js";import"./expansion-panel-c8XY097v.js";import"./open-icon-C5daFMbU.js";import"./file-picker-sSpE7bLD.js";import"./floating-action-button-DeFaGU-N.js";import"./inline-message-CzR1CZl4.js";import"./key-item-DUZ8DwLL.js";import"./keyboard-shortcut-GGea3HqY.js";import"./label-value-CI8WZIke.js";import"./meter-group-CVx7Pyf3.js";import"./page-state-DLzWYTpL.js";import"./paginator-DQHu-bDB.js";import"./scaffold-D6_2VrU0.js";import"./secret-B4sXyO4I.js";import"./select-dropdown-skILGoAY.js";import"./select-D6EljdJ4.js";import"./skip-link-CtUVN95K.js";import"./slider-Dm-4dXet.js";import"./split-view-Ctu3JDSj.js";import"./stack-DqNjYC3W.js";import"./stepper-By29ln-J.js";import"./table-B7PAaM_z.js";import"./tab-bar-CX93xKzR.js";import"./time-picker-mkOXzOPu.js";import"./toast-Dca2CZ3V.js";import"./toolbar-Bt_F_1V6.js";import"./tooltip-D55Y-3Ye.js";import"./tree-item-DnX62iGv.js";import"./view-switcher-Ckdngb02.js";import"./deprecated-icon-button-Drzelnb3.js";import"./split-button-BcDIb_ZF.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
