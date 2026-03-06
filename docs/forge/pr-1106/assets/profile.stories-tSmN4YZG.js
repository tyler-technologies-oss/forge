import{b as d}from"./iframe-Nz47_fHD.js";import{s as u,g as f}from"./utils-Ba9gsS7G.js";import"./service-adapter-8tADcN_b.js";import"./accordion-Rhnu6CZk.js";import"./app-bar-profile-button-4GmUjn5l.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-D4_mmXXb.js";import"./index-DTwfV0k0.js";import"./menu-Cg3oAYpS.js";import"./linear-progress-BUFrhekn.js";import"./list-Cu8bwlYk.js";import"./popover-Dei7Vx-1.js";import"./overlay-C91thjfI.js";import"./skeleton-D7ds2eUz.js";import"./avatar-DYNzJ6XS.js";import"./icon-button-CfSeSDt7.js";import"./focus-indicator-B9pIc8ye.js";import"./state-layer-D2ldILW1.js";import"./autocomplete-DjKvXmbr.js";import"./label-BUhDowKT.js";import"./button-DCmcEZ2V.js";import"./button-toggle-group-By5RlPye.js";import"./checkbox-qD1ZxiPF.js";import"./switch-CuFjOXue.js";import"./base-field-CZ7afn2P.js";import"./text-field-B5oPl4dX.js";import"./backdrop-CGd_1ijy.js";import"./badge-Csy3LzSs.js";import"./banner-DcWQiy3x.js";import"./bottom-sheet-DKhYmQyH.js";import"./dialog-CoLUttnX.js";import"./button-area-QaXqU-NL.js";import"./calendar-CYLPaUv-.js";import"./card-DclqvZs0.js";import"./chip-set-Nh2PwH9O.js";import"./circular-progress-DjM8cQ4Y.js";import"./color-picker-BqtM9Ogx.js";import"./date-picker-jFl5GXQ3.js";import"./date-range-picker-xTWMR1g4.js";import"./divider-UtG3oNpZ.js";import"./base-drawer-BPiRC6hF.js";import"./drawer-CRlAabSP.js";import"./modal-drawer-le40c-8v.js";import"./mini-drawer-DVqGMxN4.js";import"./expansion-panel-DP6abnJe.js";import"./open-icon-DPrRtM-w.js";import"./file-picker-BKcO-4ia.js";import"./floating-action-button-CYb6ar5c.js";import"./inline-message-DVysxEfs.js";import"./key-item-BCDlJU_q.js";import"./keyboard-shortcut-nYhF8vwm.js";import"./label-value-w6aZjl26.js";import"./meter-group-DjN8Duzm.js";import"./page-state-CEMrZKq7.js";import"./paginator-C85Oz1hZ.js";import"./scaffold-4bRcGI7s.js";import"./select-dropdown-gwiuGcyc.js";import"./select-Bkdc5T7d.js";import"./skip-link-BlzOEXi2.js";import"./slider-Bg5gz0hF.js";import"./split-view-C8N1LxRO.js";import"./stack-Dp7al2JQ.js";import"./stepper-D8gDpcUo.js";import"./table-DKmnMYUQ.js";import"./tab-bar-DduOD1Ud.js";import"./time-picker-CTw3-m4g.js";import"./toast-CvzN_vmG.js";import"./toolbar-BFT5XFFB.js";import"./tooltip-BfgpHI7F.js";import"./tree-item-DwM5SCPY.js";import"./view-switcher-B5It4DcS.js";import"./deprecated-icon-button-CiEHQAXV.js";import"./split-button-JNQbakmu.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Ht=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Ht as P,m as W};
