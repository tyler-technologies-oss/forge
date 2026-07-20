import{b as d}from"./iframe-BzlzSqtu.js";import{s as u,g as f}from"./utils-DJhy9_a3.js";import"./service-adapter-8tADcN_b.js";import"./accordion-B7edwTU-.js";import"./app-bar-profile-button-BE7ovXX-.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-C0MPM0Nr.js";import"./menu-DCcpJcs1.js";import"./linear-progress-DLb8lZjg.js";import"./list-BuEi7od1.js";import"./popover-Ci8p4n86.js";import"./overlay-BaGRJgMD.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BE0Hflic.js";import"./avatar-CBh3ICum.js";import"./icon-button-D5gxvJBZ.js";import"./focus-indicator-B2ubMpda.js";import"./state-layer-RJ83GVyt.js";import"./autocomplete-Cl0S1EFS.js";import"./label-DVU9uI27.js";import"./button-CWEBWUbn.js";import"./button-toggle-group-CJp-qOZz.js";import"./checkbox-GwdS8dPX.js";import"./switch-ZSurewEj.js";import"./base-field-CSg8-O_c.js";import"./text-field-7NfOlH-V.js";import"./backdrop-Br-v5NXK.js";import"./badge-B6pdBg_i.js";import"./banner-D9oNdFuq.js";import"./bottom-sheet-CYPNqcjy.js";import"./dialog-BAAkdPx4.js";import"./button-area-BmOa6WaU.js";import"./calendar-BWSUqCJd.js";import"./card-D94hhuCx.js";import"./chip-set-DLzr5L-e.js";import"./circular-progress-C-ps2LNZ.js";import"./color-picker-C9rFup6K.js";import"./date-picker-UsteW1cY.js";import"./date-range-picker-6Tjw52i0.js";import"./divider-U4ZHxLfA.js";import"./base-drawer-DgtNmrYs.js";import"./drawer-BD1OwPL1.js";import"./modal-drawer-BSNPPupX.js";import"./mini-drawer-DLEI9OBr.js";import"./expansion-panel-O6G_XurC.js";import"./open-icon-CemT6_Au.js";import"./file-picker-CPfCeLvj.js";import"./floating-action-button-CR_fWac2.js";import"./inline-message-EO-dHXbB.js";import"./key-item-BPxMng8x.js";import"./keyboard-shortcut-BbSPyLfN.js";import"./label-value-C46r41pN.js";import"./meter-group-X-nOWWcj.js";import"./page-state-BeEclPwI.js";import"./paginator-CvZUjsgF.js";import"./scaffold-B-1oYF3d.js";import"./secret-CxbciRvj.js";import"./select-dropdown-KccT4nNA.js";import"./select-jvZemQ-9.js";import"./skip-link-Dn1FwxWb.js";import"./slider-B9N4tcK5.js";import"./split-view-C4qg2kRN.js";import"./stack-DskzmGQg.js";import"./stepper-C36eIFze.js";import"./table-BlqHJXxY.js";import"./tab-bar-tkQRP9g9.js";import"./time-picker-B2B1KIHx.js";import"./toast-Xc7sWdQT.js";import"./toolbar-CrsK9Ito.js";import"./tooltip-BDnyo0UY.js";import"./tree-item-CC_cz0Qr.js";import"./view-switcher-D_-v7BlW.js";import"./deprecated-icon-button-CnX1bfTm.js";import"./split-button-orCClE2x.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
