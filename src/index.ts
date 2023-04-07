import { AppWc } from '~/components/web/app-wc';

export const definedComponent = () => {
  customElements.define('wc-about-me', AppWc);
};

export type { AppWc };
export default definedComponent;
