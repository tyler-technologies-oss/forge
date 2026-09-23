import{b as d}from"./iframe-CCQPwMqK.js";import{s as u,g as f}from"./utils-71auwco3.js";import"./service-adapter-DlT-lJx7.js";import"./accordion-DPyFEc5Q.js";import"./app-bar-menu-button-CKzj1r2k.js";import"./app-bar-profile-button-B1vK_dhd.js";import{I as g,a as E,b,c as C,d as y}from"./tyler-icons-D_P4inVM.js";import"./menu-sl54LpTS.js";import"./linear-progress-Du-Ntegu.js";import"./list-DoWEQWCg.js";import"./popover-avDoFPUj.js";import"./overlay-ejBQU7cY.js";import"./key-action-lsAysfb-.js";import"./index-5CPwzmQS.js";import"./skeleton-BMUbeM10.js";import"./list-item-BE2FE9nz.js";import"./avatar-B8zO7L0B.js";import"./icon-button-CCm6VdsQ.js";import"./autocomplete-BEDAHktv.js";import"./label-B4HdJcCr.js";import"./base-field-D9i8FqrF.js";import"./focus-indicator-CoBrh689.js";import"./text-field-mdAFESNO.js";import"./backdrop-e4rWKi0D.js";import"./badge-vZbBLVs6.js";import"./banner-CFrstKct.js";import"./bottom-sheet-FmCzKL6a.js";import"./dialog-jSj7mubX.js";import"./button-area-CVtsKOdv.js";import"./button-toggle-group-CuulJVQt.js";import"./button-CArgg2AW.js";import"./calendar-BKpJ_GDn.js";import"./card-BOT7vSRz.js";import"./checkbox-DOBQJUdK.js";import"./chip-set-C28H1EOM.js";import"./state-layer-BcVD1OXH.js";import"./circular-progress-QjF0OwOx.js";import"./color-picker-Cn6hwXqE.js";import"./date-picker-C1F7X9h7.js";import"./date-range-picker-CBKYcM56.js";import"./divider-CYyN_dy_.js";import"./base-drawer-C3RB7KRX.js";import"./drawer-C4w9_Owc.js";import"./modal-drawer-CG9TO9xg.js";import"./mini-drawer-B5rmf2t_.js";import"./expansion-panel-BGnV8huK.js";import"./open-icon-DhgksudA.js";import"./file-picker-CAPVga5k.js";import"./floating-action-button-BTfaMa44.js";import"./inline-message-D6TY8UzG.js";import"./key-item-C5sD9dLV.js";import"./keyboard-shortcut-Cm4Nksqt.js";import"./label-value-Cs0_BMQ9.js";import"./listbox-C7EIxqca.js";import"./meter-group-D2ztSBQk.js";import"./page-state-C_fu_Hm3.js";import"./paginator-CGiJXl49.js";import"./radio-group-Dx1J_ymN.js";import"./scaffold-C8LskKFX.js";import"./secret-BFKNX6K4.js";import"./option-DxLPA5Op.js";import"./select-dropdown-D5GhW_FN.js";import"./select-DFCfpj9W.js";import"./skip-link-DiJI6cl3.js";import"./slider-DSWx32a_.js";import"./split-view-BCDVwKfV.js";import"./stack-Grf8E1p3.js";import"./stepper-CkXUsgpf.js";import"./switch-Crd9jino.js";import"./table-BSvq45VP.js";import"./tab-panel-CDwwet2g.js";import"./time-picker-Jd52_qXw.js";import"./timestamp-9utdnwwG.js";import"./toast-DLrW0xgD.js";import"./toolbar-CtUE-sqJ.js";import"./tooltip-BwyfwMmY.js";import"./tree-item-C4PlwyAO.js";import"./view-switcher-Cw3vuBIn.js";import"./deprecated-icon-button-LKu6YyLo.js";import"./split-button-C27YHtIS.js";const{action:c}=__STORYBOOK_MODULE_ACTIONS__,s="forge-app-bar-profile-button",I=c("forge-profile-card-profile"),h=c("forge-profile-card-sign-out");g.define([E,b,C,y]);const v={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>d`
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
  `,component:s,argTypes:{...f({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},m={},l={...u,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.warn("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return d`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"{}",...m.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const L=["Demo","WithCustomContent"],Qt=Object.freeze(Object.defineProperty({__proto__:null,Demo:m,WithCustomContent:l,__namedExportsOrder:L,default:v},Symbol.toStringTag,{value:"Module"}));export{m as D,Qt as P,l as W};
