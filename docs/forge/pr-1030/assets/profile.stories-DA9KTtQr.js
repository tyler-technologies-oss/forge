import{b as d}from"./iframe-B38eiIpt.js";import{s as u,g as f}from"./utils-CS54QUTa.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DH8AC8-s.js";import"./app-bar-profile-button-CuoLvOro.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BfEfrJAD.js";import"./menu-Dm2oMpNf.js";import"./linear-progress-DP1CUIRM.js";import"./list-C_gt2u52.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-D61MW3KI.js";import"./icon-button-B-xwgZ7R.js";import"./focus-indicator-BeiZJUxg.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-C0DOQbMt.js";import"./label-yIFWZUuC.js";import"./button-l2TaC5YD.js";import"./button-toggle-group-BxGMO4ey.js";import"./checkbox-DDQ5l1s5.js";import"./switch-CTOXzh5k.js";import"./base-field-BPOZdEy4.js";import"./text-field-C1qG5G3s.js";import"./backdrop-B_VtJyIN.js";import"./badge-Do7g-pGB.js";import"./banner-BJEp5F6K.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-D3WyzIP9.js";import"./calendar-C44kk6hh.js";import"./card-Bdr1Z4K_.js";import"./chip-set-CvIg8_aM.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-CUr5tunA.js";import"./date-picker-DRU-8N4z.js";import"./date-range-picker-ClOz2C0V.js";import"./divider-BDvO2mIa.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-DK4-VwJ0.js";import"./open-icon-OorddBD6.js";import"./file-picker-CkyO9-o4.js";import"./floating-action-button-BBNQ9vNk.js";import"./inline-message-BK9gijHu.js";import"./key-item-C4v3BMMA.js";import"./keyboard-shortcut-CBuVCe3T.js";import"./label-value-BE9wSmbi.js";import"./meter-group-DUrW6O50.js";import"./page-state-BYBCycIs.js";import"./paginator-BgZck1zs.js";import"./scaffold-D_SIXSFE.js";import"./secret-qzdASONT.js";import"./select-dropdown-DaR4Bsd3.js";import"./select-Ck-UmjZ2.js";import"./skip-link-CaHoYIvN.js";import"./slider-CuYuHKaI.js";import"./split-view-CsrOxb-9.js";import"./stack-BuaXNRar.js";import"./stepper-B-suWnM7.js";import"./table-CfJHvU0e.js";import"./tab-bar-BfU3tWTV.js";import"./time-picker-2MRrznqB.js";import"./toast-BHh0tC6g.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-BEBjXQva.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-CXx9mX45.js";import"./split-button-DOq0N0r2.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
