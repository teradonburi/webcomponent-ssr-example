import { CustomButton } from './webcomponents/custom-button'

customElements.get('custom-button') || customElements.define('custom-button', CustomButton);

// polyfill for declarative shadow dom
// https://developer.chrome.com/docs/css-ui/declarative-shadow-dom
(function attachShadowRoots(root: Document | ShadowRoot) {
  root.querySelectorAll<HTMLElement>("template[shadowrootmode]").forEach(template => {
    const mode = template.getAttribute("shadowrootmode");
    if (template.parentNode && (mode === 'open' || mode == 'closed')) {
      const shadowRoot = (template.parentNode as HTMLElement).attachShadow({ mode });
      shadowRoot.appendChild(template);
      template.remove();
      attachShadowRoots(shadowRoot);  
    }
  });
})(document);
