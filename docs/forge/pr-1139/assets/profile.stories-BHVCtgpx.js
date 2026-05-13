import{b as d}from"./iframe-CWXjUqeX.js";import{s as u,g as f}from"./utils-C7Mtdcaw.js";import"./service-adapter-8tADcN_b.js";import"./accordion-7Tfud7ik.js";import"./app-bar-profile-button-oI3dFeUW.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-4d7AKKUw.js";import"./menu-DGevs747.js";import"./linear-progress-CKPFd0xY.js";import"./list-DyUHSKMC.js";import"./popover-BwsK9BW2.js";import"./overlay-C5P-SFRG.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-g_Ea1Wjh.js";import"./avatar-DfKG-nkv.js";import"./icon-button-Cmf5mtcl.js";import"./focus-indicator-BTv0QnKa.js";import"./state-layer-Cnbc18vB.js";import"./autocomplete-BLt7arvF.js";import"./label-CtJEE94F.js";import"./button-PW1lPiFh.js";import"./button-toggle-group-BC0QF8Zu.js";import"./checkbox-TumIk4PH.js";import"./switch-BUv3KVhl.js";import"./base-field-DaIzzACG.js";import"./text-field-Dk4H_-Ig.js";import"./backdrop-DuhijlGd.js";import"./badge-D0n8-xDo.js";import"./banner-TzJfLfYY.js";import"./bottom-sheet-DdW016G8.js";import"./dialog-CxA04cm7.js";import"./button-area-DMkHiPU-.js";import"./calendar-C-AaOM1q.js";import"./card-C_anAd8K.js";import"./chip-set-DkwWGCj0.js";import"./circular-progress-45kWhMLs.js";import"./color-picker-rdhq-S0k.js";import"./date-picker-DVdlvZet.js";import"./date-range-picker-BlL78zoi.js";import"./divider-BIgqYejs.js";import"./base-drawer-DBBe93d7.js";import"./drawer-1zFKHC_i.js";import"./modal-drawer-CYb8qJR2.js";import"./mini-drawer-rpwrWM4L.js";import"./expansion-panel-DZWLJIM8.js";import"./open-icon-DvKyXOVq.js";import"./file-picker-DWnjVODJ.js";import"./floating-action-button-BGxDrt4K.js";import"./inline-message-CzR1CZl4.js";import"./key-item-B_YKVX3e.js";import"./keyboard-shortcut-CNBOd65W.js";import"./label-value-CI8WZIke.js";import"./meter-group-CF84NUAX.js";import"./page-state-DLzWYTpL.js";import"./paginator-SCEgQ20R.js";import"./scaffold-D6_2VrU0.js";import"./secret-DSn3HOhY.js";import"./select-dropdown-CrHMAsdx.js";import"./select-C9GUrTeZ.js";import"./skip-link-ALzgIOfk.js";import"./slider-B9zfkEtK.js";import"./split-view-BIJb6OY_.js";import"./stack-DqNjYC3W.js";import"./stepper-CtMi9cR0.js";import"./table-DU9JK3qJ.js";import"./tab-bar-DZHEY4Nz.js";import"./time-picker-u8bU3YZ3.js";import"./toast-BKCLxBE_.js";import"./toolbar-Bt_F_1V6.js";import"./tooltip-B4bjmlqp.js";import"./tree-item-DcjdCVHA.js";import"./view-switcher-Ckdngb02.js";import"./deprecated-icon-button-BXwme-jo.js";import"./split-button-C4w4YK0j.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
