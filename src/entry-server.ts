import { JSDOM } from 'jsdom'
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
