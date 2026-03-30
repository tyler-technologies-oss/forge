import{b as d}from"./iframe-AHc4in5d.js";import{s as u,g as f}from"./utils-BnVlj7nJ.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Dxio6WVp.js";import"./app-bar-profile-button-Cb4KWCVu.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CM60tYwf.js";import"./menu-BSZ2NAlz.js";import"./linear-progress-DP1CUIRM.js";import"./list-pqlCSTuL.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-JYb6JRA0.js";import"./icon-button-DwS1xu2e.js";import"./focus-indicator-DdOir_sZ.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-DBxLtrup.js";import"./label-D7Uvc7uw.js";import"./button-DBXgo8js.js";import"./button-toggle-group-BNEgXCZE.js";import"./checkbox-BVTQ5Iav.js";import"./switch-CkQprRG6.js";import"./base-field-DWgtTGgo.js";import"./text-field-YNKjAyX-.js";import"./backdrop-B_VtJyIN.js";import"./badge-BQHwvXrG.js";import"./banner-ColNJ0Oi.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-ChvpVtrs.js";import"./calendar-DxtGf6js.js";import"./card-gtkdnT9C.js";import"./chip-set-BTkLzk2Y.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-Y-vqtbxd.js";import"./date-picker-DjmG_Vdc.js";import"./date-range-picker-BaOoYi5N.js";import"./divider-BT7tZtI5.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-Dm0XPZEU.js";import"./open-icon-B8DORxMv.js";import"./file-picker-BRj5oIoo.js";import"./floating-action-button-DV-yeR16.js";import"./inline-message-BK9gijHu.js";import"./key-item-CZxaTY9m.js";import"./keyboard-shortcut-DUpDbfTh.js";import"./label-value-BE9wSmbi.js";import"./meter-group-B7bEGfKd.js";import"./page-state-BYBCycIs.js";import"./paginator-tFOt89M5.js";import"./scaffold-D_SIXSFE.js";import"./secret-uql-xzZO.js";import"./select-dropdown-C3RSiRub.js";import"./select-Ch5YxNNZ.js";import"./skip-link-5Wvm8Wby.js";import"./slider-B5ghaasE.js";import"./split-view-DMCJkqS-.js";import"./stack-BuaXNRar.js";import"./stepper-xnArMNlJ.js";import"./table-DrV4UsfI.js";import"./tab-bar-DYSi3Lv6.js";import"./time-picker-Iet4HY0s.js";import"./toast-CJXPew6p.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-2DVv1p6E.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-CDDsDQUR.js";import"./split-button-DIureoVy.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
