import{b as d}from"./iframe-D3Oii2TL.js";import{s as u,g as f}from"./utils-B3jYbaiS.js";import"./service-adapter-8tADcN_b.js";import"./accordion-xon7q9UB.js";import"./app-bar-profile-button-LuYDSuN9.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CWFKOemj.js";import"./menu-YpU1T97T.js";import"./linear-progress-DLb8lZjg.js";import"./list-BRTZHC4C.js";import"./popover-88j80EOP.js";import"./overlay-yYpcIpns.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-DYD8m2j0.js";import"./avatar-Dy5q_LfY.js";import"./icon-button-C1Zmz9J7.js";import"./focus-indicator-BZl6qRLK.js";import"./state-layer-RJ83GVyt.js";import"./autocomplete-Dg-mRnz_.js";import"./label-DTIviHOl.js";import"./button-CSCDv7wg.js";import"./button-toggle-group-CZruN2gd.js";import"./checkbox-DU0EpUEb.js";import"./switch-Cw2nKkSw.js";import"./base-field-CR_hTikp.js";import"./text-field-CYnraT90.js";import"./backdrop-Br-v5NXK.js";import"./badge-L6rs5pcC.js";import"./banner-DUWOzB9J.js";import"./bottom-sheet-CYPNqcjy.js";import"./dialog-BAAkdPx4.js";import"./button-area-CWkj8I3u.js";import"./calendar-xHVN8nHw.js";import"./card-Cd_meIIC.js";import"./chip-set-NK8Ojnhm.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-Botcygnb.js";import"./date-picker-B66ftVR2.js";import"./date-range-picker-BpDx_aD7.js";import"./divider-H-88T8WR.js";import"./base-drawer-DgtNmrYs.js";import"./drawer-BD1OwPL1.js";import"./modal-drawer-BSNPPupX.js";import"./mini-drawer-DLEI9OBr.js";import"./expansion-panel-CzjCjPr6.js";import"./open-icon-CXT7NKc4.js";import"./file-picker-CRTSjFpI.js";import"./floating-action-button-CTbRIuvu.js";import"./inline-message-EO-dHXbB.js";import"./key-item-Dwfo4wKW.js";import"./keyboard-shortcut-Be8UgwGQ.js";import"./label-value-C46r41pN.js";import"./meter-group-CCB5zD9x.js";import"./page-state-BeEclPwI.js";import"./paginator-Cin71aaV.js";import"./scaffold-B-1oYF3d.js";import"./secret-DMQ20Lqn.js";import"./select-dropdown-CqT4T8LQ.js";import"./select-4VeiR_E8.js";import"./skip-link-U9uAPDqg.js";import"./slider-II9xeD0l.js";import"./split-view-DCVv6yxF.js";import"./stack-DskzmGQg.js";import"./stepper-BhrMidWQ.js";import"./table-Dtslqp1Z.js";import"./tab-bar-DArwSYyW.js";import"./time-picker-Bk2nVnhH.js";import"./toast-CH8tcr-Y.js";import"./toolbar-D_dMkHw9.js";import"./tooltip-DeV8GtrX.js";import"./tree-item-4phMPsI4.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-CXgpBibf.js";import"./split-button-jR_B11fs.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
