import{b as d}from"./iframe-D8Fp7kb4.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BG0fGfTL.js";import"./app-bar-profile-button-C2G2TpU9.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CnFx510Q.js";import"./menu-DzfyzIgv.js";import"./linear-progress-BmTkV8LG.js";import"./list-CeVryFV-.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-D_iZGXuR.js";import"./avatar-CHwQUcvw.js";import"./icon-button-CyY0ekQS.js";import"./focus-indicator-CyX3UTOf.js";import"./state-layer-B-p_OOit.js";import"./autocomplete-Cd9mZTvR.js";import"./label-F1sVaAPV.js";import"./button-BmDjT-UU.js";import"./button-toggle-group-D5kxIvk6.js";import"./checkbox-AmIM-7HM.js";import"./switch-BqBAjSGq.js";import"./base-field-CUZfOh9z.js";import"./text-field-CiA4M3dh.js";import"./backdrop-B-u3npFo.js";import"./badge-DSFQRrOY.js";import"./banner-zpkPhuAP.js";import"./bottom-sheet-DhxxPnBx.js";import"./dialog-Di6dXOYv.js";import"./button-area-DtlDcZSy.js";import"./calendar-DzmXgdlv.js";import"./card-CKEhHV8W.js";import"./chip-set-BiEs5RLb.js";import"./circular-progress-B3Ibuxja.js";import"./color-picker-BjRByAW6.js";import"./date-picker-C_HTbU7c.js";import"./date-range-picker-BhmJjAyP.js";import"./divider-ChnXQGYg.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BRoh-MrS.js";import"./modal-drawer-CNURgsv3.js";import"./mini-drawer-F8X1cBv8.js";import"./expansion-panel-C6jp7jI1.js";import"./open-icon-BdkBLVOl.js";import"./file-picker-Ba_SCqZ8.js";import"./floating-action-button-CjEeJ5l1.js";import"./inline-message-rggUpLwV.js";import"./key-item-CI7cjKZE.js";import"./keyboard-shortcut-CFzqB5g4.js";import"./label-value-C2Ggq4HD.js";import"./meter-group-BIIprBuE.js";import"./page-state-B9wnmWpA.js";import"./paginator-C_3WIPuu.js";import"./scaffold-ALuq0Bgn.js";import"./secret-B4IdYNJy.js";import"./select-dropdown-Clt3u1D3.js";import"./select-CYWcmzkW.js";import"./skip-link-BkpqCEhB.js";import"./slider-BlMpEXLF.js";import"./split-view-c1g0_0Gd.js";import"./stack-DGYl-onA.js";import"./stepper-BmQaXwMs.js";import"./table-J37rukq3.js";import"./tab-bar-GAIjZcLm.js";import"./time-picker-DX2tsUGF.js";import"./toast-YU3diyhx.js";import"./toolbar-DUvH1SqL.js";import"./tooltip-BDO8tOZg.js";import"./tree-item-BG-WUxNR.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-DdvEwwdy.js";import"./split-button-BY3LN_0U.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
