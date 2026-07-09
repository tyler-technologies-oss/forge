import{b as d}from"./iframe-mEEp4vyl.js";import{s as u,g as f}from"./utils-C2rEPPUi.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DmLGZcJY.js";import"./app-bar-profile-button-mel29P5v.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-Dd_50CiF.js";import"./menu-CXnprRvQ.js";import"./linear-progress-Do3VWKo6.js";import"./list-DLqUJxC-.js";import"./popover-CU3EvxYx.js";import"./overlay-CJnoqSm4.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-D-1mhuaY.js";import"./avatar-6NcjQeJG.js";import"./icon-button-Bx-1oLBZ.js";import"./focus-indicator-B-Oned0K.js";import"./state-layer-CezKS0dV.js";import"./autocomplete-C2h-YSpp.js";import"./label-BxzW7H-R.js";import"./button-Bhi7bCnQ.js";import"./button-toggle-group-NJ8Db9ZQ.js";import"./checkbox-Ch9uDNN7.js";import"./switch-CCftY1Dm.js";import"./base-field-BISBlare.js";import"./text-field-BLXUe1A3.js";import"./backdrop-B0IRqNVE.js";import"./badge-DzEa3LYr.js";import"./banner-XDXC07vA.js";import"./bottom-sheet-C1cLArre.js";import"./dialog-BkCkoArc.js";import"./button-area-B8eL2H4J.js";import"./calendar-CNrHn12A.js";import"./card-B6IaFjjN.js";import"./chip-set-CjigyywZ.js";import"./circular-progress-CTIGpZDq.js";import"./color-picker-xJlhsU8y.js";import"./date-picker-Dzvk21B9.js";import"./date-range-picker-D0iwoIJ2.js";import"./divider-CUrYVFgo.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-BfAud4lD.js";import"./modal-drawer-DgyN-IMO.js";import"./mini-drawer-Bg91uBfo.js";import"./expansion-panel-Crn33IsB.js";import"./open-icon-C5H8Ilt3.js";import"./file-picker-pINfgpby.js";import"./floating-action-button-Dsp2oT0u.js";import"./inline-message-wW24XM3J.js";import"./key-item-CmyCjFZL.js";import"./keyboard-shortcut-Ctxaca1R.js";import"./label-value-DjHFGdMo.js";import"./meter-group-lvWcZLHu.js";import"./page-state-DECQz5Rm.js";import"./paginator-D8iuSTm2.js";import"./scaffold-F_aQKixv.js";import"./secret-CaxOJWtU.js";import"./select-dropdown-DehuUXqr.js";import"./select-6MQr1LGK.js";import"./skip-link-CXsQNn00.js";import"./slider-CEL1fVE3.js";import"./split-view-B2DdVe3T.js";import"./stack-DEQW1E_G.js";import"./stepper-BgIKD4E9.js";import"./table-BZAvmscu.js";import"./tab-bar-Dy4Zs4Kv.js";import"./time-picker-Clardz0D.js";import"./timestamp-DmCbo_51.js";import"./toast-Cz8yeeBw.js";import"./toolbar-C9fY37NG.js";import"./tooltip-CtjGV45p.js";import"./tree-item-DJFkAgbr.js";import"./view-switcher-Jc42wfHF.js";import"./deprecated-icon-button-C5x8WwlA.js";import"./split-button-B6jXbJxE.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Kt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Kt as P,m as W};
