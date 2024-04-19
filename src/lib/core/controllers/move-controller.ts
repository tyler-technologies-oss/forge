import { WithMoveable } from '../mixins/interactions/moveable/with-moveable';

export interface IMoveControllerConfig {
  handleElement: HTMLElement;
  surfaceElement: HTMLElement;
  onMoveStart(): boolean;
  onMove(position: { x: number; y: number }): boolean;
  onMoveEnd(): void;
}

const MoveBase = WithMoveable(Object);

export class MoveController extends MoveBase {
  constructor(private _config: IMoveControllerConfig) {
    super();
    this._startMoveListener();
  }

  public destroy(): void {
    this._stopMoveListener();
    super.stopMoveListener();
  }

  protected _getMoveableBounds(): DOMRect {
    return this._config.surfaceElement.getBoundingClientRect();
  }

  protected _updatePosition(x: string | null, y: string | null): void {
    this._config.surfaceElement.style.top = y != null ? y : '';
    this._config.surfaceElement.style.left = x != null ? x : '';
  }

  protected _onMoveStart(): boolean {
    return this._config.onMoveStart();
  }

  protected _onMove(position: { x: number; y: number }): boolean {
    return this._config.onMove(position);
  }

  protected _onMoveEnd(): void {
    this._config.onMoveEnd();
  }

  private _startMoveListener(): void {
    this._config.handleElement.addEventListener('pointerdown', this._movePointerDownListener);
  }

  private _stopMoveListener(): void {
    this._config.handleElement.removeEventListener('pointerdown', this._movePointerDownListener);
  }
}
