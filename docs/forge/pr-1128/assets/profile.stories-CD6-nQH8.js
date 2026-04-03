import{b as d}from"./iframe-1amZ02A4.js";import{s as u,g as f}from"./utils-s6uih_-r.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-BF2mgCNg.js";import"./expansion-panel-CBChvPjR.js";import"./open-icon-Nqx8IYIH.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-CYKmH8Qe.js";import"./state-layer-DFBFTfpT.js";import"./focus-indicator-C5TEsO7E.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CzoCbVaa.js";import"./menu-Ba834p8F.js";import"./linear-progress-DSeJSqzy.js";import"./list-7b1y5hwO.js";import"./popover-uUF2Q5pH.js";import"./overlay-xfWlPvUl.js";import"./skeleton-CfBVzZbg.js";import"./avatar-CFsh7WCn.js";import"./icon-button-DIbOVWXo.js";import"./autocomplete-x8xjn1HM.js";import"./label-bKp8WFBS.js";import"./button-YbSFJWqY.js";import"./button-toggle-group-CCsqyC6G.js";import"./checkbox-DZ8Y-EwU.js";import"./switch-CR8fKfBF.js";import"./base-field-BKgwQlzN.js";import"./text-field-Dij8M865.js";import"./backdrop-CFGTkHhD.js";import"./badge-BtIVeCB_.js";import"./banner-CYdZEO_F.js";import"./bottom-sheet-CrL0V2kM.js";import"./dialog-BYgxglOb.js";import"./button-area-CDYs9pSf.js";import"./calendar-A2Vs30Qb.js";import"./card-BvgwV_S5.js";import"./chip-set-DIq7DtGu.js";import"./circular-progress-CgxBC_0i.js";import"./color-picker-ws0MTkij.js";import"./date-picker-fQiyxFr6.js";import"./date-range-picker-BcabKXjm.js";import"./divider-DJWSVjA8.js";import"./base-drawer-CHln_uqB.js";import"./drawer-BshiIxT3.js";import"./modal-drawer-CvOegoGK.js";import"./mini-drawer-D9JJJUxN.js";import"./file-picker-06FB0o8M.js";import"./floating-action-button-DLPRa7LF.js";import"./inline-message-DD5odYkL.js";import"./key-item-BSfdraj-.js";import"./keyboard-shortcut-BR2S-sKL.js";import"./label-value-CGaatwms.js";import"./meter-group-Cn9D_BXF.js";import"./page-state-CO91jfaQ.js";import"./paginator-NrUZYg8u.js";import"./scaffold-DS4rOy-Y.js";import"./select-dropdown-d9jFTl9H.js";import"./select-ch4D81ze.js";import"./skip-link-DJWVCgKS.js";import"./slider-CFvPSsjb.js";import"./deprecated-icon-button-BA90Qr3T.js";import"./split-view-CsjuZ6uq.js";import"./stack-t6PyyOMT.js";import"./stepper-EvRfoy3R.js";import"./table-MY5bENqz.js";import"./tab-bar-1pCfMM_X.js";import"./time-picker-CA7-xOny.js";import"./toast-zSO_YKXU.js";import"./toolbar-C3hZOw9r.js";import"./tooltip-CZ9l9EMe.js";import"./tree-item-deCS-W7P.js";import"./view-switcher-BGnLVwx1.js";import"./split-button-D2rq4I5W.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
