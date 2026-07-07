import{b as d}from"./iframe-Dv7ymADP.js";import{s as u,g as f}from"./utils-BVPd0qDu.js";import"./service-adapter-8tADcN_b.js";import"./accordion-fm78j2fP.js";import"./app-bar-profile-button-BJ_gES_D.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-BhqRwxeL.js";import"./menu-DR5ycFMC.js";import"./linear-progress-DLb8lZjg.js";import"./list-DmQpsFne.js";import"./popover-Bi87EPbu.js";import"./overlay-BWHcAp8O.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-jvDFel5Y.js";import"./avatar-BhPFy6Lq.js";import"./icon-button-Dl2PX17N.js";import"./focus-indicator-CvCFHXn-.js";import"./state-layer-cKdDztbm.js";import"./autocomplete-6RoaMV3F.js";import"./label-C0FKjeRN.js";import"./button-Dpc35oCu.js";import"./button-toggle-group-B3aXqgxr.js";import"./checkbox-BHfrH9La.js";import"./switch-DFoN4xmj.js";import"./base-field-B8QzmuEA.js";import"./text-field-CHKBqYqo.js";import"./backdrop-Br-v5NXK.js";import"./badge-C9rybvO_.js";import"./banner-YglOMRdO.js";import"./bottom-sheet-DW0bVRhV.js";import"./dialog-d1olEQgx.js";import"./button-area-DTDcCtD1.js";import"./calendar-DFkNHqaV.js";import"./card-AI4m3Eny.js";import"./chip-set-DUiWiuCH.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-BHN27k9s.js";import"./date-picker-B85ATAsq.js";import"./date-range-picker-Bf3efuUT.js";import"./divider-Bjfdr93y.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-Bk4QKaOa.js";import"./modal-drawer-CinZNACQ.js";import"./mini-drawer-DpFIFw8V.js";import"./expansion-panel-CbGWHgRk.js";import"./open-icon-CJ6eRu9V.js";import"./file-picker-CBdRGgNF.js";import"./floating-action-button-BBjiGyfA.js";import"./inline-message-EO-dHXbB.js";import"./key-item-CjCc8z9q.js";import"./keyboard-shortcut-BsdfHrm8.js";import"./label-value-C46r41pN.js";import"./meter-group-Bpz7RS6T.js";import"./page-state-BeEclPwI.js";import"./paginator-BkYH87dQ.js";import"./scaffold-B-1oYF3d.js";import"./secret-BiOHqohk.js";import"./select-dropdown-BP_1Y5xM.js";import"./select-D4HaCE-h.js";import"./skip-link-BtLNrqwJ.js";import"./slider-C6ZQmykw.js";import"./split-view-D0GzaXBG.js";import"./stack-DskzmGQg.js";import"./stepper-DLM2VGaU.js";import"./table--422J2jR.js";import"./tab-bar-DoJYgUuV.js";import"./time-picker-ZQhTxs8I.js";import"./timeline-break-DdZGizIp.js";import"./toast-Cm0Byk2j.js";import"./toolbar-6xSf63zu.js";import"./tooltip-CX790hiq.js";import"./tree-item-zuQxC14P.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-hZq6DmiY.js";import"./split-button-1RPDOtO3.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
