import{b as d}from"./iframe-CxtGcj9H.js";import{s as u,g as f}from"./utils-BnVlj7nJ.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DjXn-3_N.js";import"./app-bar-profile-button-DmMr91Xk.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DJIRyMjT.js";import"./menu-DFtptmck.js";import"./linear-progress-DP1CUIRM.js";import"./list-KgF2LIen.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-BKKsFZON.js";import"./icon-button-CkoWzqXc.js";import"./focus-indicator-IJRdyIhI.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-pfuUSX-t.js";import"./label-Dk9QEp8G.js";import"./button-B-Cv95tD.js";import"./button-toggle-group-C2NMp1U8.js";import"./checkbox-BTIOz5kY.js";import"./switch-BJ9z3ECO.js";import"./base-field-CuEkkME6.js";import"./text-field-RNHS4s_h.js";import"./backdrop-B_VtJyIN.js";import"./badge-Z-Ba3-wI.js";import"./banner-D9R1B1xB.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-CE7BPtgR.js";import"./calendar-CovX6Rk6.js";import"./card-hC7PUKPD.js";import"./chip-set-DCAbi3uF.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-AO50sG-m.js";import"./date-picker-B0AEsYJy.js";import"./date-range-picker-DjG6HA3q.js";import"./divider-_OsIPQyN.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-DPiY-JsS.js";import"./open-icon-CSOQ5sZh.js";import"./file-picker-DPrIVW73.js";import"./floating-action-button-oeJT8GDm.js";import"./inline-message-BK9gijHu.js";import"./key-item-3_MvKsu0.js";import"./keyboard-shortcut-Cqk1VOTu.js";import"./label-value-BE9wSmbi.js";import"./meter-group-CaD07G15.js";import"./page-state-BYBCycIs.js";import"./paginator-D2ay2Euo.js";import"./scaffold-D_SIXSFE.js";import"./secret-saRTRJ6a.js";import"./select-dropdown-DUtBP_Dm.js";import"./select-CKNbJGhb.js";import"./skip-link-DpsoZ-45.js";import"./slider-Cei1dsiU.js";import"./split-view-DL2FW59K.js";import"./stack-BuaXNRar.js";import"./stepper-gd-tdcu4.js";import"./table-CsEhKKO6.js";import"./tab-bar-OqwD1GrK.js";import"./time-picker-_8n2GYzQ.js";import"./toast-Cj0qORbE.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-5gpZdrqr.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-CBBEEkBv.js";import"./split-button-JNlkLEtW.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
