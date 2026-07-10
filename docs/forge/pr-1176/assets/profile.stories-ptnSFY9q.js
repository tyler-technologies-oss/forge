import{b as d}from"./iframe-DN09JPRV.js";import{s as u,g as f}from"./utils-Ck-gGzab.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Cle17mjL.js";import"./app-bar-profile-button-CPvO2fR6.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BYsm4hFB.js";import"./menu-C6XxP5Qf.js";import"./linear-progress-Do3VWKo6.js";import"./list-C6KTZLjy.js";import"./popover-B1xBEbVI.js";import"./overlay-D2OUOcFY.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CHMON4uU.js";import"./avatar-RV7TjiZK.js";import"./icon-button-L1vH1jaS.js";import"./focus-indicator-h9nBYyaY.js";import"./state-layer-CezKS0dV.js";import"./autocomplete-BjwAVIo5.js";import"./label-Hgv3Nrmm.js";import"./button-DkpvNBOQ.js";import"./button-toggle-group-BOZrH4Oe.js";import"./checkbox-Cj9BmxaH.js";import"./switch-JyqrCZx1.js";import"./base-field-COrAwxit.js";import"./text-field-Cr1Ip05x.js";import"./backdrop-B0IRqNVE.js";import"./badge-B-TAuVk1.js";import"./banner-BAizAWcU.js";import"./bottom-sheet-C1cLArre.js";import"./dialog-BkCkoArc.js";import"./button-area-BkyL_Oqz.js";import"./calendar-N8JbEjVO.js";import"./card-By5QV1S0.js";import"./chip-set-Clz1tJ1b.js";import"./circular-progress-CTIGpZDq.js";import"./color-picker-C_oNcGO8.js";import"./date-picker-C_fAJKQH.js";import"./date-range-picker-BGANC1QV.js";import"./divider-DAT--zFd.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-BfAud4lD.js";import"./modal-drawer-DgyN-IMO.js";import"./mini-drawer-Bg91uBfo.js";import"./expansion-panel-BR0qgNj1.js";import"./open-icon-iNRg8G6Z.js";import"./file-picker-Dc9p69Bw.js";import"./floating-action-button-BFPZ5TpE.js";import"./inline-message-wW24XM3J.js";import"./key-item-xWD4yf9G.js";import"./keyboard-shortcut-CldZ9dmN.js";import"./label-value-DjHFGdMo.js";import"./meter-group-C0aI_R1b.js";import"./page-state-DECQz5Rm.js";import"./paginator-BEMdAF1g.js";import"./scaffold-F_aQKixv.js";import"./secret-CIPALb3K.js";import"./select-dropdown-eNILZvWL.js";import"./select-qTBx3wMp.js";import"./skip-link-Z2Bos027.js";import"./slider-BCeOVIL2.js";import"./split-view-BZ9zWXqn.js";import"./stack-DEQW1E_G.js";import"./stepper-DyD3Fi8x.js";import"./table-COE-n0Au.js";import"./tab-bar-Dgf4Qlh5.js";import"./time-picker-AIZ4o9mJ.js";import"./timestamp-C7Kep5Or.js";import"./toast-jhQzou4s.js";import"./toolbar-CZdsqNAv.js";import"./tooltip-u0I2RyUB.js";import"./tree-item-DvhwmMUg.js";import"./view-switcher-Jc42wfHF.js";import"./deprecated-icon-button-C7ZlTjFt.js";import"./split-button-DHVg5Cox.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
