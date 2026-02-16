import{b as d}from"./iframe-CSywYpvx.js";import{s as u,g as f}from"./utils-DLgMzbe-.js";import"./service-adapter-CffG5Lhq.js";import"./accordion-BbIQ9d_o.js";import"./expansion-panel-D1y0KEEj.js";import"./open-icon-BK25xsdk.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-Do14EywD.js";import"./state-layer-u9rLNX9t.js";import"./focus-indicator-D4hJH6o8.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-B0WPf66k.js";import"./menu-CtPVV0Sq.js";import"./linear-progress-CsYLd0m5.js";import"./list-Dmc107k5.js";import"./popover-zm7hjeEB.js";import"./overlay-BhwPRyah.js";import"./skeleton-DllEP8un.js";import"./avatar-CKKdz4B2.js";import"./icon-button-4mjEeylW.js";import"./autocomplete-iP0DpoFs.js";import"./label-BnttN8Gt.js";import"./button-DFhDR1qs.js";import"./button-toggle-group-BYn1tg2z.js";import"./checkbox-DpCO2BqI.js";import"./switch-DCFuVn_w.js";import"./base-field-DR01BPC3.js";import"./text-field-DdSzHiw5.js";import"./backdrop-ZqVEdIYI.js";import"./badge-Ct4HlFZ8.js";import"./banner-CIZg1OSY.js";import"./bottom-sheet-DCXcVNc8.js";import"./dialog-CvQkKqsY.js";import"./button-area-BaPjed_3.js";import"./calendar-C-lgv0z7.js";import"./card-RNAgGXO5.js";import"./chip-set-DPqS0lO0.js";import"./circular-progress-Ctu3rS_y.js";import"./color-picker-D8sb5xrG.js";import"./date-picker-D-r_WlCJ.js";import"./date-range-picker-otSlyGn1.js";import"./divider-DtS4IZ9-.js";import"./base-drawer-DUX87HBk.js";import"./drawer-eo8EwIfW.js";import"./modal-drawer-BrDtoKSB.js";import"./mini-drawer-B6eLxgR7.js";import"./file-picker-BvrMlyzV.js";import"./floating-action-button-D8GSX5A7.js";import"./inline-message-BmHmX7vQ.js";import"./key-item-BsoNBEfD.js";import"./keyboard-shortcut-C5gmWfMz.js";import"./label-value-D-KSqHDU.js";import"./meter-group-aJtos3WN.js";import"./page-state-BU7mMB2L.js";import"./paginator-ikGcnkVJ.js";import"./scaffold-B_qTjcmL.js";import"./select-dropdown-UJHv1Aub.js";import"./select-X23zMW2H.js";import"./skip-link-BKJEdQQV.js";import"./slider-DdbHnf7l.js";import"./split-view-DGIgro3g.js";import"./stack-D2V5d6LJ.js";import"./stepper-Epycfoxr.js";import"./table-g7zKBGDK.js";import"./tab-bar-Bo_zjYdL.js";import"./time-picker-C688PiNh.js";import"./toast-B-AjQqY0.js";import"./toolbar-BK4uxBaY.js";import"./tooltip-BUHZd4St.js";import"./tree-item-CZHZRSdC.js";import"./view-switcher-BOebY1Oz.js";import"./deprecated-icon-button-DblO3y13.js";import"./split-button-Ccp8JQvn.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
