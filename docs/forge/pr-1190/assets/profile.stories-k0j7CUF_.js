import{b as d}from"./iframe-BJAfhcMT.js";import{s as u,g as f}from"./utils-Cu3TicFl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BWDXVSHN.js";import"./app-bar-profile-button-BlCF-S03.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DNmsU6ys.js";import"./menu-DL6OZVHP.js";import"./linear-progress-DLb8lZjg.js";import"./list-90QFmxbH.js";import"./popover-BVtCi2BA.js";import"./overlay-DHurMmdn.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CS4LSqZC.js";import"./avatar-CP6FuIwn.js";import"./icon-button-Dzr875VX.js";import"./focus-indicator-BuEG9vwh.js";import"./state-layer-cKdDztbm.js";import"./autocomplete-XPlJ62YI.js";import"./label-ChL9woFX.js";import"./button-gchVF_sR.js";import"./button-toggle-group-C4g7Lomg.js";import"./checkbox-CeQCf5sY.js";import"./switch-B3UKyyi_.js";import"./base-field-DrRWorFn.js";import"./text-field-TFjDPjnM.js";import"./backdrop-Br-v5NXK.js";import"./badge-CdfQFziE.js";import"./banner-D2n2grZk.js";import"./bottom-sheet-DW0bVRhV.js";import"./dialog-d1olEQgx.js";import"./button-area-xEGVDXun.js";import"./calendar-Cr6fZKO9.js";import"./card-AQdiX23W.js";import"./chip-set-H7lec8kf.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker--ufaDNu8.js";import"./date-picker-C3KXgxMw.js";import"./date-range-picker-DD-3Mv8b.js";import"./divider-BO0bZOxJ.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-Bk4QKaOa.js";import"./modal-drawer-CinZNACQ.js";import"./mini-drawer-DpFIFw8V.js";import"./expansion-panel-BvMTp5fo.js";import"./open-icon-CqYm4JjS.js";import"./file-picker-BkbEaHRU.js";import"./floating-action-button-CM9087m4.js";import"./inline-message-EO-dHXbB.js";import"./key-item-BLHTzdcP.js";import"./keyboard-shortcut-BzUZ62Tc.js";import"./label-value-C46r41pN.js";import"./meter-group-DIxNf9Ty.js";import"./page-state-BeEclPwI.js";import"./paginator-BLT6gJ_K.js";import"./scaffold-B-1oYF3d.js";import"./secret-BJbpC0Fg.js";import"./select-dropdown-Cjg6vQVw.js";import"./select-3lz96FEl.js";import"./skip-link-W96P-Ir8.js";import"./slider-BfLtZAyX.js";import"./split-view-DtHhm7ve.js";import"./stack-DskzmGQg.js";import"./stepper-g6kq70L2.js";import"./table-BWAm8u1Z.js";import"./tab-bar-BT34Zd80.js";import"./time-picker-Cixjme9M.js";import"./toast-CIo9z7E3.js";import"./toolbar-CtHeh379.js";import"./tooltip-B6-DKO3Y.js";import"./tree-item-D2I3vdG-.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-COrEVvtM.js";import"./split-button-KjoFLZf0.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
