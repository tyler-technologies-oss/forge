export const PopupDefaultTs = () => `
const popup = document.createElement('forge-popup');
popup.targetElement = document.getElementById('some-element-id');
popup.innerHTML = \`<div>Popup Content</div>\`;
popup.open = true;
`;
