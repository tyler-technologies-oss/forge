import{b as d}from"./iframe-DEKZcQEl.js";import{s as u,g as f}from"./utils-BAJ2NYw0.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DuF5zyOp.js";import"./app-bar-profile-button-8O3dOjIr.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BB4iCrNE.js";import"./menu-XBf4F78_.js";import"./linear-progress-DLb8lZjg.js";import"./list-DERyOWRL.js";import"./popover-DjAd0U-q.js";import"./overlay-Dek3SHS6.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-jvDFel5Y.js";import"./avatar-BQ6fiX6X.js";import"./icon-button-BbkijqtF.js";import"./focus-indicator-J6PtqCSp.js";import"./state-layer-cKdDztbm.js";import"./autocomplete-CwPEhNaR.js";import"./label-lgdJ3Ush.js";import"./button-DSZbo7Te.js";import"./button-toggle-group-BysBEsit.js";import"./checkbox-BLAzSCLS.js";import"./switch-BftT_3Qn.js";import"./base-field-CuwBe9uC.js";import"./text-field-DpFQYnWA.js";import"./backdrop-Br-v5NXK.js";import"./badge-PccDjgs7.js";import"./banner-DtcG3dnE.js";import"./bottom-sheet-DW0bVRhV.js";import"./dialog-d1olEQgx.js";import"./button-area-D8Kz2EXX.js";import"./calendar-ZH1FLRXi.js";import"./card-CtAKwfuE.js";import"./chip-set-CjioJkAe.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-B8m8nwkZ.js";import"./date-picker-B2HBCeH7.js";import"./date-range-picker-CvlCuXgI.js";import"./divider-DKmgFDJt.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-Bk4QKaOa.js";import"./modal-drawer-CinZNACQ.js";import"./mini-drawer-DpFIFw8V.js";import"./expansion-panel-DlDr80Bn.js";import"./open-icon-D6kKXb08.js";import"./file-picker-CouOCenk.js";import"./floating-action-button-BW0PN3sW.js";import"./inline-message-EO-dHXbB.js";import"./key-item-C18PnM1t.js";import"./keyboard-shortcut-CmHab_e4.js";import"./label-value-C46r41pN.js";import"./meter-group-Baqqb4TD.js";import"./page-state-BeEclPwI.js";import"./paginator-DfkyvaAn.js";import"./scaffold-B-1oYF3d.js";import"./secret-DkXPLhW9.js";import"./select-dropdown-B3tLK05L.js";import"./select-BaQtdwmd.js";import"./skip-link-Cr7fnhQW.js";import"./slider-Cw7yJyHg.js";import"./split-view-DLCxCM5-.js";import"./stack-DskzmGQg.js";import"./stepper-CGgZsfh8.js";import"./table-5bmSqID0.js";import"./tab-bar-DFjkKncf.js";import"./time-picker-DTLpSSc-.js";import"./toast-QMCOHtFE.js";import"./toolbar-D8z3gQdW.js";import"./tooltip-Bp4tPQuB.js";import"./tree-item-fmgeFstw.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-B0uFudLt.js";import"./split-button-CMvkehEh.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
