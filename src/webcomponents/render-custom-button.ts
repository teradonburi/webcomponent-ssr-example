
export const renderButton = (text: string) => {
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