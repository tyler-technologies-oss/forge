import{b as d}from"./iframe-CX1-OGuF.js";import{s as u,g as f}from"./utils-C5IA10r7.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DGUmeVX-.js";import"./app-bar-profile-button-9oRfUTpa.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BgIoXTEj.js";import"./menu-rZSGetJK.js";import"./linear-progress-CsGp1g6o.js";import"./list-auFvqODI.js";import"./popover-izFeuCcp.js";import"./overlay-CWAl4aP4.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-XQANi3l8.js";import"./avatar-CTKz6auQ.js";import"./icon-button-TGumIkb-.js";import"./focus-indicator-sdf0mJJv.js";import"./state-layer-Wu0zWm6m.js";import"./autocomplete-BBebijB5.js";import"./label-DzQvU5dn.js";import"./base-field-yqui2uH5.js";import"./text-field-KYARFHlZ.js";import"./backdrop-3KzDwztH.js";import"./badge-DFlUI_YX.js";import"./banner-BS1Sg8QJ.js";import"./bottom-sheet-DmcGxX1L.js";import"./dialog-D9E1kPE3.js";import"./button-area-ejoilD50.js";import"./button-toggle-group-tQECqFSK.js";import"./button-D0Htf8_P.js";import"./calendar-RVjqMje4.js";import"./card-D2jiCLO-.js";import"./checkbox-Cb6OyIeu.js";import"./chip-set-CYp-Q5JM.js";import"./circular-progress-DIduwjig.js";import"./color-picker-icqt9F01.js";import"./date-picker-DAVPIZQL.js";import"./date-range-picker-C7SJpYU2.js";import"./divider-CcZZpVS3.js";import"./base-drawer-DHDqDEgT.js";import"./drawer-DV7w1-5L.js";import"./modal-drawer-BwzSP7R6.js";import"./mini-drawer-liQMnkLy.js";import"./expansion-panel-BcUvGhOD.js";import"./open-icon-DEYHpK_9.js";import"./file-picker-B2FJfZZi.js";import"./floating-action-button-DNFdcZBx.js";import"./inline-message-fj34p3Px.js";import"./key-item-DzHyw-Sg.js";import"./keyboard-shortcut-CUlLGaLI.js";import"./label-value-cTsUvwyw.js";import"./meter-group-CrJhDoPg.js";import"./page-state-DDjhdZbK.js";import"./paginator-ChBVvnrz.js";import"./radio-group-cVy5dHcB.js";import"./scaffold-CufLEZ-a.js";import"./secret-C8w153aL.js";import"./select-dropdown-Bq3rzk2O.js";import"./select-DUGjfer4.js";import"./skip-link-CAwiEGAV.js";import"./slider-EacVQdvP.js";import"./split-view-DtNX_xc8.js";import"./stack-Bc7kWG9C.js";import"./stepper-O4JmNhNs.js";import"./switch-CcubUDei.js";import"./table-ibD_PPXm.js";import"./tab-panel-BQda-oOL.js";import"./time-picker-DQ7VUnOv.js";import"./timestamp--RGQNjIL.js";import"./toast-DwmZ2F-n.js";import"./toolbar-yKvdxy5C.js";import"./tooltip-BsIe97tw.js";import"./tree-item-D4r6jxHq.js";import"./view-switcher-BSHD_isP.js";import"./deprecated-icon-button-DXLYtm84.js";import"./split-button-nzuMhX-f.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
