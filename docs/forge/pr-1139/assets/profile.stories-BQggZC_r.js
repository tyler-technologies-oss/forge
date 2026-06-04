import{b as d}from"./iframe-6gafHklC.js";import{s as u,g as f}from"./utils-Cl3lyYep.js";import"./service-adapter-8tADcN_b.js";import"./accordion-CAvvf3lh.js";import"./app-bar-profile-button-Bys-Demq.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DzcTIhOC.js";import"./menu-WGOO6K2U.js";import"./linear-progress-DLb8lZjg.js";import"./list-C36IZ85R.js";import"./popover-DcPFwGot.js";import"./overlay-DZC8FH2Q.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-jvDFel5Y.js";import"./avatar-BoWMzO6z.js";import"./icon-button-BegYxAOA.js";import"./focus-indicator-hqe8KJwu.js";import"./state-layer-cKdDztbm.js";import"./autocomplete-Dh_-O_Aq.js";import"./label-B1sJ7Bei.js";import"./button-CAQv7mVT.js";import"./button-toggle-group-DRtcgfym.js";import"./checkbox-CwIzzMdX.js";import"./switch-BFthGsVb.js";import"./base-field-pDXaXR5W.js";import"./text-field-Ugz_STLH.js";import"./backdrop-Br-v5NXK.js";import"./badge-l0djruga.js";import"./banner-DJmZRMIF.js";import"./bottom-sheet-DW0bVRhV.js";import"./dialog-d1olEQgx.js";import"./button-area-Coz2WyEN.js";import"./calendar-BZ0hHxwi.js";import"./card-DMqsB806.js";import"./chip-set-C9WGyAAV.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-CR_qIOsi.js";import"./date-picker-BBpMBjWX.js";import"./date-range-picker-D_XIDWm4.js";import"./divider-BpC1GpZC.js";import"./base-drawer-BC4bCWjj.js";import"./drawer-Bk4QKaOa.js";import"./modal-drawer-CinZNACQ.js";import"./mini-drawer-DpFIFw8V.js";import"./expansion-panel-Do-1e39R.js";import"./open-icon-py5c7fNp.js";import"./file-picker-hDmPBajQ.js";import"./floating-action-button-B0imavsF.js";import"./inline-message-EO-dHXbB.js";import"./key-item-CIBwYPnm.js";import"./keyboard-shortcut-BNlC2P8J.js";import"./label-value-C46r41pN.js";import"./meter-group-uMJfXvIE.js";import"./page-state-BeEclPwI.js";import"./paginator-B_XfXEQ-.js";import"./scaffold-B-1oYF3d.js";import"./secret-DaYahPos.js";import"./select-dropdown-BUqH9-J3.js";import"./select-BsRI1r53.js";import"./skip-link-Dpn4TY8y.js";import"./slider-CgMJ4NLt.js";import"./split-view-CHcdQn1A.js";import"./stack-DskzmGQg.js";import"./stepper-vOePu5wc.js";import"./table-D5x2Mdmm.js";import"./tab-bar-Bqy2XeN9.js";import"./time-picker-BAm4l1Wp.js";import"./toast-DmQXweeN.js";import"./toolbar-CAfdI-yT.js";import"./tooltip-BTdo6aDV.js";import"./tree-item-w3uCRIFs.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-yMRmUuPs.js";import"./split-button-CdlbhfyG.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
