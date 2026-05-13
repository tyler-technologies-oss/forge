import{b as d}from"./iframe-DYu_YUNV.js";import{s as u,g as f}from"./utils-qcABQWBJ.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BG9a1vjC.js";import"./app-bar-profile-button-D70sQVdA.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BR2D-RGM.js";import"./menu-B9-hMOg7.js";import"./linear-progress-CKPFd0xY.js";import"./list-B6v9krCw.js";import"./popover-CZwG_Uov.js";import"./overlay-CQSkmT4F.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-g_Ea1Wjh.js";import"./avatar-t4tADYkj.js";import"./icon-button-DK0S2Dk5.js";import"./focus-indicator-DYCNHTNB.js";import"./state-layer-Cnbc18vB.js";import"./autocomplete-CNTlSPpg.js";import"./label-DqvVA4Ut.js";import"./button-DYXzaptD.js";import"./button-toggle-group-CqU02Llq.js";import"./checkbox-BPHMFZ31.js";import"./switch-B5DttFku.js";import"./base-field-DwrgASMZ.js";import"./text-field-BCq8hCIx.js";import"./backdrop-DuhijlGd.js";import"./badge-qHkya3f1.js";import"./banner-Dm00G_Bs.js";import"./bottom-sheet-DdW016G8.js";import"./dialog-CxA04cm7.js";import"./button-area-DBRBH_M7.js";import"./calendar-2LfONMxn.js";import"./card-DnZbTBgU.js";import"./chip-set-CeTMm6k1.js";import"./circular-progress-45kWhMLs.js";import"./color-picker-CcALDJZp.js";import"./date-picker-CxJird47.js";import"./date-range-picker-BwpF-o1j.js";import"./divider-BseY7DCz.js";import"./base-drawer-DBBe93d7.js";import"./drawer-1zFKHC_i.js";import"./modal-drawer-CYb8qJR2.js";import"./mini-drawer-rpwrWM4L.js";import"./expansion-panel-7bZlh6FY.js";import"./open-icon-B2Ol7IGG.js";import"./file-picker-BmGrsKnW.js";import"./floating-action-button-B90pgqvs.js";import"./inline-message-CzR1CZl4.js";import"./key-item-B7QuHnNX.js";import"./keyboard-shortcut-Bg3BjOa4.js";import"./label-value-CI8WZIke.js";import"./meter-group-D9zP3K36.js";import"./page-state-DLzWYTpL.js";import"./paginator-C2M5TCW3.js";import"./scaffold-D6_2VrU0.js";import"./secret-rudHu3HO.js";import"./select-dropdown-CKve2L3R.js";import"./select-BpZH29pl.js";import"./skip-link-D3PrTUMu.js";import"./slider-DnnfRV-j.js";import"./split-view-ChG2dRLI.js";import"./stack-DqNjYC3W.js";import"./stepper-DcAqkYjj.js";import"./table-CtwHsaWn.js";import"./tab-bar-BWJj_RCQ.js";import"./time-picker-CIXGq1WJ.js";import"./toast-Boju-8YO.js";import"./toolbar-Bt_F_1V6.js";import"./tooltip-sqz4OrKB.js";import"./tree-item-BVzgftRc.js";import"./view-switcher-Ckdngb02.js";import"./deprecated-icon-button-BMWfm-5Z.js";import"./split-button-B0-XBtEg.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
