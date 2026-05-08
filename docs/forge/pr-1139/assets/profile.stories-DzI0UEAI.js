import{b as d}from"./iframe-VEfyHWkW.js";import{s as u,g as f}from"./utils-BX30PoUy.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BGUENz2t.js";import"./app-bar-profile-button-CtIwlyr1.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DXmxhIwE.js";import"./menu-D7IgUWs-.js";import"./linear-progress-CKPFd0xY.js";import"./list-CeiFAVN-.js";import"./popover-BS-OVdsI.js";import"./overlay-D2sOlsKa.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./skeleton-g_Ea1Wjh.js";import"./avatar-D_CNZBur.js";import"./icon-button-C-tZnLZ9.js";import"./focus-indicator-wqDlsb_E.js";import"./state-layer-Cnbc18vB.js";import"./autocomplete-DD4L4otT.js";import"./label-DfBB20aY.js";import"./button-C2C39vE8.js";import"./button-toggle-group-BSUSg7i_.js";import"./checkbox-CkPWqzNQ.js";import"./switch-ouNxs7Nk.js";import"./base-field-BHMDuxhn.js";import"./text-field-Bib6mwff.js";import"./backdrop-DuhijlGd.js";import"./badge-Dz1bXeVq.js";import"./banner-6yksRxN4.js";import"./bottom-sheet-DdW016G8.js";import"./dialog-CxA04cm7.js";import"./button-area-D92EmbYK.js";import"./calendar-BUtVCiaB.js";import"./card-D1cX1f_S.js";import"./chip-set-a8_nCQYQ.js";import"./circular-progress-45kWhMLs.js";import"./color-picker-DBDYrKWE.js";import"./date-picker-B809OjEq.js";import"./date-range-picker-CSjAlYHH.js";import"./divider-tA9VXx0m.js";import"./base-drawer-DBBe93d7.js";import"./drawer-1zFKHC_i.js";import"./modal-drawer-CYb8qJR2.js";import"./mini-drawer-rpwrWM4L.js";import"./expansion-panel-DdIyCOp2.js";import"./open-icon-DoldPooA.js";import"./file-picker-DpSkCTiY.js";import"./floating-action-button-CUXG2Omc.js";import"./inline-message-CzR1CZl4.js";import"./key-item-CPRmM_91.js";import"./keyboard-shortcut-Be0Xwg37.js";import"./label-value-CI8WZIke.js";import"./meter-group-BMDp57mH.js";import"./page-state-DLzWYTpL.js";import"./paginator-DGwRw1mH.js";import"./scaffold-D6_2VrU0.js";import"./secret-D9LP_p2Y.js";import"./select-dropdown-Bq0o7KWU.js";import"./select-C7BZPiSQ.js";import"./skip-link-C3SmsL6L.js";import"./slider-js1t_5QK.js";import"./split-view-Ne00lBdM.js";import"./stack-DqNjYC3W.js";import"./stepper-BGskvG6b.js";import"./table-YG5qc9xJ.js";import"./tab-bar-BQSkWRIy.js";import"./time-picker-DEtMaql2.js";import"./toast-C2oiM28E.js";import"./toolbar-Bt_F_1V6.js";import"./tooltip-CXOV95To.js";import"./tree-item-DZvGxMyi.js";import"./view-switcher-Ckdngb02.js";import"./deprecated-icon-button-DBx8e_ny.js";import"./split-button-C60EwTuE.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
