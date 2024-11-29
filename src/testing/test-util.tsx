import { screen } from '@testing-library/react';

export type TestElement = Document | Element | Window | Node | HTMLElement;
export type QueryElement = HTMLElement | Element;

export class ScreenQuery {
  constructor() {}
  static hasInputValue(e: TestElement, inputValue: string) {
    return screen.getByDisplayValue(inputValue) === e;
  }
}
