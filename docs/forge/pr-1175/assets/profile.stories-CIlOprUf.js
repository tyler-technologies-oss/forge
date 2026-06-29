import{b as d}from"./iframe-CtvU57LK.js";import{s as u,g as f}from"./utils-B8Y87ww2.js";import"./service-adapter-8tADcN_b.js";import"./accordion-C9ujcc-9.js";import"./app-bar-profile-button-B5nV4q2B.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BbfxUxRd.js";import"./menu-Tl-H2Ng7.js";import"./linear-progress-DLb8lZjg.js";import"./list-B4D_o8Wi.js";import"./popover-B58F_IdX.js";import"./overlay-CYTwEvsd.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-jvDFel5Y.js";import"./avatar-Bj6YkGAN.js";import"./icon-button-D9I8PnM-.js";import"./focus-indicator-CERzR5p8.js";import"./state-layer-cKdDztbm.js";import"./autocomplete-BA6VBarl.js";import"./label-DrjywKzI.js";import"./button-Bjwh-7Py.js";import"./button-toggle-group-5dgB_v-7.js";import"./checkbox-BPq8DyKa.js";import"./switch-t04-ZD27.js";import"./base-field-CsJ9C7m3.js";import"./text-field-DD0S4gDU.js";import"./backdrop-Br-v5NXK.js";import"./badge-CRWlLRGS.js";import"./banner-kPNp-Uuw.js";import"./bottom-sheet-DW0bVRhV.js";import"./dialog-d1olEQgx.js";import"./button-area-1hGdhMmf.js";import"./calendar-adpjNqmw.js";import"./card-Bhp_IdIr.js";import"./chip-set-CeOjaqmI.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-Brfw1Xex.js";import"./date-picker-CiRupsQM.js";import"./date-range-picker-BODGGKJZ.js";import"./divider-CY-70bHY.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-Bk4QKaOa.js";import"./modal-drawer-CinZNACQ.js";import"./mini-drawer-DpFIFw8V.js";import"./expansion-panel-DzA69pe7.js";import"./open-icon-CO5XCqyT.js";import"./file-picker-DOFYD0WQ.js";import"./floating-action-button-WSeQMgXj.js";import"./inline-message-EO-dHXbB.js";import"./key-item-Dd83k6Rz.js";import"./keyboard-shortcut-Bm9LBblw.js";import"./label-value-C46r41pN.js";import"./meter-group-CzoNotb4.js";import"./page-state-BeEclPwI.js";import"./paginator-QzoAcL0P.js";import"./scaffold-B-1oYF3d.js";import"./secret-BhGnDcs6.js";import"./select-dropdown-BYPdlHk0.js";import"./select-LTpVNhCV.js";import"./skip-link-NSpbSLQI.js";import"./slider-Bvgre2UV.js";import"./split-view-BB5bAHhM.js";import"./stack-DskzmGQg.js";import"./stepper-D1KCouMu.js";import"./table-C_zfNHON.js";import"./tab-bar-cYZ2ltAG.js";import"./time-picker-bEA0uZ8W.js";import"./toast-CzQ6ylUh.js";import"./toolbar-GR1dg2ev.js";import"./tooltip-DLZt5LHj.js";import"./tree-item-BOlkHQyI.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-CFBkaoZa.js";import"./split-button-DWSt4yUZ.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
