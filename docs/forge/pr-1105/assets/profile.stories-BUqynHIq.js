import{b as d}from"./iframe-C07_izNT.js";import{s as u,g as f}from"./utils-B3m7KQiq.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BGI3m56J.js";import"./app-bar-profile-button-DsBoMkv6.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-fP-z9z1i.js";import"./index-DTwfV0k0.js";import"./menu-DCHQAwat.js";import"./linear-progress-g34J3BlM.js";import"./list-D_-uWQM4.js";import"./popover-DSGvC3fA.js";import"./overlay-Bcsgewax.js";import"./skeleton-C_yfi0NG.js";import"./avatar-Q39TJc0M.js";import"./icon-button-DM1nATYu.js";import"./focus-indicator-CXn9rWMK.js";import"./state-layer-BsCfz34t.js";import"./autocomplete-CI7Bh8Zy.js";import"./label-C6FUeE-w.js";import"./button-BHFcZZh0.js";import"./button-toggle-group-fHeSNXzP.js";import"./checkbox-gX6kE-qO.js";import"./switch-CK2cqgnY.js";import"./base-field-CEekToEX.js";import"./text-field-BXpA3LZ6.js";import"./backdrop-B9sZOcNp.js";import"./badge-lT9fck_t.js";import"./banner-Dh6mPXjn.js";import"./bottom-sheet-Ci5YcrRY.js";import"./dialog-C9AF9uqq.js";import"./button-area-CC12g-dL.js";import"./calendar-yPEfLGDB.js";import"./card-CEQtzTox.js";import"./chip-set-BdyeEYKz.js";import"./circular-progress-CCLVy_ad.js";import"./color-picker-BDKOT4mo.js";import"./date-picker-CkOmP1YI.js";import"./date-range-picker-Bup_FTCz.js";import"./divider-BUGsg7NB.js";import"./base-drawer-iGLMTyCj.js";import"./drawer-C-0etnGZ.js";import"./modal-drawer-DEEX0WZG.js";import"./mini-drawer-rL418fzY.js";import"./expansion-panel-DJx9zX1O.js";import"./open-icon-BVRD-J94.js";import"./file-picker-Dk72iNJa.js";import"./floating-action-button-Budp11WG.js";import"./inline-message-DH9Yz0cL.js";import"./key-item-DI_UG27x.js";import"./keyboard-shortcut-Bjgx-7Oa.js";import"./label-value-CSUslzUh.js";import"./meter-group-BAEqMWtk.js";import"./page-state-cCaRF79S.js";import"./paginator-B4e7pSQW.js";import"./scaffold-Lrq4JV9O.js";import"./select-dropdown-BPshTfAQ.js";import"./select-CVAYiG9b.js";import"./skip-link-Bnim_CaD.js";import"./slider-NH16rOfx.js";import"./split-view-Bt2il7ys.js";import"./stack-ClIWuQav.js";import"./stepper-RSLeaoi1.js";import"./table-4FsG5xWk.js";import"./tab-bar-HjtnoxBk.js";import"./time-picker-BnA1wokk.js";import"./toast-D7w5g0A3.js";import"./toolbar-DtwiO902.js";import"./tooltip-D8EeGsiQ.js";import"./tree-item-BltrJIEP.js";import"./view-switcher-e7DS3krj.js";import"./deprecated-icon-button-BuAwYzER.js";import"./split-button-PUFGBH1r.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Ht=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Ht as P,m as W};
