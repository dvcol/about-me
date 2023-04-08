import '~/styles/app.scss';
import { App } from '~/components';

if (import.meta.env.VITE_WEB_COMPONENT) import('~/index').then(({ definedComponent }) => definedComponent());

const app = new App({
  target: document.getElementById('app-container-root'),
});

export default app;
