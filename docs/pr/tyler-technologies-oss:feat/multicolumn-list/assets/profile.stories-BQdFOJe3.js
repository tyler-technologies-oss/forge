import{x as c}from"./iframe-D16noSNJ.js";import{g as u,s as f}from"./utils-DsSoWqyO.js";import"./service-adapter-CffG5Lhq.js";import"./accordion-CnSE3ZIq.js";import"./expansion-panel-BYSwwFye.js";import"./open-icon-pKbfwaP0.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-aBMhLD0R.js";import"./state-layer-BEEsPoZf.js";import"./focus-indicator-BLwe5ycG.js";import{I as g,t as E,a as b,b as C,c as y}from"./icon-Uwxy940_.js";import"./menu-BM0-jbBn.js";import"./linear-progress-r0Hzg69v.js";import"./list-BLMT7u2q.js";import"./popover-DE3KaoDh.js";import"./overlay-DbqVLn-W.js";import"./skeleton-BSiuL_ME.js";import"./avatar-DIR4-rkf.js";import"./icon-button-BvFpEW_8.js";import"./autocomplete-DyumgmB0.js";import"./label-C88z5MGI.js";import"./button--VLz5M7S.js";import"./button-toggle-group-RMwhM1eu.js";import"./checkbox-VF6_JXKv.js";import"./switch-DKdUYrFg.js";import"./base-field-Xq59hvFp.js";import"./text-field-Dz1Qgq4L.js";import"./backdrop-BDRZVysw.js";import"./badge-eLEtikfR.js";import"./banner-CnR4zc63.js";import"./bottom-sheet-fU2YBxmJ.js";import"./dialog-Dkd2fYmF.js";import"./button-area-BaXqnexa.js";import"./calendar-LxJqVWpa.js";import"./card-CUvJC4Qy.js";import"./chip-set-C1DvTPYU.js";import"./circular-progress-_RSm0FGC.js";import"./color-picker-C96o922P.js";import"./date-picker-CEw05o0o.js";import"./date-range-picker-k8WVm5vK.js";import"./divider-NNdF1g4c.js";import"./base-drawer-Co31fV-T.js";import"./drawer-BsGDACAy.js";import"./modal-drawer-CNiXuj6d.js";import"./mini-drawer-DnqVAmGX.js";import"./file-picker-qjUJoh-o.js";import"./floating-action-button-PdBK2JF2.js";import"./inline-message-e4Sp2zCL.js";import"./key-item-3Cp5YvVe.js";import"./keyboard-shortcut-rXqqnOKl.js";import"./label-value-BluYnIAQ.js";import"./meter-group-CMicMHPl.js";import"./page-state-Cd_K1Ccr.js";import"./paginator-C0DEr9gr.js";import"./scaffold-BrokB2Ba.js";import"./select-dropdown-CYQ8IT2k.js";import"./select-wzYv8MyB.js";import"./skip-link-WVafnBg5.js";import"./slider-BY_W8n1q.js";import"./split-view-BSWsyBum.js";import"./stack-Ca0GDYK5.js";import"./stepper-CKn-WoZ-.js";import"./table-DBNmSV8A.js";import"./tab-bar-XBrOOji5.js";import"./time-picker-BCY68JKp.js";import"./toast-BK9ZpX0t.js";import"./toolbar-U0axkpKl.js";import"./tooltip-KOXasit9.js";import"./tree-item-CZGMW3py.js";import"./view-switcher-BUh552L0.js";import"./deprecated-icon-button-DvhrnRxV.js";import"./split-button-CC2YiORl.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=d("forge-profile-card-profile"),h=d("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>c`
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
