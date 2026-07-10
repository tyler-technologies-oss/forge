import{b as d}from"./iframe-DC_N5IcN.js";import{s as u,g as f}from"./utils-DKoLLPTK.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CYnuzJg4.js";import"./app-bar-profile-button-W194oXUx.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BRdXe8nV.js";import"./menu-BpTfx0qo.js";import"./linear-progress-DLb8lZjg.js";import"./list-C9MM0Na1.js";import"./popover-CbRRoZuj.js";import"./overlay-DfNZRYj1.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BOQ63418.js";import"./avatar-BC-YziJB.js";import"./icon-button-DQohdgv8.js";import"./focus-indicator-jaUmRQAW.js";import"./state-layer-cKdDztbm.js";import"./autocomplete-CBA-Hi-U.js";import"./label-CyrlcG4M.js";import"./button-CZW0UC5P.js";import"./button-toggle-group-BJQSg8JY.js";import"./checkbox-r7C9zLrI.js";import"./switch--z0pAjmI.js";import"./base-field-xze3y4FA.js";import"./text-field-B5vK9fdP.js";import"./backdrop-Br-v5NXK.js";import"./badge-DSXp8VjC.js";import"./banner-B62NpYIf.js";import"./bottom-sheet-DW0bVRhV.js";import"./dialog-d1olEQgx.js";import"./button-area-C9_5mr9Q.js";import"./calendar-CsfZhSHp.js";import"./card-NvMoFFhf.js";import"./chip-set-DhLnBCRP.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-EWlh_TsF.js";import"./date-picker-CXgpHKr2.js";import"./date-range-picker-C0zcw6bG.js";import"./divider-DZAsJI57.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-Bk4QKaOa.js";import"./modal-drawer-CinZNACQ.js";import"./mini-drawer-DpFIFw8V.js";import"./expansion-panel-CJIc22cs.js";import"./open-icon-DgrJm0RL.js";import"./file-picker-fDH8B7mM.js";import"./floating-action-button-BVrE2D0p.js";import"./inline-message-EO-dHXbB.js";import"./key-item-D7Fu9PuJ.js";import"./keyboard-shortcut-BdN1jDga.js";import"./label-value-C46r41pN.js";import"./meter-group-CmKv-qpG.js";import"./page-state-BeEclPwI.js";import"./paginator-Dn0szu1z.js";import"./scaffold-B-1oYF3d.js";import"./secret-C4ZE4G_5.js";import"./select-dropdown-BX2q-vPb.js";import"./select-7vIn5Mi8.js";import"./skip-link-S3kChz9l.js";import"./slider-BMBGBkWO.js";import"./split-view-CHK8DF70.js";import"./stack-DskzmGQg.js";import"./stepper-DwuFzppq.js";import"./table-ByAWG19O.js";import"./tab-bar-CIVZFOq0.js";import"./time-picker-CwBTm2-R.js";import"./toast-CxWJHMpv.js";import"./toolbar-B86WXwPP.js";import"./tooltip-CiOLdt2p.js";import"./tree-item-C6jME5du.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-DdlA9zCX.js";import"./split-button-D5k4i9tS.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
