import{x as c}from"./iframe-CTlBxetq.js";import{g as u,s as f}from"./utils-CW5S_tZJ.js";import"./service-adapter-CffG5Lhq.js";import"./accordion-Cd5doxfX.js";import"./expansion-panel-BVSc4qx-.js";import"./index-5CPwzmQS.js";import"./app-bar-profile-button-BH6uRN4g.js";import"./state-layer-BEEsPoZf.js";import"./focus-indicator-DqecK8AZ.js";import{I as g}from"./icon-8E01u_jy.js";import"./menu-BRlqZ0b3.js";import{t as E,a as b,b as C,c as y}from"./tyler-icons-DSFxyJDy.js";import"./linear-progress-r0Hzg69v.js";import"./list-BKp-_kHy.js";import"./popover-BAoNoe3k.js";import"./overlay-B5pGv-rV.js";import"./skeleton-BSiuL_ME.js";import"./avatar-9YZWNR7_.js";import"./icon-button-BOgRkafK.js";import"./autocomplete-BhYlKu6j.js";import"./label-v7I4_Dr7.js";import"./button-DuzS7LRd.js";import"./button-toggle-group-D0XOjiyi.js";import"./checkbox-CS6EEcS6.js";import"./switch-Ts344y2Y.js";import"./base-field-BbyPNv6a.js";import"./text-field-BDMP2SAD.js";import"./backdrop-BDRZVysw.js";import"./badge-yJ1qot3p.js";import"./banner-CCxUsRgX.js";import"./bottom-sheet-fU2YBxmJ.js";import"./dialog-Dkd2fYmF.js";import"./button-area-NQoIeGb5.js";import"./calendar-C1KB8zZs.js";import"./card-BDziqQrP.js";import"./chip-set-Dj3Pwe4L.js";import"./circular-progress-_RSm0FGC.js";import"./color-picker-X9QFbKrG.js";import"./date-picker-DrQKXymh.js";import"./date-range-picker-CnzmnqTR.js";import"./divider-NNdF1g4c.js";import"./base-drawer-Co31fV-T.js";import"./drawer-BsGDACAy.js";import"./modal-drawer-CNiXuj6d.js";import"./mini-drawer-DnqVAmGX.js";import"./file-picker-IR5PQiFD.js";import"./floating-action-button-K9ML0G-e.js";import"./inline-message-e4Sp2zCL.js";import"./key-item-BpcekX0q.js";import"./keyboard-shortcut-rXqqnOKl.js";import"./label-value-BluYnIAQ.js";import"./meter-group-bJfVZP0S.js";import"./page-state-Cd_K1Ccr.js";import"./paginator-rFOXcQA0.js";import"./scaffold-BrokB2Ba.js";import"./secret-Cdza3oU8.js";import"./select-dropdown-Db8kLBqj.js";import"./select-BXia1ehz.js";import"./skip-link-D0W7WXlk.js";import"./slider-BBkHn5SI.js";import"./split-view-BAaRBFip.js";import"./stack-Ca0GDYK5.js";import"./stepper-BkXu818M.js";import"./table-NL5ziOwA.js";import"./tab-bar-BAdtJepk.js";import"./time-picker-CnkePEm9.js";import"./toast-D0SIG7M6.js";import"./toolbar-U0axkpKl.js";import"./tooltip-B59ljHGY.js";import"./view-switcher-BUh552L0.js";import"./deprecated-icon-button-CPKcoEHg.js";import"./split-button-DR4p6q3z.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=d("forge-profile-card-profile"),h=d("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>c`
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
}`,...m.parameters?.docs?.source}}};const x=["Demo","WithCustomContent"],Ut=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:x,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Ut as P,m as W};
