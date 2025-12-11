import{x as c}from"./iframe-aLJo785t.js";import{g as u,s as f}from"./utils-CWNZ6DqN.js";import"./service-adapter-CffG5Lhq.js";import"./accordion-BsvBejiM.js";import"./expansion-panel-8TqHUyq-.js";import"./open-icon-pKbfwaP0.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-DTNmkxqf.js";import"./state-layer-BEEsPoZf.js";import"./focus-indicator-BYHHNw4I.js";import{I as g,t as E,a as b,b as C,c as y}from"./icon-Uwxy940_.js";import"./menu-jGCmTG58.js";import"./linear-progress-r0Hzg69v.js";import"./list-xhRlEmwf.js";import"./popover-DE3KaoDh.js";import"./overlay-DbqVLn-W.js";import"./skeleton-BSiuL_ME.js";import"./avatar-Cqd8tvXb.js";import"./icon-button-B9l1618B.js";import"./autocomplete-Bcchrqko.js";import"./label-BtZLFMp2.js";import"./button-CAXl3FKc.js";import"./button-toggle-group-cmFHWZcw.js";import"./checkbox-DuE98e41.js";import"./switch-im3giyJV.js";import"./base-field-B0-OG4LL.js";import"./text-field-DTPf9kcV.js";import"./backdrop-BDRZVysw.js";import"./badge-BtuTx7_Q.js";import"./banner-D-SaSzwf.js";import"./bottom-sheet-fU2YBxmJ.js";import"./dialog-Dkd2fYmF.js";import"./button-area-Bv3HrM8U.js";import"./calendar-DQFOjID7.js";import"./card-BAfhtDfB.js";import"./chip-set-Ml0FvWA4.js";import"./circular-progress-_RSm0FGC.js";import"./color-picker-BD0DCO9t.js";import"./date-picker-D6LluSwL.js";import"./date-range-picker-COOPP9yU.js";import"./divider-NNdF1g4c.js";import"./base-drawer-Co31fV-T.js";import"./drawer-BsGDACAy.js";import"./modal-drawer-CNiXuj6d.js";import"./mini-drawer-DnqVAmGX.js";import"./file-picker-BauOhI5_.js";import"./floating-action-button-CpwGl7Pp.js";import"./inline-message-e4Sp2zCL.js";import"./key-item-kYH-nHe9.js";import"./keyboard-shortcut-rXqqnOKl.js";import"./label-value-BluYnIAQ.js";import"./meter-group-C7QLUwuI.js";import"./page-state-Cd_K1Ccr.js";import"./paginator-CfhIfGjg.js";import"./scaffold-BrokB2Ba.js";import"./select-dropdown-_ztmZfQk.js";import"./select-BL6p45KA.js";import"./skip-link-ClLbmLE-.js";import"./slider-BYA_xtlG.js";import"./split-view-CN4H3yGF.js";import"./stack-Ca0GDYK5.js";import"./stepper-Cv98pYtm.js";import"./table-DDznfim8.js";import"./tab-bar-wN3P4ScG.js";import"./time-picker-DiFlPDa4.js";import"./toast--n02z_kK.js";import"./toolbar-U0axkpKl.js";import"./tooltip-KOXasit9.js";import"./view-switcher-BUh552L0.js";import"./deprecated-icon-button-BRGL0itu.js";import"./split-button-CNf0PPM3.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=d("forge-profile-card-profile"),h=d("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>c`
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
}`,...m.parameters?.docs?.source}}};const x=["Demo","WithCustomContent"],jt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:x,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,jt as P,m as W};
