import { Directive, ElementRef, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IAppBarComponent } from '@tylertech/forge';

@Directive({
  selector: 'forge-app-bar[href]',
  standalone: false
})
export class AppBarRouterNavigateDirective implements OnInit {
  private _elementRef = inject<ElementRef<IAppBarComponent>>(ElementRef);
  private _router = inject(Router);

  private _listener: (evt: CustomEvent<void>) => void = this._onNavigate.bind(this);

  public ngOnInit(): void {
    this._elementRef.nativeElement.addEventListener('forge-app-bar-navigate' as any, this._listener);
  }

  private _onNavigate(event: CustomEvent<void>): void {
    const target = event.target as HTMLAnchorElement;
    if (!target.href) {
      return;
    }
    event.preventDefault();
    this._router.navigate([target.href]);
  }
}
