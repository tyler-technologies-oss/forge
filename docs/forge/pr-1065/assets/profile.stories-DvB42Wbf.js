import{b as d}from"./iframe-CskTT7ts.js";import{s as u,g as f}from"./utils-CbU1ENex.js";import"./service-adapter-CffG5Lhq.js";import"./accordion-D8n3fbCt.js";import"./expansion-panel-huBiB0DZ.js";import"./open-icon-BIuINibX.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-BoTxVLz8.js";import"./state-layer-DGD4bZzf.js";import"./focus-indicator-D-lQFdGQ.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-CBdZU-Tr.js";import"./menu-C6nMW0Tz.js";import"./linear-progress-CpNoMDP5.js";import"./list-DLtw5epo.js";import"./popover-D2EVteKl.js";import"./overlay-B2P-gJmC.js";import"./skeleton-C3LWj3F7.js";import"./avatar-CdkzLDyt.js";import"./icon-button-zpl7wQaZ.js";import"./autocomplete-6hIApqmg.js";import"./label-DrJN2C5E.js";import"./button-BABmEJ_8.js";import"./button-toggle-group-zaT0zJiE.js";import"./checkbox-DELXRA72.js";import"./switch-zkh9rIQ8.js";import"./base-field-B9Bc2PKe.js";import"./text-field-ZtSDIfll.js";import"./backdrop-CaFxRXEM.js";import"./badge-DbymPG3K.js";import"./banner-BAJ5SISV.js";import"./bottom-sheet-9RBhFU7Z.js";import"./dialog-CGP43TQA.js";import"./button-area-CApymC4g.js";import"./calendar-BvR3wgP6.js";import"./card-_1qFMg5x.js";import"./chip-set-bUWYBRUk.js";import"./circular-progress-C2aFmJj-.js";import"./color-picker-CzZGmap-.js";import"./date-picker-DNCPrlT6.js";import"./date-range-picker-oW4s5-P0.js";import"./divider-Dq-Slgl_.js";import"./base-drawer-CNdRFpRQ.js";import"./drawer-D79-TANn.js";import"./modal-drawer-DO8CNRCC.js";import"./mini-drawer-CPIvZj6f.js";import"./file-picker-MGvN7yMx.js";import"./floating-action-button-vPlyWO4R.js";import"./inline-message-kV-z6eDt.js";import"./key-item-BLr4yy4J.js";import"./keyboard-shortcut-48xwLAq2.js";import"./label-value-CmUo1iy-.js";import"./meter-group-BDGN-sMF.js";import"./page-state-CSOfrMln.js";import"./paginator-BPp8UVAe.js";import"./scaffold-CspBWUuL.js";import"./select-dropdown-Ca3Dg-uQ.js";import"./select-CXl_kzzN.js";import"./skip-link-DJ8nj4wc.js";import"./slider-CdxGdWQd.js";import"./split-view-DTztODcl.js";import"./stack-B5sNQmDm.js";import"./stepper-XlHrKuYI.js";import"./table-yzjJGpe6.js";import"./tab-bar-DalGZ9xP.js";import"./time-picker-Cj4YS3Pd.js";import"./toast-6Vom5Gl0.js";import"./toolbar-DM62Euqg.js";import"./tooltip-DxbQteKS.js";import"./tree-item-BhyCeE2C.js";import"./view-switcher-BguW3JYm.js";import"./deprecated-icon-button-BHAeF3fK.js";import"./split-button-D3oQNDfu.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
