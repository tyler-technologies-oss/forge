import{b as d}from"./iframe-C1n4Os1i.js";import{s as u,g as f}from"./utils-DFPIRSaV.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CHu0eNcK.js";import"./app-bar-profile-button-BpI33d6U.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BC4Djfn5.js";import"./menu-Cybk9-Vh.js";import"./linear-progress-BmTkV8LG.js";import"./list-DcKDhSao.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-D_iZGXuR.js";import"./avatar-DOGFYnso.js";import"./icon-button-CfQ4UfYP.js";import"./focus-indicator-C2nQ0VU4.js";import"./state-layer-B-p_OOit.js";import"./autocomplete-DRp13nz6.js";import"./label-B7Unrmlq.js";import"./button-BJ7tskWA.js";import"./button-toggle-group-DbkGwrHU.js";import"./checkbox-D5GWJjco.js";import"./switch-CbZF5FWI.js";import"./base-field-CVobXvC9.js";import"./text-field-CwbdLVJZ.js";import"./backdrop-B-u3npFo.js";import"./badge-BuC9aJlN.js";import"./banner-ChZc6wfh.js";import"./bottom-sheet-DhxxPnBx.js";import"./dialog-Di6dXOYv.js";import"./button-area-BsyZHZWR.js";import"./calendar-DD0UEaaj.js";import"./card-BNwV_hhN.js";import"./chip-set-CPxagf19.js";import"./circular-progress-B3Ibuxja.js";import"./color-picker-C0k83izD.js";import"./date-picker-nPKYa3Bj.js";import"./date-range-picker-BmXHf2-8.js";import"./divider-DjNzBP4J.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BRoh-MrS.js";import"./modal-drawer-CNURgsv3.js";import"./mini-drawer-F8X1cBv8.js";import"./expansion-panel-DcFx4lYc.js";import"./open-icon-fkq0S444.js";import"./file-picker-D3eMzgDU.js";import"./floating-action-button-BXlOSqSn.js";import"./inline-message-rggUpLwV.js";import"./key-item-i0MPS49P.js";import"./keyboard-shortcut-Bitz45IN.js";import"./label-value-C2Ggq4HD.js";import"./meter-group-DIFVul2Z.js";import"./page-state-B9wnmWpA.js";import"./paginator-fdNKIkUz.js";import"./scaffold-ALuq0Bgn.js";import"./secret-CY6xQI2S.js";import"./select-dropdown-xbT9Wnbw.js";import"./select-B7f0iIoF.js";import"./skip-link-CzFoeZ9R.js";import"./slider-9zvc5CQB.js";import"./split-view-CF6_Ue1g.js";import"./stack-DGYl-onA.js";import"./stepper-DYro92S_.js";import"./table-B_FmxLWr.js";import"./tab-bar-D8bhQYEA.js";import"./time-picker-Bt8BDikz.js";import"./toast-CLHHIy7q.js";import"./toolbar-DUvH1SqL.js";import"./tooltip-BDO8tOZg.js";import"./tree-item-BZoC3Pg2.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-DjDDWpx7.js";import"./split-button-CnyP55xv.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
