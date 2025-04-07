import { LitElement } from 'lit';
import { readoptLitElementStyles } from '../utils/lit-utils';

export class BaseLitElement extends LitElement {
  public adoptedCallback(): void {
    readoptLitElementStyles(this);
  }
}
