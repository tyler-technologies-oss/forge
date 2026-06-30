import{b as d}from"./iframe-Bfg2uZTa.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CUSy1ntY.js";import"./app-bar-profile-button-BWqDAcw7.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DhrXh05m.js";import"./menu-TJktNs2Z.js";import"./linear-progress-dFUODLVX.js";import"./list-D4RDS00_.js";import"./popover-CZRIaKbl.js";import"./overlay-CX_m1mvq.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BxrGynUp.js";import"./avatar-BsnMbUEW.js";import"./icon-button-nLrNPw3i.js";import"./focus-indicator-47cYGsrZ.js";import"./state-layer-CKPcsXao.js";import"./autocomplete-BDd1PVm9.js";import"./label-CCJpr-qV.js";import"./base-field-BjqqhzK4.js";import"./text-field-wtzOcz9V.js";import"./backdrop--ezx6yHr.js";import"./badge-B5Ep5LLZ.js";import"./banner-n8BlLdxs.js";import"./bottom-sheet-D4YyTlPZ.js";import"./dialog-D3n85AUX.js";import"./button-area-C1NUgLKJ.js";import"./button-toggle-group-DWHTL-WQ.js";import"./button-CVZtqpxu.js";import"./calendar-3F4HkNx3.js";import"./card-CxkPqRIJ.js";import"./checkbox-CyRTHxOS.js";import"./chip-set-Cd-d2kKf.js";import"./circular-progress-BvJErdQG.js";import"./color-picker-DClRiMWx.js";import"./date-picker-DYOKto9L.js";import"./date-range-picker-DhLTRX1i.js";import"./divider-Csu0TOQu.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BJC8mhbC.js";import"./modal-drawer-C_HzRa2f.js";import"./mini-drawer-CJFzgWnt.js";import"./expansion-panel-D6OKiVMj.js";import"./open-icon-BXNLRk6o.js";import"./file-picker-BkCSjWxU.js";import"./floating-action-button-CwMQIeCS.js";import"./inline-message-1YYbEfHN.js";import"./key-item-DsxsvZul.js";import"./keyboard-shortcut-BfGjSdO4.js";import"./label-value-CMJEsLJf.js";import"./meter-group-BtAjpcWW.js";import"./page-state-BwPC_Hd9.js";import"./paginator-_aPGT87E.js";import"./radio-group-BLmzJILs.js";import"./scaffold-BAVRvYZ-.js";import"./secret-DnhOwFfk.js";import"./select-dropdown-Upok1O8D.js";import"./select-Dcf_3rvD.js";import"./skip-link-BB4ErJ1m.js";import"./slider-DKkokCOc.js";import"./split-view-G7dtWoJX.js";import"./stack-BRmnsrL_.js";import"./stepper-rWwAhdb8.js";import"./switch-B4R1nrY3.js";import"./table-BVnGAHWz.js";import"./tab-bar-CjBLg8et.js";import"./time-picker-BmFeXWIC.js";import"./toast-Z-d2j869.js";import"./toolbar-m2auwteb.js";import"./tooltip-CE7u4Ary.js";import"./tree-item-D3DP7uoz.js";import"./view-switcher-B4ao6iwI.js";import"./deprecated-icon-button-CiVpxXTC.js";import"./split-button-CNMZXSfG.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
