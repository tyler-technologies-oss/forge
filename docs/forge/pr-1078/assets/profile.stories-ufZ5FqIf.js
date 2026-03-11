import{b as d}from"./iframe-Bm6ogQZk.js";import{s as u,g as f}from"./utils-DQ34OAOC.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DfuJ0XvL.js";import"./app-bar-profile-button-BXYd3iE8.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-Cyw--ZSI.js";import"./menu-D40LPVFf.js";import"./linear-progress-DP1CUIRM.js";import"./list-pWISYltu.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-C5qBvaCu.js";import"./icon-button-sAndwBJY.js";import"./focus-indicator-BFy6CZSl.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-bsFV6OGq.js";import"./label-a7LsLXND.js";import"./button-B5JJr1Lo.js";import"./button-toggle-group-C2zgln5K.js";import"./checkbox-Dktn9RJO.js";import"./switch-C0Aj1J8z.js";import"./base-field-BZ3Xm8XF.js";import"./text-field-BTuf9Q8N.js";import"./backdrop-B_VtJyIN.js";import"./badge-CedQ26WI.js";import"./banner-08aQ97Tl.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-V5dvCnaU.js";import"./calendar-BzlwuPBm.js";import"./card-DgXryqyR.js";import"./chip-set-NvcRe2K0.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-17D5xVOb.js";import"./date-picker-5OEloF0Z.js";import"./date-range-picker-DnzLqMLo.js";import"./divider-DIKqIQtx.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-CN3lmwDk.js";import"./open-icon-Bsi-8NJl.js";import"./file-picker-CXsKh9o6.js";import"./floating-action-button-C15og4zu.js";import"./inline-message-BK9gijHu.js";import"./key-item-knLKMh22.js";import"./keyboard-shortcut-DLmOvnUG.js";import"./label-value-BE9wSmbi.js";import"./meter-group-BS_7AuiL.js";import"./page-state-BYBCycIs.js";import"./paginator-CWx-QsGk.js";import"./scaffold-D_SIXSFE.js";import"./select-dropdown-CQSGCq54.js";import"./select-OVXbotC5.js";import"./skip-link-DrtJNXYb.js";import"./slider-CHO49VdN.js";import"./split-view-gKxKJ7lQ.js";import"./stack-BuaXNRar.js";import"./stepper-CFPhquzf.js";import"./table-CNecXgQb.js";import"./tab-bar-BRcXVC9q.js";import"./time-picker-C16yV2bW.js";import"./toast-dstNu1Ma.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-9MxLEXH1.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-BHJfDBkY.js";import"./split-button-QSN2MU4h.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Ut=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Ut as P,m as W};
