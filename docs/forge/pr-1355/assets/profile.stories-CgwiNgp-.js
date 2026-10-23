import{b as d}from"./iframe-BJl9WzyY.js";import{s as u,g as f}from"./utils-BIy79ypG.js";import"./service-adapter-8tADcN_b.js";import"./accordion-uJwPA7Dj.js";import"./app-bar-menu-button-2F0fWcoU.js";import"./app-bar-profile-button-Co4HuSZS.js";import{I as g}from"./icon-4j55E3iS.js";import"./menu-YvaPBPN_.js";import{a as E,b,c as C,d as y}from"./tyler-icons-6f2n3B-C.js";import"./linear-progress-BNAgl3n6.js";import"./list-DwCb4DW0.js";import"./popover--d8eA_uV.js";import"./overlay-CP97VZFA.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-CmYlvMcd.js";import"./list-item-BITURLP4.js";import"./avatar-CFbwvf4T.js";import"./icon-button-BjiGUEcN.js";import"./autocomplete-CrR62g3l.js";import"./label-DZMar2Lh.js";import"./base-field-DersBkgE.js";import"./focus-indicator-spyGQm32.js";import"./text-field-BHr8z7_W.js";import"./backdrop-ngk7d2eo.js";import"./badge-AjPfUkJl.js";import"./banner-cZQok0Ur.js";import"./bottom-sheet-CIuCWD4l.js";import"./dialog-BNJo_hP-.js";import"./button-area-CEvzkTg9.js";import"./button-toggle-group-BOkH97Bx.js";import"./button-CDo-p3Lo.js";import"./calendar-CfinLd2I.js";import"./card-DdYS2LLh.js";import"./checkbox-Cv0zf-RQ.js";import"./chip-set-NsmocWnz.js";import"./state-layer-oVncPkRT.js";import"./circular-progress-BAYLkjmK.js";import"./color-picker-Bu4tfWak.js";import"./date-picker-y9Apiihs.js";import"./date-range-picker-BOPusYZ7.js";import"./divider-D8EUDr9B.js";import"./base-drawer-CRoTqCXm.js";import"./drawer-B-CimXk8.js";import"./modal-drawer-CrxWsVl8.js";import"./mini-drawer-Bt5EnS2p.js";import"./expansion-panel-Bf43yulM.js";import"./open-icon-BB41ut13.js";import"./file-picker-CbHCk2O7.js";import"./floating-action-button-B6UVX1mf.js";import"./inline-message-XoyeymbY.js";import"./kbd-9_MtPvUG.js";import"./key-item-CIQ7G-uZ.js";import"./keyboard-shortcut-D3HOoDnx.js";import"./label-value-C0-wovkK.js";import"./listbox-CiFxGNGA.js";import"./meter-group-7-DUR9rr.js";import"./page-state-DvaZGddB.js";import"./paginator-BgFiBcIe.js";import"./process-stepper-DlSj_3Qq.js";import"./radio-group-oNZqV0WG.js";import"./scaffold-Ca9xBuAs.js";import"./secret-B4IQ3AC-.js";import"./option-group-DV2aaa-X.js";import"./select-dropdown-CF9aDDcA.js";import"./select-e0dqW9CL.js";import"./skip-link-BWRksQmD.js";import"./slider-ClmLqMT7.js";import"./split-view-BvQMUbp_.js";import"./stack-DkbBaB-O.js";import"./stepper-Cwe8t4SO.js";import"./switch-D2tl2wiK.js";import"./table-DBQeotGy.js";import"./tab-panel-D1HDL1r2.js";import"./time-picker-B9TwH82p.js";import"./timestamp-Dgi7y3No.js";import"./toast-BZ7VSbr7.js";import"./toolbar-9YeKVdJA.js";import"./tooltip-xhdEL1O7.js";import"./tree-item-BX7C-6AO.js";import"./view-switcher-BSXTg3U6.js";import"./deprecated-icon-button-BDNi2oZX.js";import"./split-button-BTZdMkxV.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
  `,component:s,argTypes:{...f({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},m={},l={...u,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.warn("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return d`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"{}",...m.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Zt=Object.freeze(Object.defineProperty({__proto__:null,Demo:m,WithCustomContent:l,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{m as D,Zt as P,l as W};
