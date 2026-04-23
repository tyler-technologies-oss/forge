import{b as d}from"./iframe-Dfm0Y9zk.js";import{s as u,g as f}from"./utils-QQyHyWEl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BOrmHAhn.js";import"./app-bar-profile-button-Df3R4LPZ.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-OVZ6glxO.js";import"./menu-Br4iISLG.js";import"./linear-progress-DP1CUIRM.js";import"./list-_t7opXnB.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-DobBcvsp.js";import"./icon-button-DlUP_1V7.js";import"./focus-indicator-Dlg4BzwS.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-ysAX9QtJ.js";import"./label-BystDZp2.js";import"./button-BndpX8tx.js";import"./button-toggle-group-DZk0FsUp.js";import"./checkbox-DArI6nEJ.js";import"./switch-DmYrToqv.js";import"./base-field-Dbf0aET9.js";import"./text-field-DE8OPoVt.js";import"./backdrop-B_VtJyIN.js";import"./badge-Cg4LDf7d.js";import"./banner-y_XTIItB.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-olQ5Fp6H.js";import"./calendar-a58GreqY.js";import"./card-Js_rZ6Xq.js";import"./chip-set-B3o69dVe.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-DjpaLTM7.js";import"./date-picker-dfvzwQYz.js";import"./date-range-picker-DPTtYnyz.js";import"./divider-B_gl6ukm.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-DkGDMX6R.js";import"./open-icon-CSK6s6ph.js";import"./file-picker-D-OX1mFO.js";import"./floating-action-button-CNLRmY51.js";import"./inline-message-BK9gijHu.js";import"./key-item-DneZ4UMb.js";import"./keyboard-shortcut-CaWyqJ12.js";import"./label-value-BE9wSmbi.js";import"./meter-group-DXE3sKBJ.js";import"./page-state-BYBCycIs.js";import"./paginator-DniEhmwS.js";import"./scaffold-D_SIXSFE.js";import"./secret-7NLP_zUx.js";import"./select-dropdown-LMpjI6q7.js";import"./select-YxlEHM7I.js";import"./skip-link-HhfJaf-v.js";import"./slider-D1dsl_f5.js";import"./split-view-CnBk6h-H.js";import"./stack-BuaXNRar.js";import"./stepper-B4EOEIGA.js";import"./table-D63dEIDC.js";import"./tab-bar-DxpaqdN_.js";import"./time-picker-Co_zE29R.js";import"./toast-jDbAtzyJ.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-BghnJfHc.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-PZl65TIe.js";import"./split-button-MBkzDj32.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
