import{b as d}from"./iframe-BBqNUtqv.js";import{s as u,g as f}from"./utils-BiqwBWR2.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BM3yaH2N.js";import"./app-bar-profile-button-DO8LPKFt.js";import"./icon-BeLCtqW2.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-fQPhzpbf.js";import"./menu-C2B6p4S0.js";import"./linear-progress-BFUUfMoR.js";import"./list-mhgDPYym.js";import"./popover-By2PcE5Z.js";import"./overlay-CRZNSrJB.js";import"./key-action-CgbRjzwr.js";import"./index-5CPwzmQS.js";import"./skeleton-PgUpsvgP.js";import"./avatar-Moz453hk.js";import"./icon-button-ChuE_xy5.js";import"./focus-indicator-CE-2THdp.js";import"./state-layer-Cd1l0S13.js";import"./autocomplete-BtwNnY1E.js";import"./label-DyOrl3sk.js";import"./button-BtXQ1IZV.js";import"./button-toggle-group-Cv8-wtIl.js";import"./checkbox-D6rV2_uo.js";import"./switch-B2rzTqQ2.js";import"./base-field-Di1zrDqT.js";import"./text-field-E1U9wxdR.js";import"./backdrop-GUiAqIjQ.js";import"./badge-CqO6wuYu.js";import"./banner-R14gwpTb.js";import"./bottom-sheet-BSD_G8bg.js";import"./dialog-DizaH0k4.js";import"./button-area-el9K5A2h.js";import"./calendar-DWyjPIig.js";import"./card-DuBAKo1q.js";import"./chip-set-Cdiyywxr.js";import"./circular-progress-VkQlr-m0.js";import"./color-picker-DfwjXVnJ.js";import"./date-picker-DaTaRv0f.js";import"./date-range-picker-DozOBQAq.js";import"./divider-DWZZxUGY.js";import"./base-drawer-CUYrr1Bq.js";import"./drawer-DQMV3LVJ.js";import"./modal-drawer-CAkQ99Lk.js";import"./mini-drawer-DeJuS1k9.js";import"./expansion-panel-C5OOA5Mj.js";import"./open-icon-BWY2qJ40.js";import"./file-picker-BXm01oVD.js";import"./floating-action-button-CCDlITv3.js";import"./inline-message-D7-4ujiu.js";import"./key-item-C5RAG4gY.js";import"./keyboard-shortcut-d9I0suqy.js";import"./label-value-DXKX2EAH.js";import"./meter-group-CLzNiD8n.js";import"./page-state-YePJ_FiU.js";import"./paginator-B9W7iWIn.js";import"./scaffold-D43obOQJ.js";import"./secret-D7mU6Ite.js";import"./select-dropdown-DBQvAPrO.js";import"./select-C0gNsiPW.js";import"./skip-link-BBQAvDQo.js";import"./slider-BAeTh3lY.js";import"./split-view-BUxuZRNb.js";import"./stack-lN6wfo-4.js";import"./stepper-Rj10A4gQ.js";import"./table-BbR4wIvA.js";import"./view-switcher-3lgs2f7e.js";import"./tab-bar-DSHYiqrO.js";import"./time-picker-fKF6dCq6.js";import"./toast-CpPQrdpP.js";import"./toolbar-BXFK3ZY8.js";import"./tooltip-CtTv4J1q.js";import"./tree-item-CvOWbLnC.js";import"./deprecated-icon-button-CrDvhQFz.js";import"./split-button-DMxrLoLW.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Kt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Kt as P,m as W};
