import { App } from '~/components';

class AppWc extends HTMLElement {
  private async connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });

    return new App({ target: shadowRoot });
  }
}

export { AppWc };

export default AppWc;
