import{x as c}from"./iframe-DvzYYDEL.js";import{g as u,s as f}from"./utils-bIwC1Fgv.js";import"./service-adapter-CffG5Lhq.js";import"./accordion-52DczsbS.js";import"./expansion-panel-CtPm9dI4.js";import"./index-5CPwzmQS.js";import"./app-bar-profile-button-DcCDFID2.js";import"./state-layer-gAgMwMHF.js";import"./focus-indicator-CYY3hsVP.js";import{I as g,t as E,a as b,b as C,c as y}from"./icon-kuXwuZAY.js";import"./menu-CO-itWoG.js";import"./linear-progress-r0Hzg69v.js";import"./list-BxtlSGaH.js";import"./popover-BWVazmya.js";import"./overlay-B5pGv-rV.js";import"./skeleton-BSiuL_ME.js";import"./avatar-CkBL4-6r.js";import"./icon-button-CWJaRG64.js";import"./autocomplete-BQzx2neK.js";import"./label-lXbLGIq1.js";import"./button-7Bd6sVjk.js";import"./button-toggle-group-DdGWRdPb.js";import"./checkbox-B6Kt8dNp.js";import"./switch-DbSCLUhy.js";import"./base-field--RtK2tIj.js";import"./text-field-D5NeDVhI.js";import"./backdrop-BDRZVysw.js";import"./badge-BfXCcutD.js";import"./banner-Dnth9iT9.js";import"./bottom-sheet-fU2YBxmJ.js";import"./dialog-Dkd2fYmF.js";import"./button-area-BLycwsjJ.js";import"./calendar-Dou4UWOX.js";import"./card-BOq2mWLY.js";import"./chip-set-Cdoh8p8k.js";import"./circular-progress-_RSm0FGC.js";import"./color-picker-5_KW64Xz.js";import"./date-picker-CocTnd_S.js";import"./date-range-picker-FOdOtW1i.js";import"./divider-NNdF1g4c.js";import"./base-drawer-CyECteXI.js";import"./drawer-B9FH5M3o.js";import"./modal-drawer-DeyGxZKd.js";import"./mini-drawer-BWLlcDZ8.js";import"./file-picker-DlRwlR66.js";import"./floating-action-button-Da2Yon1X.js";import"./inline-message-e4Sp2zCL.js";import"./key-item-D5rjqRnW.js";import"./keyboard-shortcut-rXqqnOKl.js";import"./label-value-BluYnIAQ.js";import"./meter-group-D8_rVNOC.js";import"./page-state-Cd_K1Ccr.js";import"./paginator-BhPF7qe5.js";import"./scaffold-BrokB2Ba.js";import"./select-dropdown-02sY2QjG.js";import"./select-D3APlfbj.js";import"./skip-link-CzX_9SbT.js";import"./slider-MubG8Gra.js";import"./split-view-BM7dcns5.js";import"./stack-Ca0GDYK5.js";import"./stepper-C10dK8_i.js";import"./table-DGWhZ6EU.js";import"./tab-bar-Kf6S-W9v.js";import"./time-picker-CUsXpItF.js";import"./toast-C9UN5c3P.js";import"./toolbar-U0axkpKl.js";import"./tooltip-B59ljHGY.js";import"./view-switcher-BUh552L0.js";import"./deprecated-icon-button-YmeQwLYc.js";import"./split-button-BmEUQ9tL.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=d("forge-profile-card-profile"),h=d("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>c`
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
    `,component:s,argTypes:{...u({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},l={},m={...f,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.log("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return c`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"{}",...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    function builder() {
      const listElement = document.createElement('forge-list');
      listElement.addEventListener('forge-list-item-select', ({
        detail
      }) => {
        console.log('[profile-card] Selected custom item:', detail.value);
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
}`,...m.parameters?.docs?.source}}};const x=["Demo","WithCustomContent"],Ft=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:x,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Ft as P,m as W};
