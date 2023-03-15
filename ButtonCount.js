class ButtonCount extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    let count = 0;
    let button = document.createElement('button');
    button.textContent = `times clicked: ${count}`;
    shadowRoot.append(button);
    shadowRoot.firstElementChild.addEventListener('click', (e) => {
      count++;
      button.textContent = `times clicked: ${count}`;
    });
  }
}

window.customElements.define('button-count', ButtonCount);
