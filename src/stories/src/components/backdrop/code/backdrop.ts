export const BackdropCodeHtml = () => {
  return `
<forge-backdrop></forge-backdrop>
`;
};

export const BackdropCodeTs = () => {
  return `
const backdropElement = document.querySelector('forge-backdrop');
backdropElement.addEventListener('forge-backdrop-click', () => console.log('backdrop clicked'));
`;
};

export const BackdropCodeBlazor = () => {
  return `
<ForgeBackdrop OnClickCallback="BackdropClick" />

@code {
  void BackdropClick(EventArgs args)
  {
    Console.WriteLine("backdrop clicked");
  }
}
`;
};
