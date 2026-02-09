import{b as d}from"./iframe-C59kGrZS.js";import{s as u,g as f}from"./utils-C8r5kb6v.js";import"./service-adapter-CffG5Lhq.js";import"./accordion-BbIQ9d_o.js";import"./expansion-panel-D1y0KEEj.js";import"./open-icon-BK25xsdk.js";import"./index-DTwfV0k0.js";import"./app-bar-profile-button-iS-G50gm.js";import"./state-layer-u9rLNX9t.js";import"./focus-indicator-CcblENpV.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-B0WPf66k.js";import"./menu-Y_IBkdk1.js";import"./linear-progress-CsYLd0m5.js";import"./list-W62pTBYF.js";import"./popover-oAFRtu_9.js";import"./overlay-BhwPRyah.js";import"./skeleton-DllEP8un.js";import"./avatar-zpoj8KJW.js";import"./icon-button-DlkFfYJR.js";import"./autocomplete-EWepZoEN.js";import"./label-BeqvASeS.js";import"./button-CJiBebGB.js";import"./button-toggle-group-D5W7BKmk.js";import"./checkbox-MvCMF9O-.js";import"./switch-CAkpXHuZ.js";import"./base-field-B_OzG14Y.js";import"./text-field-HwCw5WeW.js";import"./backdrop-ZqVEdIYI.js";import"./badge-gFvB_o_G.js";import"./banner-Cl-5xxvF.js";import"./bottom-sheet-DeyRABAG.js";import"./dialog-Dic_j1BD.js";import"./button-area-RNjIJFJV.js";import"./calendar-6hdqBSc0.js";import"./card-D-xhIFNO.js";import"./chip-set-3q_ww13H.js";import"./circular-progress-Ctu3rS_y.js";import"./color-picker-Dsz7r7Op.js";import"./date-picker-C1HGdKuo.js";import"./date-range-picker-FNZCYpoD.js";import"./divider-DtS4IZ9-.js";import"./base-drawer-DUX87HBk.js";import"./drawer-eo8EwIfW.js";import"./modal-drawer-BrDtoKSB.js";import"./mini-drawer-B6eLxgR7.js";import"./file-picker-dmpLi4zJ.js";import"./floating-action-button-C-VmalWb.js";import"./inline-message-BmHmX7vQ.js";import"./key-item-Cd5JXtiH.js";import"./keyboard-shortcut-C5gmWfMz.js";import"./label-value-D-KSqHDU.js";import"./meter-group-C0v6KkZy.js";import"./page-state-BU7mMB2L.js";import"./paginator-l9M4WBRf.js";import"./scaffold-B_qTjcmL.js";import"./select-dropdown-seXoJcwa.js";import"./select-uCn_cZ7s.js";import"./skip-link-T2t2ZWGH.js";import"./slider-BlJURpwj.js";import"./split-view-CLe3FBl7.js";import"./stack-D2V5d6LJ.js";import"./stepper-D3H_bEHC.js";import"./table-B5jS9bqY.js";import"./tab-bar-C_FGNLaT.js";import"./time-picker-Dy_lG0uS.js";import"./toast-DASyizqR.js";import"./toolbar-BK4uxBaY.js";import"./tooltip-D8ywo7jr.js";import"./tree-item-DpLrIYZe.js";import"./view-switcher-BOebY1Oz.js";import"./deprecated-icon-button-BmmmeZmP.js";import"./split-button-BDUc2CbL.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
