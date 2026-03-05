import{b as d}from"./iframe-Of55AveD.js";import{s as u,g as f}from"./utils-BUOWcVje.js";import"./service-adapter-CoGDs2_3.js";import"./accordion-CZnLIViG.js";import"./expansion-panel-B4_Xv9AC.js";import"./open-icon-CUMr8g_5.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-CGDyh9UX.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-B4xXB1kz.js";import"./menu-DscdqpBr.js";import"./linear-progress-CdLostcG.js";import"./list-DJwD6pYe.js";import"./popover-C9ytRj8r.js";import"./overlay-BayhLl23.js";import"./skeleton-pRzfknAa.js";import"./avatar-CEFd2r8P.js";import"./icon-button-QrExihdR.js";import"./focus-indicator-D5E0TroM.js";import"./state-layer-n7PzpGlA.js";import"./autocomplete-BkiOrI4A.js";import"./label-DRM0PBI9.js";import"./button-C3nGcbUo.js";import"./button-toggle-group-B8pkXL-h.js";import"./checkbox--WiA-4gP.js";import"./switch-5gc7gkpa.js";import"./base-field-CKScdACj.js";import"./text-field-BKKZGKSr.js";import"./backdrop-C92f0qEt.js";import"./badge-DTrx1bvK.js";import"./banner-BtDOa0lc.js";import"./bottom-sheet-C3I4Q7_b.js";import"./dialog-6H06GjyS.js";import"./button-area-TFRwlkBf.js";import"./calendar-v5lTuT06.js";import"./card-_np7UW6d.js";import"./chip-set-D49nfjkV.js";import"./circular-progress-Bjkv8PLj.js";import"./color-picker-6rjOf9_X.js";import"./date-picker-DD6-c4_x.js";import"./date-range-picker-C9ZA5B2Z.js";import"./divider-D51rIP_t.js";import"./base-drawer-CehscPHD.js";import"./drawer-wD-VciIb.js";import"./modal-drawer-BeSECNts.js";import"./mini-drawer-DAoV4H3z.js";import"./file-picker-DV8gsQVV.js";import"./floating-action-button-4VZNMc2Z.js";import"./inline-message-9zvVMjFA.js";import"./key-item-DtBfGvbv.js";import"./keyboard-shortcut-D0QR9jh7.js";import"./label-value-CW81Czz-.js";import"./meter-group-GOGG3i8F.js";import"./page-state-Cg6BV8eb.js";import"./paginator-C1mL9TfP.js";import"./scaffold-cHzeNvE0.js";import"./select-dropdown-Cxgnu4G5.js";import"./select-DPF_xvk1.js";import"./skip-link-DJsQwRsg.js";import"./slider-NV6FUq30.js";import"./split-view-CiO3C7PW.js";import"./stack-4trrgLzF.js";import"./stepper-DBnmvXEl.js";import"./table-8tgG22rZ.js";import"./tab-bar-DxvF_yIj.js";import"./time-picker-CDl4GRsY.js";import"./toast-DJ1Wmh5g.js";import"./toolbar-C0v5iIUr.js";import"./tooltip-Csbspw17.js";import"./tree-item-CgPAbtSy.js";import"./view-switcher-FtobpJhv.js";import"./deprecated-icon-button-CQ9hSZto.js";import"./split-button-BkoWCnwk.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
