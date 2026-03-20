import{b as d}from"./iframe-DriYmvez.js";import{s as u,g as f}from"./utils-BA5-_s-B.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DmrjHDdS.js";import"./app-bar-profile-button-CZSZDzCD.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-Bwr0J3kB.js";import"./menu-DL5uemw5.js";import"./linear-progress-C_nfyJF6.js";import"./list-B3MPjcuq.js";import"./popover-COK8oi_U.js";import"./overlay-BB80zovl.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-CerfHp_D.js";import"./avatar-BFren0Xn.js";import"./icon-button-3w-6zUmZ.js";import"./focus-indicator-BrbZv0xw.js";import"./state-layer-BAlZ4sKA.js";import"./autocomplete-CAYLO06d.js";import"./label-BxEiOTH9.js";import"./button-DFgZemWW.js";import"./button-toggle-group-CHBa_PC5.js";import"./checkbox-CKn84_oJ.js";import"./switch-QiY0xOLb.js";import"./base-field-Dw-RN5vF.js";import"./text-field-krqlEIb4.js";import"./backdrop-DXl5sJrw.js";import"./badge-9TmoW2PM.js";import"./banner-YC1fGYej.js";import"./bottom-sheet-DM2YRo0u.js";import"./dialog-V0fRmenz.js";import"./button-area-CKYzB8f8.js";import"./calendar-D7fH9wf-.js";import"./card-BFqXM32B.js";import"./chip-set-CFRrbic5.js";import"./circular-progress-DX7Fr9fb.js";import"./color-picker-BHjk8xR_.js";import"./date-picker-BGVEc7sv.js";import"./date-range-picker-BttQqTw3.js";import"./divider-nmR2RwOe.js";import"./base-drawer-P9bFkP7J.js";import"./drawer-DpAOA30P.js";import"./modal-drawer-OghggGdi.js";import"./mini-drawer-CQOKdcEt.js";import"./expansion-panel-Fx01yYaL.js";import"./open-icon-C5qf3WDr.js";import"./file-picker-9sIO3UXy.js";import"./floating-action-button-BilhVipm.js";import"./inline-message-CVU9VwkI.js";import"./key-item-DyE-ER9A.js";import"./keyboard-shortcut-_dDBheLA.js";import"./label-value-MrGFVOH0.js";import"./meter-group-BpXr84wM.js";import"./page-state-g65TNY5P.js";import"./paginator-HTyN4VUL.js";import"./scaffold-BPWJeG4e.js";import"./deprecated-icon-button-CwX5W18o.js";import"./select-dropdown-CPf6bEXU.js";import"./select-D-e9cixU.js";import"./skip-link-pYrFHJMy.js";import"./slider-DlznXgVs.js";import"./split-view-CijZtVe8.js";import"./stack-SvYZVnft.js";import"./stepper-ETSII1q1.js";import"./table-CPqzxjT1.js";import"./tab-bar-CJxc8MgZ.js";import"./time-picker-CHjtAP-S.js";import"./toast-yCGNU-ro.js";import"./toolbar-DC0hxa7h.js";import"./tooltip-DIuICY4U.js";import"./tree-item-Ct3AX4gp.js";import"./view-switcher-Cg31cFFb.js";import"./split-button-CBMPPH4p.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
