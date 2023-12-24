import { renderButton } from './webcomponents/render-custom-button'
import {JSDOM} from 'jsdom'

export function render() {
  const text = `I'm a custom button!`
  const htmlString = `
    <div>
      <h1>Hello SSR webcomponent Vite!</h1>
      <custom-button text="${text}"></custom-button>
    </div>
  `

  const dom = new JSDOM(htmlString);
  const html = renderCustomButton(dom.window.document)

  return { html }
}

const renderCustomButton = (dom: Document) => {
  const elements = dom.querySelectorAll('custom-button')

  for (const element of elements) {
    const attributes = element.attributes
    for (const attribute of attributes) {
      // render declative shadow dom
      const buttonHtml = `
        <template shadowrootmode="open">
          ${renderButton(attribute.value)}
        </template>
      `
      element.innerHTML = buttonHtml
    }
  }

  return dom.documentElement.outerHTML
}