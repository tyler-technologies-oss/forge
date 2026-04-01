import{b as d}from"./iframe-BvdJaA4G.js";import{s as u,g as f}from"./utils-ArvhHCmN.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DuKD0GMh.js";import"./app-bar-profile-button-uAbzXeB_.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-ClZYEGsY.js";import"./menu-FfiIykVn.js";import"./linear-progress-DP1CUIRM.js";import"./list-BWpUxYmG.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-yhri9B1J.js";import"./icon-button-BUXvDC-3.js";import"./focus-indicator-BEXokKPy.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-dzH_9nLH.js";import"./label-CkoZJ0m4.js";import"./button-gTZyKfjo.js";import"./button-toggle-group-B3SlVcf6.js";import"./checkbox-TeaYephP.js";import"./switch-DWYRhwrx.js";import"./base-field-D15vK5LM.js";import"./text-field-Cz2Z6bVg.js";import"./backdrop-B_VtJyIN.js";import"./badge-CvJaXkWh.js";import"./banner-Bq10nFvj.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-Fh9KtEbw.js";import"./calendar-Dj1IhQI2.js";import"./card-BNpAauEs.js";import"./chip-set-BFpX4Z7b.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-D3JHpYt4.js";import"./date-picker-BZZyiQ9d.js";import"./date-range-picker-CivJeg9C.js";import"./divider-DA0YEleS.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-Dc4sygr6.js";import"./open-icon-DvSlAruO.js";import"./file-picker-DzhFTDMA.js";import"./floating-action-button-hq3t-jHW.js";import"./inline-message-BK9gijHu.js";import"./key-item-SJr7KWef.js";import"./keyboard-shortcut-BMrH-T26.js";import"./label-value-BE9wSmbi.js";import"./meter-group-iC4fN3ku.js";import"./page-state-BYBCycIs.js";import"./paginator-BahMXc3K.js";import"./scaffold-D_SIXSFE.js";import"./secret-MOg2MZGW.js";import"./select-dropdown-DA2VWHC-.js";import"./select-BS9Y5cQS.js";import"./skip-link-_fuflN-l.js";import"./slider-zJLpaoj8.js";import"./split-view-BALr_-Ho.js";import"./stack-BuaXNRar.js";import"./stepper-jZlW10L1.js";import"./table-Cs-WMAk8.js";import"./tab-bar-BXS3l1SX.js";import"./time-picker-DIK6MuA1.js";import"./toast-B4vakWka.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-BTlNY7_8.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-vemnECIo.js";import"./split-button-Cm3wJocI.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
