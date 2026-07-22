import{b as d}from"./iframe-CjzVpfqS.js";import{s as u,g as f}from"./utils-Bqf6WcF-.js";import"./service-adapter-8tADcN_b.js";import"./accordion-rtzAeS_l.js";import"./app-bar-profile-button-BnynZ60a.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-J8-UQPDE.js";import"./menu-CcwZnLlk.js";import"./linear-progress-CNsyrVbY.js";import"./list-DyIfwNHS.js";import"./popover-1VKXWetn.js";import"./overlay-BUaUM1sf.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CVBYr5DN.js";import"./avatar-DxpmsgtB.js";import"./icon-button-Y8A9ultm.js";import"./autocomplete-DFted_dJ.js";import"./label-DcyIgUN2.js";import"./button-RZbwlICz.js";import"./button-toggle-group-CizYn0Bm.js";import"./focus-indicator-DHikC1Y8.js";import"./checkbox-px03cLLv.js";import"./switch-xZjZ3ZX2.js";import"./base-field-Cab5qth9.js";import"./text-field-B9xZ2Bp8.js";import"./backdrop-CxI4uXvH.js";import"./badge-Dnzgjas2.js";import"./banner-BmQqOP71.js";import"./bottom-sheet-CKUEV18L.js";import"./dialog-MGs1MZzZ.js";import"./button-area-CSAqYybg.js";import"./calendar-DHsTgjoB.js";import"./card-lohytUav.js";import"./chip-set-DX0UhNMu.js";import"./state-layer-BCX73D4o.js";import"./circular-progress-CKUvGRn4.js";import"./color-picker-EyRmJWEw.js";import"./date-picker-CMJLaZEJ.js";import"./date-range-picker-BtlAmwSw.js";import"./divider-ygs7M1Xv.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-X4iPLOfK.js";import"./modal-drawer-D4sxpTjj.js";import"./mini-drawer-nZrpLlQe.js";import"./expansion-panel-D8sOzjVy.js";import"./open-icon-6s08rbeD.js";import"./file-picker-tMIHYh_N.js";import"./floating-action-button-CdDjPeSY.js";import"./inline-message-Cyv8bbnL.js";import"./key-item-DDGRDYRy.js";import"./keyboard-shortcut-CF-6-Ce3.js";import"./label-value-CWh-_Vq0.js";import"./meter-group-CvCSGroY.js";import"./page-state-CCE7cTVN.js";import"./paginator-CaL0JlzZ.js";import"./scaffold-B3wC-6gb.js";import"./secret-b0yFyJ9k.js";import"./select-dropdown-COsz7B1V.js";import"./select-D9-AWc8o.js";import"./skip-link-CwiqrCFG.js";import"./slider--Ji_TzjP.js";import"./split-view-U0bS3WHe.js";import"./stack-q4IFSwGv.js";import"./stepper-C9ffb3YR.js";import"./table-r5g5k3wY.js";import"./tab-bar-BWGQNMts.js";import"./time-picker-D2rLp28s.js";import"./toast-D6dYB9u_.js";import"./toolbar-jMC9x6_z.js";import"./tooltip-DD6ZsOiy.js";import"./tree-item-D7QJuAJS.js";import"./view-switcher-CG17TL-Z.js";import"./deprecated-icon-button-BJTixzmC.js";import"./split-button-Bb_17qZm.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
