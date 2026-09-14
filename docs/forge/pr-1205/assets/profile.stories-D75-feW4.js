import{b as d}from"./iframe-DheuHIIc.js";import{s as u,g as f}from"./utils-CRT-IimF.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Cs3oDls0.js";import"./app-bar-profile-button-BHUReiJe.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-C4N8ookd.js";import"./menu-CRXCq4eT.js";import"./linear-progress-C6Yw2NU-.js";import"./list-8iTj5qsV.js";import"./popover-BKF_pc1b.js";import"./overlay-P1TuxaOE.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-odX48L_4.js";import"./avatar-DyIYiFov.js";import"./icon-button-rIGU_j0T.js";import"./focus-indicator-D0XDuZvo.js";import"./state-layer-BUK1_NC2.js";import"./autocomplete-DLJnrdtR.js";import"./label-CE6WHBMV.js";import"./base-field-B0mk_q25.js";import"./text-field-BxHqVAKQ.js";import"./backdrop-DuggoVs4.js";import"./badge-BsUWDT1M.js";import"./banner-25RwZqxf.js";import"./bottom-sheet-DPSWQqpP.js";import"./dialog-BLUxrwXA.js";import"./button-area-CYtsojUX.js";import"./button-toggle-group-DBLsmb1_.js";import"./button-CVEhg-SN.js";import"./calendar-D1Pj6QU3.js";import"./card-BEzeTCQC.js";import"./checkbox-DeJqZycw.js";import"./chip-set-p7I15PpY.js";import"./circular-progress-DsGMumuf.js";import"./color-picker-DnlhX9gn.js";import"./date-picker-DpJEGlQL.js";import"./date-range-picker-z4pqfMvP.js";import"./divider-C7QvyeiA.js";import"./base-drawer-H_Vclf0e.js";import"./drawer-DkNif9Rq.js";import"./modal-drawer-De0rlrxt.js";import"./mini-drawer-CJIvvL-H.js";import"./expansion-panel-BNSOeC0C.js";import"./open-icon-iTZnBTpd.js";import"./file-picker-BlDSB2kH.js";import"./floating-action-button-lcJMIFUB.js";import"./inline-message-BBlUMEcD.js";import"./key-item-CZoOVTzx.js";import"./keyboard-shortcut-TL9hCtBl.js";import"./label-value-BKZYa59d.js";import"./listbox-PVu8Yu7L.js";import"./meter-group-YgaIqbki.js";import"./page-state-B2CTwiCg.js";import"./paginator-Bm6o73Jz.js";import"./radio-group-CLOOC57s.js";import"./scaffold-DVCC5lGr.js";import"./secret-YpYyCzov.js";import"./select-dropdown-l9VeT-pC.js";import"./select-DrsVyXK3.js";import"./skip-link-C6lwxT9x.js";import"./slider-IojZWlyK.js";import"./split-view-PSrRVGeK.js";import"./stack-DIeJ-nuE.js";import"./stepper-DiloDWtW.js";import"./switch-B9qFwKfi.js";import"./table-Dzw0QCt9.js";import"./tab-panel-DLfaAIC2.js";import"./time-picker-Dl4QBzkE.js";import"./timestamp-sMqJsLnG.js";import"./toast-BPX1rhn-.js";import"./toolbar-CK4o0G-Y.js";import"./tooltip-DjdMmhcH.js";import"./tree-item-C8iamEMe.js";import"./view-switcher-B_53bUYO.js";import"./deprecated-icon-button-92pYUUgA.js";import"./split-button-CsJdkCu2.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],qt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,qt as P,m as W};
