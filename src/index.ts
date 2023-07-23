import { AppWc } from '~/components/web/app-wc';

enum WebComponents {
  AboutMe = 'wc-about-me',
}

type DefineComponent = (component?: WebComponents) => void;

/**
 * Defines About Me web components
 * @param component defaults to wc-about-me
 */
export const defineComponent: DefineComponent = (component = WebComponents.AboutMe) => {
  if (customElements.get(component)) {
    console.warn(`Custom element '${component}' is already defined.`);
  } else {
    customElements.define(component, AppWc);
  }
};

export const baseUrl = 'about-me';

type AboutMe = {
  baseUrl: typeof baseUrl;
  defineComponent: typeof defineComponent;
  default: typeof defineComponent;
};

export type { AppWc, AboutMe };
export default defineComponent;
