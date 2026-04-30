import{b as d}from"./iframe-CO63VGWC.js";import{s as u,g as f}from"./utils-QQyHyWEl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-6-ZahFdq.js";import"./app-bar-profile-button-DY-yYhkY.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-Cx8lSfx6.js";import"./menu-kcl8VCht.js";import"./linear-progress-DP1CUIRM.js";import"./list-ZYCTvaUc.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-BYtjifaw.js";import"./icon-button-B__foED6.js";import"./focus-indicator-XV-v9ki5.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-iuTNWAur.js";import"./label-BVilXgwb.js";import"./button-BGhvJd3T.js";import"./button-toggle-group-CUrUvzrb.js";import"./checkbox-IvN7OKE-.js";import"./switch-a3rjEh8L.js";import"./base-field-Bu-9ax7Z.js";import"./text-field-lBU4I2pl.js";import"./backdrop-B_VtJyIN.js";import"./badge-BfZMUX8Z.js";import"./banner-DM3H09y5.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-DTbH8JqP.js";import"./calendar-p00dPvck.js";import"./card-BGEzKhEk.js";import"./chip-set-7z23Pvgc.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-CeYdRjPV.js";import"./date-picker-DHUb_B-6.js";import"./date-range-picker-BioQyTqv.js";import"./divider-BuB-R_5r.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-DwIF-HCf.js";import"./open-icon-DROAjt1T.js";import"./file-picker-C0cH2RBy.js";import"./floating-action-button-DPozioG8.js";import"./inline-message-BK9gijHu.js";import"./key-item-BRDlOBvT.js";import"./keyboard-shortcut-FX8VVS9U.js";import"./label-value-BE9wSmbi.js";import"./meter-group-DyyNROJD.js";import"./page-state-BYBCycIs.js";import"./paginator-uUg9hoyz.js";import"./scaffold-D_SIXSFE.js";import"./secret-riAOzCw9.js";import"./select-dropdown-B9bUYzc9.js";import"./select-DE-28Nfa.js";import"./skip-link-FfYVJiG1.js";import"./slider-BegdJQjx.js";import"./split-view-BpY7Da47.js";import"./stack-BuaXNRar.js";import"./stepper-DWY1mxXL.js";import"./table-CHd2FRfB.js";import"./tab-bar-fQVdX-Qd.js";import"./time-picker-DYKZgL66.js";import"./toast-9UZSb7v_.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-y4S9loUD.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-Bo8CEOxO.js";import"./split-button-DICQM8Qx.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
