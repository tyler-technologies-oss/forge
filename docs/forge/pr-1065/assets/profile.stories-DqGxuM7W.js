import{b as d}from"./iframe-Dth6_egW.js";import{s as u,g as f}from"./utils-CWixVBNc.js";import"./service-adapter-CffG5Lhq.js";import"./accordion-D8n3fbCt.js";import"./expansion-panel-huBiB0DZ.js";import"./open-icon-BIuINibX.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-Cu8T5ELp.js";import"./state-layer-DGD4bZzf.js";import"./focus-indicator-B-dA_pS-.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CBdZU-Tr.js";import"./menu-ZwmPN7jJ.js";import"./linear-progress-CpNoMDP5.js";import"./list-DWE1lvT_.js";import"./popover-D2EVteKl.js";import"./overlay-B2P-gJmC.js";import"./skeleton-C3LWj3F7.js";import"./avatar-CoNl_wG2.js";import"./icon-button-CF_eJVHZ.js";import"./autocomplete-Dmh6dCYc.js";import"./label-BliWxyZI.js";import"./button-CCXfLiyX.js";import"./button-toggle-group-CSQXWtK6.js";import"./checkbox-A_T5kZqn.js";import"./switch-OFMDq2FL.js";import"./base-field-3pt65tIH.js";import"./text-field-95RFwaUi.js";import"./backdrop-CaFxRXEM.js";import"./badge-DeEsYI92.js";import"./banner-BjojDMb8.js";import"./bottom-sheet-9RBhFU7Z.js";import"./dialog-CGP43TQA.js";import"./button-area-D6zMjKRm.js";import"./calendar-qResVFI4.js";import"./card-B8EHPAeX.js";import"./chip-set-DZSNzqJo.js";import"./circular-progress-C2aFmJj-.js";import"./color-picker-COLqjkeQ.js";import"./date-picker-Bo4JF9aC.js";import"./date-range-picker-BUUYGvQC.js";import"./divider-Dq-Slgl_.js";import"./base-drawer-CNdRFpRQ.js";import"./drawer-D79-TANn.js";import"./modal-drawer-DO8CNRCC.js";import"./mini-drawer-CPIvZj6f.js";import"./file-picker-BLMRAxLr.js";import"./floating-action-button-D33r2yiK.js";import"./inline-message-kV-z6eDt.js";import"./key-item-DpwzRNQ9.js";import"./keyboard-shortcut-48xwLAq2.js";import"./label-value-CmUo1iy-.js";import"./meter-group-Co_97Wq8.js";import"./page-state-CSOfrMln.js";import"./paginator-C76mmpip.js";import"./scaffold-CspBWUuL.js";import"./select-dropdown-SB0y3Is9.js";import"./select-bdIJpink.js";import"./skip-link-Bol5Q64C.js";import"./slider-B-_xedoj.js";import"./split-view-COvoK_Qk.js";import"./stack-B5sNQmDm.js";import"./stepper-AmtvpvUV.js";import"./table-HpXq1rTW.js";import"./tab-bar-DK612yOZ.js";import"./time-picker-CkUrslJH.js";import"./toast-Cm1SuAVQ.js";import"./toolbar-DM62Euqg.js";import"./tooltip-DxbQteKS.js";import"./tree-item-mHvaxiiy.js";import"./view-switcher-BguW3JYm.js";import"./deprecated-icon-button-CP01OtJ9.js";import"./split-button-BTo5engA.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
