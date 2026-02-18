import { MessageListEntry } from './message-list-entry.js';

/**
 * Represents a message list of any type. This class can be used to attach a string message to
 * a generic identifier.
 */
export class MessageList<T> {
  private _messages: Array<MessageListEntry<T>>;
  private _useAutoEllipsis = true;

  /**
   * True if ellipsis management occurs automatically. Default is true.
   */
  public get useAutoEllipsis(): boolean {
    return this._useAutoEllipsis;
  }

  public set useAutoEllipsis(value: boolean) {
    this._useAutoEllipsis = value;
    this._updateMessage();
  }

  /**
   * The message that is made up of all messages in the entries.
   */
  public message: string;

  constructor(useAutoEllipsis: boolean = true) {
    this._useAutoEllipsis = useAutoEllipsis;
    this.reset();
  }

  /**
   * Adds a message to the entry map.
   * @param {string} message The message string.
   * @param {T} identifier The message identifier.
   * @returns {MessageList<T>} A reference to `this` for chaining.
   */
  public add(message: string, identifier: T): MessageList<T> {
    this._messages.push(new MessageListEntry<T>(message, identifier));
    this._updateMessage();
    return this;
  }

  /**
   * Removes a message using the provided identifier.
   * @param {T} identifier The message identifier.
   * @returns {MessageList<T>} A reference to `this` for chaining.
   */
  public remove(identifier: T): MessageList<T> {
    const index = this._getMessageIndex(identifier);
    if (index >= 0) {
      this._messages.splice(index, 1);
      this._updateMessage();
    }

    return this;
  }

  /**
   * Updates an existing message value.
   * @param {string} message The message string.
   * @param {T} identifier The existing message identifier.
   * @returns {MessageList<T>} A reference to `this` for chaining.
   */
  public update(message: string, identifier: T): MessageList<T> {
    const index = this._getMessageIndex(identifier);
    if (index >= 0) {
      this._messages[index].message = message;
      this._updateMessage();
    }

    return this;
  }

  /**
   * Gets the number of messages in the list.
   * @returns {number}
   */
  public get messageCount(): number {
    return this._messages.length;
  }

  /**
   * Resets the message list to it's original state and removes all messages.
   */
  public reset(): void {
    this._messages = [];
    this.message = '';
  }

  /**
   * Determines if a message with the provided identifier exists.
   * @param {T} identifier The message identifier.
   */
  public hasMessage(identifier: T): boolean {
    return this._getMessageIndex(identifier) >= 0;
  }

  private _updateMessage(): MessageList<T> {
    this.message = '';

    this._messages.forEach((item, index) => {
      if (this.useAutoEllipsis) {
        const hasEllipsis = item.message.substr(item.message.length - 3) === '...';

        if (index === this._messages.length - 1) {
          if (!hasEllipsis) {
            item.message += '...';
          }
        } else if (hasEllipsis) {
          item.message = item.message.substr(0, item.message.length - 3);
        }
      } else {
        item.message = item.originalMessage;
      }

      this.message += item.message + (index < this._messages.length - 1 ? ', ' : '');
    });

    return this;
  }

  private _getMessageIndex(identifier: T): number {
    let index = -1;

    for (let i = 0; i < this._messages.length; i++) {
      if (this._messages[i].identifier === identifier) {
        index = i;
        break;
      }
    }

    return index;
  }
}
