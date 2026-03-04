import{b as d}from"./iframe-D6-BN427.js";import{s as u,g as f}from"./utils-3yMKERXj.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CZcjk-Rp.js";import"./expansion-panel-CgR11RAA.js";import"./open-icon-CMFSOby6.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-B7tXVKT9.js";import"./state-layer-Dr4I3-ea.js";import"./focus-indicator-BY1zFJV4.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BS8_pNWa.js";import"./menu-5G2t1qgD.js";import"./linear-progress-Cnx_HyUf.js";import"./list-DdrH15DZ.js";import"./popover-C7v8d-bT.js";import"./overlay-CnRxeVdV.js";import"./skeleton-CMBvqwtz.js";import"./avatar-CAfGi6CN.js";import"./icon-button-DRXv6M-B.js";import"./autocomplete-Y0eQC5uU.js";import"./label-Kx1iPI1y.js";import"./button-7INxEilv.js";import"./button-toggle-group-Cc7YegMF.js";import"./checkbox-DV6DqneI.js";import"./switch-Bl1uI7Wn.js";import"./base-field-D5b5fMX3.js";import"./text-field-BAejI60y.js";import"./backdrop--id5x3jp.js";import"./badge-GG6Z2MpL.js";import"./banner-rDhsUbqS.js";import"./bottom-sheet-BJXxXepC.js";import"./dialog-DvB2hdYD.js";import"./button-area-CxTkJWSm.js";import"./calendar-DFiHtXSs.js";import"./card-BirGXe0d.js";import"./chip-set-Cp18JhFi.js";import"./circular-progress-B5Kshctg.js";import"./color-picker-D2j5rMRS.js";import"./date-picker-CQcAHydD.js";import"./date-range-picker-DaDkpQ4B.js";import"./divider-CY-gug5I.js";import"./base-drawer-q74epyPW.js";import"./drawer-DRLMAEyk.js";import"./modal-drawer-CCu9BUGH.js";import"./mini-drawer-Cck9Qwkt.js";import"./file-picker-DEv08G0-.js";import"./floating-action-button-BmnR_Z4k.js";import"./inline-message-DM46YaML.js";import"./key-item-BFe1rnG8.js";import"./keyboard-shortcut-DnEED6Tm.js";import"./label-value-Cm7o2IPb.js";import"./meter-group-C93lp5Fw.js";import"./page-state-CTPXyko5.js";import"./paginator-CT5me0KA.js";import"./scaffold-C0JMtL8O.js";import"./select-dropdown-DMLftrpb.js";import"./select-72wTnzqp.js";import"./skip-link-OCZk9bOY.js";import"./slider-C0p9sgmD.js";import"./split-view-2vrsNLpF.js";import"./stack-C45mBB1R.js";import"./stepper-D5knxpyW.js";import"./table-BSRZsimZ.js";import"./tab-bar-CuSw5pca.js";import"./time-picker-Cxn4eACY.js";import"./toast-wZqmEUFy.js";import"./toolbar-DPBJiSu_.js";import"./tooltip-DZbumLUT.js";import"./tree-item-Dad7Kyva.js";import"./view-switcher-ZGhMaguC.js";import"./deprecated-icon-button-DIpmpDnb.js";import"./split-button-BDryKzT1.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
