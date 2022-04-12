export const BusyIndicatorDefaultCodeTs = () => `
const busyIndicator = document.createElement('forge-busy-indicator');
busyIndicator.titleText = 'Title';
busyIndicator.message = 'Message text...';
document.body.appendChild(busyIndicator);
`;

export const BusyIndicatorDefaultCodeBlazor = () => `
@inject ForgeBusyIndicator ForgeBusyIndicator

@code {
  void Show() {
    ForgeBusyIndicator.Show("Title", "Message Text...");
  }
}
`;
