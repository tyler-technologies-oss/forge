import{b as d}from"./iframe-BtA9eWQP.js";import{s as u,g as f}from"./utils-C7Mtdcaw.js";import"./service-adapter-8tADcN_b.js";import"./accordion-j_ORg9-D.js";import"./app-bar-profile-button-BvqyTC10.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-B9dIY4yF.js";import"./menu-CtrFixfm.js";import"./linear-progress-CKPFd0xY.js";import"./list-dnJoZZWz.js";import"./popover-BFCymHFP.js";import"./overlay-toEc_K5b.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-g_Ea1Wjh.js";import"./avatar-CFfWnsmZ.js";import"./icon-button-D8cwymAq.js";import"./focus-indicator-DW5bpcf_.js";import"./state-layer-Cnbc18vB.js";import"./autocomplete-DCaGGgUg.js";import"./label-DlsRsYpZ.js";import"./button-YKRqoniw.js";import"./button-toggle-group-CEH8bCr8.js";import"./checkbox-nWI4RhZ1.js";import"./switch-CUwxEfU4.js";import"./base-field-Cyc51o0r.js";import"./text-field-DbmRMPIy.js";import"./backdrop-DuhijlGd.js";import"./badge-DbkvEYAX.js";import"./banner-DGC0SSRJ.js";import"./bottom-sheet-DdW016G8.js";import"./dialog-CxA04cm7.js";import"./button-area-CZgqmg7_.js";import"./calendar-xFFcVXOm.js";import"./card-CC2nQesl.js";import"./chip-set-tDt1bzEB.js";import"./circular-progress-45kWhMLs.js";import"./color-picker-BDdhZznF.js";import"./date-picker-BMUPdGlg.js";import"./date-range-picker-DRFMBkg3.js";import"./divider-DXUmtZsV.js";import"./base-drawer-DBBe93d7.js";import"./drawer-1zFKHC_i.js";import"./modal-drawer-CYb8qJR2.js";import"./mini-drawer-rpwrWM4L.js";import"./expansion-panel-DoAd-WeN.js";import"./open-icon-BZomUqG9.js";import"./file-picker-3AmFnFQ7.js";import"./floating-action-button-GyE1mtIC.js";import"./inline-message-CzR1CZl4.js";import"./key-item-Bi4GG-BD.js";import"./keyboard-shortcut-DdcTuuKn.js";import"./label-value-CI8WZIke.js";import"./meter-group-B2lKMy-T.js";import"./page-state-DLzWYTpL.js";import"./paginator-F-U5_V-p.js";import"./scaffold-D6_2VrU0.js";import"./secret-BYoAZa0f.js";import"./select-dropdown-C5t6RruL.js";import"./select-WhsEBy52.js";import"./skip-link-DyloD3TE.js";import"./slider-BjKTgyzA.js";import"./split-view-DzZkFocy.js";import"./stack-DqNjYC3W.js";import"./stepper-jU_d4dNP.js";import"./table-CFwJFCWd.js";import"./tab-bar-B_AqKz04.js";import"./time-picker-BCDLIbCx.js";import"./toast-sVIUZ_U9.js";import"./toolbar-Bt_F_1V6.js";import"./tooltip-BkP0o7Jh.js";import"./tree-item-Cj3m4Bs0.js";import"./view-switcher-Ckdngb02.js";import"./deprecated-icon-button-BFuFOd7f.js";import"./split-button-CkNWo8ey.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
