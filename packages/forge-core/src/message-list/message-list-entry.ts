/**
 * Represents a single message list entry containing a string message and its identifier.
 */
export class MessageListEntry<T> {
  public originalMessage: string;

  constructor(
    public message: string,
    public identifier: T
  ) {
    this.originalMessage = message;
  }
}
