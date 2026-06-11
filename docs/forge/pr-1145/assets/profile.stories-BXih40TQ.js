import{b as d}from"./iframe-CUIB3klC.js";import{s as u,g as f}from"./utils-B3vUROdi.js";import"./service-adapter-8tADcN_b.js";import"./accordion-RqUqI435.js";import"./app-bar-profile-button-Jh_emyuk.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-helSxaWt.js";import"./menu-BR0PbryK.js";import"./linear-progress-dFUODLVX.js";import"./list-DrYXWx3x.js";import"./popover-CZRIaKbl.js";import"./overlay-CX_m1mvq.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-BxrGynUp.js";import"./avatar-CZNcYc3P.js";import"./icon-button-CMBNgzt7.js";import"./focus-indicator-DdygCZyq.js";import"./state-layer-CKPcsXao.js";import"./autocomplete-DbgI8Mrm.js";import"./label-CCJpr-qV.js";import"./base-field-BxGEvozk.js";import"./text-field-BeivTryc.js";import"./backdrop--ezx6yHr.js";import"./badge-2s0ypr-l.js";import"./banner-CJ0rSySp.js";import"./bottom-sheet-D4YyTlPZ.js";import"./dialog-D3n85AUX.js";import"./button-area-cz7lmPCK.js";import"./button-toggle-group-Na_XrK-1.js";import"./button-CEu5wmDj.js";import"./calendar-sm-KMUGf.js";import"./card-Csy4qZ5B.js";import"./checkbox-D3coErps.js";import"./chip-set-D5O2Gwm7.js";import"./circular-progress-BvJErdQG.js";import"./color-picker-DuG3TWo_.js";import"./date-picker-BqiSEnGd.js";import"./date-range-picker-Cd7eb39R.js";import"./divider-Bwonw-dK.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BJC8mhbC.js";import"./modal-drawer-C_HzRa2f.js";import"./mini-drawer-CJFzgWnt.js";import"./expansion-panel-Tq77vyht.js";import"./open-icon-BouX2NRp.js";import"./file-picker-CrhWYjdx.js";import"./floating-action-button-B6O9hcD0.js";import"./inline-message-1YYbEfHN.js";import"./key-item-BisnSZ9m.js";import"./keyboard-shortcut-DboS0f_Q.js";import"./label-value-CMJEsLJf.js";import"./meter-group-xDICRTY0.js";import"./page-state-BwPC_Hd9.js";import"./paginator-sZmDvmKc.js";import"./radio-group-DSipSzc1.js";import"./scaffold-BAVRvYZ-.js";import"./secret-CKi8tv4C.js";import"./select-dropdown-DxDG2ZF-.js";import"./select-BCVQpT8h.js";import"./skip-link-CDNvIIoB.js";import"./slider-DkrZXV9z.js";import"./split-view-Dam3I-he.js";import"./stack-BRmnsrL_.js";import"./stepper-Dn-5tXOP.js";import"./switch-1hZof2Jg.js";import"./table-BUv4pUOx.js";import"./tab-bar-3GhvRFFH.js";import"./time-picker-Bg0yARLu.js";import"./toast-DbYCtNke.js";import"./toolbar-m2auwteb.js";import"./tooltip-CE7u4Ary.js";import"./tree-item-BugPf_Xd.js";import"./view-switcher-B4ao6iwI.js";import"./deprecated-icon-button-C0Jy4PEg.js";import"./split-button-Bgfh5rPy.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
