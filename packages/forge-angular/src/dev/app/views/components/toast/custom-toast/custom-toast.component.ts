import { Component, inject } from '@angular/core';
import { ToastConfig } from '@tylertech/forge-angular';

@Component({
  selector: 'app-custom-toast',
  templateUrl: './custom-toast.component.html',
  styleUrls: ['./custom-toast.component.scss'],
  standalone: false
})
export class CustomToastComponent {
  private _toastConfig = inject(ToastConfig);

  public message = 'custom-toast works!';

  constructor() {
    const toastConfig = this._toastConfig;

    if (toastConfig && toastConfig.data && toastConfig.data.message) {
      this.message = toastConfig.data.message;
    }
  }
}
