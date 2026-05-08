import{b as d}from"./iframe-BGuHuM4N.js";import{s as u,g as f}from"./utils-BX30PoUy.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CAJFEjgM.js";import"./app-bar-profile-button-1tTsyg7-.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-B-fG3G81.js";import"./menu-BQe831kV.js";import"./linear-progress-CKPFd0xY.js";import"./list-DfyC6s3p.js";import"./popover-BFACa1rP.js";import"./overlay-DEr28VpI.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./skeleton-g_Ea1Wjh.js";import"./avatar-qrlgpR0d.js";import"./icon-button-Bp6oT2oS.js";import"./focus-indicator-Dq8EIkxu.js";import"./state-layer-Cnbc18vB.js";import"./autocomplete-CHcu6Tdr.js";import"./label-C4Lb4Yov.js";import"./button-BgdhAnEI.js";import"./button-toggle-group-DanDSH1L.js";import"./checkbox-BbQogrgm.js";import"./switch-D7bk-dlh.js";import"./base-field--bwt2zYx.js";import"./text-field-A7miXrSc.js";import"./backdrop-DuhijlGd.js";import"./badge-CN5zmi26.js";import"./banner-CE8gt1Br.js";import"./bottom-sheet-DdW016G8.js";import"./dialog-CxA04cm7.js";import"./button-area-iVKnneyA.js";import"./calendar-CB4EPRPu.js";import"./card-DNw80FtE.js";import"./chip-set-B6O1DoyX.js";import"./circular-progress-45kWhMLs.js";import"./color-picker-DJa_gysl.js";import"./date-picker-ByhtIDBP.js";import"./date-range-picker-B2_tFg0x.js";import"./divider-CqaU6UtA.js";import"./base-drawer-DBBe93d7.js";import"./drawer-1zFKHC_i.js";import"./modal-drawer-CYb8qJR2.js";import"./mini-drawer-rpwrWM4L.js";import"./expansion-panel-D2TuKYSN.js";import"./open-icon-ClW9RMht.js";import"./file-picker-Bt9h1WOA.js";import"./floating-action-button-e4AJ1jji.js";import"./inline-message-CzR1CZl4.js";import"./key-item-DvJr235G.js";import"./keyboard-shortcut--0lOcPSa.js";import"./label-value-CI8WZIke.js";import"./meter-group-B29qV7vF.js";import"./page-state-DLzWYTpL.js";import"./paginator-hs59x4lA.js";import"./scaffold-D6_2VrU0.js";import"./secret-1Ilcdu-a.js";import"./select-dropdown-C7DfXnxm.js";import"./select-D7e3CoMP.js";import"./skip-link-h5B3g4Wn.js";import"./slider-BEuPr2O6.js";import"./split-view-DUJ94vJ7.js";import"./stack-DqNjYC3W.js";import"./stepper-RrhdXfOT.js";import"./table-B_Q73PWS.js";import"./tab-bar-ByfdaX9V.js";import"./time-picker-B1sLm9F3.js";import"./toast-DacYwbPo.js";import"./toolbar-Bt_F_1V6.js";import"./tooltip-BwX4zOKW.js";import"./tree-item-j3f6yXIm.js";import"./view-switcher-Ckdngb02.js";import"./deprecated-icon-button-WMlwHXqB.js";import"./split-button-C0JSRMhm.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],zt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,zt as P,m as W};
