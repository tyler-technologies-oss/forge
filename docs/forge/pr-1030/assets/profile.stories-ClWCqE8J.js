import{b as d}from"./iframe-Asho65FF.js";import{s as u,g as f}from"./utils-BnVlj7nJ.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Dk_TCszF.js";import"./app-bar-profile-button-CPYCIlXR.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DVioSIZH.js";import"./menu-PNBqk6al.js";import"./linear-progress-DP1CUIRM.js";import"./list-u-aXIwek.js";import"./popover-DS7X62gU.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-DtujUGDy.js";import"./avatar-BAQdBa4j.js";import"./icon-button-qfTNvDaF.js";import"./focus-indicator-DztOJIuF.js";import"./state-layer-CK5iHsfr.js";import"./autocomplete-Dq3xdvGW.js";import"./label-BlALC_Py.js";import"./button-Bfaok-Rq.js";import"./button-toggle-group-Dm7qf12n.js";import"./checkbox-CFFoZkK0.js";import"./switch-QL4gUCy-.js";import"./base-field-Dy3mMKxM.js";import"./text-field-BK9kW_r2.js";import"./backdrop-B_VtJyIN.js";import"./badge-bpXJIwSS.js";import"./banner-Dz3Q31YC.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-B8Yyu_sD.js";import"./calendar-D_LlKHg6.js";import"./card-CP9WGPRY.js";import"./chip-set-C4JUB-Fo.js";import"./circular-progress-DYDxHRwq.js";import"./color-picker-_AjtHEc-.js";import"./date-picker-CEsovM_b.js";import"./date-range-picker-Dr5VcLYW.js";import"./divider-C9TQBd92.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DcIGZLNH.js";import"./modal-drawer-CjJBmpPP.js";import"./mini-drawer-DIGV4vSc.js";import"./expansion-panel-BdU2lh1t.js";import"./open-icon-m6ZQ69Fi.js";import"./file-picker-DqhQOdzC.js";import"./floating-action-button-B7rs9ZO1.js";import"./inline-message-BK9gijHu.js";import"./key-item-BIezT_JV.js";import"./keyboard-shortcut-BtAHdz75.js";import"./label-value-BE9wSmbi.js";import"./meter-group-B7Q8Xz5s.js";import"./page-state-BYBCycIs.js";import"./paginator-DNYysYOF.js";import"./scaffold-D_SIXSFE.js";import"./secret-BL9YdqVv.js";import"./select-dropdown-BrOL8Wkb.js";import"./select-CVaJmBG9.js";import"./skip-link-C_VRjPpo.js";import"./slider-CI5IUGl3.js";import"./split-view-D2vWz4Tj.js";import"./stack-BuaXNRar.js";import"./stepper-DqaL55IN.js";import"./table-DJUbKWpJ.js";import"./tab-bar-B35VJ2NZ.js";import"./time-picker-Ca5gZrPi.js";import"./toast-B2nG9Jvv.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-C_eok51I.js";import"./tree-item-BsmizI5j.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-D-DpR4-z.js";import"./split-button-BArEyU_h.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
