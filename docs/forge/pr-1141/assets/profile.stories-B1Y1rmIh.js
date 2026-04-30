import{b as d}from"./iframe-BuM4FWjo.js";import{s as u,g as f}from"./utils-QQyHyWEl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-1UR_drp_.js";import"./app-bar-profile-button-C131G9gQ.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CQ1wASlo.js";import"./menu-BNSCLBRm.js";import"./linear-progress-DP1CUIRM.js";import"./list-By1ah-U2.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-X4FkCT9S.js";import"./icon-button-XJCCdyMS.js";import"./focus-indicator-BGec47OT.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-D0dvWc5s.js";import"./label-DwyUBQ-s.js";import"./button-BP0tSqwm.js";import"./button-toggle-group-CyvyFrJ7.js";import"./checkbox-B4GhszCv.js";import"./switch-C7yvX8UL.js";import"./base-field-B7X0c9YA.js";import"./text-field-DanaXTLe.js";import"./backdrop-B_VtJyIN.js";import"./badge-D8BtszDJ.js";import"./banner-SZltz-Zz.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-DR6u3Gq1.js";import"./calendar-FB4FMIFk.js";import"./card-CXNUkQpv.js";import"./chip-set-AlKnVL_a.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-4DwHWy2N.js";import"./date-picker-DwlAYH5q.js";import"./date-range-picker-BY8B8FO8.js";import"./divider-cGpiNEZ2.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-fMXDrspo.js";import"./open-icon-B6nubsGi.js";import"./file-picker-B5eNC0Jl.js";import"./floating-action-button-DGiiVYR9.js";import"./inline-message-BK9gijHu.js";import"./key-item-gtyvq66a.js";import"./keyboard-shortcut-BUPx2TRq.js";import"./label-value-BE9wSmbi.js";import"./meter-group-CddGxK4K.js";import"./page-state-BYBCycIs.js";import"./paginator-DolE7NZA.js";import"./scaffold-D_SIXSFE.js";import"./secret-CPGqIqAt.js";import"./select-dropdown-Cj1LmLHO.js";import"./select-BDVMA3GV.js";import"./skip-link-DogXvtLU.js";import"./slider-C4Kj03AF.js";import"./split-view-DsZNP8KY.js";import"./stack-BuaXNRar.js";import"./stepper-DaONV0UV.js";import"./table-DUjRGGN5.js";import"./tab-bar-CT27ehi5.js";import"./time-picker-CL-uNdlK.js";import"./toast-CaUVGSpa.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-8KWlpeRg.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-C4yBv3Jv.js";import"./split-button-W__1oAK-.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
