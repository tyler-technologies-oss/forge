import{b as d}from"./iframe-CKUxNUwK.js";import{s as u,g as f}from"./utils-GdTrqNrR.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BktyQHKi.js";import"./app-bar-profile-button-xu2IQOQ5.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-Cl-vuQBY.js";import"./menu-Dd1dJSol.js";import"./linear-progress-BmTkV8LG.js";import"./list-6Gz7jq_7.js";import"./popover-SVzeiRWo.js";import"./overlay-d7QE-4pI.js";import"./key-action-CxixFCpG.js";import"./index-5CPwzmQS.js";import"./skeleton-D_iZGXuR.js";import"./avatar-CGOk1_cO.js";import"./icon-button-XyjzE-XO.js";import"./focus-indicator-Dxwlqb8p.js";import"./state-layer-B-p_OOit.js";import"./autocomplete-CFfm-jOo.js";import"./label-BtKA7SuN.js";import"./button-Cxvu7MX1.js";import"./button-toggle-group-BWY8bXSY.js";import"./checkbox-zoLOzW2l.js";import"./switch-BX-_PPXh.js";import"./base-field-F3pN73hA.js";import"./text-field-C441wqBF.js";import"./backdrop-B-u3npFo.js";import"./badge-BYJc-A-D.js";import"./banner-BtdZUaBO.js";import"./bottom-sheet-DhxxPnBx.js";import"./dialog-Di6dXOYv.js";import"./button-area-OzE3r4EG.js";import"./calendar-UYeWjD6_.js";import"./card-BuKzf6LJ.js";import"./chip-set-B6W09Nan.js";import"./circular-progress-B3Ibuxja.js";import"./color-picker-Budha77o.js";import"./date-picker-_jMMTZpT.js";import"./date-range-picker-BXEdUs_l.js";import"./divider-dY8S7Dhi.js";import"./base-drawer-CR9sKDRH.js";import"./drawer-BRoh-MrS.js";import"./modal-drawer-CNURgsv3.js";import"./mini-drawer-F8X1cBv8.js";import"./expansion-panel-C8iGeBLZ.js";import"./open-icon-CqEAyqW8.js";import"./file-picker-DdI1th-v.js";import"./floating-action-button-BLOy2XfL.js";import"./inline-message-rggUpLwV.js";import"./key-item-smHtGpiQ.js";import"./keyboard-shortcut-Cv32Cz15.js";import"./label-value-C2Ggq4HD.js";import"./meter-group-Dc8d6bWn.js";import"./page-state-B9wnmWpA.js";import"./paginator-DX2jcQkB.js";import"./scaffold-ALuq0Bgn.js";import"./secret-DAG0SkNj.js";import"./select-dropdown-DGa8j1fv.js";import"./select-BKKdH_z2.js";import"./skip-link-Ccwkcx0Y.js";import"./slider-BgOdZ1Cg.js";import"./split-view-B2N6v3gV.js";import"./stack-DGYl-onA.js";import"./stepper-S1oHGLTN.js";import"./table-c6StfmX7.js";import"./tab-bar-CopRG1EY.js";import"./time-picker-CqKd-Vhd.js";import"./toast-C6IBJCCF.js";import"./toolbar-DUvH1SqL.js";import"./tooltip-BDO8tOZg.js";import"./tree-item-Dl3uS5Qy.js";import"./view-switcher-CINrz_TV.js";import"./deprecated-icon-button-BkNXpiRv.js";import"./split-button-vaVJrOqA.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
