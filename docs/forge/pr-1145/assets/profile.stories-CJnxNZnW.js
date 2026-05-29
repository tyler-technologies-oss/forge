import{b as d}from"./iframe-BP81vGJT.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DOtHXvRk.js";import"./app-bar-profile-button-CvuKbIvq.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BpIoxYie.js";import"./menu-Cm3vqFPL.js";import"./linear-progress-BmTkV8LG.js";import"./list-DrOnPcdc.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-D_iZGXuR.js";import"./avatar-Dhwl0Rqn.js";import"./icon-button-Cys8Fbjq.js";import"./focus-indicator-ChbZSDge.js";import"./state-layer-B-p_OOit.js";import"./autocomplete-CxOda8aI.js";import"./label-CmlPdElV.js";import"./button-ToezpLx3.js";import"./button-toggle-group-BEri1hGC.js";import"./checkbox-1zypx_sj.js";import"./switch-Dg66hZvP.js";import"./base-field-DQT-OggA.js";import"./text-field-g42HuXPH.js";import"./backdrop-B-u3npFo.js";import"./badge-jTKji9vt.js";import"./banner-CSdM75Xu.js";import"./bottom-sheet-DhxxPnBx.js";import"./dialog-Di6dXOYv.js";import"./button-area-CsB-Bcwd.js";import"./calendar-D_elgn5R.js";import"./card-DQpHKXQX.js";import"./chip-set-B5ZxZZSZ.js";import"./circular-progress-B3Ibuxja.js";import"./color-picker-CZ7emS98.js";import"./date-picker-Dx-1RiNn.js";import"./date-range-picker-C-_e1orj.js";import"./divider-B0J4iTqs.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BRoh-MrS.js";import"./modal-drawer-CNURgsv3.js";import"./mini-drawer-F8X1cBv8.js";import"./expansion-panel-BQUAJkeh.js";import"./open-icon-BOZtKJSm.js";import"./file-picker-BI6r41f9.js";import"./floating-action-button-BecQBbBg.js";import"./inline-message-rggUpLwV.js";import"./key-item-DgjRlqaw.js";import"./keyboard-shortcut-NX-I-VAz.js";import"./label-value-C2Ggq4HD.js";import"./meter-group-BjtxjHdo.js";import"./page-state-B9wnmWpA.js";import"./paginator-C7Yw8ab1.js";import"./scaffold-ALuq0Bgn.js";import"./secret-B3a4XcBz.js";import"./select-dropdown-CEmrGBfe.js";import"./select-D6QwIMH-.js";import"./skip-link-D2kC8g7p.js";import"./slider-EX6FynHc.js";import"./split-view-_MBBHNmT.js";import"./stack-DGYl-onA.js";import"./stepper-BisELI3M.js";import"./table-Bs-PqFhf.js";import"./tab-bar-B4CZN19-.js";import"./time-picker-NTwZ81JZ.js";import"./toast-DqBvDbL9.js";import"./toolbar-DUvH1SqL.js";import"./tooltip-BDO8tOZg.js";import"./tree-item-Bc3iXUTd.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-DydRGMOP.js";import"./split-button-C0VpTcI9.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
