const t=document.querySelector("forge-button"),e=document.querySelector("forge-busy-indicator");t?.addEventListener("click",()=>{e&&(e.open=!0,setTimeout(()=>{e.open=!1},3e3))});
