export const DrawerModalCodeHtml = () => {
  return `<forge-modal-drawer></forge-modal-drawer>`;
};

export const DrawerModalCodeTs = () => {
  return `
const drawer = document.querySelector('forge-modal-drawer');
drawer.addEventListener('forge-modal-drawer-close', evt => console.log(evt));
  `;
}