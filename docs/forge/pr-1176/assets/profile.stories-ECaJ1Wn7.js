import{b as d}from"./iframe-NVT04YET.js";import{s as u,g as f}from"./utils-DI4_RuhW.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DS-57bai.js";import"./app-bar-profile-button-DCu4nRCa.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BdYYOvFd.js";import"./menu-EZvpe5Tx.js";import"./linear-progress-DLb8lZjg.js";import"./list-BPri-mi-.js";import"./popover-CgGunS15.js";import"./overlay-BLfIvLYm.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-jvDFel5Y.js";import"./avatar-BIgZTvaF.js";import"./icon-button-DxB8o4J0.js";import"./focus-indicator-DEMHE8eL.js";import"./state-layer-cKdDztbm.js";import"./autocomplete-Cf9rM4_e.js";import"./label-pb2rPE8o.js";import"./button-vBMrWLv1.js";import"./button-toggle-group-BxQ5ovCJ.js";import"./checkbox-r6YOJNp0.js";import"./switch-eKSwfJDq.js";import"./base-field-BiOQ03xs.js";import"./text-field-CfuEIgTP.js";import"./backdrop-Br-v5NXK.js";import"./badge-DzeHpTJv.js";import"./banner-BdIuLIAC.js";import"./bottom-sheet-DW0bVRhV.js";import"./dialog-d1olEQgx.js";import"./button-area-CwXWsrXq.js";import"./calendar-CAVVvgZz.js";import"./card-Cvc47MjX.js";import"./chip-set-BmlXL7gY.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-r_jtD3jT.js";import"./date-picker-CSICwCkA.js";import"./date-range-picker-Bn2Xw6Kw.js";import"./divider-D7Qn_top.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-Bk4QKaOa.js";import"./modal-drawer-CinZNACQ.js";import"./mini-drawer-DpFIFw8V.js";import"./expansion-panel-Dc932FcP.js";import"./open-icon-CJXg7N1T.js";import"./file-picker-D9f-vTv3.js";import"./floating-action-button-gwQUlLIN.js";import"./inline-message-EO-dHXbB.js";import"./key-item-DxDmxHCq.js";import"./keyboard-shortcut-C-qy2DwY.js";import"./label-value-C46r41pN.js";import"./meter-group-DWZGZzFL.js";import"./page-state-BeEclPwI.js";import"./paginator-DcAskQtu.js";import"./scaffold-B-1oYF3d.js";import"./secret-BwNaIlKd.js";import"./select-dropdown-CniMIUfo.js";import"./select-Cm4tUw6U.js";import"./skip-link-awbqN_mr.js";import"./slider-g6Fy9tKC.js";import"./split-view-DPN03WRh.js";import"./stack-DskzmGQg.js";import"./stepper-CcI2piGr.js";import"./table-BkYizyAq.js";import"./tab-bar-DdU_oruO.js";import"./time-picker-CSSSo2tm.js";import"./timeline-break-dIzozagR.js";import"./toast-WB6XTC59.js";import"./toolbar-t9x5lyE3.js";import"./tooltip-DOttKPHe.js";import"./tree-item-_Ma-UdCW.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-nSqU4DUJ.js";import"./split-button-Bxre9XPE.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Kt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Kt as P,m as W};
