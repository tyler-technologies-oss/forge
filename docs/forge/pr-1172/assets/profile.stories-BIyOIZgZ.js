import{b as d}from"./iframe-DYfaiaSN.js";import{s as u,g as f}from"./utils-MqJhgfu0.js";import"./service-adapter-8tADcN_b.js";import"./accordion-C6uC2snR.js";import"./app-bar-profile-button-ximLtyhD.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-Bp7ZiT47.js";import"./menu-CUDUqmQh.js";import"./linear-progress-BvuLf7up.js";import"./list-DMjulbkv.js";import"./popover-DJ-3O5_U.js";import"./overlay-CaDNztMl.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-e7_Ylra4.js";import"./avatar-C9vR8wIV.js";import"./icon-button-D2n_W3_x.js";import"./autocomplete-CqKqyA42.js";import"./label-DIrWR9mk.js";import"./button-ZAHl1mBc.js";import"./button-toggle-group-DukWBuRP.js";import"./focus-indicator-mSGbd0C3.js";import"./checkbox-DWOgziQb.js";import"./switch-Dfng32PW.js";import"./base-field-CCYkarEN.js";import"./text-field-D186ExWo.js";import"./backdrop-SMwLBDG5.js";import"./badge-C1aFgAKe.js";import"./banner-CjZTk562.js";import"./bottom-sheet-CrPMJblw.js";import"./dialog-CcEC3WqU.js";import"./button-area-AP5S91VA.js";import"./calendar-Kl3ZwxMS.js";import"./card-CUH5-0T0.js";import"./chip-set-DbalnX4z.js";import"./state-layer-DRsbBcDh.js";import"./circular-progress-yFB3Uh8Q.js";import"./color-picker-BFiNibmX.js";import"./date-picker-DrXAdOhC.js";import"./date-range-picker-C6LF8M2l.js";import"./divider-YsyuqssV.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-DthgZrcs.js";import"./modal-drawer-DDnthQ-H.js";import"./mini-drawer-Bis_TD9h.js";import"./expansion-panel-BMq80tXk.js";import"./open-icon-Bzn8gsDt.js";import"./file-picker-CWXNH7YC.js";import"./floating-action-button-B3fSLU6D.js";import"./inline-message-Dej6nioH.js";import"./key-item-Beu-_72Q.js";import"./keyboard-shortcut-ohMaSJsR.js";import"./label-value-CJDyRgCt.js";import"./meter-group-CyFZsGNq.js";import"./page-state-xtTZreUO.js";import"./paginator-COSKPOY-.js";import"./scaffold-l7cEUk27.js";import"./secret-BfshFmCg.js";import"./select-dropdown-C45tGnsH.js";import"./select-CkUorMQT.js";import"./skip-link-C6d07R7T.js";import"./slider-BIi1-25X.js";import"./split-view-DABDxURe.js";import"./stack-DYrRnd9D.js";import"./stepper-UcpbzQO-.js";import"./table-DcGHwecL.js";import"./tab-bar-DDgyI796.js";import"./time-picker-B-EzsOJq.js";import"./toast-D5DOEOW0.js";import"./toolbar-CNHgvtZs.js";import"./tooltip-CgWGjx2h.js";import"./tree-item-Ckd_y2Q4.js";import"./view-switcher-xUv-lFl9.js";import"./deprecated-icon-button-pFhVb3oM.js";import"./split-button-B8Wc8YeQ.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
