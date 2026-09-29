import{b as d}from"./iframe-CcCZn8Qo.js";import{s as u,g as f}from"./utils-BR1rLwc_.js";import"./service-adapter-8tADcN_b.js";import"./accordion-gb_Ae6qo.js";import"./app-bar-menu-button-CoBXLDn4.js";import"./app-bar-profile-button-DZyj05jb.js";import{I as g}from"./icon-BIdGKJqZ.js";import"./menu-DT4vpUsb.js";import{a as E,b,c as C,d as y}from"./tyler-icons-BSgf1RSL.js";import"./linear-progress-kQO48laS.js";import"./list-0iJnd8Jh.js";import"./popover-d2r_ayMy.js";import"./overlay-DNJ2GsC-.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-C4Wq8Idf.js";import"./list-item-P9WX-v0r.js";import"./avatar-BsLIimID.js";import"./icon-button-DuRpLS_m.js";import"./autocomplete-Bo9RBHkV.js";import"./label-BhaR9I0r.js";import"./base-field-BYB1dcoa.js";import"./focus-indicator-CwT8THhK.js";import"./text-field-D815X8jF.js";import"./backdrop-C9lBlb_d.js";import"./badge-Co1RQX_x.js";import"./banner-DdDVdR8H.js";import"./bottom-sheet-Cu2vEmAI.js";import"./dialog-DrWomsTl.js";import"./button-area-hv3dYcBQ.js";import"./button-toggle-group-DQ2DRpmb.js";import"./button-CifGyQIr.js";import"./calendar-DaNjMOFE.js";import"./card-B3eYTAtb.js";import"./checkbox-DcdDfC1U.js";import"./chip-set-DdObOAv_.js";import"./state-layer-CZIH5add.js";import"./circular-progress-CfoxEQ_B.js";import"./color-picker-Cr6Wetdd.js";import"./date-picker-CbP5HwgK.js";import"./date-range-picker-CzJCu-n2.js";import"./divider-BQPOzKgb.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-6XaMN4pJ.js";import"./modal-drawer-B7CU3QM4.js";import"./mini-drawer-Dj8wQkgb.js";import"./expansion-panel-BwFrnUBA.js";import"./open-icon-BmFqXzQi.js";import"./file-picker-Coh_bSkm.js";import"./floating-action-button-BMoJ9tFy.js";import"./inline-message-BKecgmUf.js";import"./kbd-BB3T7qk9.js";import"./key-item-B_VFGdNA.js";import"./keyboard-shortcut-BjuTXX2L.js";import"./label-value-06gdOjV6.js";import"./meter-group-C8y4_j8T.js";import"./page-state-DdcxjGPv.js";import"./paginator-F8LLCfM4.js";import"./radio-group-BsHgaz8q.js";import"./scaffold-ua4VSBPI.js";import"./secret-BzSvAVhg.js";import"./select-dropdown-Bq2_WsER.js";import"./select-C1Uj7EgL.js";import"./skip-link-C_ZOhqKD.js";import"./slider-C-386un0.js";import"./split-view-Bk9QluVN.js";import"./stack-CzasDS03.js";import"./stepper-Cjgbs-fc.js";import"./switch-b9UWP0YG.js";import"./table-B_Q_QH6C.js";import"./tab-panel-CVYu2wWh.js";import"./time-picker-DkHcXYkL.js";import"./timestamp-DkDmGOIf.js";import"./toast-K5Pp21nd.js";import"./toolbar-B_F4fpMR.js";import"./tooltip-BTtmmlI8.js";import"./tree-item-f9vPpvvS.js";import"./view-switcher-B1N5uMXB.js";import"./deprecated-icon-button-BCqTG2xj.js";import"./split-button-OJ7bKSMx.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
