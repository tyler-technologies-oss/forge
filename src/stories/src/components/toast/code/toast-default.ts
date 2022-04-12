export const ToastDefaultHtml = () => `
<forge-button>
    <button>Show toast</button>
</forge-button>
`;

export const ToastDefaultTs = () => `
const toast = document.createElement('forge-toast');
toast.message = 'Save successful.';
document.body.appendChild(toast);
`;

export const ToastDefaultBlazor = () => `
@inject ForgeToast ForgeToast

<ForgeButton OnClickCallback="OnClick">Show toast</ForgeButton>

@code {
  void OnClick(MouseEventArgs args)
  {
    ForgeToast.Show("Save successful.");
  }
}
`;
