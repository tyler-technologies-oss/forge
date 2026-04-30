import{b as d}from"./iframe-RG4AteXL.js";import{s as u,g as f}from"./utils-QQyHyWEl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DUiK2iLU.js";import"./app-bar-profile-button-C_ssSlG1.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-C1wWF1Hq.js";import"./menu-nJNxbtHd.js";import"./linear-progress-DP1CUIRM.js";import"./list-DmBUcRhm.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-CkB6x8L-.js";import"./icon-button-pmtLZWcN.js";import"./focus-indicator-CehtTkZm.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-B501xbsh.js";import"./label-CADSmPhU.js";import"./button-CMmP2j-S.js";import"./button-toggle-group-DtXTy3Uw.js";import"./checkbox-BeCKtCuf.js";import"./switch-DpeP_TGn.js";import"./base-field-C0b8cCwN.js";import"./text-field-Dcl-JQUv.js";import"./backdrop-B_VtJyIN.js";import"./badge-CUmGRJYj.js";import"./banner-Cqnv8hOY.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-DbTw35HJ.js";import"./calendar-BUySEfdQ.js";import"./card-CyrR4Cit.js";import"./chip-set-CXkAfkYr.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-BIljWwe7.js";import"./date-picker-DhXigk1g.js";import"./date-range-picker-BVDzDJhf.js";import"./divider-zXroij5z.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-DidL3-YZ.js";import"./open-icon-UsbmuAHw.js";import"./file-picker-DoHezg04.js";import"./floating-action-button-CZ1bydxX.js";import"./inline-message-BK9gijHu.js";import"./key-item-DcWOB1tj.js";import"./keyboard-shortcut-DrXNDDRS.js";import"./label-value-BE9wSmbi.js";import"./meter-group-CD3pj36p.js";import"./page-state-BYBCycIs.js";import"./paginator-B8VPmVUZ.js";import"./scaffold-D_SIXSFE.js";import"./secret-BK7b6Yop.js";import"./select-dropdown-D7D5F4Sg.js";import"./select-Csmu1gyx.js";import"./skip-link-xwQ1dxne.js";import"./slider-DUS2WuVu.js";import"./split-view-9FpqQbvb.js";import"./stack-BuaXNRar.js";import"./stepper-DvMSteEy.js";import"./table-COzNmUVD.js";import"./tab-bar-k1rqHlpi.js";import"./time-picker-BkpGYEgH.js";import"./toast-NFT--ZfE.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-D0eC07Xp.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-D53SnSZV.js";import"./split-button-B5fsAQZl.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
