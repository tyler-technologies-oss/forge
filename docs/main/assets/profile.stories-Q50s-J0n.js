import{x as c}from"./iframe-TK8e1Aaz.js";import{g as u,s as f}from"./utils-f-9lfKsg.js";import"./service-adapter-CffG5Lhq.js";import"./accordion-CnSE3ZIq.js";import"./expansion-panel-BYSwwFye.js";import"./open-icon-pKbfwaP0.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-rooqUXj0.js";import"./state-layer-BEEsPoZf.js";import"./focus-indicator-r6jPcSl0.js";import{I as g,t as E,a as b,b as C,c as y}from"./icon-Uwxy940_.js";import"./menu-B-u-Lkeq.js";import"./linear-progress-r0Hzg69v.js";import"./list-Ch6gYAwG.js";import"./popover-DE3KaoDh.js";import"./overlay-DbqVLn-W.js";import"./skeleton-BSiuL_ME.js";import"./avatar-D_Xb1ibY.js";import"./icon-button-C7XbQQVi.js";import"./autocomplete-4XhemIT9.js";import"./label-BXAMiPO0.js";import"./button-D-_pvVZT.js";import"./button-toggle-group-CG-Wgbj8.js";import"./checkbox-eJQKgkD_.js";import"./switch-DiIwmj43.js";import"./base-field-dZZd44V_.js";import"./text-field-PgyPT3Gh.js";import"./backdrop-BDRZVysw.js";import"./badge-D9mMVIiL.js";import"./banner-Bvb-PCMn.js";import"./bottom-sheet-fU2YBxmJ.js";import"./dialog-Dkd2fYmF.js";import"./button-area-D3f7HoE1.js";import"./calendar-TsObRnht.js";import"./card-DUtPhrzN.js";import"./chip-set-CRWUNY7s.js";import"./circular-progress-_RSm0FGC.js";import"./color-picker-B1BMb0PJ.js";import"./date-picker-B3uypuTT.js";import"./date-range-picker-D51AjQY8.js";import"./divider-NNdF1g4c.js";import"./base-drawer-Co31fV-T.js";import"./drawer-BsGDACAy.js";import"./modal-drawer-CNiXuj6d.js";import"./mini-drawer-DnqVAmGX.js";import"./file-picker-Dq-BN7JO.js";import"./floating-action-button-B18kX1OW.js";import"./inline-message-e4Sp2zCL.js";import"./key-item-C3Z1o6Hc.js";import"./keyboard-shortcut-rXqqnOKl.js";import"./label-value-BluYnIAQ.js";import"./meter-group-C_JrSbh3.js";import"./page-state-Cd_K1Ccr.js";import"./paginator-DEecP6Sy.js";import"./scaffold-BrokB2Ba.js";import"./select-dropdown-Y3kXEQl7.js";import"./select-BhKXf2KG.js";import"./skip-link-CN-_pqUI.js";import"./slider-CWPt4r2W.js";import"./split-view-CaFekMQ2.js";import"./stack-Ca0GDYK5.js";import"./stepper-DYuODmu6.js";import"./table-8Sh6QQfl.js";import"./tab-bar-HWEjxDBP.js";import"./time-picker-DrpPxnqF.js";import"./toast-Cle_1nXs.js";import"./toolbar-U0axkpKl.js";import"./tooltip-KOXasit9.js";import"./tree-item-BVqHJCa3.js";import"./view-switcher-BUh552L0.js";import"./deprecated-icon-button-B_pAvwOE.js";import"./split-button-W8MyHUPd.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=d("forge-profile-card-profile"),h=d("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>c`
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
