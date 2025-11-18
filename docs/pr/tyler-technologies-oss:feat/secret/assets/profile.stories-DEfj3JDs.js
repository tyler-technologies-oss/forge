import{x as c}from"./iframe-DjbInO_b.js";import{g as u,s as f}from"./utils-CW5S_tZJ.js";import"./service-adapter-CffG5Lhq.js";import"./accordion-Cd5doxfX.js";import"./expansion-panel-BVSc4qx-.js";import"./index-5CPwzmQS.js";import"./app-bar-profile-button-BOptO8NM.js";import"./state-layer-BEEsPoZf.js";import"./focus-indicator-Cv_1OuCy.js";import{I as g}from"./icon-8E01u_jy.js";import"./menu-DXpe4txn.js";import{t as E,a as b,b as C,c as y}from"./tyler-icons-DSFxyJDy.js";import"./linear-progress-r0Hzg69v.js";import"./list-ysBZAyaQ.js";import"./popover-BAoNoe3k.js";import"./overlay-B5pGv-rV.js";import"./skeleton-BSiuL_ME.js";import"./avatar-gi9RzQFV.js";import"./icon-button-TbubEjoj.js";import"./autocomplete-Dw03JZCm.js";import"./label-ZCcUmsQy.js";import"./button-tJdHvmw4.js";import"./button-toggle-group-BMLnQmLS.js";import"./checkbox-BXz5TMrh.js";import"./switch-D4rjtgfb.js";import"./base-field-CMrVGdu7.js";import"./text-field-DdpU3jHv.js";import"./backdrop-BDRZVysw.js";import"./badge-XdwKzsiz.js";import"./banner-CISDe1zt.js";import"./bottom-sheet-fU2YBxmJ.js";import"./dialog-Dkd2fYmF.js";import"./button-area-DmTFA6VD.js";import"./calendar-CoBHHPpn.js";import"./card-qjg9TM_m.js";import"./chip-set-BcivCCHC.js";import"./circular-progress-_RSm0FGC.js";import"./color-picker-CaBSXxuI.js";import"./date-picker-Big8Uj_N.js";import"./date-range-picker-BlFsh8XH.js";import"./divider-NNdF1g4c.js";import"./base-drawer-Co31fV-T.js";import"./drawer-BsGDACAy.js";import"./modal-drawer-CNiXuj6d.js";import"./mini-drawer-DnqVAmGX.js";import"./file-picker-CygsLnrX.js";import"./floating-action-button-Cs0eIwL4.js";import"./inline-message-e4Sp2zCL.js";import"./key-item-DFoP-NmK.js";import"./keyboard-shortcut-rXqqnOKl.js";import"./label-value-BluYnIAQ.js";import"./meter-group-DgL4UNpP.js";import"./page-state-Cd_K1Ccr.js";import"./paginator-BjrNQby-.js";import"./scaffold-BrokB2Ba.js";import"./secret-BI-Ze53G.js";import"./select-dropdown-LJuKdrMc.js";import"./select-CBy_eVHm.js";import"./skip-link-C7RjCn4B.js";import"./slider-CValgxDy.js";import"./split-view-B48yBaQJ.js";import"./stack-Ca0GDYK5.js";import"./stepper-CwEsgNQ3.js";import"./table-DEkOjzYW.js";import"./tab-bar-TInHLz43.js";import"./time-picker-DBVSFAl7.js";import"./toast-DhvpuJJn.js";import"./toolbar-U0axkpKl.js";import"./tooltip-B59ljHGY.js";import"./view-switcher-BUh552L0.js";import"./deprecated-icon-button-Dr3cg2gE.js";import"./split-button-D7Jqoh14.js";const{action:d}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=d("forge-profile-card-profile"),h=d("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>c`
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
