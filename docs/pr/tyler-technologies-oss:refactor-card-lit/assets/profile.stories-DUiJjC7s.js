import{a as b}from"./index-B-lxVbXh.js";import"./lit-element-B3QVTycr.js";import{x as C}from"./lit-html-CuBe1DX_.js";import{g as y,s as h}from"./utils-BeTmMhVX.js";import"./feature-detection-C61kIZu7.js";import"./accordion-DTtjhfte.js";import"./expansion-panel-ZfR_eNfd.js";import"./index-CiLSBptl.js";import"./app-bar-profile-button-1d3AKy3h.js";import"./state-layer-DA2sYK0k.js";import"./focus-indicator-B_9E-jM6.js";import"./badge-DmYwJsoi.js";import{I}from"./icon-DNSPAaK0.js";import"./menu-CoZTS0u-.js";import{t as v,a as x,b as L,c as P}from"./index-RsKXMDm2.js";import"./linear-progress-Brg7kVg_.js";import"./list-Bo9PHw-V.js";import"./popover-0XUukIs4.js";import"./overlay-CFvbk99I.js";import"./skeleton-Cfb12itF.js";import"./avatar-CawfXDqL.js";import"./icon-button-BgvK8Gih.js";import"./autocomplete-CTBKvGK7.js";import"./label-DX_PQUsn.js";import"./button-Cye3g7s2.js";import"./button-toggle-group-JMDAjILZ.js";import"./checkbox-BwLNDz7l.js";import"./switch-B2m0S8OE.js";import"./base-field-B1mAVOnC.js";import"./text-field-CEd8gOnG.js";import"./backdrop-UaagznG1.js";import"./banner-B5Ju-BdJ.js";import"./bottom-sheet-CP8M8525.js";import"./dialog-BZ1rPOET.js";import"./button-area-BVBZLdAu.js";import"./calendar-DToEQqIV.js";import"./card-DBphJo-Y.js";import"./chip-set-BBO0Yo0Z.js";import"./circular-progress-CbpfkaY8.js";import"./color-picker-CK0Gyhnh.js";import"./date-picker-DRUhx03p.js";import"./date-range-picker-DTqekDmE.js";import"./divider-B48YHESn.js";import"./base-drawer-UQyrssvq.js";import"./drawer-owsZiq0V.js";import"./modal-drawer-DMNToFix.js";import"./mini-drawer-CAhkq0cM.js";import"./file-picker-BIkf71vh.js";import"./floating-action-button-DUUMFA43.js";import"./inline-message-B-l04edk.js";import"./key-item-Drd7rxXP.js";import"./keyboard-shortcut-2NoS7Obq.js";import"./label-value-BkWOzHIE.js";import"./meter-group-B0qUdXfn.js";import"./page-state-CnNv8Q0J.js";import"./paginator-BH2lGCf6.js";import"./scaffold-CWDbFKLY.js";import"./select-dropdown-Xqtu2H2R.js";import"./select-DlJ7FW7W.js";import"./skip-link-sLwxHSrC.js";import"./slider-LZOx81Gr.js";import"./split-view-2CG3xqpk.js";import"./stack-CePCofIq.js";import"./stepper-DSolOj6e.js";import"./table-gbBUUq3q.js";import"./tab-bar-XJJt2SOj.js";import"./time-picker-Cj80-tpm.js";import"./toast-77GARm9c.js";import"./toolbar-CM1YCrRV.js";import"./tooltip-CCMKllfO.js";import"./view-switcher-BmplNyU0.js";import"./deprecated-icon-button-B9bIrvAB.js";import"./split-button-dG9CEZj0.js";const s="forge-app-bar-profile-button",$=b("forge-profile-card-profile"),w=b("forge-profile-card-sign-out");I.define([v,x,L,P]);const B={title:"Components/App Bar/Profile",render:({profileButton:p,profileButtonText:e,signOutButton:t,signOutButtonText:o,open:a,fullName:r,email:i,avatarLetterCount:n=2})=>C`
      <forge-app-bar title-text="Profile">
        <forge-app-bar-profile-button
          slot="end"
          @forge-profile-card-profile=${$}
          @forge-profile-card-sign-out=${w}
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
    `,component:s,argTypes:{...y({tagName:s,exclude:["avatarIcon","avatarImageUrl","avatarText","popupElement","profileCardBuilder"]})},args:{email:"first.last@tylertech.com",fullName:"First Last",open:!1,profileButton:!1,signOutButton:!0}},l={},m={...h,render:()=>{function p(){const t=document.createElement("forge-list");return t.addEventListener("forge-list-item-select",({detail:o})=>{console.log("[profile-card] Selected custom item:",o.value)}),t.style.setProperty("--forge-list-padding","0"),t.appendChild(document.createElement("forge-divider")),t.appendChild(e("My Reports","assignment","reports")),t.appendChild(e("My Workflow","work_outline","workflow")),t.appendChild(e("My Alerts","warning","alerts")),t.appendChild(e("My Preferences","settings","preferences")),t}function e(t,o,a){const r=document.createElement("forge-list-item");r.value=a;const i=document.createElement("forge-icon");i.slot="leading",i.name=o,r.appendChild(i);const n=document.createElement("button");return n.type="button",n.innerText=t,r.appendChild(n),r}return C`
      <forge-app-bar title-text="Profile With Custom Content">
        <forge-app-bar-profile-button slot="end" full-name="First Last" email="first.last@email.com" .profileCardBuilder=${p}>
        </forge-app-bar-profile-button>
      </forge-app-bar>
    `}};var d,c,u;l.parameters={...l.parameters,docs:{...(d=l.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(u=(c=l.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var f,g,E;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
  ...standaloneStoryParams,
  render: () => {
    function builder() {
      const listElement = document.createElement('forge-list');
      listElement.addEventListener('forge-list-item-select', ({
        detail
      }) => {
        console.log('[profile-card] Selected custom item:', detail.value);
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
}`,...(E=(g=m.parameters)==null?void 0:g.docs)==null?void 0:E.source}}};const M=["Demo","WithCustomContent"],Qt=Object.freeze(Object.defineProperty({__proto__:null,Demo:l,WithCustomContent:m,__namedExportsOrder:M,default:B},Symbol.toStringTag,{value:"Module"}));export{l as D,Qt as P,m as W};
