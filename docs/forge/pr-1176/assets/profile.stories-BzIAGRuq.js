import{b as d}from"./iframe-BhK0cOWW.js";import{s as u,g as f}from"./utils-CCSzXMC0.js";import"./service-adapter-8tADcN_b.js";import"./accordion-BRdNQYdD.js";import"./app-bar-profile-button-b9jaTsfB.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-D2d9_cUK.js";import"./menu-f0usgW17.js";import"./linear-progress-DLb8lZjg.js";import"./list-DliWSL65.js";import"./popover-RdTjaaWq.js";import"./overlay-BUwiotyV.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-jvDFel5Y.js";import"./avatar-DEwx1SfH.js";import"./icon-button-qZQTjUiV.js";import"./focus-indicator-CudRM6ZX.js";import"./state-layer-cKdDztbm.js";import"./autocomplete-DnGGcPXK.js";import"./label-YWi1B70Y.js";import"./button-Db24jlQk.js";import"./button-toggle-group-CZFL1Ntf.js";import"./checkbox-CSxhwcLK.js";import"./switch-Bv3dUswh.js";import"./base-field-8DknNgVO.js";import"./text-field-DYtRboDF.js";import"./backdrop-Br-v5NXK.js";import"./badge-C8MtQ_NJ.js";import"./banner-DnyNpnVF.js";import"./bottom-sheet-DW0bVRhV.js";import"./dialog-d1olEQgx.js";import"./button-area-Cdmo8I7N.js";import"./calendar-B9YkXU1S.js";import"./card--82LJzjK.js";import"./chip-set-BdpxUNqv.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-BRfO8aMA.js";import"./date-picker-Ct2CR7jY.js";import"./date-range-picker-DTq4zZvU.js";import"./divider-mKuI6uTW.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-Bk4QKaOa.js";import"./modal-drawer-CinZNACQ.js";import"./mini-drawer-DpFIFw8V.js";import"./expansion-panel-7hnlznsr.js";import"./open-icon-Bt0t9qIS.js";import"./file-picker-CXIIpl0l.js";import"./floating-action-button-Y9_LOM-y.js";import"./inline-message-EO-dHXbB.js";import"./key-item-Nb9D2L8z.js";import"./keyboard-shortcut-Cc2laHQQ.js";import"./label-value-C46r41pN.js";import"./meter-group-D2qk4w2O.js";import"./page-state-BeEclPwI.js";import"./paginator-CKn102FR.js";import"./scaffold-B-1oYF3d.js";import"./secret-sNsBN_cf.js";import"./select-dropdown-R1lcjpLg.js";import"./select-0wczanmp.js";import"./skip-link-C3pKafzz.js";import"./slider-Bit6Xbev.js";import"./split-view-Bxes9hU9.js";import"./stack-DskzmGQg.js";import"./stepper-DO4lsU3d.js";import"./table-vE6Hhona.js";import"./tab-bar-BN1WDMKT.js";import"./time-picker-DC4RF_4H.js";import"./timeline-break-Dw9Bwf2E.js";import"./toast-Cas63X3D.js";import"./toolbar-uWEWbS3i.js";import"./tooltip-DkiBleqD.js";import"./tree-item-Bcv1g6Lo.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-DDcllJl4.js";import"./split-button-CwmBLkjO.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
