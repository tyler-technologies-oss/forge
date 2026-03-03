import{b as d}from"./iframe-BJoIjGP7.js";import{s as u,g as f}from"./utils-DlRR_6up.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-CMVcOjIr.js";import"./expansion-panel-PLmKZqMG.js";import"./open-icon-C85rqQKN.js";import"./app-bar-profile-button-D3bkLnky.js";import"./state-layer-CwwoRddA.js";import"./focus-indicator-D1CeImek.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-Dn_DGO8W.js";import"./index-DTwfV0k0.js";import"./menu-BmbMI8hP.js";import"./linear-progress-BPDXw63a.js";import"./list-BmIuUSdG.js";import"./popover-BxT30IVE.js";import"./overlay-DPtUw_or.js";import"./skeleton-CXhX8HjP.js";import"./avatar-N430sfyE.js";import"./icon-button-D_JhKJdr.js";import"./autocomplete-BXTs_Zwu.js";import"./label-Dgyq1CIh.js";import"./button-Dgz3L8XP.js";import"./button-toggle-group-CwOE63C0.js";import"./checkbox-AWV5368s.js";import"./switch-HtibWHBE.js";import"./base-field-CJNUJxZl.js";import"./text-field-Bcd69DcX.js";import"./backdrop-D38KdwVf.js";import"./badge-BBYNrs72.js";import"./banner-amxffdbz.js";import"./bottom-sheet-Bz5tAfnc.js";import"./dialog-BHIjTFN9.js";import"./button-area-DMDzos8p.js";import"./calendar-CiQ-HJ1G.js";import"./card-CMt8gpzZ.js";import"./chip-set-0IeYNZwY.js";import"./circular-progress-sCU3ipF0.js";import"./color-picker-BPWawRTb.js";import"./date-picker-RvMf5-8E.js";import"./date-range-picker-DNgxXgdZ.js";import"./divider-C8Z9knLF.js";import"./base-drawer-DhUDqhET.js";import"./drawer-CBjgLAp7.js";import"./modal-drawer-B92jreWY.js";import"./mini-drawer-BoKnXVqz.js";import"./file-picker-B567HrPJ.js";import"./floating-action-button-BZ8tj-DN.js";import"./inline-message-Bxm-OuA9.js";import"./key-item-CGb4rp9N.js";import"./keyboard-shortcut-BUn6QSxQ.js";import"./label-value-CWtpDJwk.js";import"./meter-group-BThPnNY2.js";import"./page-state-B0m1Ibgi.js";import"./paginator-BOUIa-fR.js";import"./scaffold-Cez5RFLR.js";import"./select-dropdown-BIvIwxzy.js";import"./select-COV-J2JN.js";import"./skip-link-DtZbAdhQ.js";import"./slider-CWDyqap3.js";import"./split-view-CqvI6t-U.js";import"./stack-Csa7srza.js";import"./stepper-BxtnH_We.js";import"./table-bFSnDLq_.js";import"./tab-bar-CmgKl_ko.js";import"./time-picker-C8XgScfg.js";import"./toast-DAHlsxvg.js";import"./toolbar-EYXxyIl9.js";import"./tooltip-CMogPifb.js";import"./tree-item-Bjoq5sny.js";import"./view-switcher-CFtDEX4F.js";import"./deprecated-icon-button-D50L3ng_.js";import"./split-button-BcVWqDtf.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
