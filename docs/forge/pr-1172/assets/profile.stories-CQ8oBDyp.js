import{b as d}from"./iframe-DQLkTsj5.js";import{s as u,g as f}from"./utils-RooUwGan.js";import"./service-adapter-DlT-lJx7.js";import"./accordion-BjYzWZHq.js";import"./app-bar-menu-button-Ds3KQZba.js";import"./app-bar-profile-button-6E85qYm4.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DPuUJ4cJ.js";import"./menu-Cx7fFLhB.js";import"./linear-progress-VpC6qUWa.js";import"./list-nmWb3pVb.js";import"./popover-TR9PPKD2.js";import"./overlay-DGZ2XdhX.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-CwILcSG1.js";import"./list-item-DEpPizi1.js";import"./avatar-Ckf838TB.js";import"./icon-button-CMY5cmct.js";import"./autocomplete-CAUXEvuO.js";import"./label-CR5s3CYN.js";import"./base-field-SrDjUvEH.js";import"./focus-indicator-BzR77xDT.js";import"./text-field-L_Zp44sz.js";import"./backdrop-Dvs4MPLP.js";import"./badge-B-qmCmuX.js";import"./banner-U_DSUf8c.js";import"./bottom-sheet-D2WGIiuu.js";import"./dialog-D41xgR_D.js";import"./button-area-BpbOE84b.js";import"./button-toggle-group-BLLXbdPl.js";import"./button-DT_Na7FY.js";import"./calendar-Dbz0p-_z.js";import"./card-C3gFyNEB.js";import"./checkbox-BzNarstH.js";import"./chip-set-BDBdgkKU.js";import"./state-layer-Y1FZSPuC.js";import"./circular-progress-BL_OHw4o.js";import"./color-picker-4Nou3L92.js";import"./date-picker-CULUToRd.js";import"./date-range-picker-C1fPtKWK.js";import"./divider-Au3xwmhZ.js";import"./base-drawer-C3RB7KRX.js";import"./drawer-seV_42ug.js";import"./modal-drawer-DW4U7DBA.js";import"./mini-drawer-Bw1AxUWG.js";import"./expansion-panel-zjQkefOT.js";import"./open-icon-DJjxABQQ.js";import"./file-picker-kQziegkh.js";import"./floating-action-button-h_wnpdNd.js";import"./inline-message-BXrlbIvc.js";import"./key-item-DZO5-Ix4.js";import"./keyboard-shortcut-BQdfizK8.js";import"./label-value-CDNJ622N.js";import"./meter-group-DeziYYvE.js";import"./page-state-C_fHeyC9.js";import"./paginator-CTj70Paf.js";import"./radio-group-CJOj088f.js";import"./scaffold-D8DtzjhO.js";import"./secret-7GNs9ipI.js";import"./select-dropdown-DsNzj9e7.js";import"./select-B0NkVT0c.js";import"./skip-link-B5qLZQY7.js";import"./slider-ChtR0ADE.js";import"./split-view-Bgogid_L.js";import"./stack-E4V9OTtJ.js";import"./stepper-wDG6cdAU.js";import"./switch-CL40Kqds.js";import"./table-DzZfPIf7.js";import"./tab-panel-V6bq_68y.js";import"./time-picker-CLcgtLTB.js";import"./timestamp-BQbg-_n4.js";import"./toast-Cr3vq2QO.js";import"./toolbar-Bm2frJkv.js";import"./tooltip-DF8jbOdo.js";import"./tree-item-CmGis0W2.js";import"./view-switcher-A6YmNtwM.js";import"./deprecated-icon-button-B8C2UfA9.js";import"./split-button-BC_G3O6m.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
}`,...m.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Gt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{l as D,Gt as P,m as W};
