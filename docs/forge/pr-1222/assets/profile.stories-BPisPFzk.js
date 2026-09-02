import{b as d}from"./iframe-0q-2v6p2.js";import{s as u,g as f}from"./utils-DYC_LATD.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BkEKWVJ-.js";import"./app-bar-profile-button-DQLQVlTR.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DfvsIf_8.js";import"./menu-DjtOwdpk.js";import"./linear-progress-Dh__ll_M.js";import"./list-C75Ks1_5.js";import"./popover-CD5RYHTR.js";import"./overlay-DD5-5Cd-.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CnedPL3J.js";import"./avatar-DWMyJ-Dd.js";import"./icon-button-wRobUPyU.js";import"./focus-indicator-CoriJI7e.js";import"./state-layer-mJUCxnSJ.js";import"./autocomplete-CVpFBK-5.js";import"./label-6L8FSsax.js";import"./base-field-BLyxUt4_.js";import"./text-field-Bq18GTiN.js";import"./backdrop-6rFKosil.js";import"./badge-Dn01AbJ0.js";import"./banner-1UwTWV4s.js";import"./bottom-sheet-CzIU1Spc.js";import"./dialog-CgsRv-k4.js";import"./button-area-Bhg452d1.js";import"./button-toggle-group-BYgOYoUH.js";import"./button-DZYdKhTn.js";import"./calendar-B8WJiyuB.js";import"./card-CPxRRzBX.js";import"./checkbox-B7ewEX_Z.js";import"./chip-set-DGFDsFEg.js";import"./circular-progress-CNehBhf0.js";import"./color-picker-DmcCqTPB.js";import"./date-picker-Cx_ngoO0.js";import"./date-range-picker-fPm0pdsI.js";import"./divider-DuBICtiR.js";import"./base-drawer-7Wh9lkkV.js";import"./drawer-CRT3lE2E.js";import"./modal-drawer-BijuI8cC.js";import"./mini-drawer-BD00MKTN.js";import"./expansion-panel-BAkaKhRV.js";import"./open-icon-Cl2GS7aQ.js";import"./file-picker-2h1eLmgh.js";import"./floating-action-button-Cgk7o6f1.js";import"./inline-message-DGh2LsDu.js";import"./kbd-DzWgYmEM.js";import"./key-item-UcRRAcRX.js";import"./keyboard-shortcut-DyTPHoDS.js";import"./label-value-o_jvt4kl.js";import"./meter-group-D7NOufrU.js";import"./page-state-By0fGZIX.js";import"./paginator-CC99e8lp.js";import"./radio-group-D7ERu0Eb.js";import"./scaffold-DlnKxn3X.js";import"./secret-Bbe2aGlT.js";import"./select-dropdown-CGrHPg15.js";import"./select-CxGVVX27.js";import"./skip-link-BoJpGyHM.js";import"./slider-vjFy2D_6.js";import"./split-view-DlBmhOCe.js";import"./stack-Cbce-CUg.js";import"./stepper-jVb5t0jM.js";import"./switch-BWtby5Vs.js";import"./table-DT5w2x3U.js";import"./tab-panel-DZF5tJIX.js";import"./time-picker-DyckJMXH.js";import"./timestamp-BucHJv1R.js";import"./toast-DVMRoADF.js";import"./toolbar-CqEjLPKY.js";import"./tooltip-D4AerAD0.js";import"./tree-item-DmkFgnhf.js";import"./view-switcher-D7AQr4N8.js";import"./deprecated-icon-button-C4_SF3qR.js";import"./split-button-DGI1Pgxp.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],qt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,qt as P,m as W};
