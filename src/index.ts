import { AppWc } from '~/components/web/app-wc';

export const defineComponent = (component = 'wc-about-me') => {
  if (customElements.get(component)) {
    console.warn(`Custom element '${component}' is already defined.`);
  } else {
    customElements.define(component, AppWc);
  }
};

export type { AppWc };
export default defineComponent;
