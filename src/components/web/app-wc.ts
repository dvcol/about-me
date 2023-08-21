import { App } from '~/components';

class AppWc extends HTMLElement {
  get container() {
    return this.getAttribute('container') ?? undefined;
  }

  private async connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });

    return new App({ target: shadowRoot, props: { container: this.container } });
  }
}

export { AppWc };

export default AppWc;
