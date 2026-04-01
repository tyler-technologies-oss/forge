import{b as d}from"./iframe-jQDb9HOx.js";import{s as u,g as f}from"./utils-QQyHyWEl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BaxZ1nbV.js";import"./app-bar-profile-button-B7HTbYYH.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CMhLRNQd.js";import"./menu-dg1zPm3i.js";import"./linear-progress-DP1CUIRM.js";import"./list-B40uNwDN.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-BIT1XZ0z.js";import"./icon-button-llDXN8bF.js";import"./focus-indicator-DHkP3feK.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-3QtFtWKA.js";import"./label-CbdjOoPP.js";import"./button-CONmEHCg.js";import"./button-toggle-group-BjvXwQmM.js";import"./checkbox-CwBr0x_Y.js";import"./switch-fKb4y1PT.js";import"./base-field-CpbOJt1a.js";import"./text-field-DMVNWxHf.js";import"./backdrop-B_VtJyIN.js";import"./badge-QMbx30oT.js";import"./banner-CMC34fNp.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-DJuFpObz.js";import"./calendar-BjLtISOD.js";import"./card-BtW70zEK.js";import"./chip-set-CfX3288k.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-BTF6c108.js";import"./date-picker-B1s-HCWI.js";import"./date-range-picker-BdXCjzO0.js";import"./divider-T_rgxRv5.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-oTW3uKg8.js";import"./open-icon-6HtjGE36.js";import"./file-picker-DKC2F7G-.js";import"./floating-action-button-GPodU8-D.js";import"./inline-message-BK9gijHu.js";import"./key-item-mLf2f234.js";import"./keyboard-shortcut-Daf5NqJG.js";import"./label-value-BE9wSmbi.js";import"./meter-group-CxYr-qCy.js";import"./page-state-BYBCycIs.js";import"./paginator-CBel58TI.js";import"./scaffold-D_SIXSFE.js";import"./secret-Ch8w-Wtu.js";import"./select-dropdown-CneakloT.js";import"./select-DdKvbzkE.js";import"./skip-link-BrgeHCKV.js";import"./slider-BYpb_yIM.js";import"./split-view-B_Cbcuix.js";import"./stack-BuaXNRar.js";import"./stepper-DzL4hhlW.js";import"./table-CQor_87X.js";import"./tab-bar-DtUZFDkL.js";import"./time-picker-M8R-6BN6.js";import"./toast-Ci7Kh7X1.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-DhoEk3Oo.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-DX-nnrz3.js";import"./split-button-DdFcyJ1l.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
