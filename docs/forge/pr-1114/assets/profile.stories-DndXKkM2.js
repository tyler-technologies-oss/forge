import{b as d}from"./iframe-DUO6sR7Q.js";import{s as u,g as f}from"./utils-JlLG_A5T.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CmOnosOb.js";import"./app-bar-profile-button-CO8kxwLT.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-iDvhFOMC.js";import"./index-DTwfV0k0.js";import"./menu-D699P7oC.js";import"./linear-progress-DJCUZyG6.js";import"./list-DLoQA8Md.js";import"./popover-BblH4OjR.js";import"./overlay-Btn1tEyh.js";import"./skeleton-Ctt20BWR.js";import"./avatar-BhQYIcJ_.js";import"./icon-button-DYBsyh42.js";import"./focus-indicator-CkQ_SLjY.js";import"./state-layer-D0PE-_Ks.js";import"./autocomplete-CGdUJIvk.js";import"./label-DQRW0Ixj.js";import"./button-CGLAKewe.js";import"./button-toggle-group-SwNncGNw.js";import"./checkbox-_NlP9yGR.js";import"./switch-ye0kRd8e.js";import"./base-field-CV5FpTVG.js";import"./text-field-Cg3eNHke.js";import"./backdrop-D_yGNC2E.js";import"./badge-DUdFvMW3.js";import"./banner-GKfCYef5.js";import"./bottom-sheet-Ca7i8NLD.js";import"./dialog-Be0VDz-Q.js";import"./button-area-wPYZxjYM.js";import"./calendar-DCb97I5y.js";import"./card-bhZ9tzd1.js";import"./chip-set-Coz8NKcj.js";import"./circular-progress-CqL7HYv9.js";import"./color-picker-B2ekZest.js";import"./date-picker-nYGFAc3C.js";import"./date-range-picker-BW9tOnhO.js";import"./divider-YmzlOr01.js";import"./base-drawer-BnnNJiqc.js";import"./drawer-Bhr3bs1s.js";import"./modal-drawer-mTx20ZEu.js";import"./mini-drawer-bZpKaAxY.js";import"./expansion-panel-Bav1DQTs.js";import"./open-icon-BRYaepyM.js";import"./file-picker-pdryHIl4.js";import"./floating-action-button-C4yaqB9Y.js";import"./inline-message-CrfY1HGc.js";import"./key-item-DtnAFG5f.js";import"./keyboard-shortcut-k-rw4_gj.js";import"./label-value-BFzJp2nK.js";import"./meter-group-DtsiDCky.js";import"./page-state-FbD8mDEF.js";import"./paginator-qJMQWnwF.js";import"./scaffold-1Jx5bjjO.js";import"./select-dropdown-Crfn3ZA8.js";import"./select-NK-AHuXf.js";import"./skip-link-BP_thUpy.js";import"./slider-205PVp_F.js";import"./split-view-D4l3wHNo.js";import"./stack-DxVg50Xs.js";import"./stepper-DjYTcrV0.js";import"./table-DcZU2XXU.js";import"./tab-bar-xXEJg8yl.js";import"./time-picker-BtDLaNi1.js";import"./toast-C20vBJ8y.js";import"./toolbar-Bf50hayz.js";import"./tooltip-CNBOgnFN.js";import"./tree-item-BN8AUcHM.js";import"./view-switcher-CcYqDgDr.js";import"./deprecated-icon-button-4d4YkvDL.js";import"./split-button-BKXl9zcm.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
