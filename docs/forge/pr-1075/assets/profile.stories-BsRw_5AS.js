import{b as d}from"./iframe-Cyv46XVN.js";import{s as u,g as f}from"./utils-DJF5Ajxq.js";import"./service-adapter-8tADcN_b.js";import"./accordion-DCRACpP9.js";import"./app-bar-profile-button-BcsoOtOP.js";import"./state-layer-D_bEeiyc.js";import"./focus-indicator-C-z2W46n.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-DG1d6qey.js";import"./index-DTwfV0k0.js";import"./menu-BaqIo4hA.js";import"./linear-progress-CYTe6uKP.js";import"./list-D1-mbE3Z.js";import"./popover-CNAMd9T5.js";import"./overlay-CvFTNDO2.js";import"./skeleton-B7Zw5LdQ.js";import"./avatar-DB5sNku1.js";import"./icon-button-DK-pXUTf.js";import"./autocomplete-D1lyo7ZT.js";import"./label-B2ax5rCu.js";import"./button-C96CRxyU.js";import"./button-toggle-group-UdFav8AG.js";import"./checkbox-BhOjWX0A.js";import"./switch-BFpDUx7m.js";import"./base-field-Ceq62_8W.js";import"./text-field-UfdiVXRn.js";import"./backdrop-TsivOJBj.js";import"./badge-CxxISyUi.js";import"./banner-DtdDHhAK.js";import"./bottom-sheet-C-Lkmp9F.js";import"./dialog-Ck64qUvQ.js";import"./button-area-fHH_3nqW.js";import"./calendar-AWZh0mtr.js";import"./card-C0O6oq61.js";import"./chip-set-CXthJLc0.js";import"./circular-progress-D8W_v512.js";import"./color-picker-tmE8lYWT.js";import"./date-picker-anY75Xir.js";import"./date-range-picker-DFPZD08i.js";import"./divider-BL37Lb2g.js";import"./base-drawer-BOH6KPhP.js";import"./drawer-DqRX_445.js";import"./modal-drawer-UtKsh6g7.js";import"./mini-drawer-CjKFhsAv.js";import"./expansion-panel-Ddnhu1du.js";import"./open-icon-zfnrNF6k.js";import"./file-picker-CvgXvrkt.js";import"./floating-action-button-DzDGDkTB.js";import"./inline-message-CbmpByuI.js";import"./key-item-4LL-AQcu.js";import"./keyboard-shortcut-CWcwLsK9.js";import"./label-value-ChKN0id0.js";import"./meter-group-CrteQpKi.js";import"./page-state-mAXa5csm.js";import"./paginator-CweY9_OZ.js";import"./scaffold-BiMWLKK6.js";import"./select-dropdown-BdWVo3QP.js";import"./select-DcFnC02M.js";import"./skip-link-BxbePR3h.js";import"./slider-GW1Cg65L.js";import"./split-view-CE_Yy9Cb.js";import"./stack-DCH7zCMl.js";import"./stepper-PXgoezKg.js";import"./table-BfpeCNh1.js";import"./tab-bar-CoFb77rk.js";import"./time-picker-Cv2kL6ge.js";import"./toast-CQb8-zr_.js";import"./toolbar-DJfFE6T6.js";import"./tooltip-BQwGelzj.js";import"./tree-item-8yWHzoph.js";import"./view-switcher-ip2Cf1MD.js";import"./deprecated-icon-button-BDBrWka0.js";import"./split-button-Cu1RAOqE.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
