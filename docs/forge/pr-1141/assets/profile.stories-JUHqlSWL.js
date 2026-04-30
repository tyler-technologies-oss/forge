import{b as d}from"./iframe-BFW7YWlB.js";import{s as u,g as f}from"./utils-QQyHyWEl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DokLnDdY.js";import"./app-bar-profile-button-C64nCZRN.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DQMeF6yH.js";import"./menu-CgBBc9hS.js";import"./linear-progress-DP1CUIRM.js";import"./list-k9uowSdC.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-B3R-rdGi.js";import"./icon-button-wNNdlPvC.js";import"./focus-indicator-C_B6JppV.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-5mjxNQKe.js";import"./label-D3Vdya6k.js";import"./button-DbKxolDm.js";import"./button-toggle-group-RnMUkgAq.js";import"./checkbox-BNLnUeCQ.js";import"./switch-B2Qi6Utt.js";import"./base-field-XN4MRaN0.js";import"./text-field-R07YI3UV.js";import"./backdrop-B_VtJyIN.js";import"./badge-CbEpSqd1.js";import"./banner-BVVD7KLU.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-Bmvosrlm.js";import"./calendar-CXBKejPR.js";import"./card-MJdJuZf2.js";import"./chip-set-6XoOlk7g.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-C8uD3Yx9.js";import"./date-picker-DhHJJ5ml.js";import"./date-range-picker-DjdkzPdP.js";import"./divider-vgdESE-P.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-E8w8G0YP.js";import"./open-icon-DqYVi-aM.js";import"./file-picker-CUwSXBua.js";import"./floating-action-button-BWLSe_WV.js";import"./inline-message-BK9gijHu.js";import"./key-item-DSrNhlmr.js";import"./keyboard-shortcut-l_7IGp-t.js";import"./label-value-BE9wSmbi.js";import"./meter-group-DeRTwoJ-.js";import"./page-state-BYBCycIs.js";import"./paginator-CQ4jJohn.js";import"./scaffold-D_SIXSFE.js";import"./secret-DXPJ-7vs.js";import"./select-dropdown-CwMqm43c.js";import"./select-lAQX7ytG.js";import"./skip-link-BRHUDAm_.js";import"./slider-t26o2hKz.js";import"./split-view-i8n3VHgw.js";import"./stack-BuaXNRar.js";import"./stepper-Cf95evc7.js";import"./table-BVUOItFD.js";import"./tab-bar-DMXSHSL7.js";import"./time-picker-WmT8slh-.js";import"./toast-CPxI2Wnw.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-CwC3AoHc.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-D0gHGYSA.js";import"./split-button-Cq3SYXOj.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
