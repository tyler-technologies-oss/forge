import{b as d}from"./iframe-C0tv50se.js";import{s as u,g as f}from"./utils-QdjzOY7l.js";import"./service-adapter-8tADcN_b.js";import"./accordion-xfOT3mi3.js";import"./app-bar-profile-button-BUI8a8gs.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DujtuLyJ.js";import"./menu-D-LhENYy.js";import"./linear-progress-DLb8lZjg.js";import"./list-CAae_Zqa.js";import"./popover-Cbq2Ub2i.js";import"./overlay-Bo-MsksO.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BNhyCQ6_.js";import"./avatar-z0f_NAt9.js";import"./icon-button-B2ttIe-Y.js";import"./focus-indicator-CI-XZz-0.js";import"./state-layer-RJ83GVyt.js";import"./autocomplete-DsTJtpQx.js";import"./label-BhjteSIr.js";import"./button-D3Be4wOV.js";import"./button-toggle-group-BfEQHVMh.js";import"./checkbox-DuZDGVEn.js";import"./switch-DFqa9aoO.js";import"./base-field-BJSvDTbm.js";import"./text-field-BLBlfai0.js";import"./backdrop-Br-v5NXK.js";import"./badge-C3imKMZk.js";import"./banner-CfazGNZA.js";import"./bottom-sheet-CYPNqcjy.js";import"./dialog-BAAkdPx4.js";import"./button-area-IWwakE2C.js";import"./calendar-CCh8UMGw.js";import"./card-BpiIHOjQ.js";import"./chip-set-BIwgzayx.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-BVPW2mRD.js";import"./date-picker-Ce9GmBvB.js";import"./date-range-picker-DhAGgw1B.js";import"./divider-k1qg4Gbn.js";import"./base-drawer-DgtNmrYs.js";import"./drawer-BD1OwPL1.js";import"./modal-drawer-BSNPPupX.js";import"./mini-drawer-DLEI9OBr.js";import"./expansion-panel-BaaW4pwA.js";import"./open-icon-B_55D2WO.js";import"./file-picker-fraJneC5.js";import"./floating-action-button-CywixAHI.js";import"./inline-message-EO-dHXbB.js";import"./key-item-CaGtCGB-.js";import"./keyboard-shortcut-BrhxSjH0.js";import"./label-value-C46r41pN.js";import"./meter-group-Cia9Qyxt.js";import"./page-state-BeEclPwI.js";import"./paginator-hSpupE_3.js";import"./scaffold-B-1oYF3d.js";import"./secret-Ch0-RFII.js";import"./select-dropdown-CC14dlPM.js";import"./select-BLXqtKNt.js";import"./skip-link-D0vVUQcG.js";import"./slider-W1Pp66j0.js";import"./split-view-D5YWBacG.js";import"./stack-DskzmGQg.js";import"./stepper-UpAPVp4i.js";import"./table-Cd9Ha9PA.js";import"./tab-bar-CapoubQ0.js";import"./time-picker-CBslG21s.js";import"./toast-DqDspTRE.js";import"./toolbar-BxQn1RYe.js";import"./tooltip-DEVikKhm.js";import"./tree-item-DdALSyAh.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-CJInBBlO.js";import"./split-button-BBVeEG5f.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
