// custom-button.ts

export class CustomButton extends HTMLElement {
  private _text: string;

  constructor({text = 'Click me!'}: {text: string}) {
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
    this.shadowRoot.innerHTML = CustomButton.render(this._text);
  }

  public static render(text: string) {
    return `
      <style>
        /* Add your styles here */
        :host {
          display: inline-block;
        }
        button {
          padding: 10px 15px;
          font-size: 16px;
          cursor: pointer;
        }
        button[disabled] {
          cursor: not-allowed;
        }
      </style>
      <button>${text}</button>
    `
  }

  public static renderSSR(document: Document) {
    const elements = document.querySelectorAll('custom-button')
  
    for (const element of elements) {
      const attributes = element.attributes
      for (const attribute of attributes) {
        // render declative shadow dom
        const buttonHtml = `
          <template shadowrootmode="open">
            ${CustomButton.render(attribute.value)}
          </template>
        `
        element.innerHTML = buttonHtml
      }
    }
  
    return document.documentElement.outerHTML
  }

  private handleClick() {
    // Handle button click event
    console.log('Button Clicked!');
  }
}

customElements.get('custom-button') || customElements.define('custom-button', CustomButton);
