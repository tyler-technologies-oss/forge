import{b as d}from"./iframe-1a1WEcnC.js";import{s as u,g as f}from"./utils-DCILK08P.js";import"./service-adapter-8tADcN_b.js";import"./accordion-B34PiBQk.js";import"./app-bar-profile-button-D7UO6Fi8.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BqP_5Usb.js";import"./menu-ydD6hjiI.js";import"./linear-progress-CsGp1g6o.js";import"./list-Ba7Y7d-u.js";import"./popover-COnrFhSW.js";import"./overlay-CS0R_zpK.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-DWmvzIbz.js";import"./avatar-CAwd1Zpl.js";import"./icon-button-B5QZOWNY.js";import"./focus-indicator-C0RU8xRV.js";import"./state-layer-Wu0zWm6m.js";import"./autocomplete-CsFA0oR7.js";import"./label-DjrHQxzi.js";import"./base-field-BNJT_ifs.js";import"./text-field-BZrdezqH.js";import"./backdrop-3KzDwztH.js";import"./badge-BqP35XSK.js";import"./banner-DDKJjCPm.js";import"./bottom-sheet-DmcGxX1L.js";import"./dialog-D9E1kPE3.js";import"./button-area-C011FUnc.js";import"./button-toggle-group-I31zOnu2.js";import"./button-zNUbTC2q.js";import"./calendar-CI-QYM09.js";import"./card-xPI6EPAH.js";import"./checkbox-CyQP4fah.js";import"./chip-set-C3CHnf8R.js";import"./circular-progress-DIduwjig.js";import"./color-picker-C6Z022LO.js";import"./date-picker-DvLkeLt7.js";import"./date-range-picker-xm9LAhmZ.js";import"./divider-DoamZZb_.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DV7w1-5L.js";import"./modal-drawer-BwzSP7R6.js";import"./mini-drawer-liQMnkLy.js";import"./expansion-panel-wuU9dw90.js";import"./open-icon-OFzj_TSj.js";import"./file-picker-2aNq8xuV.js";import"./floating-action-button-Bl0D_xHF.js";import"./inline-message-fj34p3Px.js";import"./key-item-uEF48oYv.js";import"./keyboard-shortcut-DtMmlTPQ.js";import"./label-value-cTsUvwyw.js";import"./meter-group-ZczV8t4G.js";import"./page-state-DDjhdZbK.js";import"./paginator-2kPmiiLe.js";import"./radio-group-C8nnDuoZ.js";import"./scaffold-CufLEZ-a.js";import"./secret-CiDE3vUZ.js";import"./select-dropdown-By8Z1pA4.js";import"./select-dVWVGHlU.js";import"./skip-link-eFdxMOjN.js";import"./slider-DH-rwxk2.js";import"./split-view-C-fEy2_G.js";import"./stack-Bc7kWG9C.js";import"./stepper-CTiddnw1.js";import"./switch-CBcRtvGj.js";import"./table-BnoeFQj7.js";import"./tab-panel-DOGliMyk.js";import"./time-picker-hoVVoa4T.js";import"./timestamp-DsfMznGa.js";import"./toast-_ahnQbUW.js";import"./toolbar-3UjyVMfK.js";import"./tooltip-SwIZYm2z.js";import"./tree-item-6JjY0nHn.js";import"./view-switcher-BSHD_isP.js";import"./deprecated-icon-button-DiEVTtqF.js";import"./split-button-Ck3y1w2g.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Yt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Yt as P,m as W};
