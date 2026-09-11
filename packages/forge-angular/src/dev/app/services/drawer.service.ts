import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private _open = signal(true);
  public open = this._open.asReadonly();

  private _displayDrawerToggle = signal(true);
  public displayDrawerToggle = this._displayDrawerToggle.asReadonly();

  constructor() {}

  public openDrawer(): void {
    this._open.set(true);
  }

  public closeDrawer(): void {
    this._open.set(false);
  }

  public toggleDrawer(): void {
    this._open.update(open => !open);
  }

  public showDrawerToggle(): void {
    this._displayDrawerToggle.set(true);
  }

  public hideDrawerToggle(): void {
    this._displayDrawerToggle.set(false);
  }
}
