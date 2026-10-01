document.addEventListener("forge-listbox-drop",(t=>{const r=t.target,n=t.detail.group??r,{option:e,index:i}=t.detail,o=n.children[i];o!==e&&(e.parentElement?.removeChild(e),n.insertBefore(e,o))}));
