import{b as d}from"./iframe-qD-bGIzk.js";import{s as u,g as f}from"./utils-Cu3TicFl.js";import"./service-adapter-8tADcN_b.js";import"./accordion-D64JxXzS.js";import"./app-bar-profile-button-V-kFKUun.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DFT8Hk_L.js";import"./menu-D0ZlsmpI.js";import"./linear-progress-BvuLf7up.js";import"./list-CpihL8aD.js";import"./popover-DsfRe9wk.js";import"./overlay-wJnkDJjY.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CGb6dwMS.js";import"./avatar-DLYedaTp.js";import"./icon-button-D5NAib0F.js";import"./focus-indicator-DLFCgvFL.js";import"./state-layer-DRsbBcDh.js";import"./autocomplete-B16MRgdG.js";import"./label-BJKF1Dni.js";import"./base-field-EZO9ex0p.js";import"./text-field-D8O6gLHh.js";import"./backdrop-SMwLBDG5.js";import"./badge-PAb-VKJ0.js";import"./banner-Ca1snXcH.js";import"./bottom-sheet-CrPMJblw.js";import"./dialog-CcEC3WqU.js";import"./button-area-DuEJFkC2.js";import"./button-toggle-group-B4809oYe.js";import"./button-DvA8LT6g.js";import"./calendar-C-G3PNhN.js";import"./card-Z1RwPDBP.js";import"./checkbox-BFWcmQHw.js";import"./chip-set-C-hTeV5f.js";import"./circular-progress-yFB3Uh8Q.js";import"./color-picker-BUhTcVfU.js";import"./date-picker-DMuqcYeB.js";import"./date-range-picker-hNBfZswg.js";import"./divider-B0Ee0gPN.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-DthgZrcs.js";import"./modal-drawer-DDnthQ-H.js";import"./mini-drawer-Bis_TD9h.js";import"./expansion-panel-zQprMMpQ.js";import"./open-icon-DMeTJ8Bt.js";import"./file-picker-BWttIt-5.js";import"./floating-action-button-k4r9iH5K.js";import"./inline-message-Dej6nioH.js";import"./key-item-DrTZXo85.js";import"./keyboard-shortcut-DeMNEy1e.js";import"./label-value-CJDyRgCt.js";import"./meter-group-ttazvo2b.js";import"./page-state-xtTZreUO.js";import"./paginator-Cpkh_nb-.js";import"./radio-group-CH1uzmR7.js";import"./scaffold-l7cEUk27.js";import"./secret-ECEce2eY.js";import"./select-dropdown-4zzUfgcv.js";import"./select-CTjKHNEI.js";import"./skip-link-CteUJvLw.js";import"./slider-Xx0ZvQ69.js";import"./split-view-d9DWhD0g.js";import"./stack-DYrRnd9D.js";import"./stepper-DvrZfm79.js";import"./switch-DF-5iysO.js";import"./table-De4dar1J.js";import"./tab-bar-D9U9HNaR.js";import"./time-picker-CYwg-0Ok.js";import"./toast-BnS_YS0T.js";import"./toolbar-CzSx0Zdm.js";import"./tooltip-DljB7HTy.js";import"./tree-item-CtNT4WV2.js";import"./view-switcher-xUv-lFl9.js";import"./deprecated-icon-button-D03Ngdhr.js";import"./split-button-BQ1sK6Gy.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
