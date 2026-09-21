import{b as d}from"./iframe-DwkZy6ch.js";import{s as u,g as f}from"./utils-CElmhe9Y.js";import"./service-adapter-DlT-lJx7.js";import"./accordion-CtJ72rDV.js";import"./app-bar-menu-button-D3dPyZpV.js";import"./app-bar-profile-button-BTbgdMiS.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-9EkLoMUE.js";import"./menu-Bd2MhDLk.js";import"./linear-progress-VpC6qUWa.js";import"./list-Bduf0Zil.js";import"./popover-C4YB0wev.js";import"./overlay-B-1J0zGL.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-Bcd9Y6-A.js";import"./list-item-CIx9kMCC.js";import"./avatar-DLDYNb-a.js";import"./icon-button-DXyGa-P5.js";import"./autocomplete-Xjgqcxaa.js";import"./label-70FYznpm.js";import"./base-field-5Se0asf2.js";import"./focus-indicator-BtaUH7my.js";import"./text-field-CV-bF5Ih.js";import"./backdrop-Dvs4MPLP.js";import"./badge-C2VBIu6v.js";import"./banner-Bu8Anzju.js";import"./bottom-sheet-B0j07x_I.js";import"./dialog-QJx-v7BT.js";import"./button-area-oUFLLW2c.js";import"./button-toggle-group-vd5ZbBBl.js";import"./button-QeQK8Yg7.js";import"./calendar-DSvvH4nC.js";import"./card-DxaruR79.js";import"./checkbox-Bi8KCRa6.js";import"./chip-set-CEQkdvSk.js";import"./state-layer-Y1FZSPuC.js";import"./circular-progress-BL_OHw4o.js";import"./color-picker-33E9RlL_.js";import"./date-picker-BGVTb3QZ.js";import"./date-range-picker-BQKMRHcU.js";import"./divider-71N8vs5P.js";import"./base-drawer-C3RB7KRX.js";import"./drawer-seV_42ug.js";import"./modal-drawer-DW4U7DBA.js";import"./mini-drawer-Bw1AxUWG.js";import"./expansion-panel-B1ffAQW3.js";import"./open-icon-CGQUjBxf.js";import"./file-picker-C5QWQifj.js";import"./floating-action-button-4iTEpwaw.js";import"./inline-message-BXrlbIvc.js";import"./key-item-DSAYwxkp.js";import"./keyboard-shortcut-C_nFFeng.js";import"./label-value-CDNJ622N.js";import"./meter-group-IEtErnoG.js";import"./page-state-C_fHeyC9.js";import"./paginator-CNKT7gwL.js";import"./radio-group-zg5FoE70.js";import"./scaffold-D8DtzjhO.js";import"./secret-7ORwUKq9.js";import"./select-dropdown-DTUdN2Jt.js";import"./select-Bn-DBh6r.js";import"./skip-link-CL6ldFss.js";import"./slider-B_cIa7DA.js";import"./split-view-DeW7eSg7.js";import"./stack-E4V9OTtJ.js";import"./stepper-mhphRrIG.js";import"./switch-BcwTBrV_.js";import"./table-mjgiOhyJ.js";import"./tab-panel-CS7YLRpv.js";import"./time-picker-CKBED7L1.js";import"./timestamp-DRq0YvCI.js";import"./toast-BlHodLii.js";import"./toolbar-BuA_G-vH.js";import"./tooltip-DOmotIMW.js";import"./tree-item-B9-ge35T.js";import"./view-switcher-A6YmNtwM.js";import"./deprecated-icon-button-D4R-HzXn.js";import"./split-button-DUsg5XgJ.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
