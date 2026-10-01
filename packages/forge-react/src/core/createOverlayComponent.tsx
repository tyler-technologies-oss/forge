import React from 'react';
import ReactDOM from 'react-dom';
import { setRef } from './utils.js';

export interface OverlayProps {
  children?: React.ReactNode | boolean;
  open: boolean;
  onDismiss: () => void;
}

export interface IOverlayController<T extends HTMLElement, K> {
  create: (options: K, dismissCallback: () => void) => T;
  show: (element: T) => void;
  hide: (element: T) => void | Promise<void>;
  update?: (element: T, options: K) => void;
}

export const createOverlayComponent = <OverlayComponent extends Record<string, any>, OverlayType extends HTMLElement>(
  controller: IOverlayController<OverlayType, any>
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
  type Props = OverlayComponent & OverlayProps & { forwardedRef?: React.ForwardedRef<OverlayType> };

  class Overlay extends React.Component<Props> {
    public overlay?: OverlayType;
    public el!: HTMLElement;
    public isDismissing = false;

    constructor(props: Props) {
      super(props);
      this.handleDismiss = this.handleDismiss.bind(this);
    }

    public componentDidMount(): void {
      if (this.props.open) {
        this.present();
      }
    }

    public componentWillUnmount(): void {
      if (this.overlay) {
        if (this.overlay.isConnected) {
          this.overlay.remove();
        }
        this.overlay = undefined;
      }
    }

    public handleDismiss(): void {
      if (typeof this.props.onDismiss === 'function') {
        this.props.onDismiss();
      }
      setRef(this.props.forwardedRef, null);
    }

    public shouldComponentUpdate(nextProps: Props): boolean {
      // If the overlay is about to dismiss, make sure we set our dismissing flag
      // to keep rendering the overlay element to allow for animations
      if (this.overlay && nextProps.open !== this.props.open && !nextProps.open) {
        this.isDismissing = true;
      }
      return true;
    }

    public async componentDidUpdate(prevProps: Props): Promise<void> {
      if (prevProps.open !== this.props.open && this.props.open) {
        this.present();
      }

      // Listen for when options changes so we can update the overlay element
      if (controller.update && this.props.open && this.overlay && prevProps.options !== this.props.options) {
        controller.update(this.overlay, this.props);
      }

      if (this.overlay && prevProps.open !== this.props.open && !this.props.open) {
        await controller.hide(this.overlay);
        this.isDismissing = false;
        this.forceUpdate();
      }
    }

    public async present(): Promise<void> {
      this.overlay = controller.create(this.props, this.handleDismiss);

      // We need to force a re-render to use our new overlay element for the portal container
      this.forceUpdate();

      setRef(this.props.forwardedRef, this.overlay);
      await controller.show(this.overlay);
    }

    public render(): React.ReactPortal | null {
      return this.overlay ? ReactDOM.createPortal(this.props.open || this.isDismissing ? this.props.children : null, this.overlay) : null;
    }
  }

  // eslint-disable-next-line arrow-body-style
  return React.forwardRef<OverlayType, Props>((props, ref) => {
    return <Overlay {...props} forwardedRef={ref} />;
  });
};
