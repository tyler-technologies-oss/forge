import{b as d}from"./iframe-BUvWK7Gm.js";import{s as u,g as f}from"./utils-D8X1NLZa.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-CR3yzAlp.js";import"./expansion-panel-Fnf-xp2Z.js";import"./open-icon-C85rqQKN.js";import"./app-bar-profile-button-DWbu1Ujn.js";import"./state-layer-CwwoRddA.js";import"./focus-indicator-DuaWb64U.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-Dn_DGO8W.js";import"./index-DTwfV0k0.js";import"./menu-DXlfSZOj.js";import"./linear-progress-BPDXw63a.js";import"./list-RnOo0JfG.js";import"./popover-BxT30IVE.js";import"./overlay-DPtUw_or.js";import"./skeleton-CXhX8HjP.js";import"./avatar-CKyki4Bd.js";import"./icon-button-BsxQaUJP.js";import"./autocomplete-BJIQdmYB.js";import"./label-CNb-VxA0.js";import"./button-HjiDhvyP.js";import"./button-toggle-group-CC0eMfsb.js";import"./checkbox-B4E0RTGG.js";import"./switch-C39lFNL9.js";import"./base-field-Cj5xcuNX.js";import"./text-field-BFpW9S5W.js";import"./backdrop-D38KdwVf.js";import"./badge-CtauCBDM.js";import"./banner-CwybgrW-.js";import"./bottom-sheet-Bz5tAfnc.js";import"./dialog-BHIjTFN9.js";import"./button-area-CjaLvRVE.js";import"./calendar-tf8juC7i.js";import"./card-DZFfX2Zm.js";import"./chip-set-BlPamC3y.js";import"./circular-progress-sCU3ipF0.js";import"./color-picker-D2UB1HEg.js";import"./date-picker-cWalJa5k.js";import"./date-range-picker-as4TgUol.js";import"./divider-C8Z9knLF.js";import"./base-drawer-DhUDqhET.js";import"./drawer-CBjgLAp7.js";import"./modal-drawer-B92jreWY.js";import"./mini-drawer-BoKnXVqz.js";import"./file-picker-D7lXtcBF.js";import"./floating-action-button-B-pFom5F.js";import"./inline-message-Bxm-OuA9.js";import"./key-item-DC62Pvk_.js";import"./keyboard-shortcut-BUn6QSxQ.js";import"./label-value-CWtpDJwk.js";import"./meter-group-DQh2Lpv6.js";import"./page-state-B0m1Ibgi.js";import"./paginator-Bj8Ibddm.js";import"./scaffold-Cez5RFLR.js";import"./select-dropdown-BMif0J6W.js";import"./select-BkB8g7SK.js";import"./skip-link-DuTjWep6.js";import"./slider-Z1aCHwMT.js";import"./split-view-BEHGZw-T.js";import"./stack-Csa7srza.js";import"./stepper-F3wJJAcs.js";import"./table-DHMinpAM.js";import"./tab-bar-BsPWV6_f.js";import"./time-picker-BtYiVfaU.js";import"./toast-C4MXN8kd.js";import"./toolbar-EYXxyIl9.js";import"./tooltip-CMogPifb.js";import"./tree-item-BokMeoGM.js";import"./view-switcher-CFtDEX4F.js";import"./deprecated-icon-button-BX4rR-ib.js";import"./split-button-DmlUvd02.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
