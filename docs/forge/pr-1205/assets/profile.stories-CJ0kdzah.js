import{b as d}from"./iframe-B7LxWkL4.js";import{s as u,g as f}from"./utils-BgSSl4hg.js";import"./service-adapter-DlT-lJx7.js";import"./accordion-ByUxvx3A.js";import"./app-bar-menu-button-CS-fK3VA.js";import"./app-bar-profile-button-BEaWFfDG.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-qc11a4hp.js";import"./menu-b7W_YMql.js";import"./linear-progress-Du-Ntegu.js";import"./list-G4hiICeQ.js";import"./popover-C6L45Wod.js";import"./overlay--ryFBZAY.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BvzgNeZ5.js";import"./list-item-Dp-tcav_.js";import"./avatar-DbS-5rMy.js";import"./icon-button-BsODWw2P.js";import"./autocomplete-BQTflWeA.js";import"./label-BzpstwPX.js";import"./base-field-B8ua2P5-.js";import"./focus-indicator-DEh1smym.js";import"./text-field-C54iF8q8.js";import"./backdrop-e4rWKi0D.js";import"./badge-CdPUMXX0.js";import"./banner-D_YiAPiB.js";import"./bottom-sheet-C3SMhtk1.js";import"./dialog-qsRa4tTT.js";import"./button-area-Bfj5oCms.js";import"./button-toggle-group-CYP5cQah.js";import"./button-BT0VAunK.js";import"./calendar-CVP_f_MJ.js";import"./card-CJ3h7a6c.js";import"./checkbox-os_ppbgE.js";import"./chip-set-D4KXOvkD.js";import"./state-layer-BcVD1OXH.js";import"./circular-progress-QjF0OwOx.js";import"./color-picker-SNiMJRt5.js";import"./date-picker-DB5hkupA.js";import"./date-range-picker-34ArltN8.js";import"./divider-_UQ5Iqkl.js";import"./base-drawer-C3RB7KRX.js";import"./drawer-C4w9_Owc.js";import"./modal-drawer-CG9TO9xg.js";import"./mini-drawer-B5rmf2t_.js";import"./expansion-panel-DQf0TsaP.js";import"./open-icon-D020JHVS.js";import"./file-picker-DOiysuP5.js";import"./floating-action-button-C59fwEjZ.js";import"./inline-message-D6TY8UzG.js";import"./key-item-BwLJTHwD.js";import"./keyboard-shortcut-C-aiQcKA.js";import"./label-value-Cs0_BMQ9.js";import"./listbox-DXIjlZ5_.js";import"./meter-group-svRi_zAG.js";import"./page-state-C_fu_Hm3.js";import"./paginator-8EtzZpLq.js";import"./radio-group-CxQp5fxO.js";import"./scaffold-C8LskKFX.js";import"./secret-BeorZPbj.js";import"./option-Vb52xj6p.js";import"./select-dropdown-kYfxYgFR.js";import"./select-BxGnTCUy.js";import"./skip-link-DwFWbz14.js";import"./slider-B1K9jGK0.js";import"./split-view-BdJjpEwr.js";import"./stack-Grf8E1p3.js";import"./stepper-CJWm1pH7.js";import"./switch-C7LPDzvo.js";import"./table-DEa-oTiq.js";import"./tab-panel-Dnh1K199.js";import"./time-picker-gJJiqzeu.js";import"./timestamp-kMpDBYBD.js";import"./toast-0aYeurA_.js";import"./toolbar-DUE3t8Rm.js";import"./tooltip-jHEbDM0A.js";import"./tree-item-p6vfdbsP.js";import"./view-switcher-Cw3vuBIn.js";import"./deprecated-icon-button-CA0uJ76k.js";import"./split-button-eVg0RXPV.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
  `,component:s,argTypes:{...f({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},m={},l={...u,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.warn("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return d`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"{}",...m.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Qt=Object.freeze(Object.defineProperty({__proto__:null,Demo:m,WithCustomContent:l,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{m as D,Qt as P,l as W};
