import{b as d}from"./iframe-M_rhnTR1.js";import{s as u,g as f}from"./utils-D34GR8-a.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CHJDUFGD.js";import"./app-bar-profile-button-Bg8z4-9S.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-3BKCvRvJ.js";import"./menu-DEdrNeCe.js";import"./linear-progress-DP1CUIRM.js";import"./list-Dh2yXr00.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-C143zGcw.js";import"./icon-button-B9m9DVQB.js";import"./focus-indicator-Dklc76jU.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-BUS9ur-Y.js";import"./label-DhLAMQIi.js";import"./button-DDrog7fD.js";import"./button-toggle-group-CfY8JZEg.js";import"./checkbox-DGIiaQM2.js";import"./switch-CBDDVmLA.js";import"./base-field-DSz57eqy.js";import"./text-field-idXY4M-8.js";import"./backdrop-B_VtJyIN.js";import"./badge-BxVD_U0L.js";import"./banner-Bp4rNeGw.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-B1t9G6nf.js";import"./calendar-jtGJyRl8.js";import"./card-D1abBM62.js";import"./chip-set-C6u5XHSM.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-CTYbMkDl.js";import"./date-picker-CPfsoWJr.js";import"./date-range-picker-CwRnLT_T.js";import"./divider-MKlUalfD.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-Ck9G14Fv.js";import"./open-icon-DDaCvIFO.js";import"./file-picker-DQ4QdOLZ.js";import"./floating-action-button-cvledlvU.js";import"./inline-message-BK9gijHu.js";import"./key-item-DY0nBt8m.js";import"./keyboard-shortcut-M3MVUcgn.js";import"./label-value-BE9wSmbi.js";import"./meter-group-DrwsYz0b.js";import"./page-state-BYBCycIs.js";import"./paginator-DCYvt4S5.js";import"./scaffold-D_SIXSFE.js";import"./secret-BbK0eeoN.js";import"./select-dropdown-DiLMwVgq.js";import"./select-BEt1Uoyi.js";import"./skip-link-DiaWsEyd.js";import"./slider-BylxH7Eo.js";import"./split-view-BRmXujoz.js";import"./stack-BuaXNRar.js";import"./stepper-DFpKoTBq.js";import"./table-Cb7m1bp9.js";import"./tab-bar-CnW0mLv3.js";import"./time-picker-CeZzUytm.js";import"./toast-D4RDaUZe.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-D1OLy6KI.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-DDx3zjJM.js";import"./split-button-B7qbbR-L.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
