import{b as d}from"./iframe-DucEJqMh.js";import{s as u,g as f}from"./utils-DgK06r1C.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BgvaXQJe.js";import"./app-bar-profile-button-fX9ZjDv7.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-gd947w-D.js";import"./menu-DvJrPMIi.js";import"./linear-progress-LQTwNhb5.js";import"./list-BpgKZh9Q.js";import"./popover-CSRiiy_0.js";import"./overlay-B2h4Qxq4.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BqxN4Nno.js";import"./avatar-_tf5MHLL.js";import"./icon-button-7uqnM-R4.js";import"./focus-indicator-DXw8Y8hB.js";import"./state-layer-e2HqliqN.js";import"./autocomplete-9DbKVblF.js";import"./label-D3aO7fYn.js";import"./base-field-Yl7ZFpTq.js";import"./text-field-DwmImSRz.js";import"./backdrop-Cg1c1EAF.js";import"./badge-HX1u50aU.js";import"./banner-BIjw6t0q.js";import"./bottom-sheet-DYTrAbYD.js";import"./dialog-CQnnUwcC.js";import"./button-area-C2gDjNuN.js";import"./button-toggle-group-BbkQqF0J.js";import"./button-DjdHdyPs.js";import"./calendar-DKu8VavH.js";import"./card-BVDhRdRu.js";import"./checkbox-DkSrSeYg.js";import"./chip-set-DRKSe1eZ.js";import"./circular-progress-BGFLsmCQ.js";import"./color-picker-B-J8lPc3.js";import"./date-picker-Ba1AFiAq.js";import"./date-range-picker-DDNz9zlb.js";import"./divider-C6x2Y4zt.js";import"./base-drawer-H_Vclf0e.js";import"./drawer-BjRWfJ_i.js";import"./modal-drawer-BJnmvKZk.js";import"./mini-drawer-DKtSVWkH.js";import"./expansion-panel-BMfbZA6r.js";import"./open-icon-DsPX-oJi.js";import"./file-picker-BQZQBeED.js";import"./floating-action-button-Dq7kJ0r0.js";import"./inline-message-Dc9UAs2N.js";import"./key-item-B1zh2ddO.js";import"./keyboard-shortcut-DuA7lCZT.js";import"./label-value-Cmh0Mn7o.js";import"./option-group-DGjhf330.js";import"./meter-group-ChgfAcaY.js";import"./page-state-YGQrPlJV.js";import"./paginator-BzKCwhei.js";import"./radio-group-CfZe5CKe.js";import"./scaffold-cfEljWVV.js";import"./secret-GHv8cWFw.js";import"./select-dropdown-CnynlgeI.js";import"./select-XcCRrPqv.js";import"./skip-link-RZpiaGRp.js";import"./slider-d_t460Iv.js";import"./split-view-K6JudG8W.js";import"./stack-BJH56hig.js";import"./stepper-s7ej1uiZ.js";import"./switch-C6YllzU8.js";import"./table-ysaB0cvj.js";import"./tab-panel-DkDzUyY8.js";import"./time-picker-BegJpIav.js";import"./timestamp-BsHJehpf.js";import"./toast-B-qyNrwk.js";import"./toolbar-Jn4M9HQj.js";import"./tooltip-CFImliAj.js";import"./tree-item-1HwgtKxt.js";import"./view-switcher-CN47hvM5.js";import"./deprecated-icon-button-DD867ZNa.js";import"./split-button-DY1E7kfz.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],qt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,qt as P,m as W};
