import { JSDOM } from 'jsdom'

// for SSR
if (typeof window === 'undefined') {
  const dom = new JSDOM();
  const { window } = dom;
    
  // fake objects
  // Node.js の globalThis に宣言がなければ参照を追加
  globalThis.DOMException ??= window.DOMException; // Node.js v18 以降では不要
  globalThis.document ??= window.document;
  globalThis.HTMLElement ??= window.HTMLElement;
  globalThis.customElements ??= window.customElements;  
} 

import { CustomButton } from './webcomponents/custom-button'

export function render() {
  const text = `I'm a custom button!`
  const htmlString = `
    <div>
      <h1>Hello SSR webcomponent Vite!</h1>
      <custom-button text="${text}"></custom-button>
    </div>
  `

  const dom = new JSDOM(htmlString);
  const document = dom.window.document

  const html = CustomButton.renderSSR(document)

  return { html }
}
