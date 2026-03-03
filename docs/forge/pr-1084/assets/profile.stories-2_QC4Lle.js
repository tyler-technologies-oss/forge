import{b as d}from"./iframe-dAtU2vvt.js";import{s as u,g as f}from"./utils-B1jcnhxN.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-qhnN9Dhm.js";import"./expansion-panel-CKd1i4pm.js";import"./open-icon-DNzxAzu8.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-BGdSLnbj.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DRTyRvfU.js";import"./menu-B-zWNJGq.js";import"./linear-progress-Dnev6XAt.js";import"./list-q81koXCd.js";import"./popover-s3N-XehF.js";import"./overlay-CsYzVqz1.js";import"./skeleton-D35b5pv1.js";import"./avatar-DeVvw1Bv.js";import"./icon-button-40-NqBQw.js";import"./focus-indicator-BC2qbUuq.js";import"./state-layer-D7Damx7l.js";import"./autocomplete-_-Fawsfe.js";import"./label-D63b6iFZ.js";import"./button-qNFmpVhf.js";import"./button-toggle-group-DNCHKiic.js";import"./checkbox-CNf8I4ZE.js";import"./switch-DbzIkr93.js";import"./base-field-CHockaW1.js";import"./text-field-9bCAX2Ig.js";import"./backdrop-DBJsfqA2.js";import"./badge-DvGHMELT.js";import"./banner-BWku9Wzx.js";import"./bottom-sheet-Ce3j_iPW.js";import"./dialog-BidBU9U3.js";import"./button-area-Qd0iw3UM.js";import"./calendar-vcLAH67-.js";import"./card-dM4qftE4.js";import"./chip-set-CTynvkHY.js";import"./circular-progress-YjONhwAO.js";import"./color-picker-B01k3rEO.js";import"./date-picker-KJagQisQ.js";import"./date-range-picker-CZyBoM3L.js";import"./divider-BUi3LQey.js";import"./base-drawer-CMV8i4IQ.js";import"./drawer-6E6dRWgC.js";import"./modal-drawer-S8qVhni2.js";import"./mini-drawer-BD0KMCV8.js";import"./file-picker-CZjchGpG.js";import"./floating-action-button-BHUHFN79.js";import"./inline-message-D4tR_oFp.js";import"./key-item-LrcgnUcZ.js";import"./keyboard-shortcut-YNNDN05D.js";import"./label-value-BrspRHH6.js";import"./meter-group-shN6KO1W.js";import"./page-state-Ds7MnXyo.js";import"./paginator-DvrRDDOU.js";import"./scaffold-B5aByuW8.js";import"./select-dropdown-CPXeuMet.js";import"./select-HiCKH7s6.js";import"./skip-link-BsdoThbY.js";import"./slider-CQhwCW1x.js";import"./split-view-Buk2qBRV.js";import"./stack-DOOJtDNF.js";import"./stepper-DUNIu5eI.js";import"./table-DHaoZGQR.js";import"./tab-bar-CFhvp5fX.js";import"./time-picker-CDkC1P8j.js";import"./toast-CKFDj2Wq.js";import"./toolbar-DKTN8__P.js";import"./tooltip-jHI1dl1O.js";import"./tree-item-BcwG-t-M.js";import"./view-switcher-CH_mOtvX.js";import"./deprecated-icon-button-DzvjWeIp.js";import"./split-button-CjIo9Edh.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
