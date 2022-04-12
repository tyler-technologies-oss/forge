export const DrawerModalCodeHtml = () => {
  return `<forge-modal-drawer></forge-modal-drawer>`;
};

export const DrawerModalCodeTs = () => {
  return `const drawer = document.querySelector('forge-modal-drawer');
drawer.addEventListener('forge-modal-drawer-close', closeHandler) // update drawer state`
}

// TODO: The `DrawerClosedCallback` may need to be renamed.
// need someone who uses Blazor to verify.
export const DrawerModalCodeBlazor = () => {
  return `<ForgeModalDrawer DrawerClosedCallback="DrawerClosed" />
  
@code {
  void DrawerClosed() {
    Console.WriteLine("Drawer Closed");
  }
}`;
};
