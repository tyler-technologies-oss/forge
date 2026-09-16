import{b as d}from"./iframe-C8qvgkWs.js";import{s as u,g as f}from"./utils-DJhy9_a3.js";import"./service-adapter-8tADcN_b.js";import"./accordion-uu5v9wc8.js";import"./app-bar-profile-button-DlNTOzDk.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-mQAAeURf.js";import"./menu-CIFOc0VJ.js";import"./linear-progress-DLb8lZjg.js";import"./list-JHtz7INH.js";import"./popover-DaDXCC47.js";import"./overlay-yq4T8o0m.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-TYHSOg_u.js";import"./avatar-BPktRV6z.js";import"./icon-button-DYY8bfWG.js";import"./focus-indicator-Bw-He_Dx.js";import"./state-layer-RJ83GVyt.js";import"./autocomplete-BG3jGjD5.js";import"./label-B17fuSeR.js";import"./button-Df4PRT3k.js";import"./button-toggle-group-7CGqyLTH.js";import"./checkbox-BlrXuvPQ.js";import"./switch-CuQRF9i0.js";import"./base-field-C3884F-h.js";import"./text-field-BMUiCuoX.js";import"./backdrop-Br-v5NXK.js";import"./badge-BgLUUI43.js";import"./banner-BgIwpVZm.js";import"./bottom-sheet-CYPNqcjy.js";import"./dialog-BAAkdPx4.js";import"./button-area-BRTWYtZZ.js";import"./calendar-w_3KiiiN.js";import"./card-BijNrRDy.js";import"./chip-set-Cd9z4T0x.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-DYhX2AIp.js";import"./date-picker-CPO4X6qW.js";import"./date-range-picker-WJMvdiNW.js";import"./divider-CyxeBvoW.js";import"./base-drawer-DgtNmrYs.js";import"./drawer-BD1OwPL1.js";import"./modal-drawer-BSNPPupX.js";import"./mini-drawer-DLEI9OBr.js";import"./expansion-panel-BqGfEZM0.js";import"./open-icon-CxHpZY5S.js";import"./file-picker-CSznQnzT.js";import"./floating-action-button-oznK8-aL.js";import"./inline-message-EO-dHXbB.js";import"./key-item-D0Z97Shw.js";import"./keyboard-shortcut-CylBMKnx.js";import"./label-value-C46r41pN.js";import"./meter-group-VE1aslow.js";import"./page-state-BeEclPwI.js";import"./paginator-Dw5C9lWh.js";import"./scaffold-B-1oYF3d.js";import"./secret-DM8pbca-.js";import"./select-dropdown-9aLjsoRo.js";import"./select-t_WfVuPi.js";import"./skip-link-Dk8SzYUZ.js";import"./slider-CvRIbxcq.js";import"./split-view-CSypF4rL.js";import"./stack-DskzmGQg.js";import"./stepper-UuSgqkNt.js";import"./table-Dz4n5XJy.js";import"./tab-bar-CcH4HRrF.js";import"./time-picker-n-uNTDT8.js";import"./toast-Ddmy9_7b.js";import"./toolbar-flUGbESJ.js";import"./tooltip-Bwds6NfI.js";import"./tree-item-BcePPynl.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-CeDLL_XR.js";import"./split-button-DpAy-zgN.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
