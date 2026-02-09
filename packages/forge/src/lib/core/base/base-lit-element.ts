import { LitElement } from 'lit';
import { readoptLitElementStyles } from '../utils/lit-utils.js';

export class BaseLitElement extends LitElement {
  public adoptedCallback(): void {
    readoptLitElementStyles(this);
  }
}
