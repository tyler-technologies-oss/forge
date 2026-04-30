import{b as d}from"./iframe-CBKDWRBZ.js";import{s as u,g as f}from"./utils-QQyHyWEl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BtJl6jwD.js";import"./app-bar-profile-button-Bgpr8Kjr.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-a5zolgCV.js";import"./menu-DTmdpcGc.js";import"./linear-progress-DP1CUIRM.js";import"./list-PURaGQK7.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-CYwJnoqL.js";import"./icon-button-DmVznj6p.js";import"./focus-indicator-Khivi0ib.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-TUG3AykD.js";import"./label-6ahcJFzy.js";import"./button-B_jsNi6J.js";import"./button-toggle-group-CdEsFScB.js";import"./checkbox-owtbWK2h.js";import"./switch-CMkCsPvx.js";import"./base-field-VYm4j9XK.js";import"./text-field-MOPa8vI1.js";import"./backdrop-B_VtJyIN.js";import"./badge-2c2mt65V.js";import"./banner-Cv87FbIc.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-BO6oV230.js";import"./calendar-FA5ec8os.js";import"./card-Cuuv2sau.js";import"./chip-set-BS895L0e.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-DP8bzT-F.js";import"./date-picker-DW0uzf2H.js";import"./date-range-picker-BqJcpr5q.js";import"./divider-DL_TTW2c.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-BIjbaDzQ.js";import"./open-icon-BZh-fsST.js";import"./file-picker-CvA0kADX.js";import"./floating-action-button-DdFXIBLt.js";import"./inline-message-BK9gijHu.js";import"./key-item-PflHeBfy.js";import"./keyboard-shortcut-BmyoIGOk.js";import"./label-value-BE9wSmbi.js";import"./meter-group-CM3L3Xbr.js";import"./page-state-BYBCycIs.js";import"./paginator-Te6NqMbL.js";import"./scaffold-D_SIXSFE.js";import"./secret-BUfphPRj.js";import"./select-dropdown-CWt5-swN.js";import"./select-B0Ef5Fge.js";import"./skip-link-CAuo9kDP.js";import"./slider-DfVsBr0u.js";import"./split-view-R7kY1Bc9.js";import"./stack-BuaXNRar.js";import"./stepper-DMJhdpJ-.js";import"./table-D28XEjTT.js";import"./tab-bar-CI6a7O0L.js";import"./time-picker-CH3Y0QaY.js";import"./toast-CzThZpK7.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-CPJO-Wot.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-BkoPr2EQ.js";import"./split-button-Cg4s008E.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
