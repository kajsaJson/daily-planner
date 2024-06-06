/* eslint-disable @typescript-eslint/method-signature-style */
export {};

declare global {
  export interface HTMLButtonElement extends HTMLElement, PopoverInvokerElement {
    addEventListener<const T extends keyof HTMLElementEventMap>(
      this: void,
      type: T,
      listener: (this: void, event: HTMLElementEventMap[T]) => void,
      options: AddEventListenerOptions,
    ): void;

    removeEventListener<const T extends keyof HTMLElementEventMap>(
      this: void,
      type: T,
      listener: (this: void, event: HTMLElementEventMap[T]) => void,
      options: AddEventListenerOptions,
    ): void;
  }

  export interface HTMLDivElement extends HTMLElement {
    addEventListener<const T extends keyof HTMLElementEventMap>(
      this: void,
      type: T,
      listener: (this: void, event: HTMLElementEventMap[T]) => void,
      options: AddEventListenerOptions,
    ): void;

    removeEventListener<const T extends keyof HTMLElementEventMap>(
      this: void,
      type: T,
      listener: (this: void, event: HTMLElementEventMap[T]) => void,
      options: AddEventListenerOptions,
    ): void;
  }

  export interface Window
    extends EventTarget,
      AnimationFrameProvider,
      GlobalEventHandlers,
      WindowEventHandlers,
      WindowLocalStorage,
      WindowOrWorkerGlobalScope,
      WindowSessionStorage {
    addEventListener<const T extends keyof HTMLElementEventMap>(
      this: this,
      type: T,
      listener: (this: void, event: HTMLElementEventMap[T]) => void,
      options: AddEventListenerOptions,
    ): void;

    removeEventListener<const T extends keyof HTMLElementEventMap>(
      this: this,
      type: T,
      listener: (this: void, event: HTMLElementEventMap[T]) => void,
      options: AddEventListenerOptions,
    ): void;
  }

  export interface ReadonlyArray<T> {
    includes(this: this, searchElement: any, fromIndex?: number): searchElement is T;
  }

  export interface JSON {
    parse(
      //
      this: this,
      text: string,
      reviver?: (this: void, key: string, value: unknown) => unknown,
    ): unknown;

    stringify<const T extends object, U extends keyof T = keyof T>(
      //
      this: this,
      value: T extends Error ? never : T,
      replacer?: ((this: void, key: U, value: T[U]) => any) | readonly U[] | null,
      space?: string | number,
    ): string;
  }
}
