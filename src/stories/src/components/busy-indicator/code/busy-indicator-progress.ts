export const BusyIndicatorProgressCodeTs = () => `
const busyElement = document.createElement('forge-busy-indicator');
busyElement.titleText = 'Uploading';
busyElement.message = 'Your document is being uploaded...'
busyElement.spinner = false;
busyElement.progressBar = true;
busyElement.progressBarDeterminate = true;
busyElement.buffer = 1;
busyElement.cancel = true;

document.body.appendChild(busyElement);

// This is here to simulate updating the progress in response to upload status
const progressInterval = setInterval(() => {
  busyElement.progress += 0.01
  if (busyElement.progress > 1) {
    busyElement.hide(true);
    clearInterval(progressInterval);
  }
}, 50);

// Respond to the cancel button click event
busyElement.addEventListener('forge-busy-indicator-cancel', () => {
  clearInterval(progressInterval);
  setTimeout(() => busyElement.hide(), 1000);
});
`;

