import{b as d}from"./iframe-Y92HmdHZ.js";import{s as u,g as f}from"./utils-DbbJplVM.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CB79L-wT.js";import"./app-bar-menu-button-3fshlFiS.js";import"./app-bar-profile-button-WsP3_rm8.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-SWWw4qdQ.js";import"./menu-Croe9Yxl.js";import"./linear-progress-Dj7Wb6Io.js";import"./list-CSKmw5w_.js";import"./popover-CqxRAdRj.js";import"./overlay-OLurZXLD.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-FcTi7X6q.js";import"./list-item-DkeO-h5u.js";import"./avatar-B8eTfiem.js";import"./icon-button-BG-KzVAg.js";import"./focus-indicator-CypHdldK.js";import"./state-layer-C4o8tMgM.js";import"./autocomplete-B7V2PGZL.js";import"./label-DSSUgOwJ.js";import"./base-field-CkmJM5z3.js";import"./text-field-DSbKfCGl.js";import"./backdrop-BlmHgV5b.js";import"./badge-DIdXzCuH.js";import"./banner-EKx5TKQM.js";import"./bottom-sheet-Beo76fUe.js";import"./dialog-C-zyrl9l.js";import"./button-area-ChCJ5CnA.js";import"./button-toggle-group-CrMPg9cW.js";import"./button-BUQjmV8l.js";import"./calendar-SkUls6rb.js";import"./card-De0-ErPh.js";import"./checkbox-C1eMKEmS.js";import"./chip-set-Bwj6Zi0S.js";import"./circular-progress-Bc1cF_P_.js";import"./color-picker--P1Kfn_3.js";import"./date-picker-cAxLG26t.js";import"./date-range-picker-CPF0Xjfa.js";import"./divider-DHqIzZ4F.js";import"./base-drawer-BWOPap5Z.js";import"./drawer-DDIZKTPG.js";import"./modal-drawer-D4WrCteS.js";import"./mini-drawer-4my3NLc4.js";import"./expansion-panel-BJnc3kmq.js";import"./open-icon-BWpwmz_Y.js";import"./file-picker-B5L1Tb3i.js";import"./floating-action-button-A3lqgEBN.js";import"./inline-message-aDJxkqUR.js";import"./key-item-D5XRLCjV.js";import"./keyboard-shortcut-D7Lk6qtL.js";import"./label-value-D_mAyTRE.js";import"./meter-group-C3TnBEjQ.js";import"./page-state-B___JwBk.js";import"./paginator-BjVn02NB.js";import"./radio-group-uL1mzLjW.js";import"./scaffold-zUZ5R4dI.js";import"./secret-DH2CiBkb.js";import"./select-dropdown-Hd3TElKH.js";import"./select-B4z0S6Zl.js";import"./skip-link-B0TiXM_n.js";import"./slider-CwNh-zBV.js";import"./split-view-AhArCsJo.js";import"./stack-CSbxxxDz.js";import"./stepper-BTODe-KY.js";import"./switch-D_CS2lkl.js";import"./table-Cmw3BM4n.js";import"./tab-panel-IAdcQ-dj.js";import"./time-picker-DmzHh-TU.js";import"./timestamp-BSWKrw2Z.js";import"./toast-DCkK1d2B.js";import"./toolbar-xc73DdA4.js";import"./tooltip-DMlClJRm.js";import"./tree-item-cLxavFCI.js";import"./view-switcher-Dt9MVoxU.js";import"./deprecated-icon-button-CpQY1t8S.js";import"./split-button-MQDHmJSy.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Gt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Gt as P,m as W};
