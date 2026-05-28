import{b as d}from"./iframe-DV1hlnLt.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-D2KwrrVF.js";import"./app-bar-profile-button-C8xAMLy_.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-dYOWTbWz.js";import"./menu-BLfBzRLx.js";import"./linear-progress-BmTkV8LG.js";import"./list-D0b0vzIp.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-D_iZGXuR.js";import"./avatar-HANkWcfy.js";import"./icon-button-DIIeI-ib.js";import"./focus-indicator-CSOOyR2s.js";import"./state-layer-B-p_OOit.js";import"./autocomplete-CeN63Oxh.js";import"./label-DX3CgxL3.js";import"./button-kyjDGESX.js";import"./button-toggle-group-Y_UO5Y63.js";import"./checkbox-DwRo2V7R.js";import"./switch-DcW6YBn7.js";import"./base-field-BOt13iVE.js";import"./text-field-B8VU0z8U.js";import"./backdrop-B-u3npFo.js";import"./badge-CzpZntu8.js";import"./banner-CiQ3nyJ2.js";import"./bottom-sheet-DhxxPnBx.js";import"./dialog-Di6dXOYv.js";import"./button-area-BkJTLNe-.js";import"./calendar-COl-C_T7.js";import"./card-DkU6wYBo.js";import"./chip-set-BCjs0rfv.js";import"./circular-progress-B3Ibuxja.js";import"./color-picker-BCc01TWu.js";import"./date-picker-BRTgcKvp.js";import"./date-range-picker-BqXsQtYd.js";import"./divider-Dw2JUMtf.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BRoh-MrS.js";import"./modal-drawer-CNURgsv3.js";import"./mini-drawer-F8X1cBv8.js";import"./expansion-panel-DDioj5v9.js";import"./open-icon-3X5flIxh.js";import"./file-picker-CN4pPUTP.js";import"./floating-action-button-SMFkkcsM.js";import"./inline-message-rggUpLwV.js";import"./key-item-e_lhrayg.js";import"./keyboard-shortcut-BXPRYy6O.js";import"./label-value-C2Ggq4HD.js";import"./meter-group-BIgwISPl.js";import"./page-state-B9wnmWpA.js";import"./paginator-BxUdvq2v.js";import"./scaffold-ALuq0Bgn.js";import"./secret-D6TF95lF.js";import"./select-dropdown-CBI6ALpQ.js";import"./select-CaalttxP.js";import"./skip-link-DN9_ByC2.js";import"./slider-Bo3nCWAh.js";import"./split-view-wPmKmPZz.js";import"./stack-DGYl-onA.js";import"./stepper-R3TpHTZs.js";import"./table-DMvX5uYV.js";import"./tab-bar-D84d-y9m.js";import"./time-picker-APmlOckJ.js";import"./toast-DtBRuyAy.js";import"./toolbar-DUvH1SqL.js";import"./tooltip-BDO8tOZg.js";import"./tree-item-laiQEc1m.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-Dm4LczhI.js";import"./split-button-Cw3m5b5B.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
