// custom-button.ts

import { renderButton } from "./render-custom-button";


class CustomButton extends HTMLElement {
  private _text: string;

  constructor(text = 'Click me!') {
    super();
    this._text = text;

    this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['text', 'disabled'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      switch (name) {
        case 'text':
          this._text = newValue || '';
          break;
      }
      this.render();
    }
  }

  connectedCallback() {
    this.render();
    this.addEventListener('click', this.handleClick.bind(this));
  }

  private render() {
    if (!this.shadowRoot) return 
    this.shadowRoot.innerHTML = renderButton(this._text);
  }

  private handleClick() {
    // Handle button click event
    console.log('Button Clicked!');
  }
}

customElements.define('custom-button', CustomButton);
