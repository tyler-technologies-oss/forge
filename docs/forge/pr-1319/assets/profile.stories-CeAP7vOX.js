import{b as d}from"./iframe-CfOLmNdo.js";import{s as u,g as f}from"./utils-BGdtyhdL.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CHNM-iPB.js";import"./app-bar-menu-button-DR--0NQy.js";import"./app-bar-profile-button-iajHwjgT.js";import{I as g}from"./icon-CBhfd-3H.js";import"./menu-DsItPlMQ.js";import{a as E,b,c as C,d as y}from"./tyler-icons-Bg2kTxF-.js";import"./linear-progress-BuMeIIdZ.js";import"./list-CSkMbkO6.js";import"./popover-SQPenc0O.js";import"./overlay-ByK8Mow1.js";import"./key-action-lsAysfb-.js";import"./index-BHXiN6PC.js";import"./skeleton-CWIxuxVs.js";import"./list-item-BOvnL-I1.js";import"./avatar-C1AGOko9.js";import"./icon-button-DzuMMbE4.js";import"./autocomplete-nTqWBiaJ.js";import"./label-B1uxh5FL.js";import"./base-field-BObqKNNc.js";import"./focus-indicator--smaJyaa.js";import"./text-field-BC_WUwPA.js";import"./backdrop-ngk7d2eo.js";import"./badge-DBnshEW7.js";import"./banner-DEJboZy9.js";import"./bottom-sheet-C1iFCImm.js";import"./dialog-BKd6LGgB.js";import"./breadcrumb-overflow-menu-COzkIx7k.js";import"./button-area-BwC_Kkbx.js";import"./button-toggle-group-Ct0ww6ZU.js";import"./button-COy1ZAqx.js";import"./calendar-CqusHqSC.js";import"./card-DUkTyMO5.js";import"./checkbox-l7kbnJnB.js";import"./chip-set-DNK3boyA.js";import"./state-layer-gtlkuVuf.js";import"./circular-progress-BCp-Zc6w.js";import"./color-picker-DUi5VXuf.js";import"./date-picker-Dt6zb0Hi.js";import"./date-range-picker-x2Cxu88s.js";import"./divider-D_mtm3YG.js";import"./base-drawer-L9q0-_V8.js";import"./drawer-B-04gfFR.js";import"./modal-drawer-DEyCxZ7P.js";import"./mini-drawer-CEn9vZb3.js";import"./expansion-panel-BuXdGYcK.js";import"./open-icon-DcrpkyVc.js";import"./file-picker-DnA6NjHR.js";import"./floating-action-button-COwCK-JF.js";import"./inline-message-ZbUKeLM6.js";import"./kbd-C3FW3od4.js";import"./key-item-CY3YzAw4.js";import"./keyboard-shortcut-Cc_A9QQc.js";import"./label-value-C0-wovkK.js";import"./listbox-CuOgVQof.js";import"./meter-group-BelbOht0.js";import"./page-state-DvaZGddB.js";import"./paginator-BKdL1BIa.js";import"./process-stepper-Bp5OCOUI.js";import"./radio-group-DsQJuu55.js";import"./scaffold-Ca9xBuAs.js";import"./secret-jFkF2IXi.js";import"./option-BdIJ6ogL.js";import"./select-dropdown-Cw1ITXM_.js";import"./select-sR1TTM1g.js";import"./skip-link-tmPFCuzR.js";import"./slider-CZwA20JM.js";import"./split-view-DFZqrn8y.js";import"./stack-D82n2o1P.js";import"./stepper-BlXm-mnR.js";import"./switch-CLFz6qq3.js";import"./table-D72IDEts.js";import"./tab-panel-DyswmtFm.js";import"./time-picker-DBchLKXN.js";import"./timestamp-Unrm8J_W.js";import"./toast-DTsEO4Qx.js";import"./toolbar-DNZr8FhC.js";import"./tooltip-DfvpF4Ch.js";import"./tree-item-C6qYHud-.js";import"./view-switcher-B3UuK4y2.js";import"./deprecated-icon-button-B7uxVr6l.js";import"./split-button-BjEh0VXF.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...l.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],te=Object.freeze(Object.defineProperty({__proto__:null,Demo:m,WithCustomContent:l,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{m as D,te as P,l as W};
