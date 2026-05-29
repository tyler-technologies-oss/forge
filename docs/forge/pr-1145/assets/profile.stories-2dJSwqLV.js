import{b as d}from"./iframe-C7CPvnqQ.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CJVQkXY5.js";import"./app-bar-profile-button-Zg-Da6JE.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-Cd2a5RdR.js";import"./menu-sqNEh47o.js";import"./linear-progress-BmTkV8LG.js";import"./list-CaZqgYc9.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-D_iZGXuR.js";import"./avatar-B8Qjzek-.js";import"./icon-button-BG4U08uy.js";import"./focus-indicator-DjV4VIu_.js";import"./state-layer-B-p_OOit.js";import"./autocomplete-C1TrlWBj.js";import"./label-CVKX_n8-.js";import"./button-I8SKUTec.js";import"./button-toggle-group-CM3cYq9y.js";import"./checkbox-BzB76OEx.js";import"./switch-C9BliIyf.js";import"./base-field-U1tAqLnh.js";import"./text-field-CjkCZ5H4.js";import"./backdrop-B-u3npFo.js";import"./badge-BEj9NADE.js";import"./banner-Vvn6651o.js";import"./bottom-sheet-DhxxPnBx.js";import"./dialog-Di6dXOYv.js";import"./button-area-zkXv_KFt.js";import"./calendar-BxfY0HDf.js";import"./card-96ZPePb7.js";import"./chip-set-CYxp2K-R.js";import"./circular-progress-B3Ibuxja.js";import"./color-picker-CyFbWGfi.js";import"./date-picker-CQZrIggk.js";import"./date-range-picker-BzdIBUmg.js";import"./divider-Di8i2QUX.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BRoh-MrS.js";import"./modal-drawer-CNURgsv3.js";import"./mini-drawer-F8X1cBv8.js";import"./expansion-panel-oOL2TCa-.js";import"./open-icon-BLrEg7sh.js";import"./file-picker-BGn9dJ3_.js";import"./floating-action-button-CiQ26c-F.js";import"./inline-message-rggUpLwV.js";import"./key-item-BcajtMvv.js";import"./keyboard-shortcut-DSLcCYyy.js";import"./label-value-C2Ggq4HD.js";import"./meter-group-B-KLFTih.js";import"./page-state-B9wnmWpA.js";import"./paginator-WDUt_BYq.js";import"./scaffold-ALuq0Bgn.js";import"./secret-DN9dH4NF.js";import"./select-dropdown-XJXZ-IYl.js";import"./select-D7_l-ET6.js";import"./skip-link-DdCQ0iDE.js";import"./slider-DFzAHxje.js";import"./split-view-nWrxwA2o.js";import"./stack-DGYl-onA.js";import"./stepper-BeeAJyox.js";import"./table-w4AFuqCR.js";import"./tab-bar-DdZqN_3z.js";import"./time-picker-Cph6uURc.js";import"./toast-aBcIdoXq.js";import"./toolbar-DUvH1SqL.js";import"./tooltip-BDO8tOZg.js";import"./tree-item-CkRAA2Z6.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-DB2RfVXO.js";import"./split-button-BYVvxkrs.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
