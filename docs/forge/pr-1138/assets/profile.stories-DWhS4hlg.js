import{b as d}from"./iframe-D8QRU-tV.js";import{s as u,g as f}from"./utils-QQyHyWEl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-C-sTWBrd.js";import"./app-bar-profile-button-CcsIdpMb.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-ChHIax3p.js";import"./menu-UH2zjJ-Y.js";import"./linear-progress-BUmXHJif.js";import"./list-BlR1QDBu.js";import"./popover-yu54Tcdl.js";import"./overlay-CsFRuuOm.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-CHpTOPKR.js";import"./avatar-DDIdQUFA.js";import"./icon-button-BGlfW1oY.js";import"./focus-indicator-azdGC1n3.js";import"./state-layer-Dj8VLfkk.js";import"./autocomplete-C3ycpFuq.js";import"./label-CIZlvnGp.js";import"./button-DSNQ_5yA.js";import"./button-toggle-group-BvL_7CJd.js";import"./checkbox-DRYMIyoy.js";import"./switch-nItaCm0y.js";import"./base-field-r83kWj0E.js";import"./text-field-CcxB30F-.js";import"./backdrop-B_VtJyIN.js";import"./badge-B6Z6yv88.js";import"./banner-BGQn8Ob3.js";import"./bottom-sheet-D7vYZ3Fu.js";import"./dialog-07iMar_Z.js";import"./button-area-RMrC-zbF.js";import"./calendar-DcGpU6V4.js";import"./card-Dv5hDNhO.js";import"./chip-set-B1TmUbcT.js";import"./circular-progress-BmiDq0cM.js";import"./color-picker-Dsb-ZETr.js";import"./date-picker-DZ0L2dTR.js";import"./date-range-picker-C-00gxpk.js";import"./divider-DpmBdJ3L.js";import"./base-drawer-p4qc_qFk.js";import"./drawer-DR-_gUVX.js";import"./modal-drawer-DJ67kJSZ.js";import"./mini-drawer-BybnH3Bp.js";import"./expansion-panel-DEn9jmrc.js";import"./open-icon-5s3XIwl0.js";import"./file-picker-BTj9R2g3.js";import"./floating-action-button-CrA8C6By.js";import"./inline-message-CeWMjtBE.js";import"./key-item-uljXKve7.js";import"./keyboard-shortcut-BmSiUxin.js";import"./label-value-DMg7pXRQ.js";import"./meter-group-CZf2gcId.js";import"./page-state-CtvoNG-u.js";import"./paginator-uD7pluI1.js";import"./scaffold-D_SIXSFE.js";import"./secret-Dqcht4Lr.js";import"./select-dropdown-D_U7iz87.js";import"./select-BBtVPH8v.js";import"./skip-link-C3tRo_Cn.js";import"./slider-CBd5rJqr.js";import"./split-view-DtLH06N6.js";import"./stack-BuaXNRar.js";import"./stepper-C6GleWxr.js";import"./table-DsozGQfR.js";import"./tab-bar-YrXEPUVy.js";import"./time-picker-CpWBOXRP.js";import"./toast-niZZSEBf.js";import"./toolbar-DEZsnsSE.js";import"./tooltip-BC19SoDG.js";import"./tree-item-CRhUhqci.js";import"./view-switcher-DMe6eoCu.js";import"./deprecated-icon-button-DvVaM_Vi.js";import"./split-button-CiLfpDkY.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
